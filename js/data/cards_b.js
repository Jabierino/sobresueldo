// Cartas B: nacional, internacional, partido y medios (etapas 2-4), campañas y consecuencias.
export default [
  // ---------- HISTORIA ----------
  {
    id: 'b_aeropuerto', stage: [2, 3], who: 'diputacion', tags: ['historia', 'nacional'],
    text: 'Secanía inaugura un aeropuerto con pista de 4 km. Aviones: cero. Te piden cortar la cinta y «dinamizar» el asunto.',
    left: { label: 'Cierra el hangar', fx: { m: 0, p: -4 }, face: 'angry' },
    right: { label: 'Corta la cinta', fx: { m: 2, p: 3, d: 8 }, face: 'sly',
      news: { h: 'AEROPUERTO SIN AVIONES YA TIENE CINTA', s: 'Inaugurado con orquesta, paella y ningún vuelo' },
      later: { id: 'b_aeropuerto_2', in: 3 } }
  },
  {
    id: 'b_burbuja', stage: [2, 3, 4], who: 'constructora', tags: ['historia', 'negocio'],
    text: 'La presidenta de Hormigones del Futuro quiere recalificar media Mesetonia: «El ladrillo nunca baja, jamás». Eso dijeron del Titanic.',
    left: { label: 'Frena la burbuja', fx: { m: -1, p: 2 }, face: 'neutral' },
    right: { label: 'A hormigonar', fx: { m: 5, p: -3, d: 16 }, face: 'sly' }
  },
  {
    id: 'b_tarjetas', stage: [2, 3], who: 'caja', tags: ['historia', 'lio'],
    text: 'El director de Caja Mesetonia te da una tarjeta «de representación» sin límite. Cena, viaje, yate… «Es para el partido».',
    left: { label: 'Devuélvela', fx: { m: 0, p: 3 }, face: 'happy' },
    right: { label: 'Pasa la tarjeta', fx: { m: 3, p: -2, d: 12 }, face: 'sly',
      later: { id: 'b_tarjetas_2', in: 3 } }
  },
  {
    id: 'b_master', stage: [2, 3], who: 'asesor', tags: ['historia', 'lio'],
    text: 'Borja te ofrece un máster exprés en la Universidad Rey Fantasma: sin clases, sin examen, con foto de graduación incluida.',
    left: { label: 'Estudia de verdad', fx: { m: -1, p: 2 }, face: 'neutral' },
    right: { label: 'Matricúlate', fx: { m: 0.5, p: 4, d: 7 }, face: 'sly',
      later: { id: 'b_master_2', in: 3 } }
  },
  {
    id: 'b_sobres', stage: [2, 3, 4], who: 'tesorero', tags: ['historia', 'partido', 'lio'], strong: false,
    text: 'El tesorero del PMT guarda en la sede sobres con «donativos» y una contabilidad particular. Te pide discreción y un aumento.',
    left: { label: 'Que lo audite alguien', fx: { m: -1, p: 4, d: -4 }, face: 'angry' },
    right: { label: 'Mira para otro lado', fx: { m: 3, p: -3, d: 14 }, face: 'sly',
      news: { h: 'SOBRES EN LA SEDE: «SON PARA ROSCÓN»', s: 'El tesorero jura que la contabilidad es solo «particular»' },
      later: { id: 'b_sobres_2', in: 2 } }
  },
  {
    id: 'b_ayudas', stage: [2, 3, 4], who: 'consejera', tags: ['historia', 'negocio'],
    text: 'Una consejera propone desviar las ayudas a parados a «empresas amigas de formación». Los parados seguirán igual, pero formados en papel.',
    left: { label: 'Para los parados', fx: { m: -1, p: 5 }, face: 'happy' },
    right: { label: 'Reparte a los amigos', fx: { m: 4, p: -5, d: 15 }, face: 'sly' }
  },
  {
    id: 'b_patriarca', stage: [2, 3], who: 'baron', tags: ['historia', 'partido'],
    text: 'El patriarca regional, «honrado desde 1980», acaba de confesar una herencia en Andorra. Su familia lo llama «el ahorro del abuelo».',
    left: { label: 'Pide su dimisión', fx: { m: -1, p: 5, d: -3 }, face: 'angry' },
    right: { label: 'Defiende al abuelo', fx: { m: 2, p: -6, d: 9 }, face: 'sly',
      later: { id: 'b_patriarca_2', in: 3 } }
  },
  {
    id: 'b_mascarillas', stage: [2, 3, 4], who: 'empresario', tags: ['historia', 'negocio', 'crisis'],
    text: 'En plena pandemia, un intermediario te ofrece comprar mascarillas con comisión. Llegan tarde, caras y con dibujitos.',
    left: { label: 'Compra directa', fx: { m: -1, p: 3 }, face: 'happy' },
    right: { label: 'Usa al intermediario', fx: { m: 4, p: -3, d: 14 }, face: 'sly',
      news: { h: 'MASCARILLAS CON COMISIÓN: «ERAN SOLIDARIAS»', s: 'El intermediario se compra un yate «de protección»' },
      later: { id: 'b_mascarillas_2', in: 3 } }
  },
  {
    id: 'b_votacion', stage: [2, 3], who: 'jefa', tags: ['historia', 'partido'],
    text: 'Votación clave mañana. Dos de tus diputados no aparecen: uno está «en un spa» y el otro, «en la inauguración de su chalet».',
    left: { label: 'Disciplina de hierro', fx: { m: 0, p: 3, d: 1 }, face: 'angry' },
    right: { label: 'Que voten por error', fx: { m: 1, p: -4, d: 4 }, face: 'sly',
      news: { h: 'DOS DIPUTADOS DESAPARECEN EN VOTACIÓN CLAVE', s: 'Uno vuelve con moreno de spa; el otro, con llaves del chalet' } }
  },
  {
    id: 'b_rescate', stage: [3, 4], who: 'banquero', tags: ['historia', 'negocio', 'crisis'],
    text: 'El Banco Solvencia Garantizada se hunde. Hay que inyectarle miles de millones, pero que nadie lo llame «rescate». Ni «ayuda».',
    left: { label: 'Que se hunda', fx: { m: -1, p: -8 }, face: 'angry' },
    right: { label: 'Es un «préstamo amigo»', fx: { m: 3, p: -6, d: 11 }, face: 'sly',
      news: { h: 'EL RESCATE QUE «NO ES UN RESCATE»', s: 'Gobierno: «Es una línea de apoyo financiero fraternal»' } }
  },

  // ---------- CHANCHULLOS GRANDES ----------
  {
    id: 'b_puertas', stage: [3, 4], who: 'magnate', tags: ['negocio', 'lio', 'nacional'],
    text: 'Una eléctrica te ofrece un sillón en su consejo cuando dejes el cargo. Sueldo: tu salario de hoy multiplicado por ocho.',
    left: { label: 'Rechaza la oferta', fx: { m: 0, p: 4 }, face: 'happy' },
    right: { label: 'Gira la puerta', fx: { m: 4, p: -4, d: 13 }, face: 'sly' }
  },
  {
    id: 'b_comision', stage: [3, 4], who: 'supremo', tags: ['nacional', 'lio'],
    text: 'Una comisión de investigación quiere citarte. Puedes torpedearla con una mayoría «técnica» o dejar que pregunten lo que quieran.',
    left: { label: 'Comparece y suda', fx: { m: 0, p: 3, d: 2 }, face: 'caught' },
    right: { label: 'Bloquéala', fx: { m: 1, p: -5, d: 10 }, face: 'sly' }
  },
  {
    id: 'b_indulto', stage: [3, 4], who: 'ministro', tags: ['nacional', 'lio'],
    text: 'Piden un indulto para un amigo del partido condenado por «una pequeña confusión con el dinero público». Cuatro millones de confusión.',
    left: { label: 'Que cumpla condena', fx: { m: 0, p: 4, d: -2 }, face: 'neutral' },
    right: { label: 'Indúltalo', fx: { m: 3, p: -6, d: 12 }, face: 'sly',
      news: { h: 'INDULTO EXPRÉS A UN AMIGO DEL PARTIDO', s: 'El boletín oficial lo publica entre las bases del concurso de piruletas' } }
  },
  {
    id: 'b_presupuestos', stage: [2, 3, 4], who: 'rival', tags: ['nacional', 'partido'],
    text: 'Para aprobar los presupuestos, Aldea Existe pide una cosa rara: un tren con su nombre que no pasa por ninguna parte, pero «con vistas».',
    left: { label: 'No hay tren', fx: { m: 0, p: -4 }, face: 'angry' },
    right: { label: 'Tren fantasma', fx: { m: 1, p: 3, d: 6 }, face: 'sly' }
  },
  {
    id: 'b_listas', stage: [3], who: 'baron', tags: ['partido', 'lio'],
    text: 'Toca hacer las listas electorales. Todo el mundo quiere puesto: primos, amantes, el fontanero del barón y la sobrina de Borja.',
    left: { label: 'Lista de méritos', fx: { m: -1, p: 4, d: 1 }, face: 'neutral' },
    right: { label: 'Lista de enchufes', fx: { m: 2, p: -2, d: 7, e: 1 }, face: 'happy' }
  },
  {
    id: 'b_baron', stage: [2, 3], who: 'baron', tags: ['partido', 'nacional'],
    text: 'Un barón regional se rebela contra la dirección. «Me deben una consejería, tres hospitales y un homenaje», masculla con el puro.',
    left: { label: 'Plántale cara', fx: { m: 0, p: 2, d: 1 }, face: 'angry' },
    right: { label: 'Dale los hospitales', fx: { m: 2, p: -2, d: 8 }, face: 'sly',
      news: { h: 'EL BARÓN SE CALMA TRAS RECIBIR TRES HOSPITALES', s: 'Los enfermos pendientes, «muy comprensivos»' } }
  },

  // ---------- DILEMAS DE GESTIÓN / MEDIOS ----------
  {
    id: 'b_bruselas', stage: [3, 4], who: 'comisaria', tags: ['internacional'],
    text: 'Cumbre en Bruselas: la comisaria exige recortes. Si vuelves sin nada te llaman blando; si firmas, te llaman vendido.',
    left: { label: 'Firma y sonríe', fx: { m: 1, p: -5 }, face: 'neutral' },
    right: { label: 'Monta un pollo', fx: { m: -1, p: 5 }, face: 'angry',
      news: { h: 'PLANTÓN EN BRUSELAS Y FOTO CON PUÑO', s: 'La comisaria pide un descanso. Tú pides otro café.' } }
  },
  {
    id: 'b_crisis_pais', stage: [3, 4], who: 'embajador', tags: ['internacional', 'crisis'],
    text: 'Un país vecino arde en crisis y su líder te invita a una foto. Si sales, te salpica; si no, te llaman insolidario.',
    left: { label: 'Excusa diplomática', fx: { m: 0, p: -3 }, face: 'neutral' },
    right: { label: 'Sal en la foto', fx: { m: 1, p: 3, d: 4 }, face: 'sly' }
  },
  {
    id: 'b_huelga', stage: [2, 3, 4], who: 'sindicalista', tags: ['nacional', 'crisis'],
    text: 'Huelga de transportes. Trenes parados, autobuses con pegatinas y un sindicalista exigiendo «servicios máximos de mínimos».',
    left: { label: 'Cede a los sindicatos', fx: { m: -2, p: 5 }, face: 'happy' },
    right: { label: 'Decreta mínimos', fx: { m: 1, p: -6 }, face: 'angry' }
  },
  {
    id: 'b_pateras', stage: [2, 3, 4], who: 'ministro', tags: ['nacional', 'crisis'],
    text: 'Piden repartir menores migrantes entre regiones. Cada barón se los pasa al vecino como un trasto viejo. Los chavales, mientras, esperan.',
    left: { label: 'Reparto obligatorio', fx: { m: -1, p: 2, d: 0 }, face: 'neutral' },
    right: { label: 'Que lo decida cada barón', fx: { m: 0, p: -5, d: 2 }, face: 'sly' }
  },
  {
    id: 'b_sequia', stage: [2, 3, 4], who: 'agricultor', tags: ['nacional', 'crisis'],
    text: 'Sequía histórica. Un agricultor te pide agua; el ecologista pide frenar el trasvase; el golf pide las dos cosas, y sin gastar.',
    left: { label: 'Trasvase ya', fx: { m: -2, p: 4, d: 1 }, face: 'happy' },
    right: { label: 'Ahorro y plegarias', fx: { m: 0, p: -5 }, face: 'neutral' }
  },
  {
    id: 'b_entrevista', stage: [2, 3, 4], who: 'periodista', tags: ['medios'],
    text: 'Entrevista en horario de máxima audiencia. El periodista te sonríe demasiado: es una trampa y trae carpeta.',
    left: { label: 'Ve preparado', fx: { m: -0.5, p: 4 }, face: 'sly' },
    right: { label: 'Improvisa', fx: { m: 0, p: -4, d: 2 }, face: 'caught',
      news: { h: 'LA ENTREVISTA QUE NADIE PUDO CORTAR', s: 'Silencio de 14 segundos y una pregunta sobre un máster' } }
  },
  {
    id: 'b_debate', stage: [3, 4], who: 'presentadora', tags: ['medios', 'nacional'],
    text: 'Debate televisado. Borja te sugiere traer un chuletón, un pañuelo y una frase prefabricada de tres sílabas.',
    left: { label: 'Soltar la frase', fx: { m: 0, p: 5 }, face: 'sly' },
    right: { label: 'Ir a degüello', fx: { m: 0, p: -3, d: 1 }, face: 'angry' }
  },
  {
    id: 'b_redes', stage: [2, 3, 4], who: 'influencer', tags: ['medios'],
    text: 'Tu tuit sobre «los pensionistas» se ha viralizado. Era una broma para tu cuñado, pero lo ha leído medio país.',
    left: { label: 'Borra y pide perdón', fx: { m: 0, p: 1 }, face: 'caught' },
    right: { label: 'Mantén el tuit', fx: { m: 0, p: -4, d: 2 }, face: 'angry' }
  },
  {
    id: 'b_tertulia', stage: [2, 3, 4], who: 'tertuliana', tags: ['medios'],
    text: 'Una tertuliana te llama «caudillo de cartón» en directo. Puedes responderle o ir a su programa un mes. Con maquillaje incluido.',
    left: { label: 'Aguanta el chaparrón', fx: { m: 0, p: -1 }, face: 'neutral' },
    right: { label: 'Fichar como colaborador', fx: { m: 1, p: 2, d: 3 }, face: 'happy' }
  },
  {
    id: 'b_encuesta', stage: [2, 3, 4], who: 'director', tags: ['medios', 'lio'],
    text: 'El director de «El Diario Oficioso» publicaría una encuesta a tu medida. Precio: un contrato de publicidad institucional. Poca cosa.',
    left: { label: 'Encuesta honesta', fx: { m: 0, p: -2 }, face: 'neutral' },
    right: { label: 'Encuesta amiga', fx: { m: -1, p: 6, d: 5 }, face: 'sly' }
  },

  // ---------- BROMA ----------
  {
    id: 'b_visita', stage: [3, 4], who: 'embajador', tags: ['broma', 'internacional'],
    text: 'Visita oficial con protocolo imposible: no se puede mirar al jefe, ni sentarse antes que el té, ni usar tenedores. Ni dedos.',
    left: { label: 'Sigue las normas', fx: { m: 0, p: 2 }, face: 'neutral' },
    right: { label: 'Improvisa, total', fx: { m: 0, p: -3, d: 1 }, face: 'caught' }
  },
  {
    id: 'b_regalo', stage: [3, 4], who: 'extranjero', tags: ['broma', 'internacional'],
    text: 'Un líder extranjero te regala un camello con lazo. Aduanas pregunta si es «regalo de Estado» o «de estado civil».',
    left: { label: 'Declara el camello', fx: { m: 0, p: 2 }, face: 'happy' },
    right: { label: 'Quédatelo en la finca', fx: { m: 0.5, p: -2, d: 3 }, face: 'sly' }
  },



  // ---------- CAMPAÑA ----------
  {
    id: 'b_campana_0', stage: [0], who: 'asesor', tags: ['campana', 'local'],
    text: 'Municipales a la vista. Borja te propone dos campañas: pegar carteles tú mismo o contratar una cuadrilla de «voluntarios» con sueldo.',
    left: { label: 'Campaña limpia', fx: { m: -1, p: 5 }, face: 'happy',
      news: { h: 'CAMPAÑA A PIE Y SIN SOBRES EN VILLARRIBA', s: 'Los vecinos sospechan, pero aplauden' } },
    right: { label: 'Voluntarios y sobres', fx: { m: 1, p: 8, d: 10 }, face: 'sly',
      news: { h: 'VILLARRIBA, TAPIZADA DE CARTELES MISTERIOSOS', s: 'Nadie sabe quién los paga. Todos saben quién los pega.' } }
  },
  {
    id: 'b_campana_1', stage: [1], who: 'asesor', tags: ['campana', 'nacional'],
    text: 'Para las autonómicas, Borja ofrece mítines con globos y paella pagados «por la peña». Mejor no preguntar quién es la peña.',
    left: { label: 'Mítin de verdad', fx: { m: -2, p: 6 }, face: 'happy',
      news: { h: 'MÍTIN LIMPIO Y PAELLA POR COLECTA', s: 'Rumores: ni un solo sobre en la caja' } },
    right: { label: 'Peña misteriosa', fx: { m: 2, p: 10, d: 12 }, face: 'sly',
      news: { h: 'LA PEÑA DE LA PAELLA FINANCIA EL MÍTIN', s: 'Presidente de la peña: «Aquí no ha pasado nada»' } }
  },
  {
    id: 'b_campana_2', stage: [2], who: 'jefa', tags: ['campana', 'partido'],
    text: 'Primarias del PMT. Para liderar el partido hay que ganar a las bases: o con ideas y cafés, o con autobuses de «militantes» de ocasión.',
    left: { label: 'Primarias limpias', fx: { m: -2, p: 6 }, face: 'neutral',
      news: { h: 'PRIMARIAS DEL PMT: SIN AUTOBUSES NI TRAMPAS', s: 'La militancia vota con cara de sorpresa' } },
    right: { label: 'Autobuses y bots', fx: { m: 2, p: 10, d: 13 }, face: 'sly',
      news: { h: '500 MILITANTES NUEVOS: TODOS DE LA MISMA CALLE', s: 'Los bots piden el voto con muchísima falta de ortografía' } }
  },
  {
    id: 'b_campana_3', stage: [3], who: 'asesor', tags: ['campana', 'nacional'],
    text: 'Generales e investidura. Borja trae una caja B para «publicidad imaginativa» y una granja de bots. O pides votos con la cara lavada.',
    left: { label: 'Campaña limpia', fx: { m: -2, p: 7 }, face: 'happy',
      news: { h: 'EL PMT CIERRA CAMPAÑA CON LAS CUENTAS CLARAS', s: 'Los expertos exigen otra auditoría por si acaso' } },
    right: { label: 'Caja B y bots', fx: { m: 3, p: 12, d: 15 }, face: 'sly',
      news: { h: 'GRANJA DE BOTS CANTA LAS BONDADES DEL PMT', s: 'Los robots lloran de emoción en 4.000 cuentas' } }
  },

  // ---------- SEGUIMIENTOS ----------
  {
    id: 'b_aeropuerto_2', stage: [2, 3, 4], who: 'diputacion', tags: ['historia', 'nacional'], followup: true,
    text: 'El aeropuerto sin aviones sigue vacío. Una productora quiere alquilar la pista para rodar anuncios de coches. Dinero rápido.',
    left: { label: 'Cierra el aeropuerto', fx: { m: 0, p: -2 }, face: 'neutral' },
    right: { label: 'Alquila la pista', fx: { m: 2, p: 2, d: 3 }, face: 'happy',
      news: { h: 'AEROPUERTO FANTASMA SE ESTRENA EN ANUNCIOS', s: 'Un coche vuela. El aeropuerto, por fin, también.' } }
  },
  {
    id: 'b_master_2', stage: [2, 3, 4], who: 'juez', tags: ['historia', 'lio'], followup: true,
    text: 'Un juez tira del hilo de tu máster exprés: profesores inexistentes y una nota media de diez en «Ética pública». Qué casualidad.',
    left: { label: 'Culpa a la universidad', fx: { m: 0, p: -4, d: 6 }, face: 'caught' },
    right: { label: 'Devuelve el título', fx: { m: -1, p: 2, d: -6 }, face: 'angry',
      news: { h: 'EL MÁSTER EXPRÉS CAE EN EL JUZGADO', s: 'El título se devuelve con lazo y muy poca vergüenza' } }
  },
  {
    id: 'b_sobres_2', stage: [2, 3, 4], who: 'tesorero', tags: ['historia', 'partido', 'lio'], followup: true,
    text: 'El tesorero, detenido, amenaza con tirar de la manta: «Tengo un cuaderno con todo». Puedes pagarle o dejarle cantar.',
    left: { label: 'Deja que cante', fx: { m: 0, p: 2, d: 7 }, face: 'caught' },
    right: { label: 'Págale el silencio', fx: { m: -3, p: -3, d: 12 }, face: 'sly' }
  },
  {
    id: 'b_patriarca_2', stage: [2, 3, 4], who: 'baron', tags: ['historia', 'partido'], followup: true,
    text: 'El patriarca regional ha pasado la herencia andorrana a «un sobrino de Suiza». Reclama que le aplaudas y no hables de dinero.',
    left: { label: 'Corta con él', fx: { m: -1, p: 4, d: -3 }, face: 'angry' },
    right: { label: 'Aplaude al abuelo', fx: { m: 2, p: -4, d: 8 }, face: 'sly' }
  },
  {
    id: 'b_mascarillas_2', stage: [2, 3, 4], who: 'detective', tags: ['historia', 'negocio'], followup: true,
    text: 'Un detective trae las facturas de las mascarillas: el intermediario cobró doble y regaló un mazo de billetes al «gestor de compras».',
    left: { label: 'Denuncia el pastel', fx: { m: -1, p: 5, d: -4 }, face: 'happy' },
    right: { label: 'Compra su silencio', fx: { m: -2, p: -1, d: 10 }, face: 'sly' }
  },
  {
    id: 'b_tarjetas_2', stage: [2, 3, 4], who: 'periodista', tags: ['historia', 'lio'], followup: true,
    text: 'Un periodista publica tus gastos con la tarjeta de Caja Mesetonia: un yate, tres sombreros y una cena para treinta «asesores».',
    left: { label: 'Devuelve el dinero', fx: { m: -3, p: 3, d: -6 }, face: 'caught' },
    right: { label: 'Era institucional', fx: { m: 0, p: -5, d: 8 }, face: 'sly',
      news: { h: 'LA TARJETA SIN LÍMITE TIENE YA SU CAFÉ', s: 'Gastos «de representación»: un yate, tres sombreros y ningún recibo' } }
  }
];
