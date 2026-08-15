/* VELCYRO — client-side catalog filtering */
window.VELCYRO_FILTER = {
  apply({query="",category="",collection="",maxPrice=""}={}){
    const q=query.trim().toLowerCase();
    return (window.VELCYRO_PRODUCTS||[]).filter(p=>{
      const hay=`${p.name} ${p.category} ${p.collection} ${p.color}`.toLowerCase();
      return (!q||hay.includes(q))
        && (!category||p.category===category)
        && (!collection||p.collection===collection)
        && (!maxPrice||Number(p.price)<=Number(maxPrice));
    });
  }
};
