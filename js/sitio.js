// Lógica de la web: pinta tarjetas, la página de cada juego y el fondo de estrellas.
// Los datos están en juegos.js (no hace falta tocar este archivo para añadir juegos).

const ESTADOS = {
  disponible: "Disponible",
  prueba: "En prueba cerrada",
  desarrollo: "En desarrollo",
  secreto: "Próximamente",
};

function esc(t) {
  const d = document.createElement("div");
  d.textContent = t == null ? "" : String(t);
  return d.innerHTML;
}

// Botón de Google Play: activo solo si el juego está publicado y tiene enlace.
function botonPlay(j) {
  const icono = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2.8v18.4c0 .7.8 1.2 1.4.8l15.9-9.2c.6-.4.6-1.2 0-1.6L5.4 2c-.6-.4-1.4.1-1.4.8z"/></svg>';
  if (j.estado === "disponible" && j.playUrl) {
    return `<a class="btn-play" href="${esc(j.playUrl)}" target="_blank" rel="noopener">${icono}<span><small>Disponible en</small>Google Play</span></a>`;
  }
  return `<span class="btn-play desactivado" title="Aún no publicado">${icono}<span><small>Muy pronto en</small>Google Play</span></span>`;
}

function tarjeta(j) {
  if (j.estado === "secreto") {
    return `<article class="tarjeta secreta" style="--c:${esc(j.color)}">
      <div class="tarjeta-img misterio"><span>?</span></div>
      <div class="tarjeta-cuerpo">
        <span class="estado estado-secreto">${ESTADOS.secreto}</span>
        <h3>${esc(j.nombre)}</h3>
        <p>${esc(j.lema)}</p>
      </div>
    </article>`;
  }
  return `<article class="tarjeta" style="--c:${esc(j.color)}">
    <a class="tarjeta-img" href="juego.html?id=${encodeURIComponent(j.id)}">
      <img src="${esc(j.portada)}" alt="${esc(j.nombre)}" loading="lazy">
    </a>
    <div class="tarjeta-cuerpo">
      <span class="estado estado-${esc(j.estado)}">${esc(ESTADOS[j.estado] || j.estado)}</span>
      <h3><a href="juego.html?id=${encodeURIComponent(j.id)}">${esc(j.nombre)}</a></h3>
      <p>${esc(j.lema)}</p>
      <div class="tarjeta-acciones">
        ${botonPlay(j)}
        <a class="enlace" href="juego.html?id=${encodeURIComponent(j.id)}">Ver más →</a>
      </div>
    </div>
  </article>`;
}

