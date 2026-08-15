/* VELCYRO — product comparison */
(() => {
  const KEY="velcyro_compare";
  const read=()=>JSON.parse(localStorage.getItem(KEY)||"[]");
  const save=a=>localStorage.setItem(KEY,JSON.stringify(a.slice(0,4)));
  window.VELCYRO_COMPARE={
    toggle(id){
      let a=read(); id=Number(id);
      a=a.includes(id)?a.filter(x=>x!==id):[...a,id]; save(a); return a.includes(id);
    },
    has:id=>read().includes(Number(id)),
    get:()=>read(),
    clear:()=>save([])
  };
})();
