// src/app/contacto/page.tsx
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactoPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section (Banner) */}
      <div className="px-4 md:px-6 lg:px-8 pt-6">
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="relative h-[50vh] rounded-[24px] overflow-hidden flex items-center justify-center">
            <Image src="/llavesauto2.jpg" alt="Contacto Banner" fill className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50 rounded-[24px]"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                PÓNGASE EN CONTACTO
              </h1>
              <p className="text-lg text-neutral-300 mt-2">Estamos aquí para ayudarte.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
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
              <p className="text-neutral-400 mt-2">El director 6000, Las Condes</p>
              <a href="https://www.google.com/maps/search/?api=1&query=El+director+6000,+Las+Condes" target="_blank" rel="noopener noreferrer" className="text-[#BC281D] hover:underline">Ver en mapa</a>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
