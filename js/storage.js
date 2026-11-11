// Persistencia local (localStorage protegido con try/catch): perfil, partida guardada, ranking y medición de sesiones.
const K = { profile: 'sob_profile', save: 'sob_save', ranking: 'sob_ranking', metrics: 'sob_metrics' };
const read = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
export const today = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// ---- perfil ----
const defProfile = () => ({ name: '', warned: false, strong: true, sound: true, tutorialDone: false, best: null, achievements: {}, dailyDate: null, games: 0 });
export const profile = Object.assign(defProfile(), read(K.profile, {}));
export const saveProfile = () => write(K.profile, profile);

// ---- partida ----
export const loadGame = () => read(K.save, null);
export const saveGame = (st) => write(K.save, st);
export const clearGame = () => { try { localStorage.removeItem(K.save); } catch {} };

// ---- ranking ----
export const ranking = () => read(K.ranking, []);
export function addRanking(r) {
  const list = ranking();
  const key = (x) => `${x.n}|${x.m}|${x.d}`;
  if (list.some((x) => key(x) === key(r))) return false;
  list.push(r); list.sort((a, b) => b.m - a.m);
  write(K.ranking, list.slice(0, 100));
  return true;
}
// Resultado compartible en el enlace: #r=<base64url(JSON)>
export function encodeResult(r) {
  const s = JSON.stringify({ n: r.n, m: r.m, t: r.t, c: r.c, d: r.d });
  return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodeResult(code) {
  try {
    const r = JSON.parse(decodeURIComponent(escape(atob(code.replace(/-/g, '+').replace(/_/g, '/')))));
    if (typeof r.n !== 'string' || typeof r.m !== 'number') return null;
    return { n: r.n.slice(0, 16), m: Math.round(r.m), t: String(r.t || ''), c: +r.c || 0, d: String(r.d || '').slice(0, 10) };
  } catch { return null; }
}

// ---- medición ----
// sessions: [{id, day, start, dur, cards, stage, inGame, over}] · games: [{day, dur, cards, end, stage, money}]
const metrics = Object.assign({ v: 1, firstDay: today(), days: [], sessions: [], games: [] }, read(K.metrics, {}));
let cur = null, lastBeat = 0;
const persist = () => write(K.metrics, metrics);
export function sessionStart(stage, inGame) {
  const d = today();
  if (!metrics.days.includes(d)) metrics.days.push(d);
  cur = { id: Date.now(), day: d, start: Date.now(), dur: 0, cards: 0, stage, inGame, over: false };
  metrics.sessions.push(cur);
  if (metrics.sessions.length > 400) metrics.sessions.shift();
  lastBeat = Date.now();
  persist();
}
export function sessionBeat(stage, inGame) {
  if (!cur) return;
  const now = Date.now();
  cur.dur += Math.min(now - lastBeat, 30000); // tiempo activo: las pausas largas no cuentan
  lastBeat = now;
  if (stage !== undefined) cur.stage = stage;
  if (inGame !== undefined) cur.inGame = inGame;
  persist();
}
export const hasSession = () => !!cur;
export function sessionCard() { if (cur) cur.cards++; }
export function sessionEnd() { sessionBeat(); cur = null; }
export function gameOver(rec) { if (cur) cur.over = true; metrics.games.push(rec); if (metrics.games.length > 200) metrics.games.shift(); persist(); }

export function metricsSummary(profileName) {
  const S = metrics.sessions.filter((s) => s.dur > 3000);
  const durs = S.map((s) => s.dur / 60000).sort((a, b) => a - b);
  const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const median = (a) => (a.length ? a[Math.floor(a.length / 2)] : 0);
  const stageNames = ['concejal', 'alcalde', 'diputado', 'líder', 'presidente'];
  const ab = {}; // sesiones que terminaron con una partida a medias, por cargo
  S.filter((s) => s.inGame && !s.over).forEach((s) => { const k = stageNames[s.stage] || '?'; ab[k] = (ab[k] || 0) + 1; });
  const first = metrics.firstDay, days = [...metrics.days].sort();
  const next = new Date(first + 'T12:00:00'); next.setDate(next.getDate() + 1);
  const ends = {}; metrics.games.forEach((g) => { ends[g.end] = (ends[g.end] || 0) + 1; });
  const r = {
    jugador: profileName || '?', primerDia: first, diasJugados: days.length, volvioAlDiaSiguiente: days.includes(today(next)), volvioOtroDia: days.length > 1,
    sesiones: S.length, minutosMedia: +mean(durs).toFixed(1), minutosMediana: +median(durs).toFixed(1), minutosTotal: +durs.reduce((a, b) => a + b, 0).toFixed(1),
    cartasPorSesion: +mean(S.map((s) => s.cards)).toFixed(1), partidasTerminadas: metrics.games.length,
    minutosPorPartida: +mean(metrics.games.map((g) => g.dur / 60000)).toFixed(1), finales: ends, sesionesCortadasEnCargo: ab,
  };
  const text = [
    `Jugador: ${r.jugador} · desde ${first}`,
    `Días jugados: ${days.length} (${days.join(', ')})`,
    `Volvió al día siguiente: ${r.volvioAlDiaSiguiente ? 'sí' : 'no'} · otro día: ${r.volvioOtroDia ? 'sí' : 'no'}`,
    `Sesiones: ${S.length} · media ${r.minutosMedia} min · mediana ${r.minutosMediana} min · total ${r.minutosTotal} min`,
    `Cartas por sesión: ${r.cartasPorSesion}`,
    `Partidas terminadas: ${metrics.games.length} · ${r.minutosPorPartida} min/partida`,
    `Finales: ${Object.entries(ends).map(([k, v]) => `${k} ${v}`).join(', ') || '—'}`,
    `Sesiones cortadas a media partida, por cargo: ${Object.entries(ab).map(([k, v]) => `${k} ${v}`).join(', ') || '—'}`,
  ].join('\n');
  const json = JSON.stringify({ resumen: r, sesiones: S.map((s) => ({ dia: s.day, min: +(s.dur / 60000).toFixed(2), cartas: s.cards, cargo: s.stage, aMedias: s.inGame && !s.over })), partidas: metrics.games });
  return { text, json };
}

export function resetAll() { try { Object.values(K).forEach((k) => localStorage.removeItem(k)); } catch {} }
