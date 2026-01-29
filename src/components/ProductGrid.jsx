import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ProductModal } from './ProductModal';

export function ProductGrid({ searchTerm, onAgregar }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProducto, setModalProducto] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      let query = supabase
        .from('productos')
        .select('*')
        .eq('visible', true); // FILTRAR SOLO PRODUCTOS VISIBLES

      if (searchTerm) {
        query = query.ilike('nombre', `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching productos:', error);
      } else {
        setProductos(data || []);
      }
      setLoading(false);
    };

    fetchProductos();
  }, [searchTerm]);

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Cargando productos...</div>;
  }

  if (productos.length === 0) {
    return <div className="p-8 text-center text-gray-400">No hay productos disponibles</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        {productos.map((producto) => (
          <div
            key={producto.id}
            onClick={() => setModalProducto(producto)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer p-6 border border-gray-100"
          >
            <img 
              src={producto.imagen_url} 
              alt={producto.nombre}
              className="w-full h-48 object-contain mix-blend-multiply mb-4"
            />
            <h3 className="font-bold text-gray-900 line-clamp-2">{producto.nombre}</h3>
            <p className="text-sm text-gray-500 mt-2">{producto.marca}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-black text-[#E54B35] text-xl">Q{producto.precio}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                Stock: {producto.stock}
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalProducto && (
        <ProductModal
          producto={modalProducto}
          isOpen={!!modalProducto}
          onClose={() => setModalProducto(null)}
          onAgregar={onAgregar}
        />
      )}
    </>
  );
}