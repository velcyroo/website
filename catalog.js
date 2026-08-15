/* VELCYRO — catalog controller */
window.VELCYRO_CATALOG={
  all(){return [...(window.VELCYRO_PRODUCTS||[])]},
  find(id){return this.all().find(p=>String(p.id)===String(id))},
  byCollection(name){return this.all().filter(p=>String(p.collection||"").toLowerCase()===String(name||"").toLowerCase())},
  byCategory(name){return this.all().filter(p=>String(p.category||"").toLowerCase()===String(name||"").toLowerCase())},
  sort(list,mode="featured"){
    const a=[...list];
    if(mode==="price-low") return a.sort((x,y)=>Number(x.price)-Number(y.price));
    if(mode==="price-high") return a.sort((x,y)=>Number(y.price)-Number(x.price));
    if(mode==="name") return a.sort((x,y)=>String(x.name).localeCompare(String(y.name)));
    return a;
  }
};
