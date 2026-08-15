/* VELCYRO — namespaced browser storage */
window.VELCYRO_STORAGE={
  get(key,fallback=null){try{const v=localStorage.getItem("velcyro_"+key);return v===null?fallback:JSON.parse(v)}catch{return fallback}},
  set(key,value){localStorage.setItem("velcyro_"+key,JSON.stringify(value));return value},
  remove(key){localStorage.removeItem("velcyro_"+key)},
  clearDemo(){Object.keys(localStorage).filter(k=>k.startsWith("velcyro_")).forEach(k=>localStorage.removeItem(k))}
};
