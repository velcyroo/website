/* VELCYRO — storefront helpers */
window.VELCYRO_STOREFRONT={
  money(value){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(value)||0)},
  product(id){return (window.VELCYRO_PRODUCTS||[]).find(p=>Number(p.id)===Number(id))},
  url(id){return `product.html?id=${encodeURIComponent(id)}`},
  all(){return [...(window.VELCYRO_PRODUCTS||[])]}
};
