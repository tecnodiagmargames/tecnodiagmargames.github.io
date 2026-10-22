// ============================================================
//  JUEGOS DE TECNODIAGMARGAMES — solo datos
//  Para añadir un juego: copia un bloque { ... }, cambia los textos
//  y pon sus imágenes en img/<id>/.
//
//  estado:  "disponible"  -> muestra el botón de Google Play (necesita playUrl)
//           "prueba"      -> "En prueba cerrada" (botón desactivado)
//           "desarrollo"  -> "En desarrollo"
//           "secreto"     -> tarjeta misteriosa (sin detalles)
//
//  Cuando Orbit Dash esté publicado: pon estado: "disponible" y
//  playUrl: "https://play.google.com/store/apps/details?id=com.tecnodiagmar.orbitdash"
// ============================================================

const ESTUDIO = {
  nombre: "TecnoDiagmarGames",
  correo: "tecnodiagmarch@gmail.com",
};

const JUEGOS = [
  {
    id: "orbit-dash",
    nombre: "Orbit Dash",
    lema: "Salta entre órbitas, esquiva rojos y atrapa orbes en un reto de reflejos neón.",
    estado: "prueba",
    playUrl: "",
    plataforma: "Android",
    genero: "Arcade · Reflejos",
    color: "#22e5ff",
    icono: "img/orbit-dash/icono.png",
    portada: "img/orbit-dash/portada.png",
    privacidad: "https://proelmas601.github.io/orbit-dash-privacy/",
    descripcion: [
      "Tu bolita gira sin parar alrededor de un planeta: toca para saltar de órbita, atrapa los orbes amarillos y esquiva los rojos. Fácil de aprender, difícil de dominar.",
      "Se juega con una mano, sin conexión y en partidas cortas de 2 a 5 minutos.",
    ],
    caracteristicas: [
      { titulo: "Modo Loco", texto: "Las órbitas se desenrollan en carriles y todo empieza a caer: terremotos, lluvias de rojos, láseres… y el MODO EXTREMO." },
      { titulo: "Líneas dinámicas", texto: "Los orbes azules añaden líneas y los verdes las quitan. Nunca sabes cuántas habrá." },
      { titulo: "Infinito", texto: "Viaja de galaxia en galaxia, cada una con sus reglas, sus colores y su dificultad." },
      { titulo: "20 niveles", texto: "Cada uno con su temática, el corredor horizontal, la reversa y la vista 3D de frente." },
      { titulo: "Personaliza", texto: "Colores, formas (nave, cohete, platillo…), estallidos al chocar, fondos y música." },
      { titulo: "Logros y regalos", texto: "Más de 50 logros, regalos diarios, cofres, escudo, imán, cámara lenta y el orbe arcoíris." },
    ],
    capturas: [
      { src: "img/orbit-dash/captura_1_menu.png", texto: "Menú principal" },
      { src: "img/orbit-dash/captura_2_infinito.png", texto: "Modo Infinito" },
      { src: "img/orbit-dash/captura_3_modo_loco.png", texto: "Modo Loco" },
      { src: "img/orbit-dash/captura_4_corredor_3d.png", texto: "Corredor en 3D" },
      { src: "img/orbit-dash/captura_5_tienda.png", texto: "Tienda" },
      { src: "img/orbit-dash/captura_6_niveles.png", texto: "Niveles" },
    ],
  },
  {
    id: "proximo",
    nombre: "Próximo juego",
    lema: "Algo nuevo se está cocinando en el estudio. Muy pronto, más información.",
    estado: "secreto",
    color: "#7c4dff",
  },
];

// Noticias del estudio (la más nueva arriba). Para añadir una, copia una línea.
const NOTICIAS = [
  { fecha: "2026-10-22", texto: "Orbit Dash entra en prueba cerrada en Google Play." },
  { fecha: "2026-10-21", texto: "Orbit Dash 0.6.0: orbes de velocidad, nuevas formas y música en los niveles." },
];
