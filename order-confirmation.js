/* VELCYRO — stores demo orders locally for the demo account page */
window.VELCYRO_SAVE_DEMO_ORDER = function(order){
  const key="velcyro_demo_orders";
  const orders=JSON.parse(localStorage.getItem(key)||"[]");
  orders.unshift(order);
  localStorage.setItem(key,JSON.stringify(orders.slice(0,20)));
};
