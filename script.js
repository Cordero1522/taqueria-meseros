/* ============================================================
   ⚙️ CONFIGURACIÓN — GOOGLE SHEETS
   ------------------------------------------------------------
   Reemplaza esta URL con la de tu Google Apps Script publicado
   como aplicación web (Implementar → Aplicación web → Cualquiera).
   ============================================================ */
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyZfhk6oMMbOYmAYQuGj7GRuG7__FrbB19Gc-8FT2D4M8kuxwladINGlcogRIPNqJef/exec";

/* ============================================================
   IDENTIDAD DEL MESERO (persistente por dispositivo)
   ============================================================ */
function getMesero(){
  return localStorage.getItem("mesero_nombre") || "";
}
function setMesero(nombre){
  localStorage.setItem("mesero_nombre", nombre.trim());
  document.querySelector("#meseroNombre").textContent = nombre.trim();
}

/* ============================================================
   DATOS DEL MENÚ
   ============================================================ */
const MENU = [
  /* POLLO */
  {id:"p1", nombre:"Pechuga de pollo tradicional", precio:115, cat:"Pollo", foto:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=60", desc:"Pechuga a la plancha con guarnición."},
  {id:"p2", nombre:"Pechuga de pollo con queso", precio:125, cat:"Pollo", foto:"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=60", desc:"Pechuga gratinada con queso fundido."},
  {id:"p3", nombre:"Pechuga de pollo con champiñón", precio:125, cat:"Pollo", foto:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60", desc:"Pechuga con champiñones salteados."},
  {id:"p4", nombre:"Pechuga con champiñón y queso", precio:135, cat:"Pollo", foto:"https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400&q=60", desc:"Champiñones y queso gratinado."},
  {id:"p5", nombre:"Alambre de pechuga con champiñón y queso", precio:145, cat:"Pollo", foto:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=60", desc:"Alambre completo de pollo."},
  {id:"p6", nombre:"Quesadillas", precio:45, cat:"Pollo", foto:"https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=60", desc:"Quesadilla sencilla."},
  {id:"p7", nombre:"Quesadillas con champiñón", precio:50, cat:"Pollo", foto:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=60", desc:"Quesadilla con champiñones."},
  {id:"p8", nombre:"Gringas al pastor o res", precio:55, cat:"Pollo", foto:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=60", desc:"Gringa tradicional."},
  {id:"p9", nombre:"Gringas al pastor o res y champiñón", precio:60, cat:"Pollo", foto:"https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=60", desc:"Gringa con champiñón."},
  {id:"p10", nombre:"Sincronizadas", precio:50, cat:"Pollo", foto:"https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=60", desc:"Sincronizadas de jamón y queso."},
  {id:"p11", nombre:"Refrescos", precio:30, cat:"Bebidas", foto:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&q=60", desc:"Refresco de lata o botella."},
  {id:"p12", nombre:"Aguas frescas", precio:25, cat:"Bebidas", foto:"https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=60", desc:"Agua fresca del día."},

  /* TORTAS */
  {id:"t1", nombre:"Torta de Pastor", cat:"Tortas", tipo:"variantes",
   desc:"Pastor con cebolla, jamón, pimientos y queso.",
   foto:"https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=60",
   variantes:[
     {id:"t1a", nombre:"Pastor", precio:50},
     {id:"t1b", nombre:"Pastor c/queso", precio:65},
     {id:"t1c", nombre:"Pastor La Cerca", precio:70},
   ]},
  {id:"t2", nombre:"Torta de Bistec", cat:"Tortas", tipo:"variantes",
   desc:"Bistec con cebolla, jamón, pimientos y queso.",
   foto:"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=60",
   variantes:[
     {id:"t2a", nombre:"Bistec", precio:60},
     {id:"t2b", nombre:"Bistec c/queso", precio:70},
     {id:"t2c", nombre:"Bistec La Cerca", precio:75},
   ]},

  /* COMPLEMENTOS */
  {id:"c1", nombre:"Queso fundido", precio:120, cat:"Complementos", foto:"https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=400&q=60", desc:"Queso fundido tradicional."},
  {id:"c2", nombre:"Queso fundido con champiñón", precio:130, cat:"Complementos", foto:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=60", desc:"Queso fundido con champiñones."},
  {id:"c3", nombre:"Choriqueso", precio:120, cat:"Complementos", foto:"https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=60", desc:"Chorizo con queso fundido."},
  {id:"c4", nombre:"Guacamole", precio:100, cat:"Complementos", foto:"https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=60", desc:"Guacamole fresco con totopos."},

  /* LO NUESTRO */
  {id:"n1", nombre:"Pastor tradicional", precio:120, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=60", desc:"Pastor tradicional."},
  {id:"n2", nombre:"Pastor con queso", precio:130, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=60", desc:"Pastor con queso fundido."},
  {id:"n3", nombre:"Pastor con champiñones", precio:130, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=60", desc:"Pastor con champiñones."},
  {id:"n4", nombre:"Pastor con champiñones y queso", precio:140, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400&q=60", desc:"Pastor con champiñones y queso."},
  {id:"n5", nombre:"Bistec tradicional", precio:125, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=60", desc:"Bistec tradicional."},
  {id:"n6", nombre:"Bistec con champiñón", precio:140, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60", desc:"Bistec con champiñones."},
  {id:"n7", nombre:"Bistec con queso", precio:140, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=60", desc:"Bistec con queso fundido."},
  {id:"n8", nombre:"Bistec encebollado", precio:120, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=60", desc:"Bistec con cebolla."},
  {id:"n9", nombre:"Bistec tocino y queso", precio:145, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=60", desc:"Bistec con tocino y queso."},
  {id:"n10", nombre:"Bistec con queso y champiñón", precio:150, cat:"Lo Nuestro", foto:"https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400&q=60", desc:"Bistec con queso y champiñones."},

  /* KILOS */
  {id:"k1", nombre:"Pastor (Kilo)", cat:"Kilos", tipo:"variantes", foto:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=60",
   desc:"Orden por kilo de pastor.",
   variantes:[
     {id:"k1a", nombre:"1 KG", precio:380},
     {id:"k1b", nombre:"¾ KG", precio:285},
     {id:"k1c", nombre:"½ KG", precio:190},
   ]},
  {id:"k2", nombre:"Pastor con queso (Kilo)", cat:"Kilos", tipo:"variantes", foto:"https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=60",
   desc:"Orden por kilo de pastor con queso.",
   variantes:[
     {id:"k2a", nombre:"1 KG", precio:400},
     {id:"k2b", nombre:"¾ KG", precio:300},
     {id:"k2c", nombre:"½ KG", precio:200},
   ]},
  {id:"k3", nombre:"Bistec (Kilo)", cat:"Kilos", tipo:"variantes", foto:"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=60",
   desc:"Orden por kilo de bistec.",
   variantes:[
     {id:"k3a", nombre:"1 KG", precio:440},
     {id:"k3b", nombre:"¾ KG", precio:330},
     {id:"k3c", nombre:"½ KG", precio:220},
   ]},
  {id:"k4", nombre:"Bistec con queso (Kilo)", cat:"Kilos", tipo:"variantes", foto:"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=60",
   desc:"Orden por kilo de bistec con queso.",
   variantes:[
     {id:"k4a", nombre:"1 KG", precio:500},
     {id:"k4b", nombre:"¾ KG", precio:375},
     {id:"k4c", nombre:"½ KG", precio:250},
   ]},

  /* TACOS */
  {id:"ta1", nombre:"Tacos de Pastor", cat:"Tacos", tipo:"variantes", foto:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=60",
   desc:"Tacos de pastor. Precios por pieza y orden.",
   variantes:[
     {id:"ta1a", nombre:"Maíz (c/u)", precio:18},
     {id:"ta1b", nombre:"Maíz c/queso (c/u)", precio:28},
     {id:"ta1c", nombre:"Orden 3 Maíz", precio:84},
     {id:"ta1d", nombre:"Orden 3 Maíz c/queso", precio:96},
     {id:"ta1e", nombre:"Harina (c/u)", precio:28},
     {id:"ta1f", nombre:"Harina c/queso (c/u)", precio:32},
   ]},
  {id:"ta2", nombre:"Tacos de Bistec", cat:"Tacos", tipo:"variantes", foto:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=60",
   desc:"Tacos de bistec. Precios por pieza y orden.",
   variantes:[
     {id:"ta2a", nombre:"Maíz (c/u)", precio:22},
     {id:"ta2b", nombre:"Maíz c/queso (c/u)", precio:30},
     {id:"ta2c", nombre:"Orden 3 Maíz", precio:90},
     {id:"ta2d", nombre:"Orden 3 Maíz c/queso", precio:105},
     {id:"ta2e", nombre:"Harina (c/u)", precio:30},
     {id:"ta2f", nombre:"Harina c/queso (c/u)", precio:35},
   ]},

  /* ALAMBRES */
  {id:"al1", nombre:"Alambre al pastor", precio:120, cat:"Alambres", foto:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=60", desc:"Pastor, cebolla, tocino y pimientos."},
  {id:"al2", nombre:"Alambre de pastor con queso", precio:135, cat:"Alambres", foto:"https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400&q=60", desc:"Alambre de pastor con queso."},
  {id:"al3", nombre:"Alambre al pastor con champiñón", precio:135, cat:"Alambres", foto:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60", desc:"Alambre de pastor con champiñón."},
  {id:"al4", nombre:"Alambre al pastor con champiñón y queso", precio:145, cat:"Alambres", foto:"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=60", desc:"Alambre completo de pastor."},
  {id:"al5", nombre:"Alambre de res", precio:135, cat:"Alambres", foto:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=60", desc:"Alambre de res."},
  {id:"al6", nombre:"Alambre de res con queso", precio:145, cat:"Alambres", foto:"https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=60", desc:"Alambre de res con queso."},
  {id:"al7", nombre:"Alambre de res con champiñón", precio:145, cat:"Alambres", foto:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60", desc:"Alambre de res con champiñón."},
  {id:"al8", nombre:"Alambre de res con champiñón y queso", precio:160, cat:"Alambres", foto:"https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400&q=60", desc:"Alambre completo de res."},

  /* EXTRAS */
  {id:"ex1", nombre:"Tortilla extra de maíz (10 pz)", precio:10, cat:"Extras", foto:"https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=60", desc:"10 piezas de tortilla de maíz."},
  {id:"ex2", nombre:"Tortilla extra de harina (10 pz)", precio:15, cat:"Extras", foto:"https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=60", desc:"10 piezas de tortilla de harina."},
  {id:"ex3", nombre:"Salsa extra", precio:5, cat:"Extras", foto:"https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=60", desc:"Porción de salsa extra."},
  {id:"ex4", nombre:"Verdura extra", precio:10, cat:"Extras", foto:"https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=60", desc:"Porción de verdura extra."},
];

/* ============================================================
   ESTADO
   ============================================================ */
let carrito = [];
let catActiva = "Todas";

const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];
const money = n => "$" + n.toLocaleString("es-MX");
const uid = () => "u" + Date.now().toString(36) + Math.random().toString(36).slice(2,6);

function toast(msg, tipo="ok"){
  const t = $("#toast");
  $("#toastMsg").textContent = msg;
  t.className = "toast show " + (tipo === "warn" ? "warn" : tipo === "err" ? "err" : "");
  clearTimeout(t._tm);
  t._tm = setTimeout(()=>t.classList.remove("show"), 2200);
}

/* ============================================================
   RENDER CATEGORÍAS (dropdown)
   ============================================================ */
function renderCategorias(){
  const cats = [...new Set(MENU.map(p=>p.cat))];
  const total = MENU.length;
  const menu = $("#catMenu");
  menu.innerHTML = `
    <button class="cat-item active" data-cat="Todas">
      <i class="bi bi-grid-3x3-gap"></i> Todas las categorías
      <span class="count">${total}</span>
    </button>
    ${cats.map(c=>{
      const n = MENU.filter(p=>p.cat===c).length;
      return `<button class="cat-item" data-cat="${c}">
        <i class="bi bi-tag"></i> ${c}
        <span class="count">${n}</span>
      </button>`;
    }).join("")}
  `;
  menu.querySelectorAll(".cat-item").forEach(b=>{
    b.addEventListener("click", ()=>{
      menu.querySelectorAll(".cat-item").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      catActiva = b.dataset.cat;
      $("#catActual").textContent = catActiva === "Todas" ? "Todas las categorías" : catActiva;
      $("#catDropdown").classList.remove("open");
      renderMenu(catActiva, $("#buscador").value);
    });
  });
}

/* ============================================================
   RENDER MENÚ
   ============================================================ */
function renderMenu(catFiltro="Todas", busqueda=""){
  const cont = $("#menuContainer");
  const q = busqueda.trim().toLowerCase();
  let lista = MENU.filter(p=>{
    const okCat = catFiltro === "Todas" || p.cat === catFiltro;
    const okQ = !q || p.nombre.toLowerCase().includes(q) || (p.desc||"").toLowerCase().includes(q);
    return okCat && okQ;
  });

  if(!lista.length){
    cont.innerHTML = `<div class="empty"><i class="bi bi-search"></i><p>No se encontraron platillos.</p></div>`;
    return;
  }

  let html = "";
  if(catFiltro === "Todas" && !q){
    const grupos = {};
    lista.forEach(p=>{ (grupos[p.cat] ??= []).push(p); });
    for(const [cat, items] of Object.entries(grupos)){
      html += `<div class="section-title"><i class="bi bi-bookmark-star"></i> ${cat}</div>`;
      html += `<div class="grid">` + items.map(cardHTML).join("") + `</div>`;
    }
  } else {
    html = `<div class="grid">` + lista.map(cardHTML).join("") + `</div>`;
  }
  cont.innerHTML = html;

  cont.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.dataset.add;
      const qtyInput = cont.querySelector(`[data-qty="${id}"]`);
      const qty = Math.max(1, parseInt(qtyInput.value) || 1);
      agregarSimple(id, qty);
      qtyInput.value = 1;
    });
  });
  cont.querySelectorAll("[data-add-var]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const prodId = btn.dataset.prod;
      const varId = btn.dataset.addVar;
      const qtyInput = cont.querySelector(`[data-qty-var="${varId}"]`);
      const qty = Math.max(1, parseInt(qtyInput.value) || 1);
      agregarVariante(prodId, varId, qty);
      qtyInput.value = 1;
    });
  });
}

function cardHTML(p){
  const foto = p.foto
    ? `<img src="${p.foto}" alt="${p.nombre}" loading="lazy" onerror="this.style.display='none'">`
    : "";
  const icono = p.cat === "Bebidas" ? "bi-cup-straw" :
                p.cat === "Tortas" ? "bi-basket" :
                p.cat === "Tacos" ? "bi-egg-fried" :
                p.cat === "Kilos" ? "bi-bag" :
                p.cat === "Extras" ? "bi-plus-circle" : "bi-egg-fried";

  let controles = "";
  if(p.tipo === "variantes"){
    controles = `<div class="variant-list">` + p.variantes.map(v=>`
      <div class="variant-item">
        <div class="v-info">
          <span class="v-nombre">${v.nombre}</span>
          <span class="v-precio">${money(v.precio)}</span>
        </div>
        <div class="v-controls">
          <input type="number" class="qty-input" min="1" value="1" data-qty-var="${v.id}">
          <button class="btn-mini-add" data-prod="${p.id}" data-add-var="${v.id}" title="Agregar">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>`).join("") + `</div>`;
  } else {
    controles = `<div class="add-row">
      <input type="number" class="qty-input" min="1" value="1" data-qty="${p.id}">
      <button class="btn-add" data-add="${p.id}">
        <i class="bi bi-plus-circle"></i> Agregar
      </button>
    </div>`;
  }

  return `
  <article class="card">
    <div class="foto">${foto}<i class="bi ${icono}"></i></div>
    <div class="body">
      <div class="nombre">${p.nombre}</div>
      ${p.desc ? `<div class="desc">${p.desc}</div>` : ""}
      ${p.precio ? `<div class="precio"><i class="bi bi-currency-dollar"></i>${p.precio}</div>` : ""}
      ${controles}
    </div>
  </article>`;
}

/* ============================================================
   AGREGAR
   ============================================================ */
function agregarSimple(id, qty){
  const p = MENU.find(x=>x.id === id);
  if(!p) return;
  const existente = carrito.find(c=>c.id === id && !c.obs);
  if(existente){ existente.qty += qty; }
  else{
    carrito.push({uid:uid(), id:p.id, nombre:p.nombre, precio:p.precio, qty, obs:"", cat:p.cat});
  }
  actualizarCarrito();
  toast(`${qty}× ${p.nombre} agregado`);
}

function agregarVariante(prodId, varId, qty){
  const prod = MENU.find(x=>x.id === prodId);
  const vari = prod?.variantes.find(v=>v.id === varId);
  if(!prod || !vari) return;
  const nombre = `${prod.nombre} · ${vari.nombre}`;
  const existente = carrito.find(c=>c.id === varId && !c.obs);
  if(existente){ existente.qty += qty; }
  else{
    carrito.push({uid:uid(), id:varId, nombre, precio:vari.precio, qty, obs:"", cat:prod.cat});
  }
  actualizarCarrito();
  toast(`${qty}× ${vari.nombre} agregado`);
}

/* ============================================================
   CARRITO
   ============================================================ */
function actualizarCarrito(){
  const totalItems = carrito.reduce((s,c)=>s+c.qty,0);
  const totalPrecio = carrito.reduce((s,c)=>s+c.precio*c.qty,0);
  $("#cartCount").textContent = totalItems;
  $("#cartTotal").textContent = money(totalPrecio);
  $("#pSubtotal").textContent = money(totalPrecio);
  $("#pArticulos").textContent = totalItems;
  $("#pTotal").textContent = money(totalPrecio);
  renderPanelOrden();
}

function renderPanelOrden(){
  const body = $("#cartBody");
  if(!carrito.length){
    body.innerHTML = `<div class="empty">
      <i class="bi bi-cart-x"></i>
      <p>No hay platillos en la orden.</p>
      <p style="font-size:.78rem">Agrega productos del menú para comenzar.</p>
    </div>`;
    return;
  }
  body.innerHTML = carrito.map(c=>`
    <div class="cart-item" data-uid="${c.uid}">
      <div class="ci-info">
        <div class="ci-nombre">${c.nombre}</div>
        <div class="ci-precio">${money(c.precio)} c/u · ${c.cat}</div>
        <textarea class="ci-obs" rows="1" placeholder="Observaciones: sin cebolla, término medio, etc." data-obs="${c.uid}">${c.obs}</textarea>
      </div>
      <div class="ci-controls">
        <div class="ci-subtotal">${money(c.precio * c.qty)}</div>
        <div class="qty-stepper">
          <button data-menos="${c.uid}"><i class="bi bi-dash"></i></button>
          <span>${c.qty}</span>
          <button data-mas="${c.uid}"><i class="bi bi-plus"></i></button>
        </div>
        <button class="btn-del" data-del="${c.uid}" title="Eliminar"><i class="bi bi-trash3"></i></button>
      </div>
    </div>`).join("");

  body.querySelectorAll("[data-mas]").forEach(b=>b.addEventListener("click",()=>{
    const c = carrito.find(x=>x.uid===b.dataset.mas); if(c){ c.qty++; actualizarCarrito(); }
  }));
  body.querySelectorAll("[data-menos]").forEach(b=>b.addEventListener("click",()=>{
    const c = carrito.find(x=>x.uid===b.dataset.menos);
    if(c){ c.qty--; if(c.qty <= 0) carrito = carrito.filter(x=>x.uid!==c.uid); actualizarCarrito(); }
  }));
  body.querySelectorAll("[data-del]").forEach(b=>b.addEventListener("click",()=>{
    carrito = carrito.filter(x=>x.uid!==b.dataset.del);
    actualizarCarrito();
  }));
  body.querySelectorAll("[data-obs]").forEach(ta=>{
    ta.addEventListener("input", ()=>{
      const c = carrito.find(x=>x.uid===ta.dataset.obs);
      if(c) c.obs = ta.value;
    });
  });
}

/* ============================================================
   🔌 CONEXIÓN CON GOOGLE SHEETS (Google Apps Script)
   ------------------------------------------------------------
   El backend (Apps Script) debe aceptar POST con JSON:
   {
     mesero: "Juan",
     fecha: "2026-01-15T14:32:00.000Z",
     items: [{nombre, precio, qty, obs, subtotal}],
     total: 385,
     timestamp: 1737000000000
   }
   Y responder {ok:true, fila: N}
   ============================================================ */
async function enviarAGoogleSheets(orden){
  if(!GOOGLE_SHEETS_WEBAPP_URL || GOOGLE_SHEETS_WEBAPP_URL.includes("XXXX")){
    console.warn("[Google Sheets] URL no configurada. Orden guardada localmente.");
    guardarOrdenLocal(orden);
    return {ok:true, local:true};
  }
  try{
    await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type": "text/plain;charset=utf-8"},
      body: JSON.stringify(orden)
    });
    return {ok:true};
  }catch(err){
    console.error("[Google Sheets] Error de red:", err);
    guardarOrdenLocal(orden);
    return {ok:false, error: err.message};
  }
}

/* Cola local por si falla la red */
function guardarOrdenLocal(orden){
  const cola = JSON.parse(localStorage.getItem("ordenes_pendientes") || "[]");
  cola.push(orden);
  localStorage.setItem("ordenes_pendientes", JSON.stringify(cola));
}

async function reintentarPendientes(){
  const cola = JSON.parse(localStorage.getItem("ordenes_pendientes") || "[]");
  if(!cola.length) return;
  const restantes = [];
  for(const o of cola){
    const r = await enviarAGoogleSheets(o);
    if(!r.ok) restantes.push(o);
  }
  localStorage.setItem("ordenes_pendientes", JSON.stringify(restantes));
  if(restantes.length === 0 && cola.length > 0){
    toast(`${cola.length} orden(es) sincronizada(s)`);
  }
}

/* ============================================================
   ENVIAR ORDEN
   ============================================================ */
async function enviarACaja(){
  if(!carrito.length){ toast("La orden está vacía", "warn"); return; }

  const mesero = getMesero() || "Sin nombre";
  const btn = $("#btnEnviarCaja");
  btn.disabled = true;
  btn.innerHTML = `<i class="bi bi-hourglass-split"></i> Enviando...`;

  const orden = {
    mesero: mesero,
    fecha: new Date().toISOString(),
    timestamp: Date.now(),
    items: carrito.map(c=>({
      nombre: c.nombre,
      precio: c.precio,
      qty: c.qty,
      obs: c.obs || "",
      subtotal: c.precio * c.qty
    })),
    total: carrito.reduce((s,c)=>s+c.precio*c.qty,0)
  };

  const r = await enviarAGoogleSheets(orden);

  btn.disabled = false;
  btn.innerHTML = `<i class="bi bi-send-check"></i> Enviar orden a caja`;

  if(r.ok){
    toast(r.local ? "Guardada localmente (offline)" : "Orden enviada a caja ✓");
  }else{
    toast("Sin conexión. Se enviará al reconectar.", "warn");
  }

  carrito = [];
  actualizarCarrito();
  $("#overlayOrden").classList.remove("open");
}

/* ============================================================
   ESTADO DE CONEXIÓN
   ============================================================ */
function actualizarConexion(){
  const online = navigator.onLine;
  const badge = $("#connBadge");
  badge.classList.toggle("offline", !online);
  $("#connTxt").textContent = online ? "Online" : "Offline";
  badge.querySelector("i").className = online ? "bi bi-wifi" : "bi bi-wifi-off";
  if(online) reintentarPendientes();
}

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
function init(){
  // Categorías desplegable
  $("#catToggle").addEventListener("click", ()=>{
    $("#catDropdown").classList.toggle("open");
  });
  document.addEventListener("click", e=>{
    if(!e.target.closest("#catDropdown")) $("#catDropdown").classList.remove("open");
  });

  renderCategorias();
  renderMenu();
  actualizarCarrito();

  $("#buscador").addEventListener("input", e=>{
    renderMenu(catActiva, e.target.value);
  });

  $("#btnVerOrden").addEventListener("click", ()=>$("#overlayOrden").classList.add("open"));
  $("#btnCerrarOrden").addEventListener("click", ()=>$("#overlayOrden").classList.remove("open"));
  $("#overlayOrden").addEventListener("click", e=>{
    if(e.target.id === "overlayOrden") e.currentTarget.classList.remove("open");
  });

  $("#btnEnviarCaja").addEventListener("click", enviarACaja);

  $("#btnVaciar").addEventListener("click", ()=>{
    if(!carrito.length) return;
    if(confirm("¿Vaciar toda la orden actual?")){
      carrito = [];
      actualizarCarrito();
      toast("Orden vaciada");
    }
  });

  // Conexión
  window.addEventListener("online", actualizarConexion);
  window.addEventListener("offline", actualizarConexion);
  actualizarConexion();

  // Identificación del mesero
  const meseroActual = getMesero();
  if(meseroActual){
    setMesero(meseroActual);
  }else{
    $("#modalIdent").classList.add("open");
    setTimeout(()=>$("#inputMesero").focus(), 200);
  }

  $("#btnGuardarMesero").addEventListener("click", ()=>{
    const nombre = $("#inputMesero").value.trim();
    if(!nombre){ toast("Escribe tu nombre", "warn"); return; }
    setMesero(nombre);
    $("#modalIdent").classList.remove("open");
    toast(`¡Bienvenido, ${nombre}!`);
  });
  $("#inputMesero").addEventListener("keydown", e=>{
    if(e.key === "Enter") $("#btnGuardarMesero").click();
  });

  // Cambiar mesero (long-press en el badge)
  let pressTimer;
  const badge = $("#meseroBadge");
  const iniciarPress = () => {
    pressTimer = setTimeout(()=>{
      if(confirm("¿Cambiar de mesero?")){
        localStorage.removeItem("mesero_nombre");
        location.reload();
      }
    }, 800);
  };
  const cancelarPress = () => clearTimeout(pressTimer);
  badge.addEventListener("touchstart", iniciarPress);
  badge.addEventListener("touchend", cancelarPress);
  badge.addEventListener("mousedown", iniciarPress);
  badge.addEventListener("mouseup", cancelarPress);
  badge.addEventListener("mouseleave", cancelarPress);
}

document.addEventListener("DOMContentLoaded", init);