export const precioAuto =(price) => 
    Number(price).toLocaleString('es-ES',{
      style:'currency',
      currency:'EUR',
      maximumFractionDigits: 0 
     })
  