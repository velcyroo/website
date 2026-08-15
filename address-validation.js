/* VELCYRO — lightweight India address validation */
window.VELCYRO_ADDRESS={
  validate(data={}){
    const pin=String(data.pincode||"").replace(/\D/g,"");
    const phone=String(data.phone||"").replace(/\D/g,"");
    const errors=[];
    if(!data.name?.trim())errors.push("NAME REQUIRED");
    if(!data.address?.trim())errors.push("ADDRESS REQUIRED");
    if(!/^\d{6}$/.test(pin))errors.push("VALID 6-DIGIT PINCODE REQUIRED");
    if(phone && !/^\d{10}$/.test(phone))errors.push("VALID 10-DIGIT PHONE REQUIRED");
    return {valid:!errors.length,errors};
  }
};
