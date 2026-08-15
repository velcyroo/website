/* VELCYRO — Cart UI helpers */
window.VELCYRO_CART_UI = {
  refresh(){
    const cart = window.VELCYRO_CART;
    if(!cart) return;
    document.querySelectorAll("[data-cart-count]").forEach(el=>el.textContent=cart.getCount());
    document.querySelectorAll("[data-cart-total]").forEach(el=>el.textContent=window.formatINR ? formatINR(cart.getTotal()) : `₹${cart.getTotal()}`);
  },
  add(productId,size="M",qty=1){
    if(!cartAvailable()) return false;
    window.VELCYRO_CART.add(productId,size,qty);
    this.refresh();
    window.VELCYRO_TOAST?.("ADDED TO BAG");
    return true;
  }
};
function cartAvailable(){return !!window.VELCYRO_CART;}
document.addEventListener("DOMContentLoaded",()=>window.VELCYRO_CART_UI.refresh());
