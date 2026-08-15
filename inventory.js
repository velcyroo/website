/* VELCYRO — inventory abstraction
   Demo inventory comes from products.js. Replace with API data at launch. */
window.VELCYRO_INVENTORY = {
  get(productId){
    const p=(window.VELCYRO_PRODUCTS||[]).find(x=>Number(x.id)===Number(productId));
    return p?.stock ?? null;
  },
  isAvailable(productId,qty=1){
    const stock=this.get(productId);
    return stock===null ? true : Number(stock)>=Number(qty);
  }
};
