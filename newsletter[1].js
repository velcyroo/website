/* VELCYRO — Newsletter demo
   Replace the demo handler with your email provider/backend at launch. */
(() => {
  document.addEventListener("submit", e => {
    const form = e.target.closest("[data-newsletter]");
    if (!form) return;
    e.preventDefault();
    const input = form.querySelector("input[type=email]");
    const status = form.querySelector("[data-newsletter-status]");
    if (!input || !input.checkValidity()) {
      input?.reportValidity();
      return;
    }
    localStorage.setItem("velcyro_newsletter_email", input.value.trim());
    if (status) status.textContent = "YOU'RE ON THE LIST — DEMO SIGNUP SAVED.";
    form.reset();
  });
})();
