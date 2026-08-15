/* VELCYRO — form utilities */
window.VELCYRO_FORMS={
  serialize(form){return Object.fromEntries(new FormData(form).entries())},
  clear(form){form?.reset()},
  markInvalid(input,message){input?.setCustomValidity(message||"Invalid value")},
  clearInvalid(input){input?.setCustomValidity("")}
};
