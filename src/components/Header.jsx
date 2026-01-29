import React, { useState, useEffect } from 'react';
import { Search, LayoutGrid, ShoppingCart, Box } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { colors } from '../config/colors';

export function Header({ onSearch, onOpenCotizacion, cantidadCotizacion }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data } = await supabase
        .from('categorias_principales')
        .select('id, nombre, icono');
      if (data) setCategorias(data);
    };
    fetchCategorias();
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-md font-sans" style={{ backgroundColor: colors.primary }}>
      <div className="text-white px-4 py-3 flex items-center gap-4 lg:gap-8">
        
        {/* LOGO */}
        <div className="text-3xl font-black tracking-tighter cursor-pointer shrink-0">
          MAVYCO
        </div>

        {/* BOTÓN CATEGORÍAS */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hidden md:flex items-center gap-2 px-6 py-3 rounded-md hover:opacity-90 transition shrink-0 border border-white/30"
          style={{ backgroundColor: colors.primaryDark }}
        >
          <LayoutGrid size={20} />
          <span className="font-semibold text-sm">Categorías</span>
        </button>

        {/* BUSCADOR */}
        <div className="flex-1 relative max-w-4xl mx-auto">
          <input 
            type="text" 
            placeholder="Buscar en Mavyco..." 
            className="w-full py-2.5 px-6 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none shadow-md text-sm border-none"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute right-5 top-3" size={18} style={{ color: colors.primary }} />
        </div>

        {/* CARRITO */}
        <div className="flex items-center gap-4 shrink-0 pr-2">
          <div 
            onClick={onOpenCotizacion}
            className="relative cursor-pointer group"
          >
            <ShoppingCart size={28} className="group-hover:scale-110 transition text-white" />
            <span 
              className="absolute -top-2 -right-2 text-red-700 text-[10px] font-black px-1.5 rounded-full border border-red-600 animate-in zoom-in"
              style={{ backgroundColor: colors.secondary }}
            >
              {cantidadCotizacion || 0}
            </span>
          </div>
        </div>
      </div>

      {/* MENÚ DE CATEGORÍAS */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-100 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="max-w-full mx-auto p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            
            {categorias.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setIsMenuOpen(false)}
                className="group flex flex-col items-center text-center space-y-4 p-4 rounded-[32px] hover:bg-opacity-5 transition-all"
                style={{ backgroundColor: `${colors.primary}0D` }}
              >
                <div 
                  className="w-20 h-20 rounded-[24px] flex items-center justify-center group-hover:shadow-lg transition-all duration-500"
                  style={{
                    backgroundColor: colors.gray50,
                  }}
                >
                  <div 
                    className="transition-colors group-hover:text-white" 
                    style={{ color: colors.primary }}
                  >
                    <Box size={32} strokeWidth={1.5} />
                  </div>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors line-clamp-2">
                  {cat.nombre}
                </span>
              </button>
            ))}

          </div>
          
          {/* Pie del menú */}
          <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
              Explora más de 2,000 productos para construcción en Mavyco
            </p>
          </div>
        </div>
      )}
    </header>
  );
}