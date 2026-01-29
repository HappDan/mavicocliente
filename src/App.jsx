import { useState } from 'react'
import { Header } from './components/Header'
import { Banner } from './components/Banner'
import { HomeContent } from './components/HomeContent'
import { ProductModal } from './components/ProductModal'
import { CotizacionSidebar } from './components/CotizacionSidebar'
import { Footer } from './components/Footer' // 1. Importamos el Footer
import { CheckCircle2 } from 'lucide-react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [listaCotizacion, setListaCotizacion] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [animateCart, setAnimateCart] = useState(false);

  const eliminarDeLista = (id) => {
    setListaCotizacion(prev => prev.filter(item => item.id !== id));
  };

  const handleOpenProduct = (producto) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAgregarALista = (producto, cantidad) => {
    setListaCotizacion(prevLista => {
      const productoExistente = prevLista.find(item => item.id === producto.id);
      if (productoExistente) {
        return prevLista.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevLista, { ...producto, cantidad }];
      }
    });

    setToastMessage(`${cantidad} x ${producto.nombre}`);
    setShowToast(true);
    setAnimateCart(true);

    setTimeout(() => setShowToast(false), 3000);
    setTimeout(() => setAnimateCart(false), 500);
    
    handleCloseModal();
  };

  return (
    // min-h-screen y flex-col para que el footer no flote a mitad de la página
    <div className="min-h-screen bg-[#f3f4f6] relative flex flex-col">
      <Header 
        onSearch={setSearchTerm} 
        onOpenCotizacion={() => setIsSidebarOpen(true)}
        cantidadCotizacion={listaCotizacion.length}
        animarCarrito={animateCart} 
      /> 
      
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="bg-gray-900 text-white px-8 py-5 rounded-[25px] shadow-2xl flex items-center gap-4 border-b-4 border-[#E54B35]">
            <div className="bg-[#E54B35] p-2 rounded-full shadow-lg shadow-[#E54B35]/30">
              <CheckCircle2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Agregado a Cotización</p>
              <p className="font-bold text-base leading-tight">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* flex-grow asegura que el main ocupe el espacio necesario para empujar el footer */}
     <main className="flex-grow">
  {/* Pasamos setSearchTerm como prop al Banner */}
  {!searchTerm && <Banner onFilterSelect={setSearchTerm} />}
  
  <HomeContent 
    searchTerm={searchTerm} 
    onProductClick={handleOpenProduct}
    onAgregar={handleAgregarALista} 
  />
</main>

      {/* 2. El Footer al final de la estructura */}
      <Footer />

      <ProductModal 
        producto={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onAgregar={handleAgregarALista} 
      />

      <CotizacionSidebar 
        lista={listaCotizacion} 
        onRemove={eliminarDeLista}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  )
}

export default App