function fechaBonita(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${d} ${meses[m - 1]} ${a}`;
}

function pintarInicio() {
  const lista = document.getElementById("lista-juegos");
  if (lista) lista.innerHTML = JUEGOS.map(tarjeta).join("");

  const noticias = document.getElementById("lista-noticias");
  if (noticias) {
    noticias.innerHTML = NOTICIAS.map(
      (n) => `<li><time datetime="${esc(n.fecha)}">${fechaBonita(n.fecha)}</time><span>${esc(n.texto)}</span></li>`
    ).join("");
  }

  // Juego destacado en la portada: el primero que no sea secreto
  const dest = JUEGOS.find((j) => j.estado !== "secreto");
  const zona = document.getElementById("destacado-play");
  if (dest && zona) zona.innerHTML = botonPlay(dest);
}

function pintarJuego() {
  const zona = document.getElementById("juego");
  if (!zona) return;
  const id = new URLSearchParams(location.search).get("id");
  const j = JUEGOS.find((x) => x.id === id && x.estado !== "secreto");
  if (!j) {
    zona.innerHTML = `<section class="contenedor vacio"><h1>Juego no encontrado</h1><p><a class="enlace" href="index.html#juegos">← Volver a los juegos</a></p></section>`;
    return;
  }
  document.title = `${j.nombre} · ${ESTUDIO.nombre}`;
  zona.style.setProperty("--c", j.color);
  zona.innerHTML = `
    <section class="juego-cabecera contenedor">
      <img class="juego-icono" src="${esc(j.icono)}" alt="Icono de ${esc(j.nombre)}" width="128" height="128">
      <div>
        <span class="estado estado-${esc(j.estado)}">${esc(ESTADOS[j.estado] || j.estado)}</span>
        <h1>${esc(j.nombre)}</h1>
        <p class="lema">${esc(j.lema)}</p>
        <p class="meta">${esc(j.plataforma)} · ${esc(j.genero)} · Gratis con anuncios</p>
        <div class="tarjeta-acciones">${botonPlay(j)}</div>
      </div>
    </section>

    <section class="contenedor juego-texto">
      ${j.descripcion.map((p) => `<p>${esc(p)}</p>`).join("")}
    </section>

    <section class="contenedor">
      <h2 class="titulo-seccion">Capturas</h2>
      <div class="capturas">
        ${j.capturas.map((c) => `<figure><img src="${esc(c.src)}" alt="${esc(c.texto)}" loading="lazy"><figcaption>${esc(c.texto)}</figcaption></figure>`).join("")}
      </div>
    </section>

    <section class="contenedor">
      <h2 class="titulo-seccion">Qué te espera</h2>
      <div class="caracteristicas">
        ${j.caracteristicas.map((c) => `<div class="caracteristica"><h3>${esc(c.titulo)}</h3><p>${esc(c.texto)}</p></div>`).join("")}
      </div>
    </section>

    <section class="contenedor juego-pie">
      ${j.privacidad ? `<a class="enlace" href="${esc(j.privacidad)}" target="_blank" rel="noopener">Política de privacidad de ${esc(j.nombre)}</a>` : ""}
      <a class="enlace" href="index.html#juegos">← Todos los juegos</a>
    </section>`;

  // Ver capturas en grande al tocarlas
  zona.querySelectorAll(".capturas img").forEach((img) => {
    img.addEventListener("click", () => abrirVisor(img.src, img.alt));
  });
}

// ---------- Prototipos: tarjetas, página y opiniones (estrellas + comentarios) ----------

function estrellasTexto(media) {
  const llenas = Math.round(media);
  return "★".repeat(llenas) + "☆".repeat(5 - llenas);
}

function resumenNota(lista) {
  if (!lista.length) return '<span class="nota vacia">Sin calificaciones todavía</span>';
  const media = lista.reduce((t, c) => t + c.estrellas, 0) / lista.length;
  return `<span class="nota"><b>${media.toFixed(1).replace(".", ",")}</b> <span class="estrellas-fijas" aria-hidden="true">${estrellasTexto(media)}</span> <small>${lista.length} ${lista.length === 1 ? "opinión" : "opiniones"}</small></span>`;
}

function tarjetaPrototipo(p) {
  const enlace = `prototipo.html?id=${encodeURIComponent(p.id)}`;
  return `<article class="tarjeta" style="--c:${esc(p.color)}">
    <a class="tarjeta-img proto-mini" href="${enlace}" aria-label="Probar ${esc(p.nombre)}">
      <span class="pm-arriba"><i></i></span><span class="pm-vs">VS</span><span class="pm-abajo"><i></i></span>
    </a>
    <div class="tarjeta-cuerpo">
      <span class="estado estado-desarrollo">Prototipo · ${esc(p.juego)}</span>
      <h3><a href="${enlace}">${esc(p.nombre)}</a></h3>
      <p>${esc(p.lema)}</p>
      <div class="nota-tarjeta" data-nota="${esc(p.id)}"></div>
      <div class="tarjeta-acciones">
        <a class="btn-sec" href="${enlace}">Probar y opinar</a>
      </div>
    </div>
  </article>`;
}

function pintarPrototipos() {
  const lista = document.getElementById("lista-prototipos");
  if (!lista || typeof PROTOTIPOS === "undefined") return;
  lista.innerHTML = PROTOTIPOS.map(tarjetaPrototipo).join("");
  if (!firebaseListo()) return;
  lista.querySelectorAll("[data-nota]").forEach(async (zona) => {
    try { zona.innerHTML = resumenNota(await leerComentarios(zona.dataset.nota)); } catch (e) { zona.innerHTML = ""; }
  });
}

function pintarPrototipo() {
  const zona = document.getElementById("prototipo");
  if (!zona) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = (typeof PROTOTIPOS !== "undefined" ? PROTOTIPOS : []).find((x) => x.id === id);
  if (!p) {
    zona.innerHTML = `<section class="contenedor vacio"><h1>Prototipo no encontrado</h1><p><a class="enlace" href="index.html#prototipos">← Ver los prototipos</a></p></section>`;
    return;
  }
  document.title = `${p.nombre} · Prototipo · ${ESTUDIO.nombre}`;
  zona.style.setProperty("--c", p.color);
  const tactil = matchMedia("(pointer: coarse)").matches;
  zona.innerHTML = `
    <section class="contenedor proto-cabecera">
      <span class="estado estado-desarrollo">Prototipo · ${esc(p.juego)}</span>
      <h1>${esc(p.nombre)}</h1>
      <p class="lema">${esc(p.lema)}</p>
      <div id="nota-cabecera"></div>
    </section>

    <section class="contenedor proto-rejilla">
      <div class="proto-pantalla">
        ${tactil
          // En móviles el juego incrustado se come los toques y la página no se desplaza: se abre aparte
          ? `<a class="proto-mini proto-poster" href="${esc(p.url)}">
              <span class="pm-arriba"><i></i></span><span class="pm-vs">VS</span><span class="pm-abajo"><i></i></span>
              <b class="poster-boton">▶ JUGAR</b>
            </a>
            <p class="poster-nota">Se abre a pantalla completa. Vuelve con el botón Atrás para opinar.</p>`
          : `<iframe src="${esc(p.url)}" title="Prototipo jugable: ${esc(p.nombre)}" allow="autoplay; fullscreen"></iframe>
            <a class="enlace" href="${esc(p.url)}" target="_blank" rel="noopener">Abrir a pantalla completa ↗</a>`}
      </div>
      <div class="proto-info">
        ${p.descripcion.map((t) => `<p>${esc(t)}</p>`).join("")}
        <h2>Cómo se juega</h2>
        <p>${esc(p.controles)}</p>
        <h2>Qué probar</h2>
        <ul>${p.probar.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <p class="aviso">Es un prototipo: no es el juego final y puede tener fallos. Tu opinión decide si llega a ${esc(p.juego)} y cómo.</p>
      </div>
    </section>

    <section class="contenedor" id="opiniones">
      <h2 class="titulo-seccion">Opiniones</h2>
      <div id="zona-opinar"></div>
      <ul id="lista-comentarios" class="comentarios"></ul>
    </section>

    <section class="contenedor juego-pie">
      <a class="enlace" href="index.html#prototipos">← Todos los prototipos</a>
    </section>`;

  if (!firebaseListo()) {
    document.getElementById("zona-opinar").innerHTML = `<p class="aviso">Las calificaciones y comentarios se activan muy pronto. Mientras tanto, escríbenos a <a class="enlace" href="mailto:${esc(ESTUDIO.correo)}">${esc(ESTUDIO.correo)}</a>.</p>`;
    return;
  }
  pintarFormulario(p);
  cargarComentarios(p);
}

function pintarFormulario(p) {
  const zona = document.getElementById("zona-opinar");
  zona.innerHTML = `
    <form id="form-opinion" class="form-opinion" novalidate>
      <fieldset class="elegir-estrellas">
        <legend>Tu calificación</legend>
        <div class="estrellas-input">
          ${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="est-${n}" name="estrellas" value="${n}"><label for="est-${n}" title="${n} de 5">★</label>`).join("")}
        </div>
      </fieldset>
      <label class="campo"><span>Tu nombre o apodo</span>
        <input id="op-nombre" name="nombre" maxlength="40" autocomplete="nickname" required>
      </label>
      <label class="campo"><span>Comentario <small>(opcional)</small></span>
        <textarea id="op-texto" name="texto" maxlength="500" rows="4" placeholder="¿Qué te gustó? ¿Qué cambiarías?"></textarea>
      </label>
      <input class="trampa" id="op-web" name="web" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="form-fila">
        <button class="btn-sec" type="submit">Publicar opinión</button>
        <span id="op-estado" class="op-estado" role="status"></span>
      </div>
      <p class="nota-privacidad">Tu nombre, la calificación y el comentario serán públicos en esta página. No pongas datos personales.</p>
    </form>`;
  const form = document.getElementById("form-opinion");
  const estado = document.getElementById("op-estado");
  let enviando = false;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (enviando) return;
    const elegida = form.querySelector("input[name=estrellas]:checked");
    const estrellas = elegida ? Number(elegida.value) : 0;
    const nombre = form.nombre.value.trim();
    const texto = form.texto.value.trim();
    if (!estrellas) { estado.textContent = "Elige de 1 a 5 estrellas."; return; }
    if (!nombre) { estado.textContent = "Escribe un nombre o apodo."; form.nombre.focus(); return; }
    if (form.web.value) { form.reset(); estado.textContent = "¡Gracias!"; return; }   // casilla trampa: solo la rellenan los bots
    enviando = true;
    estado.textContent = "Publicando…";
    try {
      await enviarComentario({ proto: p.id, nombre, estrellas, texto });
      form.reset();
      estado.textContent = "¡Gracias! Tu opinión ya está publicada.";
      cargarComentarios(p);
      setTimeout(() => { enviando = false; }, 20000);   // evita publicar muchas seguidas
    } catch (err) {
      enviando = false;
      estado.textContent = "No se pudo publicar. Revisa tu conexión y vuelve a intentarlo.";
    }
  });
}

