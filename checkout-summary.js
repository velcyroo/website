/* VELCYRO — checkout totals controller */
window.VELCYRO_CHECKOUT_SUMMARY={
  calculate(subtotal,{promoCode="",config={}}={}){
    const promo=window.VELCYRO_PROMO?.apply(promoCode,subtotal)||{discount:0,valid:false};
    const afterPromo=Math.max(0,Number(subtotal)-Number(promo.discount||0));
    const shipping=window.VELCYRO_SHIPPING?.calculate(afterPromo,config)??0;
    return {subtotal:Number(subtotal),discount:Number(promo.discount||0),shipping,total:afterPromo+shipping,promo};
  }
};
