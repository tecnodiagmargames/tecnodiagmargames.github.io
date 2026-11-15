#!/usr/bin/env python3
"""Sincroniza la ficha de un producto desde su propio repositorio.

Uso:  python3 tool/sincronizar.py ../juego-adivina [../otro-repo ...]

Cada repositorio de producto tiene una carpeta `ficha_web/` con:
  - ficha.json   textos, estado, enlaces, capturas, novedades y noticias
  - img/         icono, portada y capturas (JPG de ~540 px de ancho)

El script:
  1. lee ficha.json (y la versión de pubspec.yaml si existe y la ficha no la trae),
  2. copia las imágenes a img/<id>/,
  3. escribe js/fichas/<id>.js, que la web carga antes de js/juegos.js.

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


def version_pubspec(repo: Path) -> str:
    pub = repo / "pubspec.yaml"
    if not pub.exists():
        return ""
    m = re.search(r"^version:\s*([^\s#]+)", pub.read_text(encoding="utf-8"), re.M)
    return m.group(1).split("+")[0] if m else ""


def sincronizar(repo: Path) -> str:
    origen = repo / "ficha_web"
    ficha = json.loads((origen / "ficha.json").read_text(encoding="utf-8"))
    faltan = [k for k in OBLIGATORIOS if not ficha.get(k)]
    if faltan:
        sys.exit(f"{repo}: faltan campos en ficha.json: {', '.join(faltan)}")
    if ficha["estado"] not in ESTADOS:
        sys.exit(f"{repo}: estado desconocido «{ficha['estado']}»")
    if ficha["estado"] == "disponible" and not ficha.get("playUrl"):
        sys.exit(f"{repo}: estado «disponible» necesita playUrl")
    pid = ficha["id"]
    if not re.fullmatch(r"[a-z0-9-]+", pid):
        sys.exit(f"{repo}: id no válido «{pid}»")

    # Imágenes: todo lo que esté en ficha_web/img pasa a img/<id>/
    destino = WEB / "img" / pid
    destino.mkdir(parents=True, exist_ok=True)
    nombres = [ficha["icono"], ficha["portada"]] + [c["archivo"] for c in ficha.get("capturas", [])]
    for n in nombres:
        if not (origen / "img" / n).exists():
            sys.exit(f"{repo}: falta la imagen ficha_web/img/{n}")
    for f in sorted((origen / "img").iterdir()):
        if f.is_file():
            shutil.copy2(f, destino / f.name)

    datos = {k: v for k, v in ficha.items() if k != "capturas"}
    datos["version"] = ficha.get("version") or version_pubspec(repo)
    datos["icono"] = f"img/{pid}/{ficha['icono']}"
    datos["portada"] = f"img/{pid}/{ficha['portada']}"
    datos["capturas"] = [{"src": f"img/{pid}/{c['archivo']}", "texto": c["texto"]} for c in ficha.get("capturas", [])]

    js = (
        f"// GENERADO por tool/sincronizar.py desde el repo del producto ({repo.name}/ficha_web/ficha.json).\n"
        "// No lo edites a mano: cambia la ficha en el repo del juego y vuelve a sincronizar.\n"
        "var FICHAS = window.FICHAS || (window.FICHAS = {});\n"
        f"FICHAS[{json.dumps(pid)}] = {json.dumps(datos, ensure_ascii=False, indent=2)};\n"
    )
    (WEB / "js" / "fichas" / f"{pid}.js").write_text(js, encoding="utf-8")
    return f"{pid}: versión {datos['version'] or '—'}, {len(datos['capturas'])} capturas, {len(ficha.get('novedades', []))} novedades"


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for r in sys.argv[1:]:
        print(sincronizar(Path(r).resolve()))
