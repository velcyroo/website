/* VELCYRO — recently viewed products */
(() => {
  const KEY="velcyro_recent_products";
  const read=()=>JSON.parse(localStorage.getItem(KEY)||"[]");
  window.VELCYRO_RECENT={
    add(id){
      let a=read().filter(x=>Number(x)!==Number(id));
      a.unshift(Number(id));
      localStorage.setItem(KEY,JSON.stringify(a.slice(0,8)));
    },
    get(){return read()}
  };
})();
