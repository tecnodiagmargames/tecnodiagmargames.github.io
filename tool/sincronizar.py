#!/usr/bin/env python3
"""Sincroniza la ficha (y las páginas legales) de un producto desde su propio repositorio.

Uso:  python3 tool/sincronizar.py ../juego-adivina [../orbit-dash ...]

Lo ejecuta solo la acción `.github/workflows/sincronizar.yml` cada 30 minutos con
los repos de `tool/productos.json`; también se puede ejecutar a mano.

Cada repositorio de producto tiene una carpeta `ficha_web/` con:
  - ficha.json   textos, estado, enlaces, capturas, novedades y noticias
  - img/         icono, portada y capturas (JPG de ~540 px de ancho)

Claves opcionales de ficha.json para la sincronización:
  - "carpeta":  nombre de la carpeta en la web (img/<carpeta>/ y <carpeta>/*.html).
                Por defecto, el id.
  - "paginas":  { "privacidad": "docs/privacy/index.html", ... }  páginas HTML del repo
                que se publican tal cual en <carpeta>/<nombre>.html. Si la ficha no trae
                un enlace propio en "privacidad", "terminos" o "condiciones", se enlaza
                la copia de la web.

El script:
  1. lee ficha.json (y la versión de pubspec.yaml si existe y la ficha no la trae),
  2. copia las imágenes a img/<carpeta>/ y las páginas a <carpeta>/,
  3. escribe js/fichas/<id>.js, que la web carga antes de js/juegos.js.

Solo escribe en img/<carpeta>/, <carpeta>/<nombre>.html y js/fichas/<id>.js.
No edites js/fichas/*.js a mano: se sobrescriben en cada sincronización.
"""
import json
import re
import shutil
import sys
from pathlib import Path

WEB = Path(__file__).resolve().parent.parent
OBLIGATORIOS = ["id", "nombre", "tipo", "lema", "estado", "color", "icono", "portada"]
ESTADOS = {"disponible", "prueba", "desarrollo", "secreto"}
ENLAZABLES = {"privacidad", "terminos", "condiciones"}
# Carpetas de la web que un producto nunca puede usar (la web y sus archivos fijos).
CARPETAS_PROHIBIDAS = {"img", "js", "css", "tool", "prototipos", "fichas", "productos", "estudio", ".github"}
NOMBRE = re.compile(r"[a-z0-9-]+")


def error(repo: Path, texto: str):
    sys.exit(f"{repo.name}: {texto}")


def version_pubspec(repo: Path) -> str:
    pub = repo / "pubspec.yaml"
    if not pub.exists():
        return ""
    m = re.search(r"^version:\s*([^\s#]+)", pub.read_text(encoding="utf-8"), re.M)
    return m.group(1).split("+")[0] if m else ""


def dentro(repo: Path, ruta: str) -> Path:
    """Ruta de un archivo del repo, sin salirse de él."""
    p = (repo / ruta).resolve()
    if repo.resolve() not in p.parents:
        error(repo, f"la ruta «{ruta}» sale del repositorio")
    return p


def sincronizar(repo: Path) -> str:
    origen = repo / "ficha_web"
    if not (origen / "ficha.json").is_file():
        return f"{repo.name}: sin ficha_web/ficha.json, se omite"
    ficha = json.loads((origen / "ficha.json").read_text(encoding="utf-8"))
    faltan = [k for k in OBLIGATORIOS if not ficha.get(k)]
    if faltan:
        error(repo, f"faltan campos en ficha.json: {', '.join(faltan)}")
    if ficha["estado"] not in ESTADOS:
        error(repo, f"estado desconocido «{ficha['estado']}»")
    if ficha["estado"] == "disponible" and not ficha.get("playUrl"):
        error(repo, "estado «disponible» necesita playUrl")
    pid = ficha["id"]
    if not NOMBRE.fullmatch(pid):
        error(repo, f"id no válido «{pid}»")
    carpeta = ficha.get("carpeta") or pid
    if not NOMBRE.fullmatch(carpeta) or carpeta in CARPETAS_PROHIBIDAS:
        error(repo, f"carpeta no válida «{carpeta}»")

    # Imágenes: todo lo que esté en ficha_web/img pasa a img/<carpeta>/
    destino = WEB / "img" / carpeta
    destino.mkdir(parents=True, exist_ok=True)
    nombres = [ficha["icono"], ficha["portada"]] + [c["archivo"] for c in ficha.get("capturas", [])]
    for n in nombres:
        if not (origen / "img" / n).is_file():
            error(repo, f"falta la imagen ficha_web/img/{n}")
    for f in sorted((origen / "img").iterdir()):
        if f.is_file() and not f.name.startswith("."):
            shutil.copyfile(f, destino / f.name)

    datos = {k: v for k, v in ficha.items() if k not in ("capturas", "carpeta", "paginas")}

    # Páginas legales (privacidad, términos, condiciones, borrar cuenta...)
    paginas = ficha.get("paginas", {})
    for nombre, ruta in paginas.items():
        if not NOMBRE.fullmatch(nombre):
            error(repo, f"nombre de página no válido «{nombre}»")
        archivo = dentro(repo, ruta)
        if not archivo.is_file() or archivo.suffix != ".html":
            error(repo, f"la página «{ruta}» no existe o no es .html")
        (WEB / carpeta).mkdir(exist_ok=True)
        shutil.copyfile(archivo, WEB / carpeta / f"{nombre}.html")
        if nombre in ENLAZABLES and not datos.get(nombre):
            datos[nombre] = f"{carpeta}/{nombre}.html"

    # La versión de pubspec.yaml solo se muestra si el producto ya está en prueba o publicado.
    publicado = ficha["estado"] in ("prueba", "disponible")
    datos["version"] = ficha.get("version") or (version_pubspec(repo) if publicado else "")
    datos["icono"] = f"img/{carpeta}/{ficha['icono']}"
    datos["portada"] = f"img/{carpeta}/{ficha['portada']}"
    datos["capturas"] = [{"src": f"img/{carpeta}/{c['archivo']}", "texto": c["texto"]} for c in ficha.get("capturas", [])]

    js = (
        f"// GENERADO por tool/sincronizar.py desde el repo del producto ({repo.name}/ficha_web/ficha.json).\n"
        "// No lo edites a mano: cambia la ficha en el repo del producto; la web se actualiza sola.\n"
        "var FICHAS = window.FICHAS || (window.FICHAS = {});\n"
        f"FICHAS[{json.dumps(pid)}] = {json.dumps(datos, ensure_ascii=False, indent=2)};\n"
    )
    (WEB / "js" / "fichas" / f"{pid}.js").write_text(js, encoding="utf-8")
    return (
        f"{pid}: versión {datos['version'] or '—'}, {len(datos['capturas'])} capturas, "
        f"{len(ficha.get('novedades', []))} novedades, {len(paginas)} páginas"
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for r in sys.argv[1:]:
        print(sincronizar(Path(r).resolve()))
