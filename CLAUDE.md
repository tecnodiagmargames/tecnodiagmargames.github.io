# Web de TecnoDiagmarGames — guía para Claude

Web oficial del estudio **TecnoDiagmarGames** (así se escribe el nombre), publicada con GitHub Pages en https://tecnodiagmargames.com (archivo `CNAME`). El usuario habla español (Colombia): responde y escribe los textos en español latinoamericano (ustedes, no vosotros).

**Este repositorio es la única fuente de la web** desde el 12 nov 2026. La carpeta `web/` del repo `orbit-dash` ya no se usa: no copiar desde allí.

## Estructura
- `index.html`: portada de la **empresa**: solo el estudio, el catálogo (juegos y apps), noticias, estudio y contacto. Nada de un juego concreto aquí (ni su tema, ni sus prototipos).
- `juego.html?id=<id>`: ficha de cada juego o app, con su propio tema. Los prototipos salen dentro de la ficha de su producto (`juegoId` en `PROTOTIPOS`). `prototipo.html?id=<id>`: prototipo jugable con estrellas y comentarios (Firestore).
- `js/juegos.js`: **solo datos** (ESTUDIO, JUEGOS, NOTICIAS, PROTOTIPOS, FIREBASE). `JUEGOS` tiene juegos y apps: el campo `tipo` (`"juego"` o `"app"`) decide en qué sección salen. Para añadir uno, copiar un bloque y poner sus imágenes en `img/<id>/` (icono 256×256, portada 1024×500, capturas en JPG de ~540 px de ancho).
- `js/sitio.js`: lógica (tarjetas, fichas, cifras de la portada, pie con privacidades, fondo de estrellas, opiniones).
- `css/estilo.css`: diseño. Arriba (`:root`) el **tema de la empresa** (claro, blanco y violeta del estudio, sin estrellas). Al final, un bloque `body.tema-<id>` por producto: Orbit King = espacio + neón con estrellas y cometas (`tema-orbit-dash`, el único con estrellas); Adivina = colores de día de la app, letra Baloo 2/Nunito y burbujas "?"; Profe Pro = azul con letra Lexend y fondo de cuaderno; Pliego PDF = papel e índigo. `sitio.js` (`ponerTema`) pone la clase en la ficha y en sus prototipos. Producto nuevo: copiar un bloque de tema y cambiar los colores (si no tiene, usa el de la empresa); opcional `tema` en sus datos para reutilizar otro.
- `img/estudio/portada.png`: imagen para compartir la portada (og:image), 1200×630.

## Fichas sincronizadas (desde el repo de cada juego)
- **Adivina lo que pienso** no se edita en `js/juegos.js`: su ficha (textos, estado, versión, enlaces, capturas, novedades y noticias) vive en el repo `proelmas601/juego-adivina`, carpeta `ficha_web/` (`ficha.json` + `img/`). La versión se lee de su `pubspec.yaml`.
- Para pasarla a la web: `python3 tool/sincronizar.py ../juego-adivina` (con los dos repos clonados uno al lado del otro). Copia las imágenes a `img/adivina/` y genera `js/fichas/adivina.js`, que las páginas cargan antes de `js/juegos.js`. No editar `js/fichas/*.js` a mano.
- En cada sesión de este proyecto: revisar si `juego-adivina/ficha_web/` o su versión cambiaron (`git log -- ficha_web pubspec.yaml`) y, si es así, sincronizar y publicar.
- Para sumar otro producto a este sistema: crear `ficha_web/ficha.json` + `ficha_web/img/` en su repo, poner `(window.FICHAS || {})["<id>"]` en `JUEGOS` y el `<script src="js/fichas/<id>.js">` en `index.html`, `juego.html` y `prototipo.html`.

## No romper
- `orbit-king/version.json`: Orbit King lo lee para avisar de actualizar. Al publicar una versión en Play, subir `version` y `code`.
- `app-ads.txt` (AdMob), `CNAME`, `.nojekyll`, y el enlace viejo `juego.html?id=orbit-dash` (id de Orbit King).

## Productos y repos de origen
- Orbit King: repo `proelmas601/orbit-dash` (Godot). Estado y versión en su `CLAUDE.md` y `CHANGELOG.md`.
- Adivina lo que pienso: repo `proelmas601/juego-adivina` (Flutter). Estado en `docs/PROGRESO.md`; capturas en `docs/capturas/`.
- Profe Pro (app): repo `proelmas601/profe-pro` (Flutter + Supabase). Estado en `PROGRESS.md`; textos de tienda en `docs/store/`. Icono y portada de la web son provisionales (la app aún usa el icono de Flutter).
- Pliego PDF (app): el código de la app no está en GitHub; solo su servidor `proelmas601/pliego-pdf-api` y la privacidad pública `proelmas601/pliego-pdf-privacidad`. Icono y portada de la web son provisionales.

## Probar
`python3 -m http.server 8090` en la raíz y abrir http://localhost:8090. Revisar en escritorio y en móvil (390 px).
