/* VELCYRO — Product Page */
(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const requested = params.get("id") || params.get("product") || "";
  const product =
    window.getProductById(requested) ||
    window.getProductBySlug(requested) ||
    window.VELCYRO_PRODUCTS[0];

  const root = document.querySelector("#productRoot");
  const crumb = document.querySelector("#crumb");

  document.title = `${product.name} — VELCYRO`;
  crumb.textContent = product.name;

  const imageMarkup = product.images.map(src => `
    <div class="product-photo">
      <img src="${src}" alt="${product.name}" loading="lazy"
           onerror="this.parentElement.classList.add('placeholder'); this.remove();">
    </div>
  `).join("");

  root.innerHTML = `
    <div class="product-layout">
      <section class="product-gallery" aria-label="${product.name} images">
        ${imageMarkup}
      </section>

      <aside class="product-details">
        <p class="product-eyebrow">${product.collection} / DROP 01</p>
        <h1>${product.name}</h1>
        <div class="product-price">
          ${formatINR(product.price)}
          ${product.compareAt ? `<del>${formatINR(product.compareAt)}</del>` : ""}
        </div>

        <p class="product-description">${product.description}</p>

        <div class="product-meta">
          <div class="meta-line"><span>Material</span><span>${product.material}</span></div>
          <div class="meta-line"><span>Fit</span><span>${product.fit}</span></div>
          <div class="meta-line"><span>Colour</span><span>${product.color}</span></div>
          <div class="meta-line"><span>Dispatch</span><span>Demo / To be configured</span></div>
        </div>

        <div class="option-label">Select Size</div>
        <div class="size-grid" id="sizeGrid">
          ${product.sizes.map((size, index) =>
            `<button type="button" class="size-btn ${index === 0 ? "active" : ""}" data-size="${size}">${size}</button>`
          ).join("")}
        </div>

        <div class="product-actions">
          <button class="primary" id="addToBag">ADD TO BAG</button>
          <button class="secondary" id="buyNow">BUY NOW</button>
        </div>

        <p class="product-note">
          This is the VELCYRO demo store. Payment, inventory and real order processing
          will be connected before launch.
        </p>
      </aside>
    </div>
  `;

  let selectedSize = product.sizes[0];

  document.querySelectorAll("[data-size]").forEach(button => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.size;
      document.querySelectorAll("[data-size]").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
    });
  });

  const add = () => {
    VELCYRO_CART.add(product, selectedSize, 1);
    VELCYRO_CART.bindCount();
  };

  document.querySelector("#addToBag").addEventListener("click", () => {
    add();
    const btn = document.querySelector("#addToBag");
    btn.textContent = "ADDED TO BAG";
    setTimeout(() => btn.textContent = "ADD TO BAG", 1400);
  });

  document.querySelector("#buyNow").addEventListener("click", () => {
    add();
    location.href = "checkout.html";
  });

  VELCYRO_CART.bindCount();
  window.addEventListener("velcyro:cart-updated", () => VELCYRO_CART.bindCount());
})();
