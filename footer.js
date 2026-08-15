/* VELCYRO — footer injector */
window.VELCYRO_FOOTER=function(target){
 const root=typeof target==="string"?document.querySelector(target):target;if(!root)return;
 root.innerHTML=`<footer class="velcyro-footer"><div class="vf-brand">VELCYRO®</div><div class="vf-links"><a href="faq.html">FAQ</a><a href="returns.html">Returns</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="contact-form.html">Contact</a></div><p>© ${new Date().getFullYear()} VELCYRO. DEMO STOREFRONT.</p></footer>`;
};
