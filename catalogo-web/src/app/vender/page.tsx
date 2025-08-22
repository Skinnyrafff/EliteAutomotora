// src/app/vender/page.tsx
import { Mail, Phone, MapPin } from 'lucide-react';

export default function VenderPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="px-4 md:px-6 lg:px-8 pt-6">
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="relative h-[50vh] rounded-[24px] overflow-hidden flex items-center">
            <img src="/llavesauto2.jpg" alt="Vende tu auto" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50 rounded-[24px]"></div>
            <div className="relative z-10 container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                VENDE TU AUTO
                <br />
                CON <span className="text-[#BC281D]">ELITE AUTOMOTORA</span>
              </h1>
              <button className="mt-8 bg-[#BC281D] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors">
                Vender mi auto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            EL PROCESO ES <span className="text-[#BC281D]">MUY FÁCIL</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="rounded-[24px] border border-white/10 bg-[#121212] p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group">
              <h3 className="text-2xl font-bold text-white mb-4">1. VALORAMOS</h3>
              <p className="text-neutral-400">
                Valoramos tu vehículo con rapidez y transparencia, ofreciéndote la mejor tasación según su estado, modelo y mercado actual.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-[#121212] p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group">
              <h3 className="text-2xl font-bold text-white mb-4">2. PUBLICAMOS</h3>
              <p className="text-neutral-400">
                Publicaremos tu vehículo en nuestros portal y nuestras redes sociales dando exposición a nuestros clientes.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-[#121212] p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group">
              <h3 className="text-2xl font-bold text-white mb-4">3. CONCRETAMOS</h3>
              <p className="text-neutral-400">
                Una vez que concretamos la venta, te pagamos de inmediato y por transferencia 100% Online.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            ¿QUIERES VENDER TU AUTO?
            <br />
            <span className="text-[#BC281D]">RELLENA</span> ESTE FORMULARIO
          </h2>
          <form className="max-w-4xl mx-auto bg-[#121212] p-8 rounded-lg border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="marca" className="block text-sm font-medium mb-2 text-neutral-400">Marca *</label>
                <input type="text" id="marca" name="marca" placeholder="ej: Chevrolet" className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-3" required />
              </div>
              <div>
                <label htmlFor="modelo" className="block text-sm font-medium mb-2 text-neutral-400">Modelo *</label>
                <input type="text" id="modelo" name="modelo" placeholder="ej: Sail 1.8" className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-3" required />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium mb-2 text-neutral-400">Año *</label>
                <input type="number" id="year" name="year" placeholder="ej: 2024" min="1980" max="2025" className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-3" required />
              </div>
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium mb-2 text-neutral-400">Transmisión *</label>
                <select id="transmission" name="transmission" className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-3" required>
                  <option value="AT">Automática</option>
                  <option value="MT">Manual</option>
                  <option value="CVT">CVT</option>
                  <option value="DCT">DCT</option>
                </select>
              </div>
              <div>
                <label htmlFor="llaves" className="block text-sm font-medium mb-2 text-neutral-400">Llaves *</label>
                <input type="text" id="llaves" name="llaves" placeholder="Llaves" className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-3" required />
              </div>
              <div>
                <label htmlFor="ownersCount" className="block text-sm font-medium mb-2 text-neutral-400">Cantidad de dueños *</label>
                <input type="number" id="ownersCount" name="ownersCount" placeholder="ej: Único Dueño" min="0" className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-3" required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="mantenciones" className="block text-sm font-medium mb-2 text-neutral-400">Mantenciones Realizadas *</label>
                <input type="text" id="mantenciones" name="mantenciones" placeholder="Dónde y cuándo" className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-3" required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium mb-2 text-neutral-400">Detalles *</label>
                <textarea id="description" name="description" rows={4} placeholder="ej: Jamás chocado, Pastillas de freno cambiadas el mes pasado." className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-3" required></textarea>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="photos" className="block text-sm font-medium mb-2 text-neutral-400">Adjunta al menos 3 fotos del exterior de tu auto *</label>
                <input type="file" id="photos" name="photos" multiple className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#BC281D] file:text-white hover:file:bg-red-700" required />
              </div>
            </div>
            <div className="mt-8 text-center">
              <button type="submit" className="bg-[#BC281D] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
