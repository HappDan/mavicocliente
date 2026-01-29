import React from 'react';
import { X, Trash2, MessageCircle } from 'lucide-react';

export function CotizacionSidebar({ lista, onRemove, isOpen, onClose }) {
  const colorMavyco = "#E54B35";
  
  // Calculamos el total de items
  const totalItems = lista.reduce((acc, item) => acc + item.cantidad, 0);
  
  // NUEVO: Calculamos el total de precio (cantidad × precio)
  const totalPrecio = lista.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

  const enviarWhatsAppFinal = () => {
    const telefono = "50255215237"; // Tu número de Mavyco
    let mensaje = `¡Hola Mavyco! 👋\n\nSolicito cotización para los siguientes productos:\n\n`;
    
    lista.forEach((item, index) => {
      const subtotal = item.cantidad * item.precio;
      mensaje += `${index + 1}. *${item.nombre}*\n   Cantidad: ${item.cantidad} × Q${item.precio} = Q${subtotal}\n\n`;
    });

    mensaje += `💰 *TOTAL: Q${totalPrecio.toFixed(2)}*\n\n`;
    mensaje += `🙏 *Por favor, confírmenme disponibilidad y costo de envío para Guatemala.*`;
    
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header del Sidebar */}
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Mi Cotización</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {lista.length === 0 ? (
              <p className="text-gray-400 font-bold text-center mt-10">Tu lista está vacía...</p>
            ) : (
              lista.map((item) => {
                const subtotal = item.cantidad * item.precio;
                return (
                  <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-3xl border border-gray-100">
                    <img src={item.imagen_url} alt={item.nombre} className="w-16 h-16 object-contain mix-blend-multiply" />
                    <div className="flex-1">
                      <h4 className="font-black text-sm text-gray-900 leading-tight">{item.nombre}</h4>
                      <p className="text-[#E54B35] font-bold text-xs">Cant: {item.cantidad} × Q{item.precio} = Q{subtotal}</p>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer con el botón final */}
          {lista.length > 0 && (
            <div className="p-8 border-t space-y-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-black text-gray-400 uppercase text-xs tracking-widest">Total a pagar:</span>
                <span className="font-black text-3xl" style={{ color: colorMavyco }}>Q{totalPrecio.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={enviarWhatsAppFinal}
                style={{ backgroundColor: colorMavyco }}
                className="w-full text-white py-6 rounded-[24px] font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-[#E54B35]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle size={24} fill="white" />
                Enviar a WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}