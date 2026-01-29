import React from 'react';

export function Banner({ 
  onFilterSelect,
  imgPrincipal = "https://nexromperu.com/wp-content/uploads/2025/01/truper4.jpg", 
  imgNuevo = "https://www.fontgas.com/wordpress/wp-content/uploads/2021/09/Herramientas-Milwaukee.jpg", 
  imgOferta = "https://www.roydisa.es/wp-content/uploads/2020/06/BOSCH.jpeg" 
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-6 w-full max-w-[1600px] mx-auto">
      
      {/* Lado izquierdo - Cuadro Principal (2 columnas) */}
      <button 
        onClick={() => onFilterSelect("")} // O el filtro que prefieras
        className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-gray-100 h-[300px] lg:h-[350px] group shadow-sm border-none cursor-pointer"
      >
        <img 
          src={imgPrincipal} 
          alt="Principal" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay sutil para mantener el estilo sin texto */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
      </button>
      
      {/* Lado derecho - Dos tarjetas compactas verticalmente */}
      <div className="flex flex-col gap-4 h-[300px] lg:h-[350px]">
        
        {/* Tarjeta Superior (Nuevos) */}
        <button 
          onClick={() => onFilterSelect("nuevo")}
          className="flex-1 relative rounded-[32px] overflow-hidden shadow-sm group border-none cursor-pointer"
        >
          <img src={imgNuevo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Nuevos" />
          <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/40 transition-colors duration-500" />
        </button>

        {/* Tarjeta Inferior (Ofertas) */}
        <button 
          onClick={() => onFilterSelect("oferta")}
          className="flex-1 relative rounded-[32px] overflow-hidden shadow-sm group border-none cursor-pointer"
        >
          <img src={imgOferta} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Ofertas" />
          <div className="absolute inset-0 bg-green-600/20 group-hover:bg-green-600/40 transition-colors duration-500" />
        </button>

      </div>
    </section>
  );
}