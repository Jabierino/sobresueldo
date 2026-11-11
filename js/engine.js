// Motor del juego: puro (sin DOM), determinista con RNG guardado en el estado. Se usa igual en el navegador y en los tests de Node.

export const STAGES = [
  { id: 'concejal', name: 'Concejal', turns: 4, ap: 4, salary: 6000, scale: 5000, retire: 20000, next: 'Elecciones municipales', nextName: 'Alcalde', thr: 44 },
  { id: 'alcalde', name: 'Alcalde', turns: 5, ap: 4, salary: 15000, scale: 20000, retire: 80000, next: 'Elecciones autonómicas', nextName: 'Diputado', thr: 52 },
  { id: 'diputado', name: 'Diputado', turns: 6, ap: 4, salary: 30000, scale: 60000, retire: 250000, next: 'Primarias del partido', nextName: 'Líder del partido', thr: 57 },
  { id: 'lider', name: 'Líder del partido', turns: 6, ap: 4, salary: 45000, scale: 150000, retire: 450000, next: 'Elecciones generales', nextName: 'Presidente', thr: 60 },
  { id: 'presidente', name: 'Presidente', turns: 6, ap: 4, salary: 70000, scale: 400000, retire: 600000, next: null, nextName: null, thr: 0 },
];

export const TUNING = {
  popDrift: [-2, -3, -4, -4, -4], // desgaste de popularidad por turno y cargo
  dirtDrift: -2,         // prescripción de trapos por turno
  scandalFloor: 20,      // por debajo no hay escándalos
  scandalMax: 0.8,       // probabilidad por turno con olor a 100
  contactMoney: 0.6,
  contactPop: 0.5,       // y el amor que dan, también
  lawMoney: 0.5,         // las leyes a medida pagan la mitad que una carta     // los sobres de la agenda pesan menos que las cartas (hay 4 puntos por turno)
  scandalExp: 1.5,
  electionSlope: 6,
  kickback: 0.25,         // comisión de cada enchufado por turno (unidades)
  enchDirt: 1,           // trapos por enchufado y turno
  trustBonus: 0.02,      // premio de retiro por punto de confianza en la agenda (tope x1,6)
  jailKeep: 0.3,         // fracción que conservas al ir a la cárcel
  jailKeepOffshore: 0.6,
  visitors: 3,           // visitas en la sala de espera por turno
  ignorePenalty: 1,      // amor que pierdes por cada visita sin atender
  lawsOffered: 3,        // medidas sobre la mesa por turno
  lawAlign: 2,           // amor extra/perdido por punto de eje alineado con el sentir general
  climateAlign: 2,       // efecto por turno de tu perfil frente al sentir general
  climateEvery: 4,       // turnos que dura cada sentir general
  flipPenalty: 3,        // castigo por cambiar de chaqueta
  costFactor: 0.4,       // los gastos (m negativo) de cartas pesan menos que las ganancias
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Perfil político: 3 ejes de −10 a +10
export const AXES = [
  { id: 'eco', neg: 'Más Estado', pos: 'Más mercado' },
  { id: 'ter', neg: 'Unidad', pos: 'Autogobierno' },
  { id: 'soc', neg: 'Tradición', pos: 'Progreso' },
];
// Sentir general: qué dirección de cada eje premia el populacho ahora mismo
export const CLIMATES = [
  { id: 'crisis', name: 'Crisis económica', desc: 'El populacho pide ayudas y que alguien pague la ronda', want: { eco: -1 } },
  { id: 'bonanza', name: 'Bonanza', desc: 'Corre el dinero: el populacho quiere menos impuestos y más terrazas', want: { eco: 1, soc: 0.5 } },
  { id: 'inseguridad', name: 'Psicosis de inseguridad', desc: 'Tres robos de gallinas y el populacho pide mano dura', want: { soc: -1, ter: -0.5 } },
  { id: 'fervor', name: 'Fervor regional', desc: 'Banderitas en los balcones: el populacho quiere autogobierno', want: { ter: 1 } },
  { id: 'unidad', name: 'Conflicto territorial', desc: 'Tensión con las regiones: el populacho pide unidad', want: { ter: -1 } },
  { id: 'progre', name: 'Ola progresista', desc: 'Manifestaciones y camisetas con mensaje: toca progreso', want: { soc: 1 } },
  { id: 'fiscal', name: 'Hartazgo fiscal', desc: 'El populacho está harto de pagar: quiere mercado y menos Estado', want: { eco: 1 } },
  { id: 'sequia', name: 'Sequía y calor', desc: 'Ni una gota: el populacho quiere que el Estado haga algo ya', want: { eco: -0.5, ter: -0.5 } },
];
export const climateOf = (st) => CLIMATES.find((c) => c.id === st.climate) || CLIMATES[0];
function newClimate(st) {
  const opts = CLIMATES.filter((c) => c.id !== st.climate);
  st.climate = opts[Math.floor(rand(st) * opts.length)].id;
  st.climateLeft = TUNING.climateEvery;
}
// Encaje de tu perfil con el sentir general (−1,5…+1,5 aprox.)
export function alignment(st) {
  const w = climateOf(st).want;
  return Object.keys(w).reduce((a, k) => a + w[k] * clamp((st.ideo[k] || 0) / 4, -1, 1), 0);
}

export function rand(st) {
  st.rng = (st.rng + 0x6D2B79F5) | 0;
  let t = st.rng;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export const stageOf = (st) => STAGES[st.stage];

export function fmtMoney(v) {
  const neg = v < 0; v = Math.abs(Math.round(v));
  let s;
  if (v >= 1e6) s = String(+(v / 1e6).toFixed(v >= 1e7 ? 1 : 2)).replace('.', ',') + ' M€';
  else s = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €';
  return (neg ? '−' : '') + s;
}

// ---------------------------------------------------------------------------
export function newGame(content, { name = 'Anónimo', strong = true, tutorial = true, seed = Date.now() } = {}) {
  const st = {
    v: 2, name, seed: seed | 0, rng: seed | 0, strong,
    stage: 0, turnInStage: 0, totalTurns: 0,
    money: 3000, pop: 50, dirt: 0, ench: 0, offshore: false,
    ap: 0, phase: 'cards', queue: [], pending: [], seen: {}, flags: {},
    contacts: {}, called: {}, postScandal: false, tutorial: tutorial ? 1 : 0,
    visitors: [], attending: null, laws: [], approved: {}, ideo: { eco: 0, ter: 0, soc: 0 }, climate: null, climateLeft: 0, lastIgnored: 0,
    stats: { cards: 0, scandals: 0, trials: 0, acquitted: 0, news: 0, dirtyCalls: 0, actions: 0, maxDirt: 0, maxMoney: 3000, campaignsDirty: 0, offers: 0, laws: 0, ignored: 0, flips: 0 },
    end: null, startedAt: Date.now(),
  };
  unlockContacts(st, content);
  newClimate(st);
  startTurn(st, content);
  return st;
}

function unlockContacts(st, content) {
  for (const c of content.contacts) if (c.stage <= st.stage && st.contacts[c.id] === undefined) st.contacts[c.id] = 1;
}

function eligible(st, content, c) {
  if (c.followup || c.daily || c.tutorial || c.scandal) return false;
  if ((c.tags || []).includes('campana')) return false;
  if (c.strong && !st.strong) return false;
  if (c.stage !== 'any' && !c.stage.includes(st.stage)) return false;
  if (c.req && !st.flags[c.req]) return false;
  if (c.reqNot && st.flags[c.reqNot]) return false;
  return true;
}

function drawCard(st, content, exclude) {
  const pool = content.cards.filter((c) => eligible(st, content, c) && !exclude.has(c.id));
  if (!pool.length) return null;
  const minSeen = Math.min(...pool.map((c) => st.seen[c.id] || 0));
  const fresh = pool.filter((c) => (st.seen[c.id] || 0) === minSeen);
  const w = fresh.map((c) => (c.stage === 'any' ? 0.6 : 1));
  let r = rand(st) * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < fresh.length; i++) { r -= w[i]; if (r <= 0) return fresh[i]; }
  return fresh[fresh.length - 1];
}

export function startTurn(st, content) {
  const S = stageOf(st);
  // Sueldo y comisiones de los enchufados
  st.money += S.salary + st.ench * TUNING.kickback * S.scale;
  st.dirt = clamp(st.dirt + st.ench * TUNING.enchDirt, 0, 100);
  st.called = {};
  st.bizDone = {};
  st.queue = [];
  const used = new Set();
  if (st.tutorial === 1) {
    for (const c of content.tutorial) { st.queue.push(c.id); used.add(c.id); }
  } else {
    const due = st.pending.filter((p) => p.at <= st.totalTurns);
    st.pending = st.pending.filter((p) => p.at > st.totalTurns);
    for (const p of due.slice(0, 2)) { st.queue.push(p.id); used.add(p.id); }
    if (st.turnInStage === S.turns - 1 && st.stage < STAGES.length - 1) {
      const camp = content.cards.find((c) => (c.tags || []).includes('campana') && c.stage !== 'any' && c.stage.includes(st.stage));
      if (camp) { st.queue.push(camp.id); used.add(camp.id); }
    }
  }
  // Sala de espera: visitas opcionales (cuesta 1 punto atenderlas)
  st.visitors = [];
  st.attending = null;
  for (let i = 0; i < TUNING.visitors; i++) {
    const c = drawCard(st, content, used);
    if (c) { st.visitors.push(c.id); used.add(c.id); }
  }
  drawLaws(st, content);
  st.ap = S.ap;
  st.phase = st.queue.length ? 'cards' : 'actions';
}

function drawLaws(st, content) {
  const pool = (content.laws || []).filter((l) => l.stage.includes(st.stage) && !st.approved[l.id]);
  st.laws = [];
  while (st.laws.length < TUNING.lawsOffered && pool.length) st.laws.push(pool.splice(Math.floor(rand(st) * pool.length), 1)[0].id);
}

// Carta obligatoria extra (la carta del día). Solo al principio del turno.
export function addCardFront(st, id) {
  if (st.queue.includes(id) || st.attending) return;
  st.queue.unshift(id);
  st.phase = 'cards';
}

// Sala de espera
export function attend(st, id) {
  if (st.phase !== 'actions' || st.ap <= 0 || !st.visitors.includes(id)) return false;
  st.attending = id;
  return true;
}
export function leaveCard(st) { st.attending = null; }

export function cardById(content, id) { return content.byId[id]; }

export function currentCard(st, content) {
  if (st.phase === 'actions' && st.attending) return content.byId[st.attending] || null;
  if (st.phase !== 'cards' || !st.queue.length) return null;
  return content.byId[st.queue[0]] || null;
}

function applyFx(st, fx = {}, scale) {
  const S = stageOf(st);
  const sc = scale ?? S.scale;
  if (fx.m) st.money += fx.m * sc * (fx.m < 0 && !fx.full ? TUNING.costFactor : 1);
  if (fx.money) st.money += fx.money; // valores absolutos (escándalos)
  if (fx.p) st.pop = clamp(st.pop + fx.p, 0, 100);
  if (fx.d) st.dirt = clamp(st.dirt + fx.d, 0, 100);
  if (fx.e) st.ench = Math.max(0, st.ench + fx.e);
  st.stats.maxDirt = Math.max(st.stats.maxDirt, st.dirt);
  st.stats.maxMoney = Math.max(st.stats.maxMoney, st.money);
}

// Resultado: { news, end, extra } para que la interfaz muestre portadas o finales.
export function choose(st, content, side) {
  const card = currentCard(st, content);
  if (!card) return null;
  let opt = card[side];
  if (typeof opt.resolve === 'function') opt = opt.resolve(st, rand(st)) || opt;
  const visiting = st.phase === 'actions';
  if (visiting) { st.ap--; st.stats.actions++; st.visitors = st.visitors.filter((v) => v !== card.id); st.attending = null; }
  else st.queue.shift();
  st.seen[card.id] = (st.seen[card.id] || 0) + 1;
  st.stats.cards++;
  applyFx(st, opt.fx);
  if (opt.set) st.flags[opt.set] = true;
  if (opt.later) st.pending.push({ id: opt.later.id, at: st.totalTurns + opt.later.in });
  if ((card.tags || []).includes('campana') && (opt.fx?.d || 0) >= 8) st.stats.campaignsDirty++;
  if (card.tutorial && !st.queue.some((id) => content.byId[id]?.tutorial)) st.tutorial = 2;
  const res = { card, opt, news: opt.news || null, end: null };
  if (opt.news) st.stats.news++;
  if (opt.jail) return { ...res, end: finish(st, 'carcel') };
  if (st.pop <= 0) return { ...res, end: finish(st, 'expulsado') };
  if (!visiting && !st.queue.length) {
    if (st.postScandal) { st.postScandal = false; res.end = advanceTurn(st, content); }
    else st.phase = 'actions';
  }
  return res;
}

// ---------------------------------------------------------------------------
// Acciones por iniciativa propia (agenda y negocios)
export const BUSINESS = [
  { id: 'mitin', label: 'Mitin con bocadillo', desc: 'Amor del populacho a cambio de dinero', fx: { m: -0.8, p: 5 } },
  { id: 'enchufe', label: 'Colocar a un enchufado', desc: 'Comisión cada turno. Pero sabe cosas.', fx: { e: 1, d: 5 } },
  { id: 'testaferro', label: 'Contratar un testaferro', desc: 'Quita olor a caca. Sale caro.', fx: { m: -2.5, d: -12, full: true } },
  { id: 'paraiso', label: 'Abrir cuenta en Andorra', desc: 'Protege tu dinero si vas a la cárcel', fx: { m: -1, d: 6, full: true }, once: true },
  { id: 'filtrar', label: 'Filtrar algo de un rival', desc: 'Puede salir bien... o no', fx: {} },
];

export function businessState(st, b) {
  if (st.ap <= 0) return 'Sin puntos de acción';
  if (b.id === 'paraiso' && st.offshore) return 'Ya tienes cuenta';
  if (st.bizDone?.[b.id]) return 'Ya lo hiciste este turno';
  if (b.id === 'enchufe' && st.ench >= Math.min(st.stage + 2, 4)) return 'No quedan puestos';
  if (b.fx.m < 0 && st.money < -b.fx.m * stageOf(st).scale * (b.fx.full ? 1 : TUNING.costFactor)) return 'No te llega';
  return null;
}

export function doBusiness(st, content, id) {
  const b = BUSINESS.find((x) => x.id === id);
  if (!b || businessState(st, b)) return null;
  st.ap--; st.stats.actions++;
  (st.bizDone ||= {})[id] = true;
  let text = '';
  if (id === 'filtrar') {
    if (rand(st) < 0.65) { applyFx(st, { p: 6, d: 2 }); text = 'La prensa compra la filtración. Tu rival, hundido. Tú, con cara de no saber nada.'; }
    else { applyFx(st, { p: -5, d: 5 }); text = 'El periodista cita a «fuentes de tu entorno». Te ha salido el tiro por la culata.'; }
  } else {
    applyFx(st, b.fx);
    if (id === 'paraiso') st.offshore = true;
    text = { mitin: 'Bocadillos de chorizo para 300. Aplausos garantizados.', enchufe: 'Tu primo ya es «asesor de asuntos varios». Te lo agradecerá cada mes.', testaferro: 'Un señor de Lugo firma todo a su nombre. Tus papeles, más limpios.', paraiso: 'Cuenta abierta en Andorra. Si las cosas se tuercen, algo se salva.' }[id];
  }
  if (st.pop <= 0) return { text, end: finish(st, 'expulsado') };
  return { text };
}

export function lawEffect(st, law) {
  const w = climateOf(st).want;
  let bonus = 0, flip = false;
  for (const [k, v] of Object.entries(law.ax || {})) {
    bonus += (w[k] || 0) * v * TUNING.lawAlign;
    if (v * (st.ideo[k] || 0) < 0 && Math.abs(st.ideo[k]) >= 3) flip = true;
  }
  bonus = Math.round(bonus);
  const fx = law.fx || {};
  return { m: (fx.m || 0) * ((fx.m || 0) > 0 ? TUNING.lawMoney : 1), d: fx.d || 0, p: (fx.p || 0) + bonus - (flip ? TUNING.flipPenalty : 0), bonus, flip };
}
export function lawState(st, law) {
  if (st.ap <= 0) return 'Sin puntos de acción';
  const m = law?.fx?.m || 0;
  if (m < 0 && st.money < -m * stageOf(st).scale * TUNING.costFactor) return 'No te llega';
  return null;
}
export function approveLaw(st, content, id) {
  const law = (content.laws || []).find((l) => l.id === id);
  if (!law || st.phase !== 'actions' || lawState(st, law) || !st.laws.includes(id)) return null;
  const ef = lawEffect(st, law);
  st.ap--; st.stats.actions++; st.stats.laws++;
  if (ef.flip) st.stats.flips++;
  for (const [k, v] of Object.entries(law.ax || {})) st.ideo[k] = clamp((st.ideo[k] || 0) + v, -10, 10);
  applyFx(st, { m: ef.m, p: ef.p, d: ef.d });
  st.approved[id] = true;
  st.laws = st.laws.filter((x) => x !== id);
  if (law.news) st.stats.news++;
  const res = { law, ef, news: law.news || null };
  if (st.pop <= 0) res.end = finish(st, 'expulsado');
  return res;
}

export function contactList(st, content) {
  return content.contacts.filter((c) => st.contacts[c.id] !== undefined);
}

export function callState(st, c, kind) {
  if (st.ap <= 0) return 'Sin puntos de acción';
  if (st.called[c.id]) return 'Ya hablasteis este turno';
  if (kind === 'ask' && st.contacts[c.id] <= 0) return 'No te coge el teléfono';
  if (kind === 'offer' && st.contacts[c.id] >= 3) return 'Ya te debe 3 favores: pídele algo';
  const m = c[kind].fx.m || 0;
  if (m < 0 && st.money < -m * STAGES[c.stage].scale * TUNING.costFactor) return 'No te llega';
  return null;
}

export function callContact(st, content, id, kind) {
  const c = content.contacts.find((x) => x.id === id);
  if (!c || callState(st, c, kind)) return null;
  st.ap--; st.stats.actions++; st.called[c.id] = true;
  const a = c[kind];
  const fx = { ...a.fx };
  if (c.graba && (fx.d || 0) > 0) fx.d += 3;
  if ((fx.d || 0) > 0) st.stats.dirtyCalls++;
  if ((fx.m || 0) > 0) fx.m *= TUNING.contactMoney;
  if ((fx.p || 0) > 0) fx.p = Math.round(fx.p * TUNING.contactPop);
  applyFx(st, fx, STAGES[c.stage].scale);
  st.contacts[c.id] = clamp(st.contacts[c.id] + (kind === 'offer' ? 1 : -1), 0, 3);
  if (kind === 'offer') st.stats.offers++;
  if (st.pop <= 0) return { text: a.text, end: finish(st, 'expulsado') };
  return { text: a.text, graba: c.graba && (a.fx.d || 0) > 0 };
}

// ---------------------------------------------------------------------------
export function scandalChance(dirt) {
  if (dirt <= TUNING.scandalFloor) return 0;
  return TUNING.scandalMax * Math.pow((dirt - TUNING.scandalFloor) / (100 - TUNING.scandalFloor), TUNING.scandalExp);
}

export function endTurn(st, content) {
  if (st.phase !== 'actions') return null;
  st.attending = null;
  st.lastIgnored = st.visitors.length;
  st.stats.ignored += st.visitors.length;
  st.lastAlign = Math.round(alignment(st) * TUNING.climateAlign);
  st.pop = clamp(st.pop + TUNING.popDrift[st.stage] - st.visitors.length * TUNING.ignorePenalty + st.lastAlign, 0, 100);
  st.visitors = [];
  st.climateChanged = false;
  if (--st.climateLeft <= 0) { newClimate(st); st.climateChanged = true; }
  st.dirt = clamp(st.dirt + TUNING.dirtDrift, 0, 100);
  if (st.pop <= 0) return { end: finish(st, 'expulsado') };
  if (rand(st) < scandalChance(st.dirt)) {
    const sev = st.dirt + (rand(st) * 30 - 15);
    const kind = sev < 50 ? 'multa' : sev < 80 ? 'juicio' : 'carcel';
    st.stats.scandals++;
    if (kind === 'juicio') st.stats.trials++;
    st.queue = ['escandalo_' + kind];
    st.phase = 'cards';
    st.postScandal = true;
    return { scandal: kind };
  }
  return { end: advanceTurn(st, content) };
}

function advanceTurn(st, content) {
  st.turnInStage++;
  st.totalTurns++;
  const S = stageOf(st);
  if (st.turnInStage >= S.turns) {
    if (st.stage === STAGES.length - 1) return finish(st, 'fin');
    st.phase = 'election';
    return null;
  }
  startTurn(st, content);
  return null;
}

export function electionChance(st) {
  const S = stageOf(st);
  return clamp(1 / (1 + Math.exp(-(st.pop - S.thr) / TUNING.electionSlope)), 0.04, 0.96);
}

export function retireBonus(st, full = true) {
  const trust = Object.values(st.contacts).reduce((a, b) => a + b, 0);
  return Math.round(stageOf(st).retire * Math.min(1.6, 1 + TUNING.trustBonus * trust) * (full ? 1 : 0.5));
}

export function decideElection(st, content, run) {
  if (st.phase !== 'election') return null;
  if (!run) return { end: finish(st, 'retiro') };
  const p = electionChance(st);
  const win = rand(st) < p;
  const from = stageOf(st);
  if (!win) return { win, p, end: finish(st, 'derrota') };
  st.stage++;
  st.turnInStage = 0;
  st.pop = clamp(st.pop - 8, 0, 100); // luna de miel corta: el nuevo cargo desgasta
  unlockContacts(st, content);
  newClimate(st);
  startTurn(st, content);
  return { win, p, from, to: stageOf(st) };
}

// ---------------------------------------------------------------------------
export function finish(st, type) {
  const S = stageOf(st);
  let bonus = 0, confiscated = 0;
  if (type === 'retiro') bonus = retireBonus(st, true);
  if (type === 'derrota') bonus = retireBonus(st, false);
  if (type === 'fin') bonus = retireBonus(st, true);
  if (type === 'carcel') {
    const keep = st.offshore ? TUNING.jailKeepOffshore : TUNING.jailKeep;
    confiscated = Math.max(0, Math.round(st.money * (1 - keep)));
    st.money -= confiscated;
  }
  st.money += bonus;
  st.phase = 'over';
  st.end = { type, stage: st.stage, cargo: S.name, money: Math.round(st.money), bonus, confiscated, dirt: st.dirt, pop: st.pop, turns: st.totalTurns, offshore: st.offshore };
  st.end.text = endText(st);
  st.end.achievements = achievementsFor(st);
  return st.end;
}

export function endText(st) {
  const e = st.end, m = fmtMoney(e.money), n = st.name;
  const imputado = e.dirt >= 60 && e.type !== 'carcel';
  switch (e.type) {
    case 'carcel': return st.offshore ? `${n} acabó en la cárcel con ${m} en Andorra` : `${n} acabó en la cárcel con ${m} escondidos en el colchón`;
    case 'expulsado': return `${n} fue expulsado del partido siendo ${e.cargo.toLowerCase()}, con ${m} en el bolsillo`;
    case 'derrota': return `${n} perdió las elecciones y se retiró a un consejo de administración con ${m}${imputado ? ' (e imputado)' : ''}`;
    case 'retiro': return `${n} se plantó como ${e.cargo.toLowerCase()} y se fue a un consejo de administración con ${m}${imputado ? ', aunque imputado' : ''}`;
    case 'fin': return imputado ? `${n} acabó la legislatura como presidente, imputado, con ${m}` : `${n} acabó la legislatura como presidente y se jubiló con ${m}`;
    default: return `${n} terminó con ${m}`;
  }
}

// Logros: se evalúan al acabar la partida.
export const ACHIEVEMENTS = [
  { id: 'primer_sobre', name: 'Primer sobre', desc: 'Termina una partida con más de 100.000 €' },
  { id: 'millonario', name: 'Millonario', desc: 'Termina con más de 1 M€' },
  { id: 'multimillonario', name: 'Patrimonio de Estado', desc: 'Termina con más de 5 M€' },
  { id: 'presidente', name: 'Moncloa-ish', desc: 'Llega a presidente' },
  { id: 'manos_limpias', name: 'Manos limpias', desc: 'Llega a presidente sin pasar de 20 de olor a caca' },
  { id: 'carcel', name: 'Carne de presidio', desc: 'Acaba en la cárcel' },
  { id: 'andorra', name: 'Con red', desc: 'Acaba en la cárcel con cuenta en Andorra' },
  { id: 'expulsado', name: 'Persona non grata', desc: 'Que el populacho te deje de querer del todo' },
  { id: 'plantado', name: 'Me planto', desc: 'Retírate a tiempo antes de unas elecciones' },
  { id: 'superviviente', name: 'Absuelto', desc: 'Sobrevive a un juicio' },
  { id: 'enchufador', name: 'Agencia de colocación', desc: 'Ten 4 enchufados a la vez' },
  { id: 'portadista', name: 'Hemeroteca', desc: 'Sal en 12 portadas en una partida' },
  { id: 'al_borde', name: 'Al borde', desc: 'Llega a 90 de olor a caca sin ir a la cárcel' },
];

export function achievementsFor(st) {
  const e = st.end, s = st.stats, out = [];
  if (e.money > 100000) out.push('primer_sobre');
  if (e.money > 1e6) out.push('millonario');
  if (e.money > 5e6) out.push('multimillonario');
  if (st.stage === 4) out.push('presidente');
  if (st.stage === 4 && s.maxDirt <= 20) out.push('manos_limpias');
  if (e.type === 'carcel') out.push('carcel');
  if (e.type === 'carcel' && st.offshore) out.push('andorra');
  if (e.type === 'expulsado') out.push('expulsado');
  if (e.type === 'retiro') out.push('plantado');
  if (s.acquitted > 0) out.push('superviviente');
  if (st.ench >= 4) out.push('enchufador');
  if (s.news >= 12) out.push('portadista');
  if (s.maxDirt >= 90 && e.type !== 'carcel') out.push('al_borde');
  return out;
}

export function skipTutorial(st, content) {
  if (st.tutorial !== 1) return;
  st.tutorial = 0;
  st.money -= stageOf(st).salary; // startTurn vuelve a pagar el sueldo del primer turno
  startTurn(st, content);
}
