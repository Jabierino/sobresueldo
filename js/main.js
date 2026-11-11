// Interfaz: pantallas, cartas deslizables, agenda, elecciones, portadas, final, ranking, logros, ajustes y medición.
import content from './content.js';
import * as E from './engine.js';
import { renderCharacter } from './characters.js';
import * as DB from './storage.js';
import { sfx, setSound } from './sound.js';

const $ = (id) => document.getElementById(id);
const P = DB.profile;
let st = null, busy = false, backTo = 's-title';

const WHO = { yo: 'Tú', asesor: 'Borja, tu asesor', vecina: 'Una vecina', vecino: 'Un vecino', constructor: 'Paco «el del Ladrillo»', cura: 'El párroco', pena: 'La peña', periodista: 'La prensa', policia: 'La policía', empresario: 'Un empresario', diputacion: 'La Diputación', futbol: 'El club de fútbol', obispo: 'El obispado', caja: 'La caja de ahorros', consejera: 'La Consejería', patronal: 'La patronal', sindicalista: 'Los sindicatos', locutor: 'La radio', juez: 'El juzgado', baron: 'Un barón del partido', tesorero: 'El tesorero', magnate: 'Un magnate', tertuliana: 'La tertulia', director: 'Un director de periódico', banquero: 'La banca', constructora: 'Una gran constructora', supremo: 'El Supremo', embajador: 'Un embajador', extranjero: 'Un líder extranjero', comisaria: 'Bruselas', rival: 'Un rival', jefa: 'La jefa del partido', ministro: 'Un ministro', cunado: 'Tu cuñado', ecologista: 'Ecologistas', jubilado: 'Un jubilado', joven: 'La juventud', agricultor: 'El campo', presentadora: 'La tele', ciudadano: 'Un ciudadano', medico: 'Sanidad', influencer: 'Una influencer', chantajista: 'Un desconocido', detective: 'Un detective', monitora: 'Deportes' };
const END_LABEL = { carcel: 'en la cárcel', expulsado: 'expulsado', derrota: 'perdió las elecciones', retiro: 'se plantó', fin: 'presidente jubilado' };

