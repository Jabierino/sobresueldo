// Agenda de contactos. m en unidades de la etapa del contacto.
export default [
  // ---- Etapa 0: Concejal ----
  {
    id: 'ct_vecina_encarna', stage: 0, who: 'vecina',
    name: 'Encarna «la Fiscal del Rellano»', role: 'Vecina pesada', graba: false,
    ask:   { label: 'Pedir que te defienda', text: 'Encarna jura en la peluquería que eres un santo. Y lo repite doce veces.', fx: { p: 6, d: 1 } },
    offer: { label: 'Ofrecer arreglar su farola', text: 'Farola nueva. Encarna deja de llamarte a las 7 de la mañana. Casi.', fx: { p: 3 } }
  },
  {
    id: 'ct_constructor_paco', stage: 0, who: 'constructor',
    name: 'Paco «el del Ladrillo»', role: 'Constructor del pueblo', graba: false,
    ask:   { label: 'Pedir un sobrecito', text: 'Paco te pasa un sobre «para la campaña». Dentro hay otro sobre.', fx: { m: 3, d: 8 } },
    offer: { label: 'Ofrecer el polideportivo', text: 'Paco se lleva la obra. Tú, una comisión y una sonrisa.', fx: { m: 1.5, p: -1, d: 5 } }
  },
  {
    id: 'ct_cura_don_anselmo', stage: 0, who: 'cura',
    name: 'Don Anselmo «Bendito sea el IBI»', role: 'Cura del pueblo', graba: false,
    ask:   { label: 'Pedir un sermón a tu favor', text: 'Don Anselmo te pone de ejemplo en misa. Los fieles aplauden, qué raro.', fx: { p: 7, d: 1 } },
    offer: { label: 'Ofrecer reformar la ermita', text: 'Se arregla el tejado con dinero público. Dios lo ve todo, tú también.', fx: { m: -1, p: 6 } }
  },
  {
    id: 'ct_pena_manolo', stage: 0, who: 'pena',
    name: 'Manolo «Tres Copas»', role: 'Presidente de la peña', graba: false,
    ask:   { label: 'Pedir el voto de la peña', text: 'La peña vota lo que Manolo diga. Y Manolo dice lo que le pagues.', fx: { p: 8, d: 3 } },
    offer: { label: 'Ofrecer barra libre', text: 'Barra libre con dinero municipal. Nadie recuerda qué votó.', fx: { p: 4 } }
  },
  {
    id: 'ct_periodista_loli', stage: 0, who: 'periodista',
    name: 'Loli «Primicia» Vázquez', role: 'Periodista del diario local', graba: true,
    ask:   { label: 'Pedir portada y silencio', text: 'Portada tuya con foto favorecedora. Loli tiene la grabadora encendida.', fx: { m: 2, d: 7 } },
    offer: { label: 'Ofrecer publicidad municipal', text: 'El ayuntamiento compra media página al mes. El periodismo libre cuesta caro.', fx: { m: 1, d: 4 } }
  },
  {
    id: 'ct_policia_rogelio', stage: 0, who: 'policia',
    name: 'Jefe Rogelio «Multa Cero»', role: 'Jefe de la policía local', graba: false,
    ask:   { label: 'Pedir que archive tus multas', text: 'Rogelio pierde el expediente. Y el expediente de tu expediente.', fx: { m: -1, d: -9 } },
    offer: { label: 'Ofrecer coche patrulla nuevo', text: 'Rogelio estrena coche con sirena de discoteca. Te debe una.', fx: { m: -1, p: 6 } }
  },

  // ---- Etapa 1: Alcalde ----
  {
    id: 'ct_empresario_ramon', stage: 1, who: 'empresario',
    name: 'Ramón «Pelotazo» Cienfuegos', role: 'Empresario de la comarca', graba: false,
    ask:   { label: 'Pedir comisión por recalif.', text: 'Ramón te entrega «un detalle» por convertir un olivar en urbanización.', fx: { m: 4, d: 12 } },
    offer: { label: 'Ofrecer enchufe en pliego', text: 'El concurso lo gana, casualmente, el único que se presentó: Ramón.', fx: { m: 2, d: 8 } }
  },
  {
    id: 'ct_diputacion_gervasio', stage: 1, who: 'diputacion',
    name: 'Gervasio «Subvención» Ortuño', role: 'Presidente de la diputación', graba: false,
    ask:   { label: 'Pedir una subvención', text: 'Gervasio te regala una rotonda con pulpo. El pueblo te aclama.', fx: { p: 7, d: 2 } },
    offer: { label: 'Ofrecer tu apoyo en el pleno', text: 'Votas lo que Gervasio quiere. Él te devuelve el favor con una fuente.', fx: { p: 3 } }
  },
  {
    id: 'ct_futbol_chema', stage: 1, who: 'futbol',
    name: 'Chema «Fichaje» Montoya', role: 'Presidente del club de fútbol', graba: false,
    ask:   { label: 'Pedir palco y bufanda', text: 'Sales en el palco con bufanda. El equipo pierde, pero tú ganas simpatía.', fx: { p: 6, d: 1 } },
    offer: { label: 'Ofrecer el estadio nuevo', text: 'Estadio faraónico con tu nombre en la grada. Lo pagan los vecinos.', fx: { m: -1, p: 6 } }
  },
  {
    id: 'ct_obispo_eusebio', stage: 1, who: 'obispo',
    name: 'Monseñor Eusebio «Amén y Pasta»', role: 'Obispo', graba: false,
    ask:   { label: 'Pedir una absolución exprés', text: 'Eusebio te perdona los pecados al por mayor. Hasta los de IVA.', fx: { m: -2, d: -9 } },
    offer: { label: 'Ofrecer exención del IBI', text: 'La diócesis no paga IBI. El Señor lo tenía previsto.', fx: { m: -1, p: 4 } }
  },
  {
    id: 'ct_caja_arturo', stage: 1, who: 'caja',
    name: 'Arturo «Preferentes» Cantalejo', role: 'Director de la caja de ahorros', graba: false,
    ask:   { label: 'Pedir un crédito «blando»', text: 'Arturo te concede un crédito sin avales. Y sin intención de cobrarlo.', fx: { m: 3, d: 9 } },
    offer: { label: 'Ofrecer sillón en consejo', text: 'Arturo pone a tu cuñado en el consejo. Sueldo: dietas y cava.', fx: { m: 1.5, d: 6 } }
  },

  // ---- Etapa 2: Diputado ----
  {
    id: 'ct_consejera_marisa', stage: 2, who: 'consejera',
    name: 'Marisa «Convenio» Bermejo', role: 'Consejera autonómica', graba: false,
    ask:   { label: 'Pedir un contrato a dedo', text: 'Marisa adjudica «emergencia sanitaria» a tu amigo. No hay emergencia.', fx: { m: 3, d: 10 } },
    offer: { label: 'Ofrecer voto a presupuestos', text: 'Votas sí a lo que no has leído. Marisa te recompensa con una consultoría.', fx: { m: 1.5, d: 6 } }
  },
  {
    id: 'ct_patronal_cayetano', stage: 2, who: 'patronal',
    name: 'Cayetano «Reforma Laboral» Urquiza', role: 'Presidente de la patronal', graba: false,
    ask:   { label: 'Pedir financiar tu campaña', text: 'La patronal te paga la campaña. A cambio, una ley «a medida».', fx: { m: 4, d: 11 } },
    offer: { label: 'Ofrecer una rebaja fiscal', text: 'Rebajas el impuesto a los de siempre. Cayetano te invita a comer.', fx: { m: 2, p: -2, d: 7 } }
  },
  {
    id: 'ct_sindicalista_nacho', stage: 2, who: 'sindicalista',
    name: 'Nacho «Liberado» Pedraza', role: 'Sindicalista', graba: false,
    ask:   { label: 'Pedir que pare la huelga', text: 'Nacho te salva del paro general. Se le ve feliz en su viaje a Cancún.', fx: { p: 6, d: 2 } },
    offer: { label: 'Ofrecer subvención formativa', text: 'Cursos de formación con catering y sin alumnos. La clase obrera avanza.', fx: { p: 3 } }
  },
  {
    id: 'ct_locutor_javi', stage: 2, who: 'locutor',
    name: 'Javi «Madrugón» Cardenal', role: 'Locutor de radio', graba: true,
    ask:   { label: 'Pedir entrevista a medida', text: 'Javi te hace las preguntas que le dictas. Y graba las que no le dictas.', fx: { p: 6, d: 3 } },
    offer: { label: 'Ofrecer exclusiva del pacto', text: 'Le filtras un pacto secreto. Javi lo cuenta en antena. Ya no es secreto.', fx: { p: 3, d: 2 } }
  },
  {
    id: 'ct_juez_serafin', stage: 2, who: 'juez',
    name: 'Serafín «Prescribe» Valdivieso', role: 'Juez del tribunal regional', graba: false,
    ask:   { label: 'Pedir que prescriba tu caso', text: 'Serafín descubre un defecto de forma: faltaba una coma. Caso cerrado.', fx: { m: -2, d: -11 } },
    offer: { label: 'Ofrecer un ascenso', text: 'Serafín sube de escalafón. Tú, de reputación en los juzgados.', fx: { m: -1, p: 6 } }
  },

  // ---- Etapa 3: Líder del partido ----
  {
    id: 'ct_baron_telesforo', stage: 3, who: 'baron',
    name: 'Telesforo «Puro y Duro» Mondéjar', role: 'Barón territorial', graba: false,
    ask:   { label: 'Pedir lealtad por las listas', text: 'El barón te apoya a cambio de colocar a medio pueblo en las listas.', fx: { m: 3, d: 8 } },
    offer: { label: 'Ofrecer cargo a su yerno', text: 'El yerno gestiona la consejería de Cultura. No sabe leer partituras.', fx: { m: 1.5, d: 6 } }
  },
  {
    id: 'ct_tesorero_bartolo', stage: 3, who: 'tesorero',
    name: 'Bartolo «el Maletín» Lupiáñez', role: 'Tesorero del partido', graba: true,
    ask:   { label: 'Pedir un sobre de la caja B', text: 'Bartolo abre el maletín. Hay más billetes que en un cajero de Andorra.', fx: { m: 4, d: 12 } },
    offer: { label: 'Ofrecer firmar sin mirar', text: 'Firmas las cuentas sin leerlas. Bartolo sonríe y anota tu huella.', fx: { m: 2, d: 8 } }
  },
  {
    id: 'ct_magnate_ignacio', stage: 3, who: 'magnate',
    name: 'Ignacio «Yate Grande» Albarrán', role: 'Gran empresario', graba: false,
    ask:   { label: 'Pedir un viaje en su yate', text: 'Semana en el yate «Transparencia». No hay cámaras. Hay jacuzzi.', fx: { m: 3, d: 9 } },
    offer: { label: 'Ofrecer decreto a medida', text: 'El boletín oficial publica un decreto que solo beneficia a Ignacio. Casualidad.', fx: { m: 2, d: 7 } }
  },
  {
    id: 'ct_tertuliana_cayetana', stage: 3, who: 'tertuliana',
    name: 'Cayetana «Opino de Todo» Salazar', role: 'Tertuliana de televisión', graba: false,
    ask:   { label: 'Pedir que hable bien de ti', text: 'Cayetana te defiende a gritos en tres tertulias. Nadie entiende por qué.', fx: { p: 7, d: 2 } },
    offer: { label: 'Ofrecer filtración jugosa', text: 'Le filtras un chisme sobre el rival. Ella lo convierte en telenovela.', fx: { p: 4 } }
  },
  {
    id: 'ct_director_ildefonso', stage: 3, who: 'director',
    name: 'Ildefonso «Línea Editorial» Quesada', role: 'Director de periódico', graba: true,
    ask:   { label: 'Pedir enterrar un reportaje', text: 'El reportaje cae a la página 47, entre el tiempo y los crucigramas.', fx: { m: -1, d: -10 } },
    offer: { label: 'Ofrecer publicidad oficial', text: 'El periódico recibe campañas públicas. Tú, titulares cariñosos.', fx: { m: -1, p: 6 } }
  },

  // ---- Etapa 4: Presidente ----
  {
    id: 'ct_banquero_emilio', stage: 4, who: 'banquero',
    name: 'Emilio «Rescate» Barrica', role: 'Banquero', graba: true,
    ask:   { label: 'Pedir un crédito perdonado', text: 'Emilio te perdona la hipoteca del chalé. El rescate lo pagan los contribuyentes.', fx: { m: 3, d: 10 } },
    offer: { label: 'Ofrecer un rescate bancario', text: 'Rescatas al banco con dinero público. Emilio te promete un consejo al salir.', fx: { m: 1.5, p: -4, d: 7 } }
  },
  {
    id: 'ct_constructora_pilar', stage: 4, who: 'constructora',
    name: 'Pilar «Hormigón Armado» Echeverría', role: 'Presidenta de una gran constructora', graba: false,
    ask:   { label: 'Pedir un tanto por el AVE', text: 'Pilar suelta un 3% por el AVE a ninguna parte. Llegó tarde. A un pueblo vacío.', fx: { m: 4, d: 12 } },
    offer: { label: 'Ofrecer la obra del siglo', text: 'Adjudicas una autopista sin coches. Pilar la inaugura con cava.', fx: { m: 2, d: 8 } }
  },
  {
    id: 'ct_supremo_hilario', stage: 4, who: 'supremo',
    name: 'Hilario «Casación» Mendiola', role: 'Juez del Tribunal Supremo', graba: false,
    ask:   { label: 'Pedir que tumbe tu sumario', text: 'Hilario anula las escuchas por un «vicio de nulidad». Nadie sabe cuál.', fx: { m: -2, d: -12 } },
    offer: { label: 'Ofrecer presidir el tribunal', text: 'Hilario preside la sala. Te debe una. Y tú, una sentencia a tu medida.', fx: { m: -1, p: 6 } }
  },
  {
    id: 'ct_embajador_alvaro', stage: 4, who: 'embajador',
    name: 'Álvaro «Cóctel» de la Puerta', role: 'Embajador', graba: false,
    ask:   { label: 'Pedir una recepción de gala', text: 'Álvaro te monta una cena de gala. Sales con cara de estadista, aunque pidas pizza.', fx: { p: 6, d: 1 } },
    offer: { label: 'Ofrecer destino a su sobrina', text: 'La sobrina de Álvaro, agregada cultural en Bora Bora. Cultura: cero.', fx: { p: 3 } }
  },
  {
    id: 'ct_extranjero_viktor', stage: 4, who: 'extranjero',
    name: 'Viktor «Gasoducto» Petrescu', role: 'Líder extranjero', graba: false,
    ask:   { label: 'Pedir una foto en la cumbre', text: 'Foto con el líder extranjero. Sales de estadista, aunque no sepas qué firmaste.', fx: { p: 7, d: 2 } },
    offer: { label: 'Ofrecer tratado de amistad', text: 'Firmas un tratado de amistad. Nadie lo ha leído, ni siquiera tú.', fx: { p: 4 } }
  },
  {
    id: 'ct_comisaria_ingrid', stage: 4, who: 'comisaria',
    name: 'Ingrid «Fondos Mágicos» Van der Plata', role: 'Comisaria europea', graba: false,
    ask:   { label: 'Pedir fondos europeos', text: 'Bruselas te manda mil millones. Los gastas en rotondas y pulpos.', fx: { p: 8, d: 3 } },
    offer: { label: 'Ofrecer cumplir el déficit', text: 'Prometes cumplir el déficit. Ingrid sonríe, sabe que mientes.', fx: { m: -1, p: 6 } }
  }
];
