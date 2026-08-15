/* VELCYRO — keyboard UX helpers */
(() => {
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){
      window.VELCYRO_MODAL?.close?.();
      document.querySelectorAll("[open]").forEach(x=>x.removeAttribute("open"));
    }
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){
      e.preventDefault();
      document.querySelector("[data-site-search]")?.focus();
    }
  });
})();
