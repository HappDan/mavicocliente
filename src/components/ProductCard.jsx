import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { colors } from '../config/colors';

export function ProductCard({ producto, onProductClick, onAgregar }) {
  return (
    <div className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      {/* IMAGEN */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={producto.imagen_url} 
          alt={producto.nombre}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* CONTENIDO */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E54B35]">
            {producto.marca}
          </span>
          <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight h-10 mt-1">
            {producto.nombre}
          </h3>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Precio</span>
            <span className="text-xl font-black text-gray-900">Q{producto.precio}</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onProductClick(producto)}
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Eye size={18} />
            </button>
            <button 
              onClick={() => onAgregar(producto, 1)}
              className="p-3 rounded-full text-white shadow-lg shadow-[#E54B35]/20 hover:scale-110 active:scale-95 transition-all"
              style={{ backgroundColor: colors.primary }}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}