/* VELCYRO — accessibility helpers */
(() => {
  document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll("img:not([alt])").forEach(img=>img.alt="VELCYRO");
    document.querySelectorAll("a,button,input,select,textarea").forEach(el=>{
      if(!el.getAttribute("aria-label") && !el.textContent.trim() && !el.getAttribute("title")){
        const label=el.getAttribute("name")||el.getAttribute("data-action");
        if(label)el.setAttribute("aria-label",label);
      }
    });
  });
})();
