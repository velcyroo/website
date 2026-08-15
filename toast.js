/* VELCYRO — toast notifications */
window.VELCYRO_TOAST=function(message,duration=1800){
  let el=document.querySelector(".velcyro-toast");
  if(!el){el=document.createElement("div");el.className="velcyro-toast";document.body.appendChild(el)}
  el.textContent=message;el.classList.add("show");
  clearTimeout(window.__velcyroToast);
  window.__velcyroToast=setTimeout(()=>el.classList.remove("show"),duration);
};
