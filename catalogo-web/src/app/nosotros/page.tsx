// src/app/nosotros/page.tsx
import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section (Banner) */}
      <div className="px-4 md:px-6 lg:px-8 pt-6">
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="relative h-[50vh] rounded-[24px] overflow-hidden flex items-center">
            <Image src="/vehicleteam.jpg" alt="Nosotros Banner" fill className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50 rounded-[24px]"></div>
            <div className="relative z-10 container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                CONOCE A <span className="text-[#BC281D]">ELITE</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Nuestra Historia Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            NUESTRA HISTORIA
          </h2>
          {/* Placeholder for history content */}
          <p className="text-neutral-400 text-lg text-center max-w-3xl mx-auto">
            Explora el auto de tus sueños en Élite
            Automotora: descubre nuestra exclusiva selección de vehículos cuidadosamente inspeccionados, y la atención personalizada que mereces. Porque tu próximo auto no es solo un medio de transporte, es una experiencia que comienza
            aquí.
          </p>
        </div>
      </div>

      {/* Equipo Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            EQUIPO:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/juanca1.jpg" alt="Juan Carlos Mujica" width="150" height="150" className="mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-semibold text-white">Juan Carlos Mujica</h3>
            </div>
            <div className="text-center">
              <img src="/jesus1.jpg" alt="Jesus Osandón" width="150" height="150" className="mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-semibold text-white">Jesús Ossandon</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
