/* VELCYRO — Product Search / Filter */
(() => {
  "use strict";

  const products = () => window.VELCYRO_PRODUCTS || [];

  window.VELCYRO_SEARCH = {
    search(query = "", filters = {}) {
      const q = query.trim().toLowerCase();
      return products().filter(p => {
        const text = `${p.name} ${p.category} ${p.collection} ${p.color} ${p.description}`.toLowerCase();
        const matchQuery = !q || text.includes(q);
        const matchCategory = !filters.category || p.category === filters.category;
        const matchCollection = !filters.collection || p.collection === filters.collection;
        const matchMax = !filters.maxPrice || Number(p.price) <= Number(filters.maxPrice);
        return matchQuery && matchCategory && matchCollection && matchMax;
      });
    }
  };
})();
