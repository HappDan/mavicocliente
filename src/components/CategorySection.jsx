import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { colors } from '../config/colors';
import { ProductCard } from './ProductCard'; // Asegúrate de añadir esta línea arriba

export function CategorySection({ categoriaId, titulo, searchTerm, onProductClick, onAgregar, marcaFilter }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: estructura } = await supabase
        .from('subcategorias')
        .select('id, sub_subcategorias(id)')
        .eq('id_principal', categoriaId);

      const idsHijos = estructura?.map(s => s.id) || [];
      const idsNietos = estructura?.flatMap(s => s.sub_subcategorias?.map(ss => ss.id) || []) || [];
      const linajeCompleto = [categoriaId, ...idsHijos, ...idsNietos];

      let query = supabase
        .from('productos')
        .select('*')
        .eq('visible', true)
        .in('id_referencia', linajeCompleto);

      if (marcaFilter && marcaFilter !== "Todas") {
        query = query.eq('marca', marcaFilter);
      }

      if (searchTerm) {
        query = query.ilike('nombre', `%${searchTerm}%`);
      } else {
        query = query.limit(5);
      }

      const { data: productosData } = await query;
      if (productosData) setProductos(productosData);
    };

    fetchData();
  }, [categoriaId, searchTerm, marcaFilter]);

  if (productos.length === 0) return null;

  return (
    <section className="px-6 py-10 max-w-[1600px] mx-auto font-sans">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-800">{titulo}</h2>
        </div>
        <button className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:transition-colors uppercase tracking-widest" style={{ color: colors.primary }}>
          Ver todo <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {productos.map((prod) => {
          const fallbackImage = "https://img.freepik.com/foto-gratis/fondo-papel-tapiz-colores-vividos-borrosos_58702-2950.jpg";
          const imageSource = (!prod.imagen_url || prod.imagen_url.includes('via.placeholder.com'))
            ? fallbackImage
            : prod.imagen_url;

          return (
            <div 
              key={prod.id} 
              onClick={() => onProductClick(prod)}
              className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="h-44 bg-gray-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center relative">
                <img 
                  src={imageSource} 
                  className={`w-full h-full ${imageSource === fallbackImage ? 'object-cover' : 'object-contain'} group-hover:scale-110 transition-transform duration-500`}
                  alt={prod.nombre}
                  onError={(e) => { e.target.src = fallbackImage; }}
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: colors.primary }}>{prod.marca || 'Mavyco'}</span>
              <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-3">{prod.nombre}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-gray-900">Q{prod.precio}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAgregar(prod, 1);
                  }} 
                  className="bg-gray-100 p-2 rounded-xl text-gray-600 transition-all transform active:scale-90"
                  style={{
                    backgroundColor: colors.gray100,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.gray100;
                    e.currentTarget.style.color = colors.gray600;
                  }}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}