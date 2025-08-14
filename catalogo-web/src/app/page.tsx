// src/app/page.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";

export default function Landing() {
  return (
    <>
      <Hero />

      {/* BLOQUE COMPRAR */}
      <section className="px-4 md:px-6 lg:px-8 py-8">
        <div className="mx-auto grid w-full max-w-[1360px] gap-6 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-[#121212] p-6">
            <h2 className="text-[13px] font-semibold tracking-wider text-white/90">
              COMPRAR
            </h2>
            <p className="mt-2 text-[14px] text-neutral-400">
              Explora nuestro catálogo de vehículos y encuentra tu próxima joya.
            </p>
            <div className="mt-3">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1 text-[14px] text-neutral-300 hover:text-white transition-colors"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                <span>Nuestro catálogo</span>
              </Link>
            </div>
          </div>

          {/* Si quieres más cards (Vender, Mantención, etc.), duplica el bloque anterior */}
        </div>
      </section>
    </>
  );
}