// ---------------------------------------------------------------- utilidades
function show(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('on', s.id === id));
  if (id !== 's-game') $('toast').hidden = true;
  beat();
}
let toastT = null;
function toast(html, ms = 2800) {
  const t = $('toast'); t.innerHTML = html; t.hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), ms);
}
$('toast').onclick = () => ($('toast').hidden = true);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const moneyOf = (fx, scale) => (fx.m || 0) * scale * ((fx.m || 0) < 0 && !fx.full ? E.TUNING.costFactor : 1);
function chips({ money = 0, pop = 0, dirt = 0 }) {
  const c = [];
  if (Math.round(money)) c.push(`<span class="chip money ${money < 0 ? 'neg' : ''}">${money > 0 ? '+' : ''}${E.fmtMoney(money)}</span>`);
  if (pop) c.push(`<span class="chip pop ${pop < 0 ? 'neg' : ''}">${pop > 0 ? '▲' : '▼'} ${Math.abs(pop)} amor del populacho</span>`);
  if (dirt) c.push(`<span class="chip dirt ${dirt < 0 ? 'neg' : ''}">${dirt > 0 ? '▲' : '▼'} ${Math.abs(dirt)} olor a caca</span>`);
  return c.join('');
}
const snap = () => ({ money: st.money, pop: st.pop, dirt: st.dirt });
const diff = (a) => ({ money: st.money - a.money, pop: st.pop - a.pop, dirt: st.dirt - a.dirt });
function gameDate() {
  const d = new Date(2027, (st?.totalTurns || 0) * 3, 1 + ((st?.stats.cards || 0) * 7) % 27);
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function loadValid() { const g = DB.loadGame(); return g && g.v === 2 && g.queue ? g : null; }
function save() { if (st && st.phase !== 'over') DB.saveGame(st); }
const dailyCard = () => content.daily[E.hashStr(DB.today()) % content.daily.length];

// ---------------------------------------------------------------- medidores
function updateMeters(before) {
  $('v-money').textContent = E.fmtMoney(st.money);
  $('m-money').classList.toggle('neg', st.money < 0);
  $('f-pop').style.width = st.pop + '%';
  $('f-dirt').style.width = st.dirt + '%';
  $('m-pop').classList.toggle('low', st.pop < 20);
  $('m-dirt').classList.toggle('high', st.dirt >= 60);
  if (before) {
    const d = diff(before);
    [['m-money', d.money], ['m-pop', d.pop], ['m-dirt', d.dirt]].forEach(([id, v]) => {
      if (Math.round(v)) { const el = $(id); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
    });
  }
  const S = E.stageOf(st);
  $('g-stage').textContent = S.name;
  $('g-turn').textContent = `Turno ${Math.min(st.turnInStage + 1, S.turns)}/${S.turns}`;
}
function preview(fx) {
  const set = (id, v, big) => {
    const pv = document.querySelector(`#${id} .pv`);
    pv.className = 'pv' + (v ? ` on ${v > 0 ? 'up' : 'down'}${big ? ' big' : ''}` : '');
  };
  fx = fx || {};
  set('m-money', fx.m || 0, Math.abs(fx.m || 0) >= 2);
  set('m-pop', fx.p || 0, Math.abs(fx.p || 0) >= 8);
  set('m-dirt', fx.d || 0, Math.abs(fx.d || 0) >= 8);
}

// ---------------------------------------------------------------- cartas
const cardEl = $('card');
// Carta del día: obligatoria, al principio del turno (antes de gastar ningún punto)
function maybeDaily() {
  if (!st || st.phase !== 'actions' || st.attending || st.tutorial === 1 || st.postScandal) return;
  if (st.ap !== E.stageOf(st).ap) return;
  if (P.dailyDate === DB.today() || st.dailyDay === DB.today()) return;
  st.dailyDay = DB.today();
  E.addCardFront(st, dailyCard().id);
}
function renderCard() {
  const card = E.currentCard(st, content);
  if (!card) return route();
  const tags = card.tags || [];
  cardEl.className = 'card' + (card.scandal ? ' scandal' : '');
  void cardEl.offsetWidth; cardEl.classList.add('enter');
  cardEl.style.transition = ''; cardEl.style.transform = '';
  const rib = card.scandal ? 'ESCÁNDALO' : card.daily ? 'CARTA DEL DÍA' : tags.includes('campana') ? 'CAMPAÑA ELECTORAL' : card.followup ? 'CONSECUENCIAS' : card.strong ? 'EVENTO FUERTE' : '';
  $('card-ribbon').hidden = !rib; $('card-ribbon').textContent = rib;
  $('card-portrait').innerHTML = renderCharacter(card.who, { mood: card.scandal ? 'sly' : 'neutral' });
  $('card-who').textContent = WHO[card.who] || '';
  $('card-text').textContent = card.text;
  $('lbl-l').textContent = card.left.label; $('lbl-r').textContent = card.right.label;
  $('btn-l').textContent = '← ' + card.left.label; $('btn-r').textContent = card.right.label + ' →';
  $('btn-room').hidden = !st.attending;
  $('advisor').hidden = !card.hint;
  if (card.hint) { $('adv-text').textContent = card.hint; $('advisor').querySelector('.adv-face').innerHTML = renderCharacter('asesor', { mood: 'happy' }); }
  updateMeters();
  preview(null);
  busy = false;
  sfx.type();
  if (card.scandal) sfx.flash();
}
function lean(side) {
  const card = E.currentCard(st, content); if (!card) return;
  $('lbl-l').classList.toggle('on', side === 'left');
  $('lbl-r').classList.toggle('on', side === 'right');
  const svg = $('card-portrait').querySelector('svg');
  if (svg) svg.dataset.mood = side ? card[side].face || (side === 'left' ? 'angry' : 'happy') : 'neutral';
  preview(side ? card[side].fx : null);
}
const cardOpen = () => !!(st && E.currentCard(st, content) && !$('desk-card').hidden && !$('v-desk').hidden);
// arrastre
let drag = null;
cardEl.addEventListener('pointerdown', (e) => {
  if (busy || !cardOpen()) return;
  drag = { x: e.clientX, dx: 0, id: e.pointerId, t: Date.now() };
  cardEl.setPointerCapture(e.pointerId);
  cardEl.style.transition = 'none';
});
cardEl.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  drag.dx = e.clientX - drag.x;
  cardEl.style.transform = `translateX(${drag.dx}px) rotate(${drag.dx / 16}deg)`;
  lean(Math.abs(drag.dx) > 24 ? (drag.dx < 0 ? 'left' : 'right') : null);
});
const endDrag = (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  const { dx, t } = drag; drag = null;
  const fast = Math.abs(dx) > 40 && Math.abs(dx) / (Date.now() - t) > 0.6;
  if (Math.abs(dx) > Math.min(110, cardEl.offsetWidth * 0.3) || fast) commit(dx < 0 ? 'left' : 'right');
  else { cardEl.style.transition = 'transform .25s'; cardEl.style.transform = ''; lean(null); }
};
cardEl.addEventListener('pointerup', endDrag);
cardEl.addEventListener('pointercancel', endDrag);
for (const [id, side] of [['btn-l', 'left'], ['btn-r', 'right']]) {
  const b = $(id);
  b.addEventListener('pointerenter', () => !busy && lean(side));
  b.addEventListener('pointerdown', () => !busy && lean(side));
  b.addEventListener('pointerleave', () => !busy && lean(null));
  b.addEventListener('focus', () => !busy && lean(side));
  b.addEventListener('blur', () => !busy && lean(null));
  b.addEventListener('click', () => commit(side));
}
document.addEventListener('keydown', (e) => {
  if (!$('s-game').classList.contains('on') || !cardOpen() || !$('o-news').hidden) return;
  if (e.key === 'ArrowLeft') commit('left');
  if (e.key === 'ArrowRight') commit('right');
});

