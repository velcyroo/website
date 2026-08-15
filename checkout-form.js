/* VELCYRO — checkout form controller (demo) */
window.VELCYRO_CHECKOUT = {
  init(selector="[data-checkout-form]"){
    const form=document.querySelector(selector); if(!form) return;
    form.addEventListener("submit", e=>{
      e.preventDefault();
      if(!form.checkValidity()){form.reportValidity();return;}
      const data=Object.fromEntries(new FormData(form).entries());
      sessionStorage.setItem("velcyro_checkout_customer",JSON.stringify(data));
      if(window.VELCYRO_TOAST) VELCYRO_TOAST("DETAILS SAVED — DEMO CHECKOUT");
      form.dispatchEvent(new CustomEvent("velcyro:checkout-ready",{detail:data}));
    });
  }
};
