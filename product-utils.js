/* VELCYRO — product utilities */
window.VELCYRO_PRODUCT_UTILS={
  related(product,limit=4){
    return (window.VELCYRO_PRODUCTS||[]).filter(p=>p.id!==product.id && (p.collection===product.collection||p.category===product.category)).slice(0,limit);
  },
  categories(){
    return [...new Set((window.VELCYRO_PRODUCTS||[]).map(p=>p.category))];
  },
  collections(){
    return [...new Set((window.VELCYRO_PRODUCTS||[]).map(p=>p.collection))];
  }
};