function commit(side) {
  if (busy || !cardOpen()) return;
  busy = true;
  lean(side);
  const dir = side === 'left' ? -1 : 1;
  cardEl.style.transition = 'transform .28s ease-in';
  cardEl.style.transform = `translateX(${dir * 130}%) rotate(${dir * 28}deg)`;
  setTimeout(() => resolveChoice(side), 260);
}
function resolveChoice(side) {
  const card = E.currentCard(st, content);
  const before = snap();
  const res = E.choose(st, content, side);
  DB.sessionCard();
  if (card.daily) { P.dailyDate = DB.today(); DB.saveProfile(); }
  if (st.tutorial === 2 && !P.tutorialDone) { P.tutorialDone = true; DB.saveProfile(); }
  const d = diff(before);
  updateMeters(before); preview(null);
  if (d.money > 0) sfx.cash(); else if (d.dirt >= 8) sfx.thud();
  save();
  busy = false;
  const next = () => (res.end ? showEnd() : route());
  if (res.news) showNews(res.news, d, card.who, res.opt.face || 'sly', next);
  else next();
}

// ---------------------------------------------------------------- flujo del turno
let curTab = 'desk';
function route() {
  if (!st) return toTitle();
  if (st.phase === 'over') return showEnd();
  if (st.phase === 'election') return showElection();
  show('s-game');
  maybeDaily();
  if (st.phase === 'cards') curTab = 'desk';
  renderAll();
}
function setTab(tab) {
  curTab = tab;
  const forced = st.phase === 'cards';
  document.querySelectorAll('.tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.tab === tab);
    t.disabled = forced && t.dataset.tab !== 'desk';
  });
  $('v-desk').hidden = tab !== 'desk';
  $('v-agenda').hidden = tab === 'desk';
  $('list-agenda').hidden = tab !== 'agenda';
  $('list-business').hidden = tab !== 'business';
  $('list-laws').hidden = tab !== 'laws';
}
document.querySelectorAll('.tab').forEach((t) => (t.onclick = () => {
  if (t.disabled || busy) return;
  if (st.attending) E.leaveCard(st);
  setTab(t.dataset.tab); renderAll();
}));
function renderAll() {
  setTab(curTab);
  updateMeters();
  const acting = st.phase === 'actions';
  $('ap-bar').hidden = !acting;
  const hint = acting && st.tutorial === 2 && !st.agendaHintDone;
  $('agenda-hint').hidden = !hint;
  if (hint) $('agenda-hint').querySelector('.adv-face').innerHTML = renderCharacter('asesor', { mood: 'sly' });
  if (acting) {
    const ap = E.stageOf(st).ap;
    $('ap-dots').textContent = '●'.repeat(st.ap) + '○'.repeat(Math.max(0, ap - st.ap));
    $('btn-endturn').textContent = st.ap > 0 ? 'Terminar turno →' : 'Siguiente turno →';
    $('btn-endturn').classList.toggle('pulse', st.ap === 0);
  }
  if (curTab === 'desk') {
    const showCard = st.phase === 'cards' || !!st.attending;
    $('desk-card').hidden = !showCard;
    $('waiting').hidden = showCard;
    if (showCard) renderCard(); else { $('advisor').hidden = true; renderWaiting(); }
  } else if (curTab === 'agenda') renderAgenda();
  else if (curTab === 'business') renderBusiness();
  else renderLaws();
}
$('hint-ok').onclick = () => { st.agendaHintDone = true; save(); renderAll(); };

