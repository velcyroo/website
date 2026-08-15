/* VELCYRO — Cart Engine
 * Shared cart state for product, cart and checkout pages.
 * Uses localStorage for the static/demo GitHub Pages version.
 * Real orders should move to a server/database before launch.
 */
(() => {
  "use strict";

  const STORAGE_KEY = "velcyro_cart_v2";

  const read = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  let cart = read();

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("velcyro:cart-updated", {
      detail: { cart: getCart() }
    }));
  };

  const getCart = () => cart.map(item => ({ ...item }));

  const add = (product, size = "", quantity = 1) => {
    if (!product) return false;
    const qty = Math.max(1, Number(quantity) || 1);
    const normalizedSize = size || product.sizes?.[0] || "";

    const existing = cart.find(
      item => Number(item.id) === Number(product.id) && item.size === normalizedSize
    );

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        image: product.images?.[0] || "",
        size: normalizedSize,
        quantity: qty
      });
    }

    save();
    return true;
  };

  const update = (id, size, quantity) => {
    const item = cart.find(
      entry => Number(entry.id) === Number(id) && entry.size === size
    );
    if (!item) return;
    item.quantity = Math.max(0, Number(quantity) || 0);
    if (item.quantity === 0) {
      cart = cart.filter(entry => entry !== item);
    }
    save();
  };

  const change = (id, size, delta) => {
    const item = cart.find(
      entry => Number(entry.id) === Number(id) && entry.size === size
    );
    if (!item) return;
    update(id, size, item.quantity + Number(delta));
  };

  const remove = (id, size) => {
    cart = cart.filter(
      entry => !(Number(entry.id) === Number(id) && entry.size === size)
    );
    save();
  };

  const clear = () => {
    cart = [];
    save();
  };

  const count = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const bindCount = (selector = "[data-cart-count]") => {
    document.querySelectorAll(selector).forEach(el => {
      el.textContent = count();
      el.hidden = count() === 0;
    });
  };

  const renderMiniCart = (container) => {
    if (!container) return;

    if (!cart.length) {
      container.innerHTML = `
        <div class="cart-empty">
          <p>YOUR BAG IS CURRENTLY EMPTY.</p>
          <a href="index.html#shop">EXPLORE THE DROP →</a>
        </div>`;
      return;
    }

    container.innerHTML = cart.map(item => `
      <article class="cart-row">
        <div class="cart-row-media">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
        </div>
        <div class="cart-row-info">
          <h3>${item.name}</h3>
          <p>SIZE ${item.size} · ${formatINR(item.price)}</p>
          <div class="cart-row-actions">
            <button type="button" data-minus="${item.id}" data-size="${item.size}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-plus="${item.id}" data-size="${item.size}">+</button>
            <button type="button" class="cart-remove" data-remove="${item.id}" data-size="${item.size}">REMOVE</button>
          </div>
        </div>
        <strong>${formatINR(item.price * item.quantity)}</strong>
      </article>
    `).join("");

    container.querySelectorAll("[data-minus]").forEach(btn => {
      btn.addEventListener("click", () => change(btn.dataset.minus, btn.dataset.size, -1));
    });
    container.querySelectorAll("[data-plus]").forEach(btn => {
      btn.addEventListener("click", () => change(btn.dataset.plus, btn.dataset.size, 1));
    });
    container.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => remove(btn.dataset.remove, btn.dataset.size));
    });
  };

  window.VELCYRO_CART = {
    getCart, add, update, change, remove, clear, count, subtotal,
    bindCount, renderMiniCart
  };

  window.addEventListener("storage", () => {
    cart = read();
    window.dispatchEvent(new CustomEvent("velcyro:cart-updated", {
      detail: { cart: getCart() }
    }));
  });
})();
