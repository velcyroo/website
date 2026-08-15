/* VELCYRO — announcement bar */
(() => {
  const KEY="velcyro_announcement_closed";
  window.VELCYRO_ANNOUNCEMENT={
    init(selector="[data-announcement]"){
      const bar=document.querySelector(selector); if(!bar || localStorage.getItem(KEY)==="1") return;
      const close=bar.querySelector("[data-announcement-close]");
      close?.addEventListener("click",()=>{localStorage.setItem(KEY,"1");bar.remove()});
    },
    reset(){localStorage.removeItem(KEY)}
  };
})();