// Sala de espera
function climateLine() {
  const c = E.climateOf(st);
  return `<div class="climate"><b>Sentir general: ${c.name}</b><span>${c.desc}.</span></div>`;
}
function renderWaiting() {
  let html = climateLine();
  html += `<div class="group-title">Sala de espera · ${st.visitors.length ? `${st.visitors.length} visita${st.visitors.length > 1 ? 's' : ''}` : 'vacía'}</div>`;
  if (!st.visitors.length) html += `<p class="note">No queda nadie esperando. Llama a tu agenda, haz negocios, aprueba leyes… o termina el turno.</p>`;
  for (const id of st.visitors) {
    const c = content.byId[id];
    const teaser = c.text.length > 80 ? c.text.slice(0, 78).replace(/\s+\S*$/, '') + '…' : c.text;
    html += `<button class="visitor" data-v="${id}" ${st.ap <= 0 ? 'disabled' : ''}><div class="mini">${renderCharacter(c.who, { mood: 'neutral' })}</div>
      <div><div class="nm">${esc(WHO[c.who] || '')}${c.strong ? ' <span class="rec">+18</span>' : ''}</div><div class="rl">${esc(teaser)}</div></div>
      <span class="go">${st.ap > 0 ? 'Atender<small>1 punto</small>' : 'Sin puntos'}</span></button>`;
  }
  if (st.visitors.length) html += `<p class="note">Cada visita que dejes esperando te quita ${E.TUNING.ignorePenalty} de amor del populacho al terminar el turno.</p>`;
  $('waiting').innerHTML = html;
}
$('waiting').addEventListener('click', (e) => {
  const b = e.target.closest('[data-v]'); if (!b || b.disabled || busy) return;
  if (E.attend(st, b.dataset.v)) { save(); renderAll(); }
});
$('btn-room').onclick = () => { if (busy) return; E.leaveCard(st); save(); renderAll(); };

