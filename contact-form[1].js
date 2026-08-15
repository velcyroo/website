/* VELCYRO — Contact form demo */
(() => {
  document.addEventListener("submit", e => {
    const form = e.target.closest("[data-contact-form]");
    if (!form) return;
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    sessionStorage.setItem("velcyro_contact_demo", JSON.stringify({
      ...data, createdAt: new Date().toISOString()
    }));
    const status = form.querySelector("[data-contact-status]");
    if (status) status.textContent = "MESSAGE SAVED FOR DEMO. LIVE EMAIL DELIVERY IS NOT CONNECTED.";
    form.reset();
  });
})();
