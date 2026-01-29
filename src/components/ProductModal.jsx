import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Plus, Minus, FileText } from 'lucide-react';

// Recibimos onAgregar desde App.jsx
export function ProductModal({ producto, isOpen, onClose, onAgregar }) {
  const [cantidad, setCantidad] = useState(1);

  if (!isOpen || !producto) return null;

  const fallbackImage = "https://img.freepik.com/foto-gratis/fondo-papel-tapiz-colores-vividos-borrosos_58702-2950.jpg";
  const colorMavyco = "#E54B35"; 

  const sumar = () => setCantidad(prev => prev + 1);
  const restar = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  // Nueva función para manejar el clic
  const handleAgregarALista = () => {
    onAgregar(producto, cantidad); // Enviamos el producto y la cantidad a la lista global
    setCantidad(1); // Reseteamos el contador para la próxima vez
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Botón Cerrar */}
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
          <X size={24} className="text-gray-800" />
        </button>

        {/* Sección Imagen */}
        <div className="md:w-1/2 bg-[#F8F9FA] flex items-center justify-center p-12">
          <img 
            src={producto.imagen_url || fallbackImage} 
            alt={producto.nombre}
            className="max-h-full w-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Sección Contenido */}
        <div className="md:w-1/2 p-8 lg:p-12 overflow-y-auto flex flex-col justify-center">
          <span style={{ color: colorMavyco }} className="font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">
            {producto.marca || 'Mavyco Expert'}
          </span>
          
          <h2 className="text-3xl font-black text-gray-900 leading-tight mb-4">
            {producto.nombre}
          </h2>
          
          <div className="mb-8">
            <span className="text-5xl font-black text-gray-900 tracking-tighter">Q{producto.precio}</span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-8 border-l-2 border-gray-100 pl-4">
            {producto.descripcion || "Material profesional de alta calidad seleccionado para los proyectos más exigentes de Guatemala."}
          </p>

          {/* Selector de Cantidad */}
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Cantidad</p>
            <div className="flex items-center gap-6 bg-gray-50 w-fit p-3 rounded-2xl border border-gray-100 font-sans">
              <button onClick={restar} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm active:scale-90 text-gray-600">
                <Minus size={22} />
              </button>
              <span className="text-2xl font-black w-10 text-center text-gray-900">{cantidad}</span>
              <button onClick={sumar} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm active:scale-90">
                <Plus size={22} style={{ color: colorMavyco }} />
              </button>
            </div>
          </div>

          {/* BOTÓN ACTUALIZADO: Agrega a la lista en lugar de abrir WA directamente */}
          <button 
            onClick={handleAgregarALista} 
            style={{ backgroundColor: colorMavyco }}
            className="group relative w-full text-white py-8 px-10 rounded-[30px] font-black text-xl uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-[#E54B35]/40 overflow-hidden active:scale-[0.98]"
          >
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
            <FileText size={28} strokeWidth={3} className="relative z-10" />
            <span className="relative z-10">Agregar a Cotización</span>
          </button>
          
          <div className="mt-10 space-y-3 pt-8 border-t border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500"/> Garantía Mavyco</div>
            <div className="flex items-center gap-2"><Truck size={18} className="text-blue-500"/> Envíos a toda Guatemala</div>
          </div>
        </div>
      </div>
    </div>
  );
}