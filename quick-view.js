/* VELCYRO — Quick view modal */
window.VELCYRO_QUICK_VIEW = {
  open(id){
    const p=(window.VELCYRO_PRODUCTS||[]).find(x=>Number(x.id)===Number(id));
    if(!p) return;
    const image=p.images?.[0]||"";
    const html=`<div class="qv"><img src="${image}" alt="${p.name}" style="width:100%;aspect-ratio:3/4;object-fit:cover;background:#ddd"><p style="font-size:8px;letter-spacing:.15em;text-transform:uppercase;margin-top:20px">${p.collection}</p><h2 style="font:600 34px 'Space Grotesk';letter-spacing:-.05em;margin:8px 0">${p.name}</h2><p style="font-size:12px;color:#777">${p.description||""}</p><strong>${window.formatINR?formatINR(p.price):"₹"+p.price}</strong><br><a href="product.html?id=${p.id}" style="display:inline-flex;margin-top:20px;padding:14px 20px;background:#111;color:#fff;text-decoration:none;font-size:9px;letter-spacing:.14em">VIEW PRODUCT →</a></div>`;
    window.VELCYRO_MODAL?.open(html);
  }
};
