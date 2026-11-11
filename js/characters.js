// Personajes SVG estilo caricatura rechoncha (cabeza grande, contorno grueso, colores planos, mofletes).
// renderCharacter(key) devuelve un <svg> con las 5 expresiones dentro; la activa se elige con el atributo data-mood.
// Expresiones: neutral, happy (contento), angry (enfadado), sly (sospechoso), caught (pillado).

const INK = '#1d1b17';
const SKIN = ['#f3c9a1', '#e0ac7e', '#c68a5a', '#8d5a3b'];
const SW = 4.5; // grosor del contorno

// skin: índice de SKIN · hair: estilo · hc: color de pelo · suit: ropa · shirt: camisa (null = sin cuello) · tie: corbata · acc: accesorios
export const ROSTER = {
  yo:          { skin: 0, hair: 'corto', hc: '#3a2a1a', suit: '#1d1b17', shirt: '#fff', tie: '#c8372d', acc: [] },
  asesor:      { skin: 0, hair: 'engominado', hc: '#2a1e14', suit: '#34495e', shirt: '#fff', tie: '#c8372d', acc: ['gafas_sol_frente'] },
  vecina:      { skin: 1, hair: 'rizado', hc: '#9a9a9a', suit: '#8e5a9b', shirt: null, tie: null, acc: ['collar_perlas', 'gafas'] },
  vecino:      { skin: 0, hair: 'coronilla', hc: '#555', suit: '#6b8e23', shirt: null, tie: null, acc: ['boina'] },
  constructor: { skin: 2, hair: 'corto', hc: '#222', suit: '#e0a526', shirt: null, tie: null, acc: ['casco', 'bigote', 'cadena'] },
  cura:        { skin: 0, hair: 'coronilla', hc: '#444', suit: '#222', shirt: null, tie: null, acc: ['alzacuellos', 'gafas'] },
  pena:        { skin: 1, hair: 'corto', hc: '#3a2a1a', suit: '#f5f5f0', shirt: null, tie: null, acc: ['panuelo', 'bigote'] },
  periodista:  { skin: 1, hair: 'melena', hc: '#6b3a1e', suit: '#b8860b', shirt: '#fff', tie: null, acc: ['grabadora', 'gafas'] },
  policia:     { skin: 2, hair: 'corto', hc: '#222', suit: '#1f3a6b', shirt: '#9db4d6', tie: '#1d1b17', acc: ['gorra', 'bigote'] },
  empresario:  { skin: 0, hair: 'engominado', hc: '#888', suit: '#222', shirt: '#fff', tie: '#d4a017', acc: ['gafas_sol', 'cadena'] },
  diputacion:  { skin: 1, hair: 'calvo', hc: '#444', suit: '#4a4a4a', shirt: '#fff', tie: '#2b5ea8', acc: ['bigote', 'medalla'] },
  futbol:      { skin: 2, hair: 'corto', hc: '#ccc', suit: '#2b5ea8', shirt: '#fff', tie: null, acc: ['bufanda', 'puro'] },
  obispo:      { skin: 0, hair: 'calvo', hc: '#444', suit: '#7b2d8b', shirt: null, tie: null, acc: ['mitra', 'alzacuellos', 'gafas'] },
  caja:        { skin: 0, hair: 'corto', hc: '#444', suit: '#2f4f4f', shirt: '#fff', tie: '#2e8b3e', acc: ['gafas', 'maletin'] },
  consejera:   { skin: 1, hair: 'mono', hc: '#2a1e14', suit: '#a0522d', shirt: '#fff', tie: null, acc: ['pendientes', 'gafas'] },
  patronal:    { skin: 0, hair: 'calvo', hc: '#444', suit: '#1d1b17', shirt: '#fff', tie: null, acc: ['pajarita', 'puro'] },
  sindicalista:{ skin: 2, hair: 'corto', hc: '#333', suit: '#c8372d', shirt: null, tie: null, acc: ['barba', 'gafas'] },
  locutor:     { skin: 1, hair: 'engominado', hc: '#555', suit: '#555', shirt: '#fff', tie: '#d4a017', acc: ['microfono'] },
  juez:        { skin: 0, hair: 'corto', hc: '#ddd', suit: '#111', shirt: '#fff', tie: null, acc: ['puñetas', 'mazo', 'gafas'] },
  baron:       { skin: 1, hair: 'coronilla', hc: '#ddd', suit: '#3b2f2f', shirt: '#fff', tie: '#c8372d', acc: ['puro', 'bigote', 'medalla'] },
  tesorero:    { skin: 0, hair: 'corto', hc: '#333', suit: '#555', shirt: '#fff', tie: '#7a4a21', acc: ['maletin', 'gafas', 'bigote'] },
  magnate:     { skin: 0, hair: 'corto', hc: '#e0e0e0', suit: '#111', shirt: '#fff', tie: '#d4a017', acc: ['gafas_sol', 'puro'] },
  tertuliana:  { skin: 1, hair: 'melena', hc: '#c9a227', suit: '#c8372d', shirt: null, tie: null, acc: ['pendientes', 'microfono'] },
  director:    { skin: 1, hair: 'calvo', hc: '#444', suit: '#5a5a5a', shirt: '#fff', tie: null, acc: ['gafas', 'pajarita'] },
  banquero:    { skin: 0, hair: 'engominado', hc: '#ccc', suit: '#1b2a41', shirt: '#fff', tie: '#6b0f1a', acc: ['gafas', 'maletin'] },
  constructora:{ skin: 2, hair: 'mono', hc: '#222', suit: '#444', shirt: '#fff', tie: null, acc: ['casco', 'collar_perlas'] },
  supremo:     { skin: 0, hair: 'coronilla', hc: '#eee', suit: '#111', shirt: '#fff', tie: null, acc: ['puñetas', 'mazo', 'medalla', 'gafas'] },
  embajador:   { skin: 3, hair: 'corto', hc: '#111', suit: '#222', shirt: '#fff', tie: null, acc: ['pajarita', 'medalla'] },
  extranjero:  { skin: 0, hair: 'calvo', hc: '#444', suit: '#3d4a2f', shirt: '#fff', tie: '#1d1b17', acc: ['gafas_sol', 'medalla', 'bigote'] },
  comisaria:   { skin: 0, hair: 'melena', hc: '#b0b0b0', suit: '#2b5ea8', shirt: '#fff', tie: null, acc: ['pin_estrellas', 'gafas'] },
  rival:       { skin: 1, hair: 'engominado', hc: '#111', suit: '#2b5ea8', shirt: '#fff', tie: '#e0e0e0', acc: [] },
  jefa:        { skin: 1, hair: 'mono', hc: '#555', suit: '#c8372d', shirt: '#fff', tie: null, acc: ['collar_perlas', 'gafas'] },
  ministro:    { skin: 0, hair: 'coronilla', hc: '#888', suit: '#2f2f2f', shirt: '#fff', tie: '#c8372d', acc: ['gafas'] },
  cunado:      { skin: 0, hair: 'corto', hc: '#6b3a1e', suit: '#3cb371', shirt: null, tie: null, acc: ['gafas_sol_frente', 'bigote', 'cadena'] },
  ecologista:  { skin: 1, hair: 'rizado', hc: '#3a2a1a', suit: '#6b8e23', shirt: null, tie: null, acc: ['pendientes'] },
  jubilado:    { skin: 0, hair: 'calvo', hc: '#444', suit: '#8b7d6b', shirt: '#fff', tie: null, acc: ['boina', 'gafas'] },
  joven:       { skin: 2, hair: 'rizado', hc: '#111', suit: '#e86a1a', shirt: null, tie: null, acc: [] },
  agricultor:  { skin: 2, hair: 'corto', hc: '#333', suit: '#556b2f', shirt: null, tie: null, acc: ['boina', 'bigote'] },
  presentadora:{ skin: 3, hair: 'melena', hc: '#111', suit: '#d4a017', shirt: null, tie: null, acc: ['microfono', 'pendientes'] },
  ciudadano:   { skin: 1, hair: 'corto', hc: '#3a2a1a', suit: '#708090', shirt: null, tie: null, acc: [] },
  medico:      { skin: 0, hair: 'corto', hc: '#555', suit: '#f5f5f5', shirt: '#9db4d6', tie: '#2b5ea8', acc: ['gafas'] },
  influencer:  { skin: 3, hair: 'mono', hc: '#e88aa8', suit: '#f2a7c3', shirt: null, tie: null, acc: ['gafas_sol_frente', 'pendientes'] },
  chantajista: { skin: 0, hair: 'calvo', hc: '#444', suit: '#222', shirt: null, tie: null, acc: ['gafas_sol', 'grabadora'] },
  detective:   { skin: 1, hair: 'corto', hc: '#222', suit: '#8b7355', shirt: '#fff', tie: '#1d1b17', acc: ['sombrero', 'bigote'] },
  monitora:    { skin: 2, hair: 'mono', hc: '#3a2a1a', suit: '#2e8b3e', shirt: null, tie: null, acc: ['silbato'] },
};

