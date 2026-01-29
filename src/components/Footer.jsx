import React from 'react';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 px-6 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Bloque 1: Identidad */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">
              MAVYCO<span className="text-[#E54B35]">.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Equipando los proyectos más grandes de Guatemala con herramientas de grado profesional y materiales de alta resistencia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white/5 p-3 rounded-2xl hover:bg-[#E54B35] transition-all duration-300 group">
                <Facebook size={20} className="group-hover:scale-110" />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-2xl hover:bg-[#E54B35] transition-all duration-300 group">
                <Instagram size={20} className="group-hover:scale-110" />
              </a>
              <a href="https://wa.me/502XXXXXXXX" className="bg-white/5 p-3 rounded-2xl hover:bg-[#25D366] transition-all duration-300 group">
                <MessageCircle size={20} className="group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Bloque 2: Enlaces Rápidos */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E54B35]">Navegación</h3>
            <ul className="space-y-4">
              {['Catálogo Completo', 'Promociones', 'Nuestras Marcas', 'Sobre Nosotros'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors text-sm font-bold">
                    <ChevronRight size={14} className="text-[#E54B35] opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloque 3: Contacto Directo */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E54B35]">Contacto</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-[#E54B35]"><MapPin size={18} /></div>
                <span className="text-gray-400 text-sm font-bold">Guatemala Ciudad, Zona Central</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-[#E54B35]"><Phone size={18} /></div>
                <span className="text-gray-400 text-sm font-bold">+502 0000-0000</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-[#E54B35]"><Mail size={18} /></div>
                <span className="text-gray-400 text-sm font-bold">ventas@mavyco.com</span>
              </li>
            </ul>
          </div>

          {/* Bloque 4: News Letter con Estilo */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E54B35]">Boletín</h3>
            <p className="text-gray-400 text-xs font-bold leading-relaxed">
              Recibe ofertas exclusivas y nuevos ingresos de stock.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Tu correo" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-[#E54B35] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#E54B35] text-white px-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#E54B35] transition-all">
                Unirme
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
            © {currentYear} MAVYCO IMPORTACIONES - TODOS LOS DERECHOS RESERVADOS
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Términos</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}