async function cargarComentarios(p) {
  const lista = document.getElementById("lista-comentarios");
  const cab = document.getElementById("nota-cabecera");
  lista.innerHTML = '<li class="cargando">Cargando opiniones…</li>';
  try {
    const comentarios = await leerComentarios(p.id);
    cab.innerHTML = resumenNota(comentarios);
    lista.innerHTML = comentarios.length
      ? comentarios.map((c) => `<li>
          <div class="com-cabecera"><b>${esc(c.nombre)}</b><span class="estrellas-fijas" aria-label="${c.estrellas} de 5">${estrellasTexto(c.estrellas)}</span>${c.fecha ? `<time datetime="${esc(c.fecha)}">${fechaBonita(c.fecha.slice(0, 10))}</time>` : ""}</div>
          ${c.texto ? `<p>${esc(c.texto)}</p>` : ""}
        </li>`).join("")
      : '<li class="cargando">Nadie ha opinado todavía. ¡Sé el primero!</li>';
  } catch (e) {
    lista.innerHTML = '<li class="cargando">No se pudieron cargar las opiniones ahora mismo.</li>';
  }
}

// Firestore por su API REST (sin librerías). Reglas en docs/firebase/firestore.rules
function firebaseListo() {
  return typeof FIREBASE !== "undefined" && FIREBASE.projectId && FIREBASE.apiKey;
}
function rutaFirestore() {
  return `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents`;
}

