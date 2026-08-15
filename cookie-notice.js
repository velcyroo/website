/* VELCYRO — cookie/privacy notice shell */
(() => {
  const KEY="velcyro_notice_ack";
  window.VELCYRO_NOTICE={
    init(){
      if(localStorage.getItem(KEY)==="1")return;
      if(document.querySelector("[data-cookie-notice]"))return;
      const el=document.createElement("aside");
      el.setAttribute("data-cookie-notice","");
      el.innerHTML=`<div><strong>VELCYRO / SITE NOTICE</strong><p>This demo storefront may use browser storage for cart and preferences. The live privacy configuration will be published before launch.</p></div><button>OK</button>`;
      el.style.cssText="position:fixed;left:18px;right:18px;bottom:18px;z-index:9997;background:#111;color:#fff;padding:16px 18px;display:flex;justify-content:space-between;gap:20px;align-items:center;font:10px 'DM Sans'";
      el.querySelector("p").style.cssText="margin:7px 0 0;color:#aaa;line-height:1.5";
      el.querySelector("button").style.cssText="border:0;background:#fff;color:#111;padding:10px 14px;font-size:8px;font-weight:700";
      el.querySelector("button").onclick=()=>{localStorage.setItem(KEY,"1");el.remove()};
      document.body.appendChild(el);
    }
  };
})();
