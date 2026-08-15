/* VELCYRO — image fallback */
window.VELCYRO_IMAGE_FALLBACK=function(img){
  if(!img)return;
  img.addEventListener("error",()=>{
    img.removeAttribute("src");
    img.alt=img.alt||"VELCYRO product image";
    img.classList.add("image-failed");
  },{once:true});
};
