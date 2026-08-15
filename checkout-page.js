/* VELCYRO — checkout page controller */
window.VELCYRO_CHECKOUT_PAGE={
 init({form,summary}={}){
  const f=typeof form==="string"?document.querySelector(form):form;
  const s=typeof summary==="string"?document.querySelector(summary):summary;
  if(!f)return;
  const render=()=>{
   const subtotal=window.VELCYRO_CART?.getTotal?.()||0;
   const result=window.VELCYRO_CHECKOUT_SUMMARY?.calculate(subtotal,{
    promoCode:f.querySelector("[name=promo]")?.value||"",
    config:{threshold:1499,standard:99}
   })||{subtotal,discount:0,shipping:0,total:subtotal};
   if(s)s.innerHTML=`<div><span>SUBTOTAL</span><b>₹${result.subtotal}</b></div><div><span>DISCOUNT</span><b>- ₹${result.discount}</b></div><div><span>SHIPPING</span><b>${result.shipping?"₹"+result.shipping:"FREE"}</b></div><hr><div><strong>TOTAL</strong><strong>₹${result.total}</strong></div>`;
  };
  f.addEventListener("input",render);render();
  f.addEventListener("submit",e=>{
   e.preventDefault();
   if(!f.checkValidity()){f.reportValidity();return;}
   const data=window.VELCYRO_FORMS?.serialize(f)||Object.fromEntries(new FormData(f));
   sessionStorage.setItem("velcyro_checkout_customer",JSON.stringify(data));
   window.VELCYRO_ANALYTICS?.track("checkout_submit",{items:window.VELCYRO_CART?.getCount?.()||0});
   window.location.href="order-success.html";
  });
 }
};
