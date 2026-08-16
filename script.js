/* VELCYRO / CORE FRONTEND ENGINE
   Rebuilt to work with the existing 4–106 module family.
   Demo products can later be replaced by real inventory.
*/
(() => {
  "use strict";

  const PRODUCTS = [
    {id:1,name:"VOID SIGNAL OVERSIZED TEE",category:"tees",price:999,tag:"DROP 01",mark:"V",description:"A heavyweight oversized silhouette built around the first VELCYRO graphic system.",material:"Heavyweight cotton jersey",sizes:["S","M","L","XL"],colors:["VOID BLACK"],stock:12,featured:true},
    {id:2,name:"ECLIPSE HEAVYWEIGHT TEE",category:"tees",price:1099,tag:"LIMITED",mark:"02",description:"Clean geometry, dense cotton and a restrained graphic language.",material:"Heavyweight combed cotton",sizes:["S","M","L","XL"],colors:["ASH","BLACK"],stock:8},
    {id:3,name:"ORBITAL CODE HOODIE",category:"hoodies",price:1899,tag:"DROP 01",mark:"∞",description:"A structured heavyweight hoodie designed for the colder side of the frequency.",material:"Heavyweight fleece",sizes:["S","M","L","XL"],colors:["NIGHT"],stock:7},
    {id:4,name:"AFTER DARK HOODIE",category:"hoodies",price:1999,tag:"NEW",mark:"AD",description:"Minimal surface. Oversized fit. A darker expression of the VELCYRO system.",material:"Premium brushed fleece",sizes:["S","M","L","XL"],colors:["AFTER DARK"],stock:10},
    {id:5,name:"VECTOR ARCHIVE TEE",category:"tees",price:1049,tag:"ARCHIVE",mark:"↗",description:"A graphic-led everyday piece with a relaxed silhouette.",material:"Cotton jersey",sizes:["S","M","L","XL"],colors:["BLACK"],stock:15},
    {id:6,name:"FREQUENCY TEE",category:"tees",price:1099,tag:"NEW",mark:"~",description:"A visual statement built to sit between minimalism and movement.",material:"Heavyweight cotton",sizes:["S","M","L","XL"],colors:["GRAPHITE"],stock:9},
    {id:7,name:"VELCYRO CAP",category:"accessories",price:699,tag:"OBJECT",mark:"V",description:"A minimal branded object designed to finish the uniform.",material:"Structured cotton twill",sizes:["OS"],colors:["BLACK"],stock:20},
    {id:8,name:"SIGNAL TOTE",category:"accessories",price:599,tag:"OBJECT",mark:"+",description:"A functional everyday carry with the VELCYRO graphic language.",material:"Heavy canvas",sizes:["OS"],colors:["BLACK"],stock:24}
  ];

  window.VELCYRO_PRODUCTS = PRODUCTS;
  window.PRODUCTS = PRODUCTS;

  const $ = (s,r=document) => r.querySelector(s);
  const $$ = (s,r=document) => [...r.querySelectorAll(s)];
  const money = n => "₹" + Number(n||0).toLocaleString("en-IN");

  let cart = JSON.parse(localStorage.getItem("velcyro_cart") || "[]");
  let activeFilter = "all";

  function saveCart(){ localStorage.setItem("velcyro_cart", JSON.stringify(cart)); }
  function getProduct(id){ return PRODUCTS.find(p => Number(p.id) === Number(id)); }

  function productVisual(p){
    return `<div class="product-visual" data-mark="${escapeHTML(p.mark)}">
      <span class="product-badge">${escapeHTML(p.tag)}</span>
      <span class="product-index">${String(p.id).padStart(2,"0")}</span>
    </div>`;
  }

  function escapeHTML(v){
    return String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  }

  function renderProducts(){
    const grid = $("#productGrid");
    if(!grid) return;
    const list = activeFilter === "all" ? PRODUCTS : PRODUCTS.filter(p=>p.category===activeFilter);
    grid.innerHTML = list.map(p=>`
      <article class="product-card reveal visible" data-id="${p.id}">
        <a href="product.html?id=${p.id}" aria-label="View ${escapeHTML(p.name)}">${productVisual(p)}</a>
        <div class="product-info">
          <div><h3>${escapeHTML(p.name)}</h3><p>${p.category.toUpperCase()} / DROP 01</p></div>
          <strong class="product-price">${money(p.price)}</strong>
          <div class="product-actions">
            <button class="quick-button" data-id="${p.id}" type="button">QUICK VIEW</button>
            <button class="add-cart-button" data-id="${p.id}" type="button">ADD TO BAG +</button>
          </div>
        </div>
      </article>`).join("");

    $$(".filter").forEach(b=>b.onclick=()=>{
      activeFilter=b.dataset.filter||"all";
      $$(".filter").forEach(x=>x.classList.toggle("active",x===b));
      renderProducts();
    });

    $$(".add-cart-button").forEach(b=>b.onclick=e=>{
      e.preventDefault(); e.stopPropagation();
      addToCart(getProduct(b.dataset.id), getProduct(b.dataset.id)?.sizes?.[0] || "OS");
      openCart();
    });

    $$(".quick-button").forEach(b=>b.onclick=e=>{
      e.preventDefault(); e.stopPropagation();
      location.href=`product.html?id=${b.dataset.id}`;
    });
  }

  function addToCart(p,size="OS",qty=1){
    if(!p) return;
    const key=`${p.id}:${size}`;
    const existing=cart.find(x=>x.key===key);
    if(existing) existing.qty+=qty;
    else cart.push({key,id:p.id,size,qty});
    saveCart(); renderCart(); updateCount();
  }

  function updateCount(){
    const n=cart.reduce((a,x)=>a+Number(x.qty||0),0);
    const el=$("#bagCount"); if(el) el.textContent=n;
    $$("[data-cart-count]").forEach(x=>x.textContent=n);
  }

  function renderCart(){
    const box=$("#cartItems"), empty=$("#cartEmpty"), sub=$("#cartSubtotal");
    if(!box) return;
    if(!cart.length){
      box.innerHTML=""; if(empty) empty.style.display="block"; if(sub) sub.textContent="₹0"; updateCount(); return;
    }
    if(empty) empty.style.display="none";
    let total=0;
    box.innerHTML=cart.map(item=>{
      const p=getProduct(item.id); if(!p)return "";
      total+=p.price*item.qty;
      return `<article class="cart-item">
        <div class="cart-thumb">${escapeHTML(p.mark)}</div>
        <div><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(item.size)} · ${money(p.price)}</small>
          <div class="qty-row"><button data-qty="${item.key}" data-change="-1" type="button">−</button><span>${item.qty}</span><button data-qty="${item.key}" data-change="1" type="button">+</button></div>
        </div>
        <button class="cart-remove" data-remove="${item.key}" type="button">REMOVE</button>
      </article>`;
    }).join("");
    if(sub) sub.textContent=money(total);
    $$("[data-remove]").forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.key!==b.dataset.remove);saveCart();renderCart()});
    $$("[data-qty]").forEach(b=>b.onclick=()=>changeQty(b.dataset.qty,Number(b.dataset.change)));
    updateCount();
  }

  function changeQty(key,delta){
    const item=cart.find(x=>x.key===key); if(!item)return;
    item.qty+=delta; if(item.qty<=0)cart=cart.filter(x=>x.key!==key);
    saveCart(); renderCart();
  }

  function openCart(){
    $("#cartDrawer")?.classList.add("open");
    $("#drawerBackdrop")?.classList.add("open");
    $("#cartDrawer")?.setAttribute("aria-hidden","false");
  }
  function closeCart(){
    $("#cartDrawer")?.classList.remove("open");
    $("#drawerBackdrop")?.classList.remove("open");
    $("#cartDrawer")?.setAttribute("aria-hidden","true");
  }

  function openSearch(){
    const o=$("#searchOverlay"); if(!o)return;
    o.classList.add("open"); o.setAttribute("aria-hidden","false");
    const i=$("#searchInput"); i?.focus(); renderSearch("");
  }
  function closeSearch(){ $("#searchOverlay")?.classList.remove("open"); $("#searchOverlay")?.setAttribute("aria-hidden","true"); }

  function renderSearch(q){
    const box=$("#searchResults"); if(!box)return;
    const query=String(q||"").trim().toLowerCase();
    const results=query?PRODUCTS.filter(p=>[p.name,p.category,p.description,p.tag].join(" ").toLowerCase().includes(query)):PRODUCTS.slice(0,4);
    box.innerHTML=results.map(p=>`<a class="search-result" href="product.html?id=${p.id}"><strong>${escapeHTML(p.name)}</strong><small>${p.category.toUpperCase()} · ${money(p.price)}</small></a>`).join("") || `<p style="color:#777">NO PRODUCTS FOUND.</p>`;
  }

  function initReveal(){
    const items=$$(".reveal");
    if(!("IntersectionObserver" in window)){items.forEach(x=>x.classList.add("visible"));return}
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});
    items.forEach(x=>io.observe(x));
  }

  function init(){
    setTimeout(()=>$("#pageLoader")?.classList.add("hidden"),700);

    const year=$("#year"); if(year) year.textContent=new Date().getFullYear();

    $("#bagOpen")?.addEventListener("click",openCart);
    $("#cartClose")?.addEventListener("click",closeCart);
    $("#drawerBackdrop")?.addEventListener("click",closeCart);
    $("#searchOpen")?.addEventListener("click",openSearch);
    $("#searchClose")?.addEventListener("click",closeSearch);
    $("#searchInput")?.addEventListener("input",e=>renderSearch(e.target.value));

    const menu=$("#menuBtn"), nav=$("#mobileNav");
    menu?.addEventListener("click",()=>{
      const open=nav?.classList.toggle("open");
      menu.setAttribute("aria-expanded",String(!!open));
    });
    nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

    document.addEventListener("keydown",e=>{
      if(e.key==="Escape"){closeCart();closeSearch()}
    });

    renderProducts(); renderCart(); initReveal();
    window.VELCYRO_CART={get:()=>cart,add:addToCart,remove:key=>{cart=cart.filter(x=>x.key!==key);saveCart();renderCart()},open:openCart,close:closeCart};
    window.VELCYRO_MONEY=money;
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();