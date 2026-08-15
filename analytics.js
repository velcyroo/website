/* VELCYRO — analytics event layer
   Safe in demo mode: records events locally only.
   Connect a real analytics provider later. */
window.VELCYRO_ANALYTICS={
  track(event,data={}){
    const key="velcyro_demo_analytics";
    const list=JSON.parse(localStorage.getItem(key)||"[]");
    list.push({event,data,time:new Date().toISOString()});
    localStorage.setItem(key,JSON.stringify(list.slice(-200)));
  }
};
