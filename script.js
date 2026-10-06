// 👇 Tu número de WhatsApp (sin +, sin espacios)
const TELEFONO = "5354495227";

// 👇 Carpeta donde están las imágenes
const CARPETA = "libros/";

// 👇 Lista de trabajos:
//    archivo = nombre del archivo en la carpeta libros/
//    genero  = categoría del libro
const LIBROS = [
  { archivo: "you.jpeg",                 genero: "Romance" },
  { archivo: "alas-de-sangre.jpeg",        genero: "Fantasía" },
  { archivo: "manwha-1.jpeg",              genero: "Manwha" },
  { archivo: "the-godfather.jpeg",         genero: "Clásicos" },
  { archivo: "billy-summer.jpeg",          genero: "Thriller" },
  { archivo: "corona-de-media-noche.jpeg", genero: "Fantasía" },
  { archivo: "kora-sparks.jpeg",           genero: "Fantasía" },
  { archivo: "tumba-de-dioses.jpeg",       genero: "Fantasía" },
  { archivo: "las-cadenas-del-rey.jpeg",   genero: "Fantasía" }
];

// ---------- LÓGICA (no tocar) ----------

function crearTarjeta(libro) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.genero = libro.genero;
  card.innerHTML = `
    <div class="img-wrap">
      <img src="${CARPETA}${encodeURIComponent(libro.archivo)}"
           alt="Trabajo por encargo"
           loading="lazy">
    </div>
    <span class="genero">${libro.genero}</span>
  `;
  return card;
}

// Crea los botones de filtro con los géneros detectados
function crearFiltros() {
  const contenedor = document.getElementById("filtros");
  const generos = [...new Set(LIBROS.map(l => l.genero))].sort();

  const botones = ["Todos", ...generos];

  botones.forEach((g, i) => {
    const btn = document.createElement("button");
    btn.textContent = g;
    btn.className = "filtro" + (i === 0 ? " activo" : "");
    btn.dataset.genero = g;
    btn.addEventListener("click", () => filtrar(g, btn));
    contenedor.appendChild(btn);
  });
}

// Filtra las tarjetas visibles
function filtrar(genero, boton) {
  document.querySelectorAll(".filtro").forEach(b => b.classList.remove("activo"));
  boton.classList.add("activo");

  document.querySelectorAll(".card").forEach(card => {
    const coincide = genero === "Todos" || card.dataset.genero === genero;
    card.style.display = coincide ? "" : "none";
  });
}

// Pinta todo el catálogo
function cargarCatalogo() {
  const contenedor = document.getElementById("catalogo");

  if (!LIBROS.length) {
    contenedor.innerHTML =
      "<p style='text-align:center;grid-column:1/-1'>Aún no hay trabajos publicados.</p>";
    return;
  }

  LIBROS.forEach(libro => contenedor.appendChild(crearTarjeta(libro)));
  crearFiltros();
}

cargarCatalogo();