// Agenda
function renderAgenda() {
  const list = E.contactList(st, content);
  let html = '';
  for (let s = st.stage; s >= 0; s--) {
    const group = list.filter((c) => c.stage === s);
    if (!group.length) continue;
    html += `<div class="group-title">Contactos de ${E.STAGES[s].name.toLowerCase()}</div>`;
    for (const c of group) {
      const t = st.contacts[c.id];
      const act = (kind) => {
        const a = c[kind], why = E.callState(st, c, kind);
        const fx = { ...a.fx }; if (c.graba && (fx.d || 0) > 0) fx.d += 3;
        if ((fx.m || 0) > 0) fx.m *= E.TUNING.contactMoney;
        if ((fx.p || 0) > 0) fx.p = Math.round(fx.p * E.TUNING.contactPop);
        return `<button class="act" data-c="${c.id}" data-k="${kind}" ${why ? 'disabled' : ''}>${esc(a.label)}<small>${why ? esc(why) : `<span class="chips">${chips({ money: moneyOf(fx, E.STAGES[c.stage].scale), pop: fx.p || 0, dirt: fx.d || 0 })}</span>`}</small></button>`;
      };
      html += `<div class="contact"><div class="mini">${renderCharacter(c.who)}</div>
        <div><div class="nm">${esc(c.name)}${c.graba ? '<span class="rec">● GRABA</span>' : ''}</div><div class="rl">${esc(c.role)}</div></div>
        <div class="trust" title="Favores que te debe">${'♥'.repeat(t)}${'♡'.repeat(3 - t)} <span class="rl">favores</span></div>
        <div class="acts">${act('offer')}${act('ask')}</div></div>`;
    }
  }
  $('list-agenda').innerHTML = html;
}
// Negocios
function renderBusiness() {
  const S = E.stageOf(st);
  $('list-business').innerHTML = E.BUSINESS.map((b) => {
    const why = E.businessState(st, b);
    const fxChips = b.id === 'filtrar' ? '<span class="chip pop">▲ 6 amor del populacho… o ▼ 5</span>' : chips({ money: moneyOf(b.fx, S.scale), pop: b.fx.p || 0, dirt: b.fx.d || 0 }) + (b.fx.e ? `<span class="chip money">+${E.fmtMoney(E.TUNING.kickback * S.scale)}/turno</span>` : '');
    return `<div class="biz"><div class="info"><div class="nm">${b.label}</div><div class="ds">${b.desc}</div><div class="chips">${fxChips}</div></div>
      <button class="btn small" data-b="${b.id}" ${why ? 'disabled' : ''}>${why ? esc(why) : 'Hacer'}</button></div>`;
  }).join('') + `<p class="note">Cada negocio, una vez por turno. Enchufados: ${st.ench} · Cuenta en Andorra: ${st.offshore ? 'sí' : 'no'}</p>`;
}
// Leyes: sentir general, brújula y medidas sobre la mesa
function renderLaws() {
  const al = Math.round(E.alignment(st) * E.TUNING.climateAlign);
  const c = E.climateOf(st);
  let html = `<div class="climate"><b>Sentir general: ${c.name}</b><span>${c.desc}. Cambia en ${st.climateLeft} turno${st.climateLeft === 1 ? '' : 's'}.</span>
    <span class="fit ${al > 0 ? 'good' : al < 0 ? 'bad' : ''}">Tu perfil ${al > 0 ? `encaja: +${al}` : al < 0 ? `no encaja: ${al}` : 'ni fu ni fa: 0'} de amor por turno</span></div>`;
  html += `<div class="compass">${E.AXES.map((a) => {
    const v = st.ideo[a.id] || 0, w = c.want[a.id] || 0;
    return `<div class="ax"><span class="${w < 0 ? 'want' : ''}">${a.neg}</span><div class="axbar"><i style="left:${(v + 10) * 5}%"></i></div><span class="${w > 0 ? 'want' : ''}">${a.pos}</span></div>`;
  }).join('')}<small class="note">Lo subrayado es lo que pide el populacho ahora.</small></div>`;
  html += `<div class="group-title">Sobre la mesa este turno</div>`;
  if (!st.laws.length) html += '<p class="note">No hay nada que aprobar este turno.</p>';
  for (const id of st.laws) {
    const law = content.laws.find((l) => l.id === id), ef = E.lawEffect(st, law), why = E.lawState(st, law);
    const axes = Object.entries(law.ax || {}).map(([k, v]) => { const a = E.AXES.find((x) => x.id === k); return `<span class="chip axis">→ ${v > 0 ? a.pos : a.neg}${Math.abs(v) > 1 ? ' ×' + Math.abs(v) : ''}</span>`; }).join('');
    html += `<div class="law"><div class="kind">${esc(law.kind)}${law.amigo ? ' · <b>a medida</b>' : ''}</div><div class="nm">${esc(law.title)}</div><div class="ds">${esc(law.text)}</div>
      <div class="chips">${axes}${chips({ money: moneyOf({ m: ef.m }, E.stageOf(st).scale), pop: ef.p, dirt: ef.d })}${ef.flip ? '<span class="chip pop neg">¡chaquetero!</span>' : ''}</div>
      <button class="btn small" data-l="${id}" ${why ? 'disabled' : ''}>${why ? esc(why) : 'Aprobar · 1 punto'}</button></div>`;
  }
  $('list-laws').innerHTML = html;
}
$('list-laws').addEventListener('click', (e) => {
  const b = e.target.closest('[data-l]'); if (!b || b.disabled) return;
  const before = snap();
  const r = E.approveLaw(st, content, b.dataset.l);
  if (!r) return;
  const d = diff(before);
  updateMeters(before); save();
  if (r.end) return setTimeout(showEnd, 600);
  if (r.news) return showNews(r.news, d, 'yo', r.ef.p >= 0 ? 'happy' : 'caught', () => route());
  sfx.type();
  toast(`Aprobado: <b>${esc(r.law.title)}</b>${r.ef.flip ? ' — te llaman chaquetero.' : ''}<div class="chips">${chips(d)}</div>`, 3000);
  renderAll();
});
$('list-agenda').addEventListener('click', (e) => {
  const b = e.target.closest('.act'); if (!b || b.disabled) return;
  const before = snap();
  const r = E.callContact(st, content, b.dataset.c, b.dataset.k);
  if (!r) return;
  afterAction(before, r.text + (r.graba ? ' <b>(Ojo: lo ha grabado.)</b>' : ''), r.end);
});
$('list-business').addEventListener('click', (e) => {
  const b = e.target.closest('[data-b]'); if (!b || b.disabled) return;
  const before = snap();
  const r = E.doBusiness(st, content, b.dataset.b);
  if (!r) return;
  afterAction(before, r.text, r.end);
});
function afterAction(before, text, end) {
  const d = diff(before);
  updateMeters(before);
  if (d.money > 0) sfx.cash(); else sfx.type();
  toast(`${text}<div class="chips">${chips(d)}</div>`, 3600);
  save();
  if (end) return setTimeout(showEnd, 900);
  renderAll();
}
$('btn-endturn').onclick = () => {
  if (!st || st.phase !== 'actions' || busy) return;
  if (st.ap > 0 && st.visitors.length && !confirm(`Te quedan ${st.ap} puntos y ${st.visitors.length} visita(s) esperando, que se irán enfadadas. ¿Terminar el turno?`)) return;
  st.agendaHintDone = true;
  const before = snap();
  const ignored = st.visitors.length;
  const r = E.endTurn(st, content);
  save();
  if (r?.end) return showEnd();
  if (r?.scandal) { sfx.flash(); return route(); }
  curTab = 'desk';
  if (st.phase === 'actions' || st.phase === 'cards') {
    const d = diff(before);
    const bits = [`Nuevo turno. Cobras el sueldo${st.ench ? ' y las comisiones de tus enchufados' : ''}.`];
    if (ignored) bits.push(`${ignored} visita${ignored > 1 ? 's' : ''} se fue${ignored > 1 ? 'ron' : ''} enfadada${ignored > 1 ? 's' : ''}.`);
    if (st.lastAlign) bits.push(`Tu perfil ${st.lastAlign > 0 ? 'gusta' : 'no gusta'} al populacho (${st.lastAlign > 0 ? '+' : ''}${st.lastAlign}).`);
    if (st.climateChanged) bits.push(`<b>Cambia el sentir general: ${E.climateOf(st).name}.</b>`);
    toast(`${bits.join(' ')}<div class="chips">${chips(d)}</div>`, 4200);
  }
  route();
};
$('adv-skip').onclick = () => { E.skipTutorial(st, content); P.tutorialDone = true; DB.saveProfile(); save(); route(); };

