/* VELCYRO — reusable product-card renderer */
window.VELCYRO_PRODUCT_CARD = function(product) {
  const image = product.images?.[0] || "";
  return `
  <article class="velcyro-product-card">
    <a href="product.html?id=${encodeURIComponent(product.id)}" class="vpc-image">
      <img src="${image}" alt="${product.name}" loading="lazy"
        onerror="this.style.display='none';this.parentElement.classList.add('vpc-placeholder')">
      ${product.tag ? `<span class="vpc-tag">${product.tag}</span>` : ""}
    </a>
    <div class="vpc-info">
      <div><a href="product.html?id=${encodeURIComponent(product.id)}" class="vpc-name">${product.name}</a><span class="vpc-meta">${product.collection} / ${product.color}</span></div>
      <strong>${window.formatINR ? formatINR(product.price) : "₹"+product.price}</strong>
    </div>
  </article>`;
};