async function leerComentarios(proto) {
  const consulta = {
    structuredQuery: {
      from: [{ collectionId: "comentarios" }],
      where: { fieldFilter: { field: { fieldPath: "proto" }, op: "EQUAL", value: { stringValue: proto } } },
      limit: 300,
    },
  };
  const r = await fetch(`${rutaFirestore()}:runQuery?key=${encodeURIComponent(FIREBASE.apiKey)}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(consulta),
  });
  if (!r.ok) throw new Error("Firestore " + r.status);
  const filas = await r.json();
  return filas.filter((f) => f.document).map((f) => {
    const d = f.document.fields;
    return {
      nombre: d.nombre ? d.nombre.stringValue : "Anónimo",
      estrellas: Math.max(1, Math.min(5, Number(d.estrellas ? d.estrellas.integerValue : 0))),
      texto: d.texto ? d.texto.stringValue : "",
      fecha: d.fecha ? d.fecha.timestampValue : "",
    };
  }).sort((a, b) => b.fecha.localeCompare(a.fecha));   // la más nueva arriba
}

async function enviarComentario(c) {
  const id = Array.from(crypto.getRandomValues(new Uint8Array(10)), (b) => b.toString(16).padStart(2, "0")).join("");
  const cuerpo = {
    writes: [{
      update: {
        name: `projects/${FIREBASE.projectId}/databases/(default)/documents/comentarios/${id}`,
        fields: {
          proto: { stringValue: c.proto },
          nombre: { stringValue: c.nombre },
          estrellas: { integerValue: String(c.estrellas) },
          texto: { stringValue: c.texto },
        },
      },
      updateTransforms: [{ fieldPath: "fecha", setToServerValue: "REQUEST_TIME" }],   // la fecha la pone el servidor
      currentDocument: { exists: false },
    }],
  };
  const r = await fetch(`${rutaFirestore()}:commit?key=${encodeURIComponent(FIREBASE.apiKey)}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo),
  });
  if (!r.ok) throw new Error("Firestore " + r.status);
}