// ---------------------------------------------------------------- portadas
let newsCb = null;
function showNews(news, d, who, mood, cb) {
  $('news-date').innerHTML = `<span>${gameDate()}</span><span>1,50 €</span>`;
  $('news-head').textContent = news.h;
  $('news-sub').textContent = news.s || '';
  $('news-photo').innerHTML = renderCharacter(who, { mood });
  $('news-fx').innerHTML = d ? chips(d) : '';
  $('o-news').hidden = false;
  newsCb = cb;
  sfx.flash();
}
$('news-ok').onclick = () => { $('o-news').hidden = true; const cb = newsCb; newsCb = null; cb && cb(); };

// ---------------------------------------------------------------- elecciones
function showElection() {
  show('s-election');
  const S = E.stageOf(st), p = E.electionChance(st);
  $('el-title').textContent = S.next;
  $('el-char').innerHTML = renderCharacter('yo', { mood: p > 0.6 ? 'happy' : p > 0.35 ? 'sly' : 'caught' });
  $('el-bar').style.transition = 'none'; $('el-bar').style.width = '0';
  requestAnimationFrame(() => requestAnimationFrame(() => { $('el-bar').style.transition = ''; $('el-bar').style.width = Math.round(p * 100) + '%'; }));
  $('el-pct').textContent = `${Math.round(p * 100)} % de opciones`;
  $('el-text').innerHTML = `Si ganas, serás <b>${S.nextName.toLowerCase()}</b>. Si pierdes, te retiras a un consejo de administración con <b>${E.fmtMoney(E.retireBonus(st, false))}</b> extra.<br>Plantarte ahora te da <b>${E.fmtMoney(E.retireBonus(st, true))}</b> y acabas la partida con lo que tienes.`;
  $('el-run').textContent = `Presentarte (${S.nextName})`;
  $('el-retire').textContent = `Plantarte: +${E.fmtMoney(E.retireBonus(st, true))}`;
  $('el-run').disabled = $('el-retire').disabled = false;
}
$('el-run').onclick = () => {
  $('el-run').disabled = $('el-retire').disabled = true;
  $('el-pct').textContent = 'Escrutando…';
  sfx.type();
  setTimeout(() => {
    const r = E.decideElection(st, content, true);
    save();
    if (!r.win) { sfx.lose(); $('el-pct').textContent = 'Has perdido'; return setTimeout(showEnd, 900); }
    sfx.win();
    const unlocked = content.contacts.filter((c) => c.stage === st.stage).length;
    showNews({ h: `${st.name}, NUEVO ${r.to.name.toUpperCase()}`, s: `Promete «trabajar por todos». Su agenda suma ${unlocked} contactos nuevos.` }, null, 'yo', 'happy', () => route());
  }, 1400);
};
$('el-retire').onclick = () => { E.decideElection(st, content, false); showEnd(); };

