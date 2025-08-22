
// src/components/Hero.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Nuevo componente para las tarjetas de información
function InfoCard({ title, description, linkText, href }: {
  title: string;
  description: string;
  linkText: string;
  href: string;
}) {
  return (
    <div className="bg-[#121212] rounded-2xl p-8 flex flex-col min-h-[280px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group hover:bg-black">
      <Link href={href}>
        <h3 className="text-lg font-semibold text-white group-hover:text-red-500 transition-colors">{title}</h3>
      </Link>
      <p className="text-neutral-400 mt-2 text-sm flex-grow">{description}</p>
      <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors">
        {linkText}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-6">
      <div className="mx-auto w-full max-w-[1360px] mx-[-80px]">
        <div className="relative overflow-hidden rounded-[24px] bg-[#121212]">
          {/* Video background */}
          <video
            className="h-[70vh] w-full object-cover"
            src="/hero.mp4"
            poster="/hero-car.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Gradiente */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          {/* Título + CTAs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="elementor-heading-title animate-fadeIn font-semibold leading-[1.15] tracking-wide text-white drop-shadow-sm text-[34px] md:text-[52px]">
              EL VIAJE COMIENZA
              <br className="hidden md:block" />
              CON <span className="text-[#BC281D]">ELITE</span>
            </h1>

            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <Link
                href="/catalogo"
                className="animate-fadeIn animate-delay-100 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 md:px-6 md:py-3 text-[15px] md:text-[16px] font-medium text-black hover:bg-white/90 transition-colors"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                <span>Nuestro catálogo</span>
              </Link>

              <Link
                href="/vender"
                className="animate-fadeIn animate-delay-200 inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 md:px-6 md:py-3 text-[15px] md:text-[16px] font-medium text-white/90 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                <span>Vender mi auto</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Nueva sección de tarjetas de información */}
        <div className="relative z-10 px-4 md:px-6 lg:px-8 pt-0 pb-8 mt-[-100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <InfoCard 
              title="VEHICULOS"
              description="Explora nuestro catálogo de vehículos y encuentra tu próxima joya."
              linkText="Nuestro catálogo"
              href="/catalogo"
            />
            <InfoCard 
              title="VENDER"
              description="Vende tu auto con nosotros por consignación y véndelo en tiempo record."
              linkText="Consignar"
              href="/vender"
            />
            <InfoCard 
              title="NOSOTROS"
              description="Conoce más sobre nuestra empresa y nuestro equipo."
              linkText="Saber más"
              href="/nosotros"
            />
          </div>
        </div>

        
      </div>
    </section>
  );
}
