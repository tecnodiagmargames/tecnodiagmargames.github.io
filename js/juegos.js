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
//  Cuando Orbit King esté publicado: pon estado: "disponible" y
//  playUrl: "https://play.google.com/store/apps/details?id=com.tecnodiagmar.orbitdash"
// ============================================================

const ESTUDIO = {
  nombre: "TecnoDiagmarGames",
  correo: "tecnodiagmarch@gmail.com",
};

const JUEGOS = [
  {
    id: "orbit-dash",   // se mantiene para no romper enlaces viejos (juego.html?id=orbit-dash)
    nombre: "Orbit King",
    lema: "Salta entre órbitas, esquiva rojos y atrapa orbes en un reto de reflejos neón.",
    estado: "prueba",
    playUrl: "",
    plataforma: "Android",
    genero: "Arcade · Reflejos",
    color: "#22e5ff",
    icono: "img/orbit-king/icono.png",
    portada: "img/orbit-king/portada.png",
    privacidad: "https://proelmas601.github.io/orbit-dash-privacy/",
    descripcion: [
      "Tu bolita gira sin parar alrededor de un planeta: toca para saltar de órbita, atrapa los orbes amarillos y esquiva los rojos. Fácil de aprender, difícil de dominar.",
      "Se juega con una mano, sin conexión y en partidas cortas. La calidad gráfica se ajusta sola a tu teléfono.",
    ],
    caracteristicas: [
      { titulo: "Aventura", texto: "Viaja de galaxia en galaxia: las órbitas cambian, se desenrollan en carriles y aparecen líneas nuevas. Elige Normal o Extremo." },
      { titulo: "Escape", texto: "El sol crece sin parar y quema las órbitas. Atrapa orbes azules para abrir líneas por fuera y huye de estrella en estrella." },
      { titulo: "3 mundos, 50 niveles", texto: "Galaxia de origen, Infierno y Núcleo volcánico, cada nivel con su temática, su canción y un premio al superarlo." },
      { titulo: "Corredor en 3D", texto: "Las órbitas se estiran en una pista que corre hacia ti: salta los rojos, pasa por debajo de los arcos y cambia de línea." },
      { titulo: "Personaliza", texto: "Colores, formas, estelas, órbitas, estallidos al chocar, entradas de cine, fondos y música." },
      { titulo: "Premios y retos", texto: "Retos diarios, ruleta, más de 50 logros, cofres, diamantes y boosters como imán x2 o doble monedas." },
    ],
    capturas: [
      { src: "img/orbit-king/captura_1_corredor_3d.jpg", texto: "Corredor en 3D" },
      { src: "img/orbit-king/captura_2_aventura.jpg", texto: "Aventura" },
      { src: "img/orbit-king/captura_3_escape.jpg", texto: "Modo Escape" },
      { src: "img/orbit-king/captura_4_niveles.jpg", texto: "50 niveles" },
      { src: "img/orbit-king/captura_5_premios.jpg", texto: "Premios y cofres" },
      { src: "img/orbit-king/captura_6_personaliza.jpg", texto: "Tienda" },
      { src: "img/orbit-king/captura_7_entradas.jpg", texto: "Entradas de cine" },
      { src: "img/orbit-king/captura_8_reflejos.jpg", texto: "Reflejos neón" },
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
  { fecha: "2026-10-24", texto: "Nueva sección de prototipos: prueba el Duelo online de Orbit King en el navegador y dinos qué te parece." },
  { fecha: "2026-10-24", texto: "Orbit King 0.8.1 ya está en la prueba cerrada de Google Play: modos Aventura y Escape, 50 niveles en 3 mundos y corredor en 3D." },
  { fecha: "2026-10-23", texto: "Orbit Dash ahora se llama Orbit King: llegan 2 mundos nuevos, retos diarios y estelas." },
  { fecha: "2026-10-22", texto: "El juego entra en prueba cerrada en Google Play." },
  { fecha: "2026-10-21", texto: "Versión 0.6.0: orbes de velocidad, nuevas formas y música en los niveles." },
];

// ============================================================
//  PROTOTIPOS — ideas jugables para que la gente las pruebe y opine
//  Cada uno tiene su página: prototipo.html?id=<id>
//  url: el HTML del prototipo dentro de prototipos/<id>/
// ============================================================
const PROTOTIPOS = [
  {
    id: "duelo",
    nombre: "Duelo online",
    juego: "Orbit King",
    fecha: "2026-10-24",
    color: "#b77bff",
    url: "prototipos/duelo/index.html",
    lema: "Pantalla dividida contra otro jugador: arriba ves a tu rival en vivo y abajo juegas tú, con los mismos orbes y rojos para los dos.",
    descripcion: [
      "Es una idea para un modo online de Orbit King. Los dos jugáis la misma partida (misma semilla) durante 90 segundos y con 3 vidas. Gana quien tenga más puntos o quien deje al otro sin vidas.",
      "Cada orbe llena tu barra de ataque. Al llenarse le lanza al rival un MURO de rojos, una REVERSA del sentido de giro o un APAGÓN, con un segundo de aviso.",
    ],
    probar: [
      "Juega contra la máquina en Fácil, Normal y Difícil.",
      "Prueba \"Rival al azar\" (en este prototipo el rival está simulado).",
      "Fíjate en el fantasma violeta: marca por dónde va tu rival.",
      "Dinos si los ataques te parecen justos o demasiado fuertes.",
    ],
    controles: "Toca la mitad izquierda para ir hacia dentro y la derecha hacia fuera. En el PC: flechas ← → o A y D.",
  },
];

// Estrellas y comentarios de los prototipos (Firebase, plan gratuito).
// Mientras projectId esté vacío, la web dice que los comentarios llegan pronto.
// Cómo crear el proyecto y qué reglas poner: web/LEEME.md
const FIREBASE = {
  projectId: "",
  apiKey: "",
};
