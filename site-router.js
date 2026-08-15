/* VELCYRO — client-side route/query utilities */
window.VELCYRO_ROUTER={
  params(){return Object.fromEntries(new URLSearchParams(location.search).entries())},
  go(path,params={}){
    const q=new URLSearchParams(params); location.href=path+(q.toString()?"?"+q:"");
  },
  current(){return location.pathname.split("/").pop()||"index.html"}
};
