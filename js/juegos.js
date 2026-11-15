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
//  tipo:    "juego" o "app" (sale en la sección Juegos o en Apps de la portada)
//  modelo:  texto corto del precio (p. ej. "Gratis con anuncios").
//  capturas y caracteristicas son opcionales (si faltan, no sale esa sección).
//  version, estadoTexto, terminos y novedades también son opcionales.
//  tema:    opcional. La ficha usa el tema "tema-<id>" de css/estilo.css
//           (o "tema-<tema>" si se pone). Sin tema propio = tema de la empresa.
// ============================================================

const ESTUDIO = {
  nombre: "TecnoDiagmarGames",
  correo: "tecnodiagmarch@gmail.com",
};

const JUEGOS = [
  // Las fichas de Orbit King, Adivina y Profe Pro vienen de los repos de cada producto
  // (ficha_web/ficha.json) y se actualizan solas: ver "Fichas sincronizadas" en CLAUDE.md.
  (window.FICHAS || {})["orbit-dash"],   // id viejo: no romper juego.html?id=orbit-dash
  (window.FICHAS || {})["adivina"],
  (window.FICHAS || {})["profe-pro"],
  {
    id: "pliego-pdf",
    nombre: "Pliego PDF",
    tipo: "app",
    lema: "Escanea, edita y convierte tus documentos en el teléfono, con resúmenes y preguntas con IA.",
    estado: "desarrollo",
    playUrl: "",
    plataforma: "Android",
    genero: "Productividad · Documentos",
    modelo: "Gratis con Premium",
    color: "#6d5bff",
    icono: "img/pliego-pdf/icono.png",
    portada: "img/pliego-pdf/portada.jpg",
    privacidad: "https://proelmas601.github.io/pliego-pdf-privacidad/",
    descripcion: [
      "Pliego PDF trabaja con tus documentos en tu propio teléfono: el escaneo, el reconocimiento de texto y casi todas las herramientas funcionan sin conexión, y tus archivos no salen del dispositivo.",
      "Cuando lo necesitas, convierte archivos de Office a PDF y al revés, resume un documento o respóndele preguntas con IA, y guarda copias cifradas en la nube.",
    ],
    caracteristicas: [
      { titulo: "Escanea y reconoce texto", texto: "Convierte fotos de hojas en PDF y extrae su texto (OCR) sin conexión." },
      { titulo: "Convierte", texto: "Word, Excel y PowerPoint a PDF, PDF a Word o texto, y PDF/A para archivar." },
      { titulo: "IA para tus documentos", texto: "Pide un resumen o hazle preguntas a un documento largo." },
      { titulo: "Nube cifrada", texto: "Inicia sesión para guardar y sincronizar tus documentos. Solo tu cuenta puede leerlos." },
    ],
  },
].filter(Boolean);   // si una ficha no carga, se omite en vez de romper la web

// Noticias del estudio (la más nueva arriba). Para añadir una, copia una línea.
// Las noticias de las fichas sincronizadas (js/fichas/) se mezclan solas por fecha.
const NOTICIAS = [
  { fecha: "2026-11-13", texto: "Orbit King 0.13.0 ya está en Google Play: skins legendarias, pase de temporada gratis, pases semanal y mensual, oferta del día y una tienda renovada." },
  { fecha: "2026-11-12", texto: "TecnoDiagmarGames también hace apps: conoce Profe Pro, el asistente para docentes, y Pliego PDF, para escanear, convertir y entender tus documentos. Las dos llegarán pronto a Google Play." },
  { fecha: "2026-11-09", texto: "Orbit King 0.12.0 ya está en Google Play: jefes al final de cada mundo, tienda premium y opción de quitar anuncios." },
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
    juegoId: "orbit-dash",   // sale en la ficha de este producto y usa su tema
    fecha: "2026-10-24",
    color: "#b77bff",
    url: "prototipos/duelo/index.html",
    lema: "Pantalla dividida contra otro jugador: arriba ves a tu rival en vivo y abajo juegas tú, con los mismos orbes y rojos para los dos.",
    descripcion: [
      "Es una idea para un modo online de Orbit King. Los dos juegan la misma partida (misma semilla) durante 90 segundos y con 3 vidas. Gana quien tenga más puntos o quien deje al otro sin vidas.",
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
  projectId: "tecnodiagmargames-web",
  apiKey: "AIzaSyAXVAHSE4pcZKRBHNzzkat5-t3KRIh5rTA",   // pública por diseño: lo que protege los datos son las reglas
};
