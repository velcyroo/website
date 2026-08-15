/* VELCYRO — price / discount utilities */
window.VELCYRO_PRICE={
  money:v=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(v)||0),
  discount(price,oldPrice){if(!oldPrice||oldPrice<=price)return 0;return Math.round((1-price/oldPrice)*100)},
  subtotal(items=[]){return items.reduce((sum,x)=>sum+(Number(x.price)||0)*(Number(x.quantity)||1),0)}
};
