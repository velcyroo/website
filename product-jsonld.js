/* VELCYRO — Product structured-data generator */
window.VELCYRO_JSONLD={
  inject(product){
    if(!product)return;
    const old=document.getElementById("velcyro-product-jsonld"); old?.remove();
    const data={
      "@context":"https://schema.org","@type":"Product",
      "name":product.name,"description":product.description||"",
      "image":product.images||[],
      "sku":String(product.id),
      "brand":{"@type":"Brand","name":"VELCYRO"},
      "offers":{"@type":"Offer","priceCurrency":"INR","price":String(product.price),"availability":"https://schema.org/InStock"}
    };
    const s=document.createElement("script");s.id="velcyro-product-jsonld";s.type="application/ld+json";s.textContent=JSON.stringify(data);document.head.appendChild(s);
  }
};
