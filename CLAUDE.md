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

## Fichas sincronizadas (se actualizan solas desde el repo de cada producto)
- **Orbit King, Adivina lo que pienso y Profe Pro** no se editan en `js/juegos.js`: su ficha (textos, estado, versión, enlaces, capturas, novedades y noticias) vive en el repo de cada producto, carpeta `ficha_web/` (`ficha.json` + `img/`). Ver el `ficha_web/LEEME.md` de cada repo. Pliego PDF sigue a mano en `js/juegos.js` (su app no está en GitHub).
- **Páginas legales**: la clave `paginas` de `ficha.json` lista HTML del repo del producto (privacidad, términos, condiciones, borrar cuenta) que se publican en `<carpeta>/<nombre>.html` (Orbit King → `orbit-king/privacidad.html` y `orbit-king/condiciones.html`; Adivina → `adivina/*.html`). No editarlas aquí: se sobrescriben.
- **Actualización automática**: la acción `.github/workflows/sincronizar.yml` corre cada 30 minutos (y a demanda con "Run workflow" en Actions): descarga `ficha_web/` y `docs/` de los repos de `tool/productos.json`, ejecuta `tool/sincronizar.py` y hace commit en `main` solo si algo cambió. Solo puede escribir `img/<carpeta>/`, `js/fichas/<id>.js` y `<carpeta>/<nombre>.html`; si intenta tocar otra cosa (p. ej. `orbit-king/version.json`, `app-ads.txt`, `CNAME`) falla.
- Necesita el secreto de Actions `PRODUCTOS_TOKEN` en este repo: token *fine-grained* de la cuenta `proelmas601` con **Contents: Read-only** sobre los repos de `tool/productos.json`. Si caduca, la acción falla y GitHub avisa por correo: crear otro y reemplazar el secreto. GitHub pausa las acciones programadas tras 60 días sin actividad en el repo: reactivarla en Actions.
- A mano (para probar): `python3 tool/sincronizar.py ../orbit-dash ../juego-adivina ../profe-pro` con los repos clonados al lado.
- Para sumar otro producto: crear `ficha_web/ficha.json` + `ficha_web/img/` en su repo, añadirlo a `tool/productos.json` (y darle acceso al token), poner `(window.FICHAS || {})["<id>"]` en `JUEGOS` y el `<script src="js/fichas/<id>.js">` en `index.html`, `juego.html` y `prototipo.html`.

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
