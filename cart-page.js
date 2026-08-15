/* VELCYRO — cart page renderer */
window.VELCYRO_CART_PAGE={
  render(root){
    if(!root||!window.VELCYRO_CART)return;
    const items=window.VELCYRO_CART.getItems();
    if(!items.length){root.innerHTML='<div class="empty-cart"><h2>YOUR BAG IS EMPTY.</h2><a href="catalog.html">CONTINUE SHOPPING →</a></div>';return;}
    root.innerHTML=items.map(i=>`<article class="cart-line" data-line="${i.id}-${i.size}"><img src="${i.image||""}" alt="${i.name}"><div><h3>${i.name}</h3><p>SIZE ${i.size}</p><strong>₹${Number(i.price)*Number(i.quantity)}</strong><div><button data-minus>-</button><span>${i.quantity}</span><button data-plus>+</button><button data-remove>REMOVE</button></div></div></article>`).join("");
    root.querySelectorAll("[data-line]").forEach(el=>{
      const [id,size]=el.dataset.line.split("-");
      el.querySelector("[data-minus]")?.addEventListener("click",()=>{window.VELCYRO_CART.updateQuantity(id,size,-1);this.render(root);});
      el.querySelector("[data-plus]")?.addEventListener("click",()=>{window.VELCYRO_CART.updateQuantity(id,size,1);this.render(root);});
      el.querySelector("[data-remove]")?.addEventListener("click",()=>{window.VELCYRO_CART.remove(id,size);this.render(root);});
    });
  }
};
