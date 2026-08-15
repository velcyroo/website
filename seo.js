/* VELCYRO — lightweight dynamic SEO metadata */
window.VELCYRO_SEO={
  product(product){
    if(!product)return;
    document.title=`${product.name} — VELCYRO`;
    let desc=document.querySelector('meta[name="description"]');
    if(!desc){desc=document.createElement("meta");desc.name="description";document.head.appendChild(desc)}
    desc.content=product.description||`${product.name} by VELCYRO.`;
  }
};
