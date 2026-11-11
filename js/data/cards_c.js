// Cartas C: eventos fuertes, líos personales y cartas diarias.
export default [
  // ===================== EVENTOS FUERTES =====================
  {
    id: 'c_toro_encierro', stage: [0, 1], who: 'locutor', tags: ['local', 'fuerte', 'broma'], strong: true,
    text: 'Un toro se escapa del encierro y empitona al alcalde en directo, en plena entrevista. Te piden que des la cara.',
    left: { label: 'Pedir calma', fx: { m: 0, p: 3, d: 0 }, face: 'neutral' },
    right: { label: 'Torear el vídeo', fx: { m: 0.5, p: -2, d: 2 }, face: 'sly',
      news: { h: 'EL TORO YA TIENE MÁS VOTOS QUE EL ALCALDE', s: 'El vídeo suma dos millones de visitas; el alcalde, doce puntos de sutura' } }
  },
  {
    id: 'c_paella_gigante', stage: [0, 1], who: 'pena', tags: ['local', 'fuerte', 'crisis'], strong: true,
    text: 'La paella gigante del récord intoxica a medio pueblo. Cola kilométrica en los baños portátiles. Huele a dimisión.',
    left: { label: 'Culpar al arroz', fx: { m: 0, p: -4, d: 3 }, face: 'sly' },
    right: { label: 'Pagar los lavabos', fx: { m: -1.5, p: 4, d: 0 }, face: 'caught',
      news: { h: 'RÉCORD MUNDIAL DE DIARREA COLECTIVA', s: 'Secanía bate la marca mundial de cola ante un retrete portátil' } }
  },
  {
    id: 'c_ministro_monteria', stage: [2, 3], who: 'ministro', tags: ['nacional', 'fuerte', 'negocio'], strong: true,
    text: 'En una montería con empresarios, un ministro dispara a un ojeador. «Se cruzó», dice. Hay testigos y mucha trufa.',
    left: { label: 'Exigir su cese', fx: { m: -1, p: 5, d: 0 }, face: 'angry' },
    right: { label: 'Cobrar silencio', fx: { m: 4, p: -6, d: 14 }, face: 'sly',
      news: { h: 'MONTERÍA SANGRIENTA: EL OJEADOR, «DAÑO COLATERAL»', s: 'El ministro asegura que apuntaba a un jabalí con corbata' } }
  },
  {
    id: 'c_yate_cerdo', stage: [3, 4], who: 'periodista', tags: ['nacional', 'fuerte', 'medios'], strong: true,
    text: 'Salen las fotos de tu juerga en yate: sustancias, barro y un cerdo vivo con collar de oro. El cerdo sale mejor que tú.',
    left: { label: 'Negarlo todo', fx: { m: -1, p: -8, d: 8 }, face: 'caught' },
    right: { label: 'Adoptar al cerdo', fx: { m: -0.5, p: 6, d: 4 }, face: 'sly',
      news: { h: 'EL CERDO DEL YATE, NUEVO ASESOR DE IMAGEN', s: 'Fuentes del Palacio Presidencial: «Es el único que no ha mentido»' } }
  },
  {
    id: 'c_tesorero_escaleras', stage: [2, 3], who: 'tesorero', tags: ['partido', 'fuerte', 'crisis'], strong: true,
    text: 'El tesorero iba a declarar mañana y se «cae» por las escaleras. Tropezó, dice la nota. Cuatro veces y de espaldas.',
    left: { label: 'Mandar flores', fx: { m: 0, p: -2, d: 3 }, face: 'neutral' },
    right: { label: 'Exigir investigación', fx: { m: -1, p: 5, d: -4 }, face: 'angry',
      news: { h: 'EL TESORERO «SE CAE» POR LAS ESCALERAS', s: 'Las escaleras, que son de granito, niegan su implicación' } }
  },
  {
    id: 'c_puente_inauguracion', stage: [1, 2], who: 'constructora', tags: ['nacional', 'fuerte', 'negocio'], strong: true,
    text: 'El puente se hunde en la inauguración, con toda la comitiva encima. Estáis chapoteando con cinta y tijeras.',
    left: { label: 'Culpar al anterior', fx: { m: 0.5, p: -3, d: 5 }, face: 'sly' },
    right: { label: 'Reconocer el fallo', fx: { m: -2, p: 6, d: 0 }, face: 'caught',
      news: { h: 'EL PUENTE INAUGURADO DURÓ CUATRO MINUTOS', s: 'La constructora lo califica de «prueba de carga a escala real»' } }
  },
  {
    id: 'c_fosa_septica_mitin', stage: [0, 1], who: 'asesor', tags: ['local', 'fuerte', 'campana'], strong: true,
    text: 'La fosa séptica del polideportivo revienta en pleno mitin. Borja susurra: «Jefe, esto es un tema de aroma de campaña».',
    left: { label: 'Seguir el discurso', fx: { m: 0, p: 4, d: 0 }, face: 'happy' },
    right: { label: 'Evacuar con dignidad', fx: { m: -0.5, p: -3, d: 0 }, face: 'caught' }
  },
  {
    id: 'c_concurso_morcilla', stage: [0, 1, 2], who: 'pena', tags: ['local', 'fuerte', 'broma'], strong: true,
    text: 'Te retan al concurso de comer morcilla de las fiestas. Cámaras, arcadas morales y un cubo discreto a tu espalda.',
    left: { label: 'Declinar con tacto', fx: { m: 0, p: -3, d: 0 }, face: 'neutral' },
    right: { label: 'Comer hasta reventar', fx: { m: 0, p: 7, d: 0 }, face: 'happy' }
  },
  {
    id: 'c_camara_bano', stage: [2, 3], who: 'detective', tags: ['nacional', 'fuerte', 'medios'], strong: true,
    text: 'Un detective halla una cámara oculta en el baño de tu despacho. Lleva meses grabando. Ya sabes lo que implica.',
    left: { label: 'Comprar las cintas', fx: { m: -3, p: 0, d: 8 }, face: 'sly' },
    right: { label: 'Denunciar el espionaje', fx: { m: -1, p: 4, d: 4 }, face: 'angry',
      news: { h: 'ESPIADO EN EL RETRETE: «NO HAY NADA QUE OCULTAR»', s: 'Las cintas, dicen, solo muestran lectura de contratos' } }
  },
  {
    id: 'c_gala_angulas', stage: [4], who: 'extranjero', tags: ['internacional', 'fuerte', 'crisis'], strong: true,
    text: 'En la cena de gala de la cumbre, el líder extranjero vomita las angulas sobre tu discurso. Todos miran tu reacción.',
    left: { label: 'Reír la gracia', fx: { m: 0.5, p: 4, d: 0 }, face: 'happy' },
    right: { label: 'Pedir un traje nuevo', fx: { m: -1, p: -4, d: 2 }, face: 'angry' }
  },
  {
    id: 'c_fuegos_sobres', stage: [3, 4], who: 'tesorero', tags: ['partido', 'fuerte', 'crisis'], strong: true,
    text: 'Los fuegos artificiales incendian la caseta del partido. Arde la contabilidad B. El tesorero llora sobre las cenizas.',
    left: { label: 'Apagar con champán', fx: { m: 0, p: 2, d: -8 }, face: 'sly' },
    right: { label: 'Salvar lo que quede', fx: { m: 3, p: -5, d: 12 }, face: 'caught' }
  },

  {
    id: 'c_sauna_baron', stage: [1, 2], who: 'baron', tags: ['nacional', 'fuerte', 'negocio'], strong: true,
    text: 'El barón te cierra un pelotazo en una sauna, todos desnudos y con puro. De pronto entra un fotógrafo. Y se queda.',
    left: { label: 'Taparte con el puro', fx: { m: 3, p: -5, d: 11 }, face: 'caught',
      news: { h: 'PELOTAZO EN LA SAUNA: LOS CONTRATOS, TAMBIÉN EN TOALLA', s: 'El barón niega todo; el vapor, también' } },
    right: { label: 'Salir por patas', fx: { m: 0, p: -3, d: 2 }, face: 'angry' }
  },

  // ===================== LÍOS PERSONALES =====================
  {
    id: 'c_lio_periodista', stage: [1, 2, 3], who: 'periodista', tags: ['lio', 'medios'], strong: false,
    text: 'Una periodista muy simpática te propone «seguir la conversación» en su casa. A cambio, buena prensa. Y algo más.',
    left: { label: 'Declinar', fx: { m: 0, p: -2, d: 0 }, face: 'neutral' },
    right: { label: 'Aceptar la copa', fx: { m: 0.5, p: 4, d: 8 }, face: 'sly' }
  },
  {
    id: 'c_lio_fotos_fiesta', stage: [1, 2, 3, 4], who: 'chantajista', tags: ['lio', 'crisis'], strong: false,
    text: 'Alguien tiene fotos de la fiesta del otro día. Quiere dinero por no publicarlas. Tú no recuerdas ni cómo llegaste a casa.',
    left: { label: 'Pagar y callar', fx: { m: -2, p: 0, d: 5 }, face: 'caught' },
    right: { label: 'Que las publique', fx: { m: 0, p: -9, d: 3 }, face: 'angry' }
  },
  {
    id: 'c_lio_ex_tele', stage: [2, 3], who: 'presentadora', tags: ['lio', 'medios'], strong: false,
    text: 'Tu ex amenaza con contarlo todo en un programa de la tele. Tú también tienes cosas que contar, pero cobra menos.',
    left: { label: 'Cederle un enchufe', fx: { m: -1, p: 0, d: 8, e: 1 }, face: 'sly' },
    right: { label: 'Dejar que hable', fx: { m: 0.5, p: -7, d: 6 }, face: 'angry' }
  },
  {
    id: 'c_lio_cunado_negocios', stage: [0, 1, 2], who: 'cunado', tags: ['lio', 'negocio'], strong: false,
    text: 'Tu cuñado anda cerrando negocios «de tu parte». Ya ha vendido tu firma dos veces. Te trae un sobre, por si acaso.',
    left: { label: 'Pararle los pies', fx: { m: -0.5, p: 2, d: 0 }, face: 'angry' },
    right: { label: 'Quedarte el sobre', fx: { m: 3, p: -3, d: 12 }, face: 'sly' }
  },
  {
    id: 'c_lio_rumor_rival', stage: [1, 2, 3, 4], who: 'asesor', tags: ['lio', 'partido'], strong: false,
    text: 'Borja propone soltar un rumor sobre tu rival: «No hace falta que sea verdad, jefe. Solo que suene creíble y huela mal».',
    left: { label: 'Prohibir el bulo', fx: { m: 0, p: 3, d: 0 }, face: 'neutral' },
    right: { label: 'Soltar el rumor', fx: { m: 1, p: 2, d: 9 }, face: 'sly' }
  },

  // ===================== CARTAS DIARIAS =====================
  {
    id: 'c_dia_luz', stage: 'any', who: 'ciudadano', tags: ['diaria'], daily: true,
    text: 'El recibo de la luz vuelve a subir. Hay quien ya cena a oscuras «por romanticismo». Te piden medidas.',
    left: { label: 'Rebajar el IVA', fx: { m: -1, p: 5, d: 0 }, face: 'happy',
      news: { h: 'LA LUZ BAJA UN 2 %: AHORA SE VE LA FACTURA', s: 'Las eléctricas anuncian un «ajuste técnico» para compensar' } },
    right: { label: 'Pedir apagar luces', fx: { m: 0, p: -4, d: 0 }, face: 'neutral',
      news: { h: 'EL GOBIERNO PIDE AHORRAR: «SIEMPRE QUEDAN VELAS»', s: 'Las velas suben un 40 % en una semana' } }
  },
  {
    id: 'c_dia_puente', stage: 'any', who: 'sindicalista', tags: ['diaria'], daily: true,
    text: 'Llega el puente de diciembre y todos piden el día intermedio libre. La oficina parece un cementerio con cafetera.',
    left: { label: 'Dar el día libre', fx: { m: -1, p: 6, d: 0 }, face: 'happy',
      news: { h: 'PUENTE DE DICIEMBRE: ESPAÑA, CERRADA POR REFLEXIÓN', s: 'La productividad, de acuerdo: nadie la ha visto desde el lunes' } },
    right: { label: 'Que trabajen', fx: { m: 0.5, p: -5, d: 0 }, face: 'angry',
      news: { h: 'TRABAJAR EN EL PUENTE: UN HEROÍSMO SIN APLAUSOS', s: 'Los funcionarios de guardia piden un museo en su honor' } }
  },
  {
    id: 'c_dia_cena_empresa', stage: 'any', who: 'empresario', tags: ['diaria', 'negocio'], daily: true,
    text: 'Cena de empresa navideña: barra libre, un jefe cantando y tres becarios llorando. Te invitan de «invitado sorpresa».',
    left: { label: 'Ir y brindar', fx: { m: 0.5, p: 3, d: 2 }, face: 'sly',
      news: { h: 'EL POLÍTICO DE LA CENA CANTÓ Y SE SUBIÓ A LA MESA', s: 'Los becarios aseguran que la mesa no resistió' } },
    right: { label: 'Excusarte', fx: { m: 0, p: -2, d: 0 }, face: 'neutral',
      news: { h: 'EL POLÍTICO NO VA A LA CENA: «TENÍA PLANES DE CHAT»', s: 'La empresa cancela el karaoke por falta de víctimas' } }
  },
  {
    id: 'c_dia_ola_calor', stage: 'any', who: 'medico', tags: ['diaria', 'crisis'], daily: true,
    text: 'Ola de calor: 44 grados y las fuentes echan agua tibia. Los ancianos piden sombra y los turistas, helado.',
    left: { label: 'Abrir piscinas', fx: { m: -1.5, p: 6, d: 0 }, face: 'happy',
      news: { h: 'PISCINAS PÚBLICAS ABIERTAS: «SALIMOS DE LA PARRILLA»', s: 'El agua sube un grado de temperatura por culpa del respetable' } },
    right: { label: 'Pedir «mentalizarse»', fx: { m: 0, p: -6, d: 0 }, face: 'angry',
      news: { h: '«ES VERANO», DICE EL POLÍTICO DESDE EL AIRE ACONDICIONADO', s: 'Su despacho marca 19 grados, por si alguien se lo pregunta' } }
  },
  {
    id: 'c_dia_ave', stage: 'any', who: 'ciudadano', tags: ['diaria', 'nacional'], daily: true,
    text: 'El AVE llega con tres horas de retraso otra vez. Los viajeros ya han montado un chiringuito en el andén.',
    left: { label: 'Pedir perdón', fx: { m: 0, p: 3, d: 0 }, face: 'caught',
      news: { h: 'EL AVE PIDE PERDÓN POR ESCRITO: LLEGA EL MARTES', s: 'La carta, enviada por tren, aún no ha llegado' } },
    right: { label: 'Echar la culpa al viento', fx: { m: 0.5, p: -3, d: 1 }, face: 'sly',
      news: { h: 'EL AVE LLEGA TARDE POR «UNA HOJA EN LA VÍA»', s: 'La hoja, citada a declarar, se niega a hacer declaraciones' } }
  },
  {
    id: 'c_dia_mundial', stage: 'any', who: 'futbol', tags: ['diaria', 'nacional'], daily: true,
    text: 'Arranca el Mundial y el país entero finge saber de fútbol. Hay que decidir si la oficina se queda a ver el partido.',
    left: { label: 'Pantalla en el salón', fx: { m: -0.5, p: 6, d: 0 }, face: 'happy',
      news: { h: 'ESPAÑA SE PARALIZA: «ESTO ES POR EL PAÍS»', s: 'Los asesores ya calculan la mayoría absoluta en caso de penalti' } },
    right: { label: 'Todos a currar', fx: { m: 0.5, p: -5, d: 0 }, face: 'angry',
      news: { h: 'ABUCHEOS AL POLÍTICO ANTIFÚTBOL', s: 'Sus hijos aseguran que lo oyeron gritar gol a escondidas' } }
  },
  {
    id: 'c_dia_impuestos', stage: 'any', who: 'ministro', tags: ['diaria', 'nacional'], daily: true,
    text: 'Anuncias una bajada de impuestos. Hacienda explica que solo baja en teoría, y que «el sentimiento de bajada» es gratis.',
    left: { label: 'Anunciarla a bombo', fx: { m: 0, p: 6, d: 2 }, face: 'sly',
      news: { h: 'LA BAJADA DE IMPUESTOS NO BAJA: «ESTÁ EN EL ASCENSOR»', s: 'Hacienda confirma que baja el IVA… del chicle sin azúcar' } },
    right: { label: 'Subirlos y callar', fx: { m: 2, p: -7, d: 0 }, face: 'caught',
      news: { h: 'SUBEN LOS IMPUESTOS: «ES UNA BAJADA INVERSA»', s: 'El ministro explica la mecánica con una calculadora rota' } }
  },
  {
    id: 'c_dia_horario', stage: 'any', who: 'tertuliana', tags: ['diaria', 'medios'], daily: true,
    text: 'Vuelve el debate eterno: ¿cambiar la hora en verano? Las tertulias lo tratan como si fuera una guerra civil con relojes.',
    left: { label: 'Mantener el cambio', fx: { m: 0, p: -2, d: 0 }, face: 'neutral',
      news: { h: 'SE MANTIENE EL CAMBIO DE HORA: EL PAÍS SIGUE EN VELA', s: 'Las gallinas piden un referéndum y un café doble' } },
    right: { label: 'Abolir el cambio', fx: { m: -0.5, p: 4, d: 0 }, face: 'happy',
      news: { h: 'SE ACABA EL CAMBIO DE HORA: «POR FIN DUERMO EN OTOÑO»', s: 'Los relojes de cuco anuncian una huelga indefinida' } }
  },
  {
    id: 'c_dia_oposiciones', stage: 'any', who: 'joven', tags: ['diaria', 'nacional'], daily: true,
    text: 'Convocan unas oposiciones con 40 plazas y 900.000 aspirantes. Un opositor te pide «una ayudita» para hoy mismo.',
    left: { label: 'Mover un hilo', fx: { m: 1, p: -4, d: 7, e: 1 }, face: 'sly',
      news: { h: 'OPOSICIONES TRUCADAS: «TRES SE SABÍAN LAS PREGUNTAS»', s: 'Los tres opositores eran sobrinos del tribunal, qué casualidad' } },
    right: { label: 'Ánimo y a estudiar', fx: { m: 0, p: 3, d: 0 }, face: 'neutral',
      news: { h: 'EL POLÍTICO ANIMA A LOS OPOSITORES: «YO HICE UN MÁSTER»', s: 'El máster, aclaran, fue de dos fines de semana' } }
  },
  {
    id: 'c_dia_vivienda', stage: 'any', who: 'joven', tags: ['diaria', 'nacional'], daily: true,
    text: 'Un chaval cobra 1.100 € y le piden 1.200 de alquiler por un cuarto con vistas a otro cuarto. Pide que hagas algo.',
    left: { label: 'Topar alquileres', fx: { m: -1, p: 6, d: 0 }, face: 'happy',
      news: { h: 'ALQUILERES TOPADOS: «LOS PISOS SE ALQUILAN CON PRISA»', s: 'Los propietarios descubren de golpe el alquiler «por habitaciones»' } },
    right: { label: 'Prometer pisos', fx: { m: 0.5, p: -3, d: 2 }, face: 'sly',
      news: { h: '«LOS PISOS LLEGARÁN»: EL POLÍTICO LO REPITE POR SÉPTIMA VEZ', s: 'Los pisos, en cambio, no han confirmado asistencia' } }
  },
  {
    id: 'c_dia_patinetes', stage: 'any', who: 'vecina', tags: ['diaria', 'local'], daily: true,
    text: 'Los patinetes eléctricos campan por las aceras. Una vecina te muestra su bastón: «Ya he esquivado tres hoy».',
    left: { label: 'Multar a los patinetes', fx: { m: 1, p: -3, d: 0 }, face: 'angry',
      news: { h: 'GUERRA A LOS PATINETES: MULTAS Y TIRONES DE OREJAS', s: 'Los patinetes ya han recurrido; dos están en el juzgado' } },
    right: { label: 'Carril para patinetes', fx: { m: -1.5, p: 4, d: 0 }, face: 'happy',
      news: { h: 'NACE EL CARRIL PATINETE: SOLO 3 KM Y UNA ROTONDA', s: 'Los peatones piden un carril para ellos mismos' } }
  },
  {
    id: 'c_dia_padel', stage: 'any', who: 'empresario', tags: ['diaria', 'negocio'], daily: true,
    text: 'Fiebre del pádel: pistas en cada solar y todos los cuñados con raqueta. Un empresario quiere pista en la plaza mayor.',
    left: { label: 'Dar la licencia', fx: { m: 2, p: 2, d: 6 }, face: 'sly',
      news: { h: 'LA PLAZA MAYOR SE ESTRENA CON PISTA DE PÁDEL', s: 'Los vecinos aplauden. La estatua, ya de rodillas, no tiene opinión' } },
    right: { label: 'Dejar la plaza', fx: { m: -0.5, p: 3, d: 0 }, face: 'neutral',
      news: { h: 'LA PLAZA SE QUEDA SIN PÁDEL: LUTO EN LAS CERVECERÍAS', s: 'Los cuñados prometen una manifestación con zapatillas de pádel' } }
  },
  {
    id: 'c_dia_loteria', stage: 'any', who: 'ciudadano', tags: ['diaria', 'broma'], daily: true,
    text: 'Lotería de Navidad: tu partido ha comprado un décimo «para el bien común». Hay quien sospecha que ya conocen el número.',
    left: { label: 'Repartir el premio', fx: { m: 0.5, p: 5, d: 0 }, face: 'happy',
      news: { h: 'EL GORDO CAE EN LA SEDE DEL PARTIDO: «ES CASUALIDAD»', s: 'El tesorero llega al reparto con maletín y cara de póquer' } },
    right: { label: 'Guardarlo «a cuenta»', fx: { m: 3, p: -5, d: 8 }, face: 'sly',
      news: { h: 'EL GORDO DESAPARECE «A CUENTA» DEL PARTIDO', s: 'La Hacienda del partido jura que el décimo se lo comió un perro' } }
  },
  {
    id: 'c_dia_influencer', stage: 'any', who: 'influencer', tags: ['diaria', 'medios', 'campana'], daily: true,
    text: 'Una influencer con 3 millones de seguidores se presenta a las elecciones. Su programa: «vibras». Te pide un apoyo.',
    left: { label: 'Apoyarla', fx: { m: 0.5, p: 5, d: 2 }, face: 'happy',
      news: { h: 'LA INFLUENCER DE LAS VIBRAS SUMA MIL MILLONES DE «ME GUSTA»', s: 'Sus votantes aún no saben dónde se vota' } },
    right: { label: 'Criticarla', fx: { m: 0, p: -4, d: 0 }, face: 'angry',
      news: { h: 'EL POLÍTICO LLAMA «FRÍVOLA» A LA INFLUENCER; ELLA LE BLOQUEA', s: 'Tendencia en redes: #FueraElCarca durante nueve horas' } }
  }
];
