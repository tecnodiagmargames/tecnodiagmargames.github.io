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
// ============================================================

const ESTUDIO = {
  nombre: "TecnoDiagmarGames",
  correo: "tecnodiagmarch@gmail.com",
};

const JUEGOS = [
  {
    id: "orbit-dash",   // se mantiene para no romper enlaces viejos (juego.html?id=orbit-dash)
    nombre: "Orbit King",
    tipo: "juego",
    lema: "Salta entre órbitas, esquiva rojos y atrapa orbes en un reto de reflejos neón.",
    estado: "disponible",
    playUrl: "https://play.google.com/store/apps/details?id=com.tecnodiagmar.orbitdash",
    plataforma: "Android",
    modelo: "Gratis con anuncios y compras opcionales",
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
      { titulo: "9 mundos y sus jefes", texto: "Más de 150 niveles, de Novatos al Imposible, pasando por el Infierno, el Glaciar eterno o la Carrera. Cada mundo acaba con un jefe que tiene su propia canción." },
      { titulo: "Duelo online", texto: "Reta a otro jugador en tiempo real o a un amigo con un código de sala, y sube en el ranking de trofeos." },
      { titulo: "Corredor en 3D", texto: "Las órbitas se estiran en una pista que corre hacia ti: salta los rojos, pasa por debajo de los arcos y cambia de línea." },
      { titulo: "Personaliza", texto: "Colores, formas, estelas, órbitas, estallidos al chocar, entradas de cine, fondos y música." },
      { titulo: "Premios y retos", texto: "Retos diarios, ruleta, más de 50 logros, cofres, diamantes y boosters como imán x2 o doble monedas." },
    ],
    capturas: [
      { src: "img/orbit-king/captura_1_corredor_3d.jpg", texto: "Corredor en 3D" },
      { src: "img/orbit-king/captura_2_aventura.jpg", texto: "Aventura" },
      { src: "img/orbit-king/captura_3_escape.jpg", texto: "Modo Escape" },
      { src: "img/orbit-king/captura_4_niveles.jpg", texto: "Mundos y niveles" },
      { src: "img/orbit-king/captura_5_premios.jpg", texto: "Premios y cofres" },
      { src: "img/orbit-king/captura_6_personaliza.jpg", texto: "Tienda" },
      { src: "img/orbit-king/captura_7_entradas.jpg", texto: "Entradas de cine" },
      { src: "img/orbit-king/captura_8_reflejos.jpg", texto: "Reflejos neón" },
    ],
  },
  {
    id: "adivina",
    nombre: "Adivina lo que pienso",
    tipo: "juego",
    lema: "Piensa una palabra en secreto y descubre la de tu rival con preguntas de sí o no.",
    estado: "desarrollo",
    playUrl: "",
    plataforma: "Android",
    genero: "Palabras · Familia y amigos",
    modelo: "Gratis",
    color: "#ec4899",
    icono: "img/adivina/icono.png",
    portada: "img/adivina/portada.jpg",
    privacidad: "",
    descripcion: [
      "Cada jugador elige en secreto una palabra de un tema (animales, frutas, colores, comida…) y, por turnos, se hacen preguntas de sí o no. Gana quien adivine antes la palabra del otro. Si se atascan, pueden pedir una pista.",
      "Se juega en línea entre dos teléfonos, contra la IA o en persona con el modo acompañante. También tiene un modo escuela para que los docentes creen clases y tareas.",
    ],
    caracteristicas: [
      { titulo: "En línea con amigos", texto: "Crea una sala, comparte el código y juega en modo Clásico, Contrarreloj, Sin pistas, Tema sorpresa o Torneo." },
      { titulo: "Contra la IA", texto: "Adivina la palabra de la máquina o deja que ella adivine la tuya, incluso sin internet." },
      { titulo: "Reto diario", texto: "Una palabra para todos cada día, un solo intento y una racha que cuidar." },
      { titulo: "Modo acompañante", texto: "Marcador y cronómetro para jugar en persona o en directo, sin conexión." },
      { titulo: "Modo escuela", texto: "Clases con código, tareas y resultados para docentes, con vocabulario por edades, inglés, Matemáticas, Geografía y Ciencias." },
      { titulo: "Amigos y logros", texto: "Agrega amigos por código, compite en el ranking semanal, sube de nivel y desbloquea temas." },
    ],
    capturas: [
      { src: "img/adivina/captura_1_inicio.jpg", texto: "Inicio" },
      { src: "img/adivina/captura_2_partida.jpg", texto: "Partida" },
      { src: "img/adivina/captura_3_pregunta.jpg", texto: "Pregunta de tu rival" },
      { src: "img/adivina/captura_4_resultado.jpg", texto: "¡Ganaste!" },
      { src: "img/adivina/captura_5_reto_diario.jpg", texto: "Reto diario" },
      { src: "img/adivina/captura_6_acompanante.jpg", texto: "Modo acompañante" },
    ],
  },
  {
    id: "profe-pro",
    nombre: "Profe Pro",
    tipo: "app",
    lema: "La mano derecha del docente: prepara clases con IA, lleva notas y asistencia y conecta con tus estudiantes.",
    estado: "desarrollo",
    playUrl: "",
    plataforma: "Android",
    genero: "Educación",
    modelo: "Gratis con plan Pro",
    color: "#3b82f6",
    icono: "img/profe-pro/icono.png",
    portada: "img/profe-pro/portada.jpg",
    privacidad: "",
    descripcion: [
      "Profe Pro está pensada para profes ocupados: botones grandes, lenguaje claro y todo lo de la clase en un solo lugar.",
      "Escribe el tema, el grado y la duración, y la app te propone un plan de clase, un taller o diapositivas que puedes cambiar y descargar en PDF. La IA nunca recibe los nombres de tus estudiantes.",
    ],
    caracteristicas: [
      { titulo: "Clases en minutos", texto: "Planes de clase, talleres y diapositivas con IA, editables y en PDF." },
      { titulo: "La IA propone, tú decides", texto: "Sube trabajos en foto, PDF o Word y recibe una nota sugerida por criterio. Nada se guarda sin tu visto bueno." },
      { titulo: "Notas y asistencia", texto: "Libro de notas con promedios ponderados, exportación a Excel y PDF, y asistencia rápida incluso sin internet." },
      { titulo: "Lo administrativo", texto: "Informes, circulares, cartas a acudientes y constancias redactadas con IA, más un calendario con recordatorios." },
      { titulo: "Estudiantes conectados", texto: "Se unen con un código para ver tareas, notas y mensajes y entregar sus trabajos. Los menores entran con autorización de su acudiente." },
      { titulo: "Privacidad primero", texto: "Sin publicidad y sin vender datos. Los nombres se ocultan antes de enviar cualquier texto a la IA." },
    ],
  },
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
];

// Noticias del estudio (la más nueva arriba). Para añadir una, copia una línea.
const NOTICIAS = [
  { fecha: "2026-11-12", texto: "TecnoDiagmarGames también hace apps: conoce Profe Pro, el asistente para docentes, y Pliego PDF, para escanear, convertir y entender tus documentos. Las dos llegarán pronto a Google Play." },
  { fecha: "2026-11-12", texto: "Presentamos nuestro segundo juego: Adivina lo que pienso, un duelo de preguntas de sí o no para jugar con amigos, contra la IA o en clase. Muy pronto en Google Play." },
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
