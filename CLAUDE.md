# Web de TecnoDiagmarGames — guía para Claude

Web oficial del estudio **TecnoDiagmarGames** (así se escribe el nombre), publicada con GitHub Pages en https://tecnodiagmargames.com (archivo `CNAME`). El usuario habla español (Colombia): responde y escribe los textos en español latinoamericano (ustedes, no vosotros).

**Este repositorio es la única fuente de la web** desde el 12 nov 2026. La carpeta `web/` del repo `orbit-dash` ya no se usa: no copiar desde allí.

## Estructura
- `index.html`: portada de la empresa (estudio, juegos, prototipos, noticias, estudio, contacto).
- `juego.html?id=<id>`: ficha de cada juego. `prototipo.html?id=<id>`: prototipo jugable con estrellas y comentarios (Firestore).
- `js/juegos.js`: **solo datos** (ESTUDIO, JUEGOS, NOTICIAS, PROTOTIPOS, FIREBASE). Para añadir un juego, copiar un bloque de `JUEGOS` y poner sus imágenes en `img/<id>/` (icono 256×256, portada 1024×500, capturas en JPG de ~540 px de ancho).
- `js/sitio.js`: lógica (tarjetas, fichas, cifras de la portada, pie con privacidades, fondo de estrellas, opiniones).
- `css/estilo.css`: diseño (espacio + neón, violeta del estudio).

## No romper
- `orbit-king/version.json`: Orbit King lo lee para avisar de actualizar. Al publicar una versión en Play, subir `version` y `code`.
- `app-ads.txt` (AdMob), `CNAME`, `.nojekyll`, y el enlace viejo `juego.html?id=orbit-dash` (id de Orbit King).

## Productos y repos de origen
- Orbit King: repo `proelmas601/orbit-dash` (Godot). Estado y versión en su `CLAUDE.md` y `CHANGELOG.md`.
- Adivina lo que pienso: repo `proelmas601/juego-adivina` (Flutter). Estado en `docs/PROGRESO.md`; capturas en `docs/capturas/`.

## Probar
`python3 -m http.server 8090` en la raíz y abrir http://localhost:8090. Revisar en escritorio y en móvil (390 px).