// ---------------------------------------------------------------- final
let ended = null;
function showEnd() {
  if (!st?.end) return toTitle();
  const e = st.end;
  if (ended !== st) {
    ended = st;
    const newAch = (e.achievements || []).filter((a) => !P.achievements[a]);
    newAch.forEach((a) => (P.achievements[a] = DB.today()));
    st.newAch = newAch;
    P.best = Math.max(P.best ?? -Infinity, e.money);
    P.games = (P.games || 0) + 1;
    DB.saveProfile();
    DB.addRanking({ n: st.name, m: e.money, t: e.type, c: e.stage, d: DB.today(), own: true });
    DB.gameOver({ day: DB.today(), dur: Date.now() - st.startedAt, cards: st.stats.cards, end: e.type, stage: e.stage, money: e.money });
    DB.clearGame();
    if (e.type === 'carcel' || e.type === 'derrota' || e.type === 'expulsado') sfx.lose(); else sfx.win();
  }
  show('s-end');
  $('end-date').innerHTML = `<span>${gameDate()}</span><span>1,50 €</span>`;
  $('end-head').textContent = e.text;
  $('end-photo').innerHTML = renderCharacter('yo', { mood: { carcel: 'caught', expulsado: 'angry', derrota: 'angry', retiro: 'sly', fin: 'happy' }[e.type] });
  $('end-money').textContent = E.fmtMoney(e.money);
  const bits = [`Último cargo: ${e.cargo}`, `${e.turns} turnos`, `${st.stats.cards} cartas`, `${st.stats.scandals} escándalos`];
  if (e.bonus) bits.push(`puerta giratoria: +${E.fmtMoney(e.bonus)}`);
  if (e.confiscated) bits.push(`confiscado: ${E.fmtMoney(e.confiscated)}`);
  if (e.money >= P.best) bits.push('¡nuevo récord!');
  $('end-detail').textContent = bits.join(' · ');
  $('end-ach').innerHTML = (st.newAch || []).map((a) => `<span class="chip">★ ${E.ACHIEVEMENTS.find((x) => x.id === a)?.name}</span>`).join('');
}
$('end-share').onclick = () => {
  const e = st.end;
  const url = location.href.split('#')[0] + '#r=' + DB.encodeResult({ n: st.name, m: e.money, t: e.type, c: e.stage, d: DB.today() });
  const text = `🗞️ ${e.text}. ¿Lo superas? Juega a Sobresueldo y entra en el ranking: ${url}`;
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
};
$('end-again').onclick = () => { st = null; startNew(); };
$('end-ranking').onclick = () => { backTo = 's-end'; showRanking(); };