function abrirVisor(src, alt) {
  const v = document.createElement("div");
  v.className = "visor";
  v.innerHTML = `<img src="${esc(src)}" alt="${esc(alt)}">`;
  v.addEventListener("click", () => v.remove());
  document.addEventListener("keydown", function cerrar(e) {
    if (e.key === "Escape") { v.remove(); document.removeEventListener("keydown", cerrar); }
  });
  document.body.appendChild(v);
}

// Fondo de estrellas que titilan y cometas que cruzan en diagonal
// (como el fondo "Lluvia de meteoros" del juego: estela de color y cabeza blanca)
const COLORES_COMETA = ["255,214,10", "34,229,255", "124,77,255", "255,255,255"];

function estrellas() {
  const cv = document.getElementById("estrellas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lista = [];
  let cometas = [];
  let antes = 0;
  function medir() {
    cv.width = innerWidth * devicePixelRatio;
    cv.height = innerHeight * devicePixelRatio;
    const n = Math.round((innerWidth * innerHeight) / 5000);
    lista = Array.from({ length: n }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: (Math.random() * 1.2 + 0.3) * devicePixelRatio,
      f: Math.random() * Math.PI * 2,
      v: Math.random() * 1.5 + 0.5,
    }));
  }
  function dibujar(t) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const s of lista) {
      const a = quieto ? 0.6 : 0.35 + 0.35 * Math.sin(s.f + (t / 1000) * s.v);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!quieto) {
      const dt = Math.min((t - antes) / 1000, 0.1);
      antes = t;
      dibujarCometas(dt);
      requestAnimationFrame(dibujar);
    }
  }
  function dibujarCometas(dt) {
    const k = devicePixelRatio;
    if (Math.random() < dt * 0.7) {
      const vel = (Math.random() * 300 + 500) * k;   // px por segundo
      cometas.push({
        x: Math.random() * cv.width * 1.3,
        y: -20 * k,
        vx: -vel * 0.53, vy: vel * 0.85,              // diagonal hacia abajo-izquierda
        vida: 1.4,
        color: COLORES_COMETA[Math.floor(Math.random() * COLORES_COMETA.length)],
      });
    }
    for (let i = cometas.length - 1; i >= 0; i--) {
      const c = cometas[i];
      c.vida -= dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;
      if (c.vida <= 0) { cometas.splice(i, 1); continue; }
      const a = Math.min(c.vida, 1);
      const cx = c.x - c.vx * 0.18, cy = c.y - c.vy * 0.18;  // final de la estela
      const g = ctx.createLinearGradient(c.x, c.y, cx, cy);
      g.addColorStop(0, `rgba(${c.color},${0.7 * a})`);
      g.addColorStop(1, `rgba(${c.color},0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 3 * k;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.shadowColor = `rgba(${c.color},${a})`;
      ctx.shadowBlur = 10 * k;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 2.5 * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  medir();
  addEventListener("resize", medir);
  requestAnimationFrame(dibujar);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-correo]").forEach((a) => {
    a.href = "mailto:" + ESTUDIO.correo;
    a.textContent = ESTUDIO.correo;
  });
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
  const menu = document.getElementById("boton-menu");
  if (menu) menu.addEventListener("click", () => document.body.classList.toggle("menu-abierto"));
  document.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-abierto")));
  pintarInicio();
  pintarJuego();
  pintarPrototipos();
  pintarPrototipo();
  estrellas();
});
