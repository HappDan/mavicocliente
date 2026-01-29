import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CategorySection } from './CategorySection';
import { ProductCard } from './ProductCard'; // Asegúrate de tener este componente

export function HomeContent({ searchTerm, onProductClick, onAgregar }) {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [todosLosProductos, setTodosLosProductos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      // 1. Cargamos categorías para el Home normal
      const { data: cats } = await supabase
        .from('categorias_principales')
        .select('id, nombre')
        .order('id', { ascending: true });
      if (cats) setListaCategorias(cats);

      // 2. Cargamos todos los productos (para filtrar al buscar)
      const { data: prods } = await supabase
        .from('productos')
        .select('*')
        .eq('visible', true);
      if (prods) setTodosLosProductos(prods);
    };
    cargarDatos();
  }, []);

  // Lógica de filtrado global (Busca por nombre o marca)
  const productosFiltrados = todosLosProductos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.marca?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20">
      {searchTerm ? (
        /* --- VISTA DE BÚSQUEDA --- */
        <div className="px-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
          <div className="mb-12 border-b border-gray-200 pb-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">
              Resultados para: <span className="text-[#E54B35]">{searchTerm}</span>
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">
              Se encontraron {productosFiltrados.length} productos
            </p>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {productosFiltrados.map((producto) => (
                <ProductCard 
                  key={producto.id} 
                  producto={producto} 
                  onProductClick={onProductClick} 
                  onAgregar={onAgregar} 
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest">No hay coincidencias en Mavyco</p>
            </div>
          )}
        </div>
      ) : (
        /* --- VISTA NORMAL POR CATEGORÍAS --- */
        <div className="space-y-12">
          {listaCategorias.map((cat) => (
            <CategorySection 
              key={cat.id} 
              categoriaId={cat.id} 
              titulo={cat.nombre} 
              searchTerm={searchTerm}
              onProductClick={onProductClick} 
              onAgregar={onAgregar}
            />
          ))}
        </div>
      )}
    </div>
  );
}