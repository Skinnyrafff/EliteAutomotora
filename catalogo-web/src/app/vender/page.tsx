// src/app/vender/page.tsx
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from "next/image";

export default function VenderPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="px-4 md:px-6 lg:px-8 pt-6">
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="relative h-[50vh] rounded-[24px] overflow-hidden flex items-center">
            <Image src="/llavesauto2.jpg" alt="Vende tu auto" fill className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50 rounded-[24px]"></div>
            <div className="relative z-10 container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                VENDE TU AUTO
                <br />
                CON <span className="text-[#BC281D]">ELITE AUTOMOTORA</span>
              </h1>
              
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

      {/* Contact Info Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            ¿QUIERES VENDER TU AUTO?
            <br />
            <span className="text-[#BC281D]">PÓNGASE</span> EN CONTACTO
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            {/* Email */}
            <div className="flex flex-col items-center">
              <Mail className="h-10 w-10 text-[#BC281D] mb-4" />
              <h3 className="text-xl font-semibold text-white">Email</h3>
              <p className="text-neutral-400 mt-2">contacto.eliteautomotora@gmail.com</p>
              <a href="mailto:contacto.eliteautomotora@gmail.com" className="text-[#BC281D] hover:underline">Enviar un correo</a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center">
              <Phone className="h-10 w-10 text-[#BC281D] mb-4" />
              <h3 className="text-xl font-semibold text-white">Teléfono</h3>
              <p className="text-neutral-400 mt-2">+56 9 3333 8281</p>
              <a href="tel:+56933338281" className="text-[#BC281D] hover:underline">Llamar ahora</a>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center">
              <MapPin className="h-10 w-10 text-[#BC281D] mb-4" />
              <h3 className="text-xl font-semibold text-white">Dirección</h3>
              <p className="text-neutral-400 mt-2">Eduardo Fabini 4387, Macul</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Eduardo+Fabini+4387,+Macul" target="_blank" rel="noopener noreferrer" className="text-[#BC281D] hover:underline">Ver en mapa</a>
            </div>

          </div>

          <div className="mt-12">
            <h2 className="text-4xl font-bold text-center text-white mb-8">
              ENCUÉNTRANOS EN EL MAPA
            </h2>
            <div className="aspect-w-16 aspect-h-9 w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.4009000000003!2d-70.58980000000001!3d-33.550000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d1f1f1f1f1f1%3A0x1f1f1f1f1f1f1f1f!2sEduardo%20Fabini%204387%2C%20Macul%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1678912345678!5m2!1ses-419!2scl"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
