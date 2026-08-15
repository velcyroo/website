/* VELCYRO — demo product reviews
   Uses localStorage until a real review backend is connected. */
window.VELCYRO_REVIEWS={
  get(productId){
    return JSON.parse(localStorage.getItem("velcyro_reviews_"+productId)||"[]");
  },
  add(productId,review){
    const key="velcyro_reviews_"+productId;
    const list=this.get(productId);
    list.unshift({...review,createdAt:new Date().toISOString()});
    localStorage.setItem(key,JSON.stringify(list.slice(0,50)));
    return list[0];
  }
};
