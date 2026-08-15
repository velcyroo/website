/* VELCYRO — embeddable newsletter widget */
window.VELCYRO_NEWSLETTER_WIDGET=function(target){
  const root=typeof target==="string"?document.querySelector(target):target;if(!root)return;
  root.innerHTML=`<form data-newsletter class="velcyro-newsletter-widget"><input type="email" required placeholder="EMAIL ADDRESS" aria-label="Email address"><button>JOIN →</button><span data-newsletter-status></span></form>`;
};
