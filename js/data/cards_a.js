// Cartas A: ámbito local y de broma (etapas 0 y 1, algunas para cualquier cargo).
export default [
  // ---------- BROMA ----------
  {
    id: 'a_selfi_vaca', stage: [0, 1], who: 'agricultor', tags: ['local', 'broma'],
    text: 'Un agricultor te pide permiso para un selfi con su vaca «Paquita». Dice que tiene más seguidores que tú.',
    left: { label: 'Sin vaca, sin selfi', fx: { p: -2 }, face: 'angry' },
    right: { label: 'Sonríe, Paquita', fx: { p: 3 }, face: 'happy',
      news: { h: 'EL CONCEJAL POSA CON UNA VACA Y GANA EN CARISMA', s: 'La vaca, por su parte, no quiso hacer declaraciones' } }
  },
  {
    id: 'a_cinta', stage: 'any', who: 'ciudadano', tags: ['local', 'broma'],
    text: 'Te toca cortar la cinta de un paso de cebra. Las tijeras son gigantes y el fotógrafo, tu primo.',
    left: { label: 'Cortar con los dientes', fx: { p: 2, d: 1 }, face: 'sly' },
    right: { label: 'Corte protocolario', fx: { m: -0.2, p: 1 }, face: 'neutral' }
  },
  {
    id: 'a_menu_navidad', stage: 'any', who: 'asesor', tags: ['partido', 'broma'],
    text: 'Borja trae el menú de la cena de Navidad del partido: cordero, gambas y un ponche «de la casa» sospechoso.',
    left: { label: 'Ensalada y a casa', fx: { m: 0.3, p: -2 }, face: 'neutral' },
    right: { label: 'Ponche para todos', fx: { m: -0.5, p: 3, d: 1 }, face: 'happy' }
  },
  {
    id: 'a_rotonda_pulpo', stage: [0, 1], who: 'vecina', tags: ['local', 'broma'],
    text: 'Una vecina exige una escultura de un pulpo gigante en la rotonda de la carretera de Secanía. «Es arte».',
    left: { label: 'Ni hablar', fx: { p: -3 }, face: 'angry' },
    right: { label: 'Pulpo para todos', fx: { m: -0.5, p: 4 }, face: 'happy',
      news: { h: 'EL PULPO YA PRESIDE LA ROTONDA', s: 'Los vecinos, divididos: unos lo adoran, otros lo temen' },
      later: { id: 'a_pulpo_cae', in: 3 } }
  },
  {
    id: 'a_baden', stage: [0, 1], who: 'vecino', tags: ['local', 'broma'],
    text: 'Un vecino quiere un badén delante de su casa «porque pasan muy rápido». Vive en un callejón peatonal.',
    left: { label: 'Que se mude', fx: { p: -2 }, face: 'angry' },
    right: { label: 'Badén de cortesía', fx: { m: -0.3, p: 2, d: 1 }, face: 'sly' }
  },
  {
    id: 'a_procesion', stage: [0, 1], who: 'cura', tags: ['local', 'broma'],
    text: 'El cura te ofrece cargar con las andas en la procesión. Pesan una tonelada y la banda desafina.',
    left: { label: 'Me duele la espalda', fx: { p: -2 }, face: 'neutral' },
    right: { label: 'A hombros, padre', fx: { p: 3 }, face: 'happy' }
  },
  {
    id: 'a_pena_fiestas', stage: [0, 1], who: 'pena', tags: ['local', 'broma'],
    text: 'La peña «Los Sedientos» pide barra libre en la verbena. Prometen votarte. Y no recordar nada.',
    left: { label: 'Agua del grifo', fx: { p: -4 }, face: 'angry' },
    right: { label: 'Barra libre', fx: { m: -0.5, p: 4, d: 1 }, face: 'happy' }
  },
  {
    id: 'a_gato', stage: 'any', who: 'ecologista', tags: ['local', 'broma'],
    text: 'Una asociación propone nombrar a un gato callejero «Alcalde honorario». El gato parece más cualificado que tú.',
    left: { label: 'Prefiero el mando', fx: { p: -1 }, face: 'neutral' },
    right: { label: 'Miau, señor alcalde', fx: { p: 4 }, face: 'happy',
      news: { h: 'UN GATO, ALCALDE HONORARIO DE VILLARRIBA', s: 'Su primera medida: dormir catorce horas diarias' } }
  },
  {
    id: 'a_jubilado_obras', stage: 'any', who: 'jubilado', tags: ['local', 'broma'],
    text: 'Un jubilado lleva tres años mirando la misma obra. Te pide que le pongas un banco y un bocadillo.',
    left: { label: 'Que se compre un banco', fx: { p: -2 }, face: 'angry' },
    right: { label: 'Banco con vistas', fx: { m: -0.2, p: 3 }, face: 'happy' }
  },
  {
    id: 'a_wifi_plaza', stage: 'any', who: 'joven', tags: ['local', 'broma'],
    text: 'Un joven pide wifi gratis en la plaza. La contraseña propuesta es «alcaldeCrack123». Tú dirás.',
    left: { label: 'A la biblioteca', fx: { p: -3 }, face: 'angry' },
    right: { label: 'Wifi para el pueblo', fx: { m: -0.5, p: 4 }, face: 'happy' }
  },

  // ---------- DILEMAS LOCALES ----------
  {
    id: 'a_antena', stage: [0, 1], who: 'empresario', tags: ['local', 'negocio'],
    text: 'Una operadora quiere plantar una antena de móviles junto al colegio. Te dan una «aportación» para fiestas.',
    left: { label: 'Fuera de mi pueblo', fx: { m: -0.5, p: 4 }, face: 'angry' },
    right: { label: 'Cobertura y cobertura', fx: { m: 1.5, p: -3, d: 3 }, face: 'sly',
      later: { id: 'a_antena_2', in: 3 } }
  },
  {
    id: 'a_eolico', stage: [0, 1], who: 'agricultor', tags: ['local', 'negocio'],
    text: 'Quieren llenar la sierra de aerogeneradores. Los agricultores cobrarán alquiler, los ecologistas gritarán.',
    left: { label: 'Sierra intacta', fx: { m: -0.5, p: 3 }, face: 'happy' },
    right: { label: 'Molinos a mansalva', fx: { m: 2, p: -4, d: 2 }, face: 'sly' }
  },
  {
    id: 'a_terrazas', stage: [0, 1], who: 'vecino', tags: ['local'],
    text: 'Las terrazas del centro no dejan dormir. Los hosteleros amenazan con cerrar. Los vecinos, con ponerse en huelga de sueño.',
    left: { label: 'Cierre a las 12', fx: { m: -0.5, p: 3 }, face: 'happy' },
    right: { label: 'Que siga la fiesta', fx: { m: 0.5, p: -4 }, face: 'sly' }
  },
  {
    id: 'a_policia_local', stage: [0, 1], who: 'policia', tags: ['local'],
    text: 'La Policía Local pide un coche nuevo. El actual solo arranca si lo empujan entre tres agentes.',
    left: { label: 'Que sigan empujando', fx: { m: 0.3, p: -3 }, face: 'angry' },
    right: { label: 'Coche con sirena', fx: { m: -1, p: 3 }, face: 'happy' }
  },
  {
    id: 'a_polideportivo', stage: [0, 1], who: 'futbol', tags: ['local', 'negocio'],
    text: 'El presidente del club quiere un polideportivo con jacuzzi «para la cantera». El presupuesto está inflado como un balón.',
    left: { label: 'Campo de tierra', fx: { p: -4 }, face: 'angry' },
    right: { label: 'Jacuzzi para la cantera', fx: { m: -2, p: 6, d: 2 }, face: 'happy' }
  },
  {
    id: 'a_sequia_piscina', stage: [0, 1], who: 'ciudadano', tags: ['local', 'crisis'],
    text: 'Hay sequía en Villarriba, pero la piscina municipal está llena. Todos la miran. Todos tienen calor.',
    left: { label: 'Vaciarla ya', fx: { m: 0.5, p: -5 }, face: 'neutral' },
    right: { label: 'Chapuzón patriótico', fx: { m: -0.5, p: 3, d: 1 }, face: 'sly' }
  },
  {
    id: 'a_ecologistas_excavadora', stage: [0, 1], who: 'ecologista', tags: ['local', 'crisis'],
    text: 'Varios ecologistas se han encadenado a la excavadora que arrasa el soto. El constructor te llama cada diez minutos.',
    left: { label: 'Llamar a la Policía', fx: { m: 1, p: -6, d: 3 }, face: 'angry' },
    right: { label: 'Negociar con bocadillos', fx: { m: -1, p: 5 }, face: 'happy',
      news: { h: 'EL ALCALDE CEDE ANTE LOS ENCADENADOS', s: 'La excavadora, de baja por estrés' } }
  },
  {
    id: 'a_estatua', stage: [0, 1], who: 'asesor', tags: ['local', 'historia'],
    text: 'Borja propone una estatua del alcalde anterior en la plaza. Cuesta una fortuna y tiene tus mismas orejas.',
    left: { label: 'Que le den la plaza', fx: { p: -1 }, face: 'neutral' },
    right: { label: 'Bronce para el ex', fx: { m: -1.5, p: 2 }, face: 'happy',
      news: { h: 'VILLARRIBA ERIGE UNA ESTATUA A SU ANTERIOR ALCALDE', s: 'Los vecinos preguntan quién era' },
      later: { id: 'a_estatua_2', in: 4 } }
  },
  {
    id: 'a_obra_doble', stage: 'any', who: 'asesor', tags: ['local', 'broma'],
    text: 'Borja sugiere inaugurar la misma obra dos veces: antes de las elecciones y después. «Así hay doble foto».',
    left: { label: 'Una vez, que sobra', fx: { p: -1 }, face: 'neutral' },
    right: { label: 'Dos cintas, dos fotos', fx: { m: -0.3, p: 4, d: 2 }, face: 'sly',
      news: { h: 'EL ALCALDE INAUGURA POR SEGUNDA VEZ LA MISMA FUENTE', s: 'Esta vez, con agua' } }
  },
  {
    id: 'a_caja_local', stage: [0, 1], who: 'caja', tags: ['local', 'negocio'],
    text: 'El director de la caja de ahorros te ofrece una tarjeta «para gastos de representación». Sin límite, sin preguntas.',
    left: { label: 'Gracias, no', fx: { m: -0.2, p: 3 }, face: 'neutral' },
    right: { label: 'Representar, represento', fx: { m: 2, p: -2, d: 7 }, face: 'sly' }
  },

  // ---------- CHANCHULLOS ----------
  {
    id: 'a_recalificar', stage: [0, 1], who: 'constructor', tags: ['local', 'negocio'],
    text: 'Paco el constructor quiere recalificar un terreno rústico en urbanizable. «Es un secarral, nadie lo echará de menos».',
    left: { label: 'Rústico se queda', fx: { m: -0.5, p: 4 }, face: 'angry' },
    right: { label: 'Recalificar con cariño', fx: { m: 5, p: -4, d: 16 }, face: 'sly',
      news: { h: 'EL SECARRAL DE LAS CUATRO ESQUINAS SE CONVIERTE EN ORO', s: 'Paco el constructor estrena yate; el alcalde, reloj' } }
  },
  {
    id: 'a_limpieza_dedo', stage: [0, 1], who: 'empresario', tags: ['local', 'negocio'],
    text: 'Una empresa de limpieza «amiga» pide el contrato municipal sin concurso. Su gerente es tu cuñado político.',
    left: { label: 'Con concurso', fx: { m: -0.5, p: 3 }, face: 'neutral' },
    right: { label: 'A dedo, más rápido', fx: { m: 3, p: -2, d: 10 }, face: 'sly' }
  },
  {
    id: 'a_dietas', stage: 'any', who: 'tesorero', tags: ['partido', 'negocio'],
    text: 'El tesorero te ofrece cobrar dietas por «asistir» a plenos. Puedes asistir o no; cobras igual.',
    left: { label: 'Solo lo justo', fx: { m: 0.3, p: 2 }, face: 'neutral' },
    right: { label: 'Dietas infladas', fx: { m: 3, p: -3, d: 8 }, face: 'sly' }
  },
  {
    id: 'a_cunado_empleo', stage: [0, 1], who: 'cunado', tags: ['local', 'lio'],
    text: 'Tu cuñado necesita trabajo. Dice que sabe de «gestión de eventos». Lleva en paro desde los noventa.',
    left: { label: 'Que se apunte al paro', fx: { p: 1 }, face: 'angry' },
    right: { label: 'Plaza de asesor', fx: { m: 1, p: -3, d: 8, e: 1 }, face: 'sly',
      news: { h: 'EL CUÑADO DEL ALCALDE, NUEVO ASESOR DE EVENTOS', s: 'Su primer evento: su propio cumpleaños' },
      later: { id: 'a_cunado_2', in: 3 } }
  },
  {
    id: 'a_likes', stage: 'any', who: 'influencer', tags: ['medios', 'broma'],
    text: 'Una influencer te vende 20.000 likes por 400 euros. «Son de cuentas verificadas», jura. Una de ellas es un cactus.',
    left: { label: 'Mis likes son reales', fx: { p: -1 }, face: 'neutral' },
    right: { label: 'Comprar likes', fx: { m: -0.5, p: 6, d: 4 }, face: 'sly',
      news: { h: 'EL AMOR DEL POPULACHO POR EL ALCALDE SE DISPARA', s: 'Expertos desconfían: la mitad son bots que no votan' },
      later: { id: 'a_likes_2', in: 3 } }
  },
  {
    id: 'a_multas_amigo', stage: [0, 1], who: 'policia', tags: ['local', 'lio'],
    text: 'Un agente te pide que «pierdas» las multas de aparcamiento de un amigo suyo. Son 312. Con foto.',
    left: { label: 'Que las pague', fx: { p: 2 }, face: 'neutral' },
    right: { label: 'Perder el sobre', fx: { m: 1.5, p: -2, d: 6 }, face: 'sly' }
  },
  {
    id: 'a_asfalto', stage: [0, 1], who: 'constructor', tags: ['local', 'negocio'],
    text: 'Paco te ofrece asfaltar la calle principal a triple precio. El sobrecito para ti está incluido en la factura.',
    left: { label: 'A precio normal', fx: { m: -0.5, p: 3 }, face: 'neutral' },
    right: { label: 'Triple y con sobre', fx: { m: 3.5, p: -2, d: 12 }, face: 'sly' }
  },

  {
    id: 'a_fiestas_orquesta', stage: [0, 1], who: 'pena', tags: ['local', 'negocio'],
    text: 'La orquesta de las fiestas cobra 30.000 euros por tocar tres pasodobles. El representante es primo del tesorero.',
    left: { label: 'Charanga del pueblo', fx: { m: 0.3, p: -3 }, face: 'angry' },
    right: { label: 'Orquesta de lujo', fx: { m: 2, p: 2, d: 6 }, face: 'sly' }
  },

  // ---------- FOLLOWUPS ----------
  {
    id: 'a_pulpo_cae', stage: [0, 1], who: 'vecina', tags: ['local', 'broma'], followup: true,
    text: 'El pulpo de la rotonda se ha desplomado en plena procesión. Un tentáculo tapa la carretera. Y la fama no ha hecho más que empezar.',
    left: { label: 'Retirar el pulpo', fx: { m: -1, p: -3 }, face: 'angry' },
    right: { label: 'Convertirlo en reclamo', fx: { m: 0.5, p: 4 }, face: 'sly',
      news: { h: 'EL PULPO CAÍDO DE VILLARRIBA SE HACE VIRAL', s: 'Turistas de toda Secanía vienen a hacerse el selfi con el tentáculo' } }
  },
  {
    id: 'a_antena_2', stage: [0, 1], who: 'vecina', tags: ['local', 'crisis'], followup: true,
    text: 'Desde que instalaste la antena, las vecinas juran que oyen la radio con el empaste. Piden que la quites.',
    left: { label: 'Es ciencia, señora', fx: { p: -4, d: 1 }, face: 'sly' },
    right: { label: 'Desmontar antena', fx: { m: -1.5, p: 5 }, face: 'neutral' }
  },
  {
    id: 'a_estatua_2', stage: [0, 1], who: 'periodista', tags: ['local', 'medios'], followup: true,
    text: 'Alguien ha pintado un bigote a la estatua del alcalde anterior. Un periodista pregunta si fuiste tú.',
    left: { label: 'Limpiarla en silencio', fx: { m: -0.3, p: 1 }, face: 'neutral' },
    right: { label: 'Dejar el bigote', fx: { p: 3 }, face: 'sly',
      news: { h: 'EL BIGOTE DE LA ESTATUA, NUEVO ATRACTIVO LOCAL', s: 'El Ayuntamiento lo declara «arte urbano»' } }
  },
  {
    id: 'a_cunado_2', stage: [0, 1], who: 'cunado', tags: ['local', 'lio'], followup: true,
    text: 'Tu cuñado ha organizado un evento con el dinero del ayuntamiento: una barbacoa familiar. El presupuesto da risa.',
    left: { label: 'Que pague él', fx: { m: 0.5, p: 1, d: 2 }, face: 'angry' },
    right: { label: 'Barbacoa oficial', fx: { m: -0.5, p: -3, d: 5 }, face: 'caught' }
  },
  {
    id: 'a_likes_2', stage: 'any', who: 'periodista', tags: ['medios'], followup: true,
    text: 'Un periodista ha descubierto que parte de tus seguidores son bots que solo hablan de tu rotonda. Pide declaraciones.',
    left: { label: 'Negarlo todo', fx: { p: -4, d: 5 }, face: 'caught' },
    right: { label: 'Admitir y pedir perdón', fx: { p: -2, d: -2 }, face: 'neutral',
      news: { h: 'EL ALCALDE ADMITE SEGUIDORES FALSOS Y UN CACTUS', s: 'Pide disculpas al cactus' } }
  }
];