// ---------------------------------------------------------------- menús
function toTitle() {
  show('s-title');
  const saved = st && st.phase !== 'over' ? st : loadValid();
  $('btn-continue').hidden = !(saved && saved.phase !== 'over');
  $('title-record').textContent = P.best != null ? `Tu récord: ${E.fmtMoney(P.best)}` : '';
  $('title-char').innerHTML = renderCharacter(['asesor', 'baron', 'tesorero', 'constructor', 'magnate'][Math.floor(Math.random() * 5)], { mood: 'sly' });
  $('daily-note').textContent = P.dailyDate === DB.today() ? 'Carta del día: ya jugada. Mañana, otra.' : 'Carta del día: pendiente. Te saldrá en el próximo turno.';
}
function startNew() {
  if (!P.name) { show('s-name'); $('name-input').value = ''; setTimeout(() => $('name-input').focus(), 50); return; }
  st = E.newGame(content, { name: P.name, strong: P.strong, tutorial: !P.tutorialDone, seed: (Date.now() ^ (Math.random() * 1e9)) | 0 });
  ended = null;
  save();
  route();
}
$('btn-new').onclick = () => {
  if (loadValid() && !confirm('Tienes una partida a medias. ¿Empezar otra y perderla?')) return;
  DB.clearGame(); st = null; startNew();
};
$('btn-continue').onclick = () => { st = st && st.phase !== 'over' ? st : loadValid(); ended = null; route(); };
$('name-ok').onclick = () => { const n = $('name-input').value.trim(); if (!n) return $('name-input').focus(); P.name = n; DB.saveProfile(); startNew(); };
$('name-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('name-ok').onclick(); });
$('btn-ranking').onclick = () => { backTo = 's-title'; showRanking(); };
$('btn-achievements').onclick = () => {
  $('ach-list').innerHTML = E.ACHIEVEMENTS.map((a) => `<li class="${P.achievements[a.id] ? '' : 'off'}"><div class="medal">★</div><div><b>${a.name}</b><div class="note">${a.desc}</div></div></li>`).join('');
  backTo = 's-title'; show('s-achievements');
};
$('btn-settings').onclick = () => {
  $('set-strong').checked = P.strong; $('set-sound').checked = P.sound; $('set-tutorial').checked = !P.tutorialDone; $('set-name').value = P.name;
  backTo = 's-title'; show('s-settings');
};
$('set-strong').onchange = (e) => { P.strong = e.target.checked; if (st) st.strong = P.strong; DB.saveProfile(); save(); };
$('set-sound').onchange = (e) => { P.sound = e.target.checked; setSound(P.sound); DB.saveProfile(); };
$('set-tutorial').onchange = (e) => { P.tutorialDone = !e.target.checked; DB.saveProfile(); };
$('set-name').onchange = (e) => { P.name = e.target.value.trim().slice(0, 16); DB.saveProfile(); };
$('set-reset').onclick = () => { if (confirm('¿Borrar récord, logros, ranking, estadísticas y la partida guardada?')) { DB.resetAll(); location.reload(); } };
document.querySelectorAll('[data-back]').forEach((b) => (b.onclick = () => (backTo === 's-end' && st?.end ? showEnd() : toTitle())));
function showRanking() {
  const list = DB.ranking();
  $('rank-list').innerHTML = list.length ? list.slice(0, 50).map((r, i) => `<li class="${r.own ? 'me' : ''}"><span class="pos">${i + 1}</span><div><b>${esc(r.n)}</b><div class="rd">${END_LABEL[r.t] || ''} · ${E.STAGES[r.c]?.name || ''} · ${esc(r.d)}</div></div><span class="rm">${E.fmtMoney(r.m)}</span></li>`).join('') : '<li><span></span><div>Aún no hay nadie. Juega una partida y comparte el resultado por WhatsApp.</div></li>';
  show('s-ranking');
}
$('g-menu').onclick = () => ($('o-menu').hidden = false);
$('menu-resume').onclick = () => ($('o-menu').hidden = true);
$('menu-title').onclick = () => { $('o-menu').hidden = true; save(); toTitle(); };
$('menu-quit').onclick = () => { if (!confirm('¿Abandonar la partida? No cuenta para el ranking.')) return; $('o-menu').hidden = true; DB.clearGame(); st = null; toTitle(); };

// Pantalla oculta de estadísticas: 5 toques seguidos en el título
let taps = [];
$('title-logo').addEventListener('click', () => {
  const now = Date.now(); taps = taps.filter((t) => now - t < 2500); taps.push(now);
  if (taps.length >= 5) { taps = []; const s = DB.metricsSummary(P.name); $('stats-summary').textContent = s.text; $('stats-copy').dataset.json = s.json; backTo = 's-title'; show('s-stats'); }
});
$('stats-copy').onclick = async () => {
  const s = DB.metricsSummary(P.name), txt = `SOBRESUELDO · estadísticas\n${s.text}\n\n${s.json}`;
  try { await navigator.clipboard.writeText(txt); toast('Copiado. Pégalo en WhatsApp.'); }
  catch { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast('Copiado.'); } catch { toast('No se pudo copiar'); } ta.remove(); }
};

// ---------------------------------------------------------------- medición de sesiones
const inGame = () => !!(st && st.phase !== 'over');
function beat() { DB.sessionBeat(st ? st.stage : -1, inGame()); }
setInterval(() => { if (document.visibilityState === 'visible') beat(); }, 15000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') { save(); DB.sessionEnd(); }
  else if (!DB.hasSession()) DB.sessionStart(st ? st.stage : -1, inGame());
});
window.addEventListener('pagehide', () => { save(); DB.sessionEnd(); });

// ---------------------------------------------------------------- arranque
function init() {
  setSound(P.sound);
  st = loadValid();
  if (st && (st.v !== 2 || !st.queue)) st = null;
  DB.sessionStart(st ? st.stage : -1, inGame());
  // Resultado de un amigo recibido por enlace
  const m = location.hash.match(/#r=([\w-]+)/);
  if (m) {
    const r = DB.decodeResult(m[1]);
    history.replaceState(null, '', location.pathname + location.search);
    if (r && DB.addRanking({ ...r, own: false })) setTimeout(() => toast(`<b>${esc(r.n)}</b> entra en tu ranking con ${E.fmtMoney(r.m)}. ¡A superarlo!`, 4500), 400);
  }
  if (!P.warned) {
    show('s-warn');
    $('warn-ok').onclick = () => { P.warned = true; P.strong = $('warn-strong').checked; DB.saveProfile(); toTitle(); };
  } else toTitle();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
}
init();
// Para pruebas desde la consola
window.__sob = { get st() { return st; }, E, content, route, showNews };
