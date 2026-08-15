/* VELCYRO — Wishlist
   Demo wishlist stored locally in the browser. */
(() => {
  const KEY = "velcyro_wishlist_v1";
  let items = JSON.parse(localStorage.getItem(KEY) || "[]");

  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("velcyro:wishlist-updated"));
  };

  const has = id => items.some(x => Number(x) === Number(id));
  const toggle = id => {
    id = Number(id);
    items = has(id) ? items.filter(x => Number(x) !== id) : [...items, id];
    save();
    return has(id);
  };
  const remove = id => {
    items = items.filter(x => Number(x) !== Number(id));
    save();
  };
  const get = () => [...items];
  const count = () => items.length;

  window.VELCYRO_WISHLIST = { has, toggle, remove, get, count };
})();
