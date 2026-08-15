/* VELCYRO — demo promo-code engine */
(() => {
  const codes={
    VELCYRO10:{type:"percent",value:10},
    DROP01:{type:"fixed",value:100}
  };
  window.VELCYRO_PROMO={
    apply(code,subtotal){
      const c=codes[String(code||"").trim().toUpperCase()];
      if(!c)return {valid:false,discount:0,message:"INVALID CODE"};
      const discount=c.type==="percent"?Math.round(subtotal*c.value/100):Math.min(c.value,subtotal);
      return {valid:true,discount,code:String(code).toUpperCase(),message:`${c.type==="percent"?c.value+"%":"₹"+c.value} DEMO DISCOUNT APPLIED`};
    }
  };
})();
