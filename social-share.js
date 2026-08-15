/* VELCYRO — Web Share API with clipboard fallback */
window.VELCYRO_SHARE=async function({title="VELCYRO",text="",url=location.href}={}){
  try{
    if(navigator.share){await navigator.share({title,text,url});return true}
    await navigator.clipboard.writeText(url);
    if(window.VELCYRO_TOAST) VELCYRO_TOAST("LINK COPIED");
    return true;
  }catch(e){return false}
};
