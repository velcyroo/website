/* VELCYRO — shipping calculation */
window.VELCYRO_SHIPPING={
  calculate(subtotal,config={}){
    const threshold=Number(config.threshold??1499);
    const standard=Number(config.standard??99);
    return Number(subtotal)>=threshold?0:standard;
  },
  label(cost){return cost===0?"FREE SHIPPING":`₹${cost} SHIPPING`}
};
