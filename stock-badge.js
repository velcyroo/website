/* VELCYRO — inventory status badge */
window.VELCYRO_STOCK_BADGE=function(productId,target){
  const el=typeof target==="string"?document.querySelector(target):target;
  if(!el)return;
  const stock=window.VELCYRO_INVENTORY?.get(productId);
  if(stock===0){el.textContent="SOLD OUT";el.dataset.state="sold-out";}
  else if(stock!==null && stock!==undefined && Number(stock)<=5){el.textContent="LOW STOCK";el.dataset.state="low";}
  else{el.textContent="IN STOCK";el.dataset.state="available";}
};
