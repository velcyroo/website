/* VELCYRO — lightweight modal utility */
window.VELCYRO_MODAL={
  open(content){
    this.close();
    const modal=document.createElement("div");
    modal.className="velcyro-modal";
    modal.innerHTML=`<div class="velcyro-modal-backdrop" data-modal-close></div><div class="velcyro-modal-panel"><button class="velcyro-modal-close" data-modal-close aria-label="Close">×</button>${content}</div>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-modal-close]").forEach(x=>x.addEventListener("click",()=>this.close()));
  },
  close(){document.querySelector(".velcyro-modal")?.remove()}
};
