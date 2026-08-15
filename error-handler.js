/* VELCYRO — safe frontend error reporting */
window.VELCYRO_ERRORS=[];
window.addEventListener("error",e=>{
  window.VELCYRO_ERRORS.push({type:"error",message:e.message,time:new Date().toISOString()});
});
window.addEventListener("unhandledrejection",e=>{
  window.VELCYRO_ERRORS.push({type:"promise",message:String(e.reason),time:new Date().toISOString()});
});