let uid = 0;
const s = (o) => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(' ');
const line = `stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round"`;

function shade(hex, f) { // oscurece (f<0) o aclara (f>0) un color hex
  const n = parseInt(hex.slice(1).padEnd(6, hex.slice(1)), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = f < 0 ? 0 : 255, p = Math.abs(f);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// --- Pelo -------------------------------------------------------------------
function hairBack(st, hc) {
  if (st === 'melena') return `<path d="M40,80 C36,150 50,165 70,160 L130,160 C150,165 164,150 160,80 Z" fill="${hc}" ${line}/>`;
  if (st === 'mono') return `<circle cx="100" cy="24" r="17" fill="${hc}" ${line}/>`;
  return '';
}
function hairFront(st, hc) {
  const f = `fill="${hc}" ${line}`;
  switch (st) {
    case 'corto': return `<path d="M42,84 C30,2 170,2 158,84 C150,60 130,46 100,46 C70,46 50,60 42,84 Z" ${f}/>`;
    case 'engominado': return `<path d="M43,80 C34,28 92,6 148,26 C166,36 162,66 157,80 C150,55 122,44 96,48 C72,50 52,60 43,80 Z" ${f}/><path d="M78,30 C100,20 125,22 140,32" fill="none" stroke="${shade(hc, 0.45)}" stroke-width="4" stroke-linecap="round"/>`;
    case 'melena': return `<path d="M41,88 C30,2 170,2 159,88 C150,60 122,48 100,50 C96,64 70,70 41,88 Z" ${f}/>`;
    case 'mono': return `<path d="M42,82 C32,4 168,4 158,82 C148,56 126,46 100,46 C74,46 52,56 42,82 Z" ${f}/>`;
    case 'rizado': {
      let c = '';
      for (let i = 0; i <= 8; i++) { const a = Math.PI * (1.05 + i * 0.9 / 8); c += `<circle cx="${100 + 54 * Math.cos(a)}" cy="${84 + 54 * Math.sin(a)}" r="15" ${f}/>`; }
      return c;
    }
    case 'coronilla': return `<path d="M42,96 C40,74 46,64 54,60 C56,74 52,86 50,100 Z" ${f}/><path d="M158,96 C160,74 154,64 146,60 C144,74 148,86 150,100 Z" ${f}/><ellipse cx="82" cy="44" rx="12" ry="6" fill="#fff" opacity=".45"/>`;
    case 'calvo': return `<ellipse cx="80" cy="42" rx="14" ry="7" fill="#fff" opacity=".45"/>`;
    default: return '';
  }
}

// --- Caras por expresión -----------------------------------------------------
function face(mood, skin) {
  const pupil = (dx = 0, r = 5.5) => `<circle cx="${80 + dx}" cy="84" r="${r}" fill="${INK}"/><circle cx="${120 + dx}" cy="84" r="${r}" fill="${INK}"/>`;
  const brow = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`;
  const mouthLine = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`;
  switch (mood) {
    case 'happy': return pupil(0) + brow('M68,64 Q80,56 92,63') + brow('M108,63 Q120,56 132,64') +
      `<path d="M82,108 Q100,134 118,108 Z" fill="#7a1f1f" ${line}/><path d="M90,122 Q100,128 110,122 Q104,116 96,117 Z" fill="#e66"/>`;
    case 'angry': return pupil(0, 4.5) + brow('M68,64 L92,74') + brow('M132,64 L108,74') +
      mouthLine('M86,121 Q100,108 114,121') + `<ellipse cx="70" cy="104" rx="11" ry="6" fill="#d9483b" opacity=".55"/><ellipse cx="130" cy="104" rx="11" ry="6" fill="#d9483b" opacity=".55"/>`;
    case 'sly': return pupil(4) +
      `<path d="M68,82 L92,82 L92,70 L68,70 Z" fill="${skin}"/><path d="M108,82 L132,82 L132,70 L108,70 Z" fill="${skin}"/>` +
      `<path d="M68,82 L92,82 M108,82 L132,82" stroke="${INK}" stroke-width="3.5"/>` +
      brow('M68,70 L92,70') + brow('M108,62 Q120,54 132,60') + mouthLine('M86,115 Q104,120 116,107');
    case 'caught': return pupil(0, 3) + brow('M68,58 Q80,48 92,58') + brow('M108,58 Q120,48 132,58') +
      `<ellipse cx="100" cy="117" rx="7" ry="9" fill="#7a1f1f" ${line}/>` +
      `<path d="M150,50 Q158,64 152,70 Q144,72 144,64 Q144,58 150,50 Z" fill="#9ad3f0" stroke="${INK}" stroke-width="2.5"/>`;
    default: return pupil(0) + brow('M68,66 L92,66') + brow('M108,66 L132,66') + mouthLine('M88,114 Q100,118 112,114');
  }
}

// --- Accesorios ----------------------------------------------------------------
const ACC = {
  // capa: torso (encima del traje)
  medalla: { layer: 'torso', svg: () => `<path d="M92,150 L100,170 L108,150" fill="#c8372d" ${line}/><circle cx="100" cy="176" r="9" fill="#e8c547" ${line}/>` },
  collar_perlas: { layer: 'torso', svg: () => { let c = ''; for (let i = 0; i < 7; i++) c += `<circle cx="${76 + i * 8}" cy="${142 + Math.sin(i / 6 * Math.PI) * 9}" r="4.5" fill="#fff" stroke="${INK}" stroke-width="2"/>`; return c; } },
  cadena: { layer: 'torso', svg: () => `<path d="M80,140 Q100,168 120,140" fill="none" stroke="#e8c547" stroke-width="5"/><path d="M80,140 Q100,168 120,140" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="2 4"/>` },
  pajarita: { layer: 'torso', svg: () => `<path d="M88,134 L100,140 L112,134 L112,148 L100,142 L88,148 Z" fill="#c8372d" ${line}/>` },
  alzacuellos: { layer: 'torso', svg: () => `<rect x="94" y="130" width="12" height="9" fill="#fff" stroke="${INK}" stroke-width="2.5"/>` },
  panuelo: { layer: 'torso', svg: () => `<path d="M76,132 L124,132 L100,158 Z" fill="#c8372d" ${line}/>` },
  bufanda: { layer: 'torso', svg: () => `<path d="M72,134 Q100,146 128,134 L128,146 Q100,158 72,146 Z" fill="#fff" ${line}/><path d="M110,144 L114,176 L126,174 L120,142" fill="#2b5ea8" ${line}/>` },
  pin_estrellas: { layer: 'torso', svg: () => `<circle cx="78" cy="152" r="7" fill="#2b5ea8" stroke="${INK}" stroke-width="2.5"/><circle cx="78" cy="152" r="2" fill="#e8c547"/>` },
  puñetas: { layer: 'torso', svg: () => `<rect x="34" y="186" width="22" height="7" fill="#fff" stroke="${INK}" stroke-width="2.5"/><rect x="144" y="186" width="22" height="7" fill="#fff" stroke="${INK}" stroke-width="2.5"/>` },
  silbato: { layer: 'torso', svg: () => `<path d="M90,132 L100,160" stroke="#e8c547" stroke-width="3"/><rect x="94" y="158" width="14" height="8" rx="3" fill="#ccc" stroke="${INK}" stroke-width="2.5"/>` },
  // capa: mano (delante del cuerpo, mano derecha del dibujo)
  maletin: { layer: 'hand', svg: () => `<path d="M150,186 Q150,178 160,178 L170,178 Q180,178 180,186" fill="none" ${line}/><rect x="140" y="186" width="50" height="36" rx="5" fill="#7a4a21" ${line}/><path d="M140,198 L190,198" stroke="${INK}" stroke-width="3"/>` },
  grabadora: { layer: 'hand', svg: () => `<rect x="150" y="166" width="20" height="30" rx="4" fill="#333" ${line}/><circle cx="160" cy="176" r="4" fill="#e33"/>` },
  microfono: { layer: 'hand', svg: () => `<path d="M160,196 L166,166" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="167" cy="160" r="10" fill="#999" ${line}/>` },
  mazo: { layer: 'hand', svg: () => `<path d="M160,196 L176,160" stroke="#7a4a21" stroke-width="7" stroke-linecap="round"/><rect x="164" y="146" width="28" height="16" rx="4" fill="#7a4a21" ${line} transform="rotate(24 178 154)"/>` },
  puro: { layer: 'head', svg: () => `<path d="M112,114 L142,106" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M112,114 L142,106" stroke="#8b5a2b" stroke-width="5" stroke-linecap="round"/><circle cx="144" cy="105" r="3.5" fill="#f25c2a"/><path d="M146,98 Q140,90 148,84 Q156,78 150,70" fill="none" stroke="#aaa" stroke-width="2.5"/>` },
  // capa: cabeza
  gafas: { layer: 'head', svg: () => `<circle cx="80" cy="84" r="15" fill="#fff" fill-opacity=".15" stroke="${INK}" stroke-width="3.5"/><circle cx="120" cy="84" r="15" fill="#fff" fill-opacity=".15" stroke="${INK}" stroke-width="3.5"/><path d="M95,84 L105,84 M65,82 L44,76 M135,82 L156,76" stroke="${INK}" stroke-width="3.5"/>` },
  gafas_sol: { layer: 'head', svg: () => `<rect x="64" y="74" width="32" height="20" rx="7" fill="#222" stroke="${INK}" stroke-width="3"/><rect x="104" y="74" width="32" height="20" rx="7" fill="#222" stroke="${INK}" stroke-width="3"/><path d="M96,80 L104,80 M64,80 L44,76 M136,80 L156,76" stroke="${INK}" stroke-width="3.5"/><path d="M70,78 L78,78" stroke="#fff" stroke-width="2.5" opacity=".6"/>` },
  gafas_sol_frente: { layer: 'head', svg: () => `<rect x="66" y="40" width="30" height="16" rx="6" fill="#222" stroke="${INK}" stroke-width="3"/><rect x="104" y="40" width="30" height="16" rx="6" fill="#222" stroke="${INK}" stroke-width="3"/><path d="M96,46 L104,46" stroke="${INK}" stroke-width="3.5"/>` },
  bigote: { layer: 'head', svg: (p) => `<path d="M80,106 Q90,96 100,103 Q110,96 120,106 Q110,110 100,106 Q90,110 80,106 Z" fill="${p.hc === '#ddd' || p.hc === '#eee' ? '#bbb' : p.hc}" ${line}/>` },
  barba: { layer: 'head', svg: (p) => `<path d="M48,96 C52,150 148,150 152,96 C142,118 124,104 100,104 C76,104 58,118 48,96 Z" fill="${p.hc}" ${line}/>` },
  pendientes: { layer: 'head', svg: () => `<circle cx="43" cy="104" r="5" fill="#e8c547" stroke="${INK}" stroke-width="2"/><circle cx="157" cy="104" r="5" fill="#e8c547" stroke="${INK}" stroke-width="2"/>` },
  boina: { layer: 'hat', svg: () => `<path d="M40,58 C40,22 160,22 160,58 C130,46 70,46 40,58 Z" fill="#2a2a2a" ${line}/><path d="M100,26 L100,16" stroke="${INK}" stroke-width="5"/>` },
  gorra: { layer: 'hat', svg: () => `<path d="M46,58 C46,20 154,20 154,58 Z" fill="#1f3a6b" ${line}/><path d="M42,58 L158,58 L150,68 L50,68 Z" fill="#111" ${line}/><circle cx="100" cy="42" r="7" fill="#e8c547" stroke="${INK}" stroke-width="2.5"/>` },
  casco: { layer: 'hat', svg: () => `<path d="M42,62 C42,10 158,10 158,62 Z" fill="#f2c230" ${line}/><path d="M34,62 L166,62" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M34,62 L166,62" stroke="#f2c230" stroke-width="4" stroke-linecap="round"/><path d="M100,18 L100,60" stroke="${INK}" stroke-width="3"/>` },
  mitra: { layer: 'hat', svg: () => `<path d="M56,58 L64,8 L100,-10 L136,8 L144,58 Z" fill="#f5f0e0" ${line}/><path d="M100,-6 L100,56 M80,26 L120,26" stroke="#d4a017" stroke-width="6"/>` },
  sombrero: { layer: 'hat', svg: () => `<path d="M58,50 C58,10 142,10 142,50 Z" fill="#6b5a3e" ${line}/><path d="M30,54 Q100,40 170,54 Q100,68 30,54 Z" fill="#6b5a3e" ${line}/><path d="M58,46 L142,46" stroke="${INK}" stroke-width="6"/>` },
};

export function renderCharacter(key, { mood = 'neutral', cls = '' } = {}) {
  const p = ROSTER[key] || ROSTER.ciudadano;
  const id = 'c' + (++uid);
  const skin = SKIN[p.skin] || SKIN[0];
  const suit = p.suit, suitD = shade(suit, -0.28);
  const accs = (p.acc || []).map((a) => [a, ACC[a]]).filter(([, a]) => a);
  const layer = (l) => accs.filter(([, a]) => a.layer === l).map(([, a]) => a.svg(p)).join('');
  const moods = ['neutral', 'happy', 'angry', 'sly', 'caught'];

  const torsoPath = 'M48,206 C40,150 62,124 100,124 C138,124 160,150 152,206 Q150,222 100,222 Q50,222 48,206 Z';
  const shirt = p.shirt ? `<path d="M84,126 L100,158 L116,126 Z" fill="${p.shirt}" ${line}/>` : '';
  const tie = p.tie ? `<path d="M96,134 L104,134 L108,168 L100,178 L92,168 Z" fill="${p.tie}" ${line}/>` : '';

  return `<svg class="chr ${cls}" viewBox="0 -14 200 264" data-mood="${mood}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><clipPath id="${id}h"><circle cx="100" cy="85" r="58"/></clipPath><clipPath id="${id}t"><path d="${torsoPath}"/></clipPath></defs>
<ellipse cx="100" cy="240" rx="62" ry="8" fill="${INK}" opacity=".18"/>
<g class="chr-body">
 <rect x="68" y="196" width="28" height="38" rx="13" fill="${shade(suit, -0.45)}" ${line}/>
 <rect x="104" y="196" width="28" height="38" rx="13" fill="${shade(suit, -0.45)}" ${line}/>
 <ellipse cx="80" cy="236" rx="18" ry="8" fill="${INK}"/><ellipse cx="120" cy="236" rx="18" ry="8" fill="${INK}"/>
 <rect x="30" y="140" width="28" height="56" rx="14" fill="${suit}" ${line} transform="rotate(12 44 150)"/>
 <rect x="142" y="140" width="28" height="56" rx="14" fill="${suit}" ${line} transform="rotate(-12 156 150)"/>
 <path d="${torsoPath}" fill="${suit}" ${line}/>
 <g clip-path="url(#${id}t)"><ellipse cx="160" cy="180" rx="40" ry="70" fill="${suitD}" opacity=".55"/></g>
 <path d="${torsoPath}" fill="none" ${line}/>
 ${shirt}${tie}${layer('torso')}
 <circle cx="40" cy="198" r="12" fill="${skin}" ${line}/>
 <circle cx="160" cy="198" r="12" fill="${skin}" ${line}/>
 ${layer('hand')}
 <g class="chr-head">
  ${hairBack(p.hair, p.hc)}
  <circle cx="43" cy="92" r="11" fill="${skin}" ${line}/><circle cx="157" cy="92" r="11" fill="${skin}" ${line}/>
  <circle cx="100" cy="85" r="58" fill="${skin}" ${line}/>
  <g clip-path="url(#${id}h)"><circle cx="138" cy="110" r="56" fill="${shade(skin, -0.35)}" opacity=".35"/></g>
  <ellipse cx="70" cy="104" rx="11" ry="6.5" fill="#e88a8a" opacity=".6"/><ellipse cx="130" cy="104" rx="11" ry="6.5" fill="#e88a8a" opacity=".6"/>
  <ellipse cx="80" cy="84" rx="11" ry="13" fill="#fff" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="120" cy="84" rx="11" ry="13" fill="#fff" stroke="${INK}" stroke-width="3"/>
  ${moods.map((m) => `<g data-m="${m}">${face(m, skin)}</g>`).join('')}
  <g class="lid"><ellipse cx="80" cy="84" rx="12.5" ry="14.5" fill="${skin}" stroke="${INK}" stroke-width="3"/><ellipse cx="120" cy="84" rx="12.5" ry="14.5" fill="${skin}" stroke="${INK}" stroke-width="3"/></g>
  <path d="M97,92 Q92,102 100,103" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
  ${hairFront(p.hair, p.hc)}
  ${layer('head')}${layer('hat')}
 </g>
</g>
</svg>`;
}

export const CHARACTER_KEYS = Object.keys(ROSTER);
