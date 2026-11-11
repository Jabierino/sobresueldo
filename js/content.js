// Reúne todo el contenido: cartas de los archivos de datos, tutorial y cartas de escándalo del motor.
import cardsA from './data/cards_a.js';
import cardsB from './data/cards_b.js';
import cardsC from './data/cards_c.js';
import contacts from './data/contacts.js';
import laws from './data/laws.js';
import { STAGES } from './engine.js';

export const tutorial = [
  { id: 't_1', tutorial: true, stage: 'any', who: 'asesor', tags: ['tutorial'],
    hint: 'Arrastra la carta a un lado (o usa los botones de abajo)',
    text: '¡Enhorabuena, concejal! Soy Borja, tu asesor. Aquí se viene a servir al pueblo… y a lo que surja. ¿Empezamos?',
    left: { label: 'Al pueblo, claro', fx: {}, face: 'sly' }, right: { label: 'A lo que surja', fx: {}, face: 'happy' } },
  { id: 't_2', tutorial: true, stage: 'any', who: 'vecina', tags: ['tutorial'],
    hint: 'Al arrastrar, mira arriba: verás qué cifras van a subir ▲ o bajar ▼',
    text: 'Doña Puri lleva tres meses sin farola. Dice que si no se la arreglas, se lo cuenta a todo el mercado.',
    left: { label: 'Que espere', fx: { p: -4 }, face: 'angry' }, right: { label: 'Arreglarla ya', fx: { m: -0.2, p: 4 }, face: 'happy' } },
  { id: 't_3', tutorial: true, stage: 'any', who: 'constructor', tags: ['tutorial'],
    hint: 'Gana quien acaba más rico. Pero ojo con el olor a caca (marrón): si sube mucho, la cosa salpica',
    text: 'Paco «el del Ladrillo» quiere la obra de la acera. Te deja un sobre encima de la mesa «por las molestias».',
    left: { label: 'Devolver el sobre', fx: { p: 2 }, face: 'angry' }, right: { label: 'Al bolsillo', fx: { m: 2, d: 8 }, face: 'sly',
      news: { h: 'EL NUEVO CONCEJAL «APUESTA POR EL LADRILLO»', s: 'Fuentes municipales hablan de un sobre. El concejal habla de «aceras dignas»' } } },
];

const pct = (st, f, minUnits) => -Math.max(st.money * f, minUnits * STAGES[st.stage].scale);

export const scandals = [
  { id: 'escandalo_multa', scandal: true, stage: 'any', who: 'periodista', tags: ['escandalo'], kind: 'multa',
    text: 'ESCÁNDALO. El diario local publica tus dietas «creativas». Hacienda llama a la puerta con una multa.',
    left: { label: 'Pagar y callar', fx: { m: -2, p: -6, d: -22 }, face: 'sly', resolve: (st) => ({ label: 'Pagar y callar', fx: { money: pct(st, 0.15, 2), p: -6, d: -22 },
      news: { h: 'MULTA EJEMPLAR (Y DISCRETA)', s: 'El político paga sin rechistar: «Ha sido un error administrativo»' } }) },
    right: { label: 'Recurrir', fx: { m: -1, p: -12, d: -14 }, face: 'angry', resolve: (st) => ({ label: 'Recurrir', fx: { money: pct(st, 0.08, 1), p: -12, d: -14 },
      news: { h: '«TODO ES UNA CAMPAÑA CONTRA MÍ»', s: 'El político recurre la multa y culpa a «los de siempre»' } }) } },
  { id: 'escandalo_juicio', scandal: true, stage: 'any', who: 'juez', tags: ['escandalo'], kind: 'juicio',
    text: 'ESCÁNDALO. Un juez tira del hilo: estás imputado. Te sientas en el banquillo. ¿Cómo te defiendes?',
    left: { label: 'Los mejores abogados', fx: { m: -4, p: -8, d: -35 }, face: 'sly', resolve: (st) => { st.stats.acquitted++; return { label: 'Abogados', fx: { money: pct(st, 0.3, 3), p: -8, d: -35 },
      news: { h: 'ABSUELTO POR UN DEFECTO DE FORMA', s: 'Sus abogados cobran en una hora lo que un juez en un año' } }; } },
    right: { label: 'Culpar a otro', fx: { p: -5, d: -30 }, face: 'caught', resolve: (st, r) => {
      if (st.ench > 0 && r < 0.8) { st.stats.acquitted++; return { fx: { e: -1, p: -5, d: -30 }, news: { h: 'UN ASESOR «ACTUÓ POR SU CUENTA»', s: 'El enchufado asume toda la culpa. Nadie sabe cuánto le han pagado' } }; }
      if (st.ench === 0 && r < 0.45) { st.stats.acquitted++; return { fx: { p: -12, d: -30 }, news: { h: 'LA CULPA FUE DEL CUÑADO', s: 'El juez acepta que el cuñado firmaba todo «sin preguntar»' } }; }
      return { jail: true, fx: {}, news: { h: 'NADIE SE CREE LO DEL CUÑADO', s: 'Condenado. La cabeza de turco ha resultado ser la suya' } };
    } } },
  { id: 'escandalo_carcel', scandal: true, stage: 'any', who: 'policia', tags: ['escandalo'], kind: 'carcel',
    text: 'ESCÁNDALO MAYÚSCULO. La UCO entra en tu despacho a las 7 de la mañana. Hay furgón, cámaras y hasta un helicóptero.',
    left: { label: 'Pedir el indulto', fx: { p: -20, d: -40 }, face: 'caught', resolve: (st, r) => r < 0.12
      ? { fx: { p: -20, d: -40 }, news: { h: 'INDULTADO «POR LA CONVIVENCIA»', s: 'Nadie entiende nada. Él tampoco, pero sonríe' } }
      : { jail: true, fx: {}, news: { h: 'DEL ESCAÑO AL TRULLO', s: 'El indulto, denegado. Le espera una celda con vistas al patio' } } },
    right: { label: 'Al furgón con dignidad', fx: {}, face: 'caught', resolve: () => ({ jail: true, fx: {}, news: { h: 'ENTRA EN PRISIÓN SALUDANDO', s: '«Confío plenamente en la justicia», dice desde el furgón' } }) } },
];

const all = [...cardsA, ...cardsB, ...cardsC];
export const content = {
  cards: all,
  contacts: [...contacts].sort((a, b) => a.stage - b.stage),
  tutorial,
  scandals,
  laws,
  daily: all.filter((c) => c.daily),
  byId: Object.fromEntries([...all, ...tutorial, ...scandals].map((c) => [c.id, c])),
};
export default content;
