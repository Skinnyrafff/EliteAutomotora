// src/app/vehiculos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getVehicleBySlug, absUrl, fmtCLP, getTransmissionLabel, wspLink } from "@/lib/strapi";
import type { Vehicle } from "@/lib/strapi";

export default async function VehiclePage({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicleBySlug(params.slug);

  if (!vehicle) {
    return notFound();
  }

  // La API devuelve un objeto plano, no anidado bajo 'attributes'
  const a = vehicle;

  const seller = a.seller;

  const mainPhotoUrl = absUrl(a.primaryPhoto?.url ?? "");
  const galleryUrls = a.photos?.map(p => absUrl(p.url)) ?? [];

  const wsp = seller?.whatsapp
    ? wspLink(seller.whatsapp, `Hola, me interesa el ${a.title}`)
    : null;

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Columna de Galería */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#121212] mb-4">
              {mainPhotoUrl ? (
                <Image
                  src={mainPhotoUrl}
                  alt={`Foto principal de ${a.title}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="grid place-items-center h-full text-neutral-400">Sin foto principal</div>
              )}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {galleryUrls.map((url, index) => (
                <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#121212]">
                  <Image
                    src={url}
                    alt={`Foto ${index + 1} de ${a.title}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Columna de Información */}
          <div className="lg:col-span-2">
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{a.title}</h1>
              <p className="text-neutral-400 mt-1">{a.location}</p>

              <div className="mt-4 text-3xl md:text-4xl font-extrabold text-red-500">
                {fmtCLP(a.price)}
              </div>

              {wsp && (
                <a
                  href={wsp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-lg font-semibold text-white hover:bg-[#1EAE54] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor">
                    <path d="M16 .5C7.5.5.5 7.5.5 16c0 2.8.7 5.4 2 7.8L.5 31.5l8-2.1c2.3 1.3 4.9 2 7.8 2 8.5 0 15.5-7 15.5-15.5S24.5.5 16 .5zm0 28c-2.5 0-4.9-.7-7-2l-.5-.3-4.7 1.3 1.3-4.6-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.2 5.8-13 13-13s13 5.8 13 13-5.8 13-13 13zm7.1-9.7c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.5-.2-.7.2s-.8 1.2-1 1.4c-.2.2-.4.3-.7.1-.4-.2-1.5-.6-2.8-1.9-1-1-1.7-2.3-1.9-2.7-.2-.4 0-.6.1-.8.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.2.1-.3 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.6 1.1 3 1.2 3.2c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.6-.5z"/>
                  </svg>
                  Contactar por WhatsApp
                </a>
              )}

              <div className="mt-6 border-t border-white/10 pt-6">
                <h2 className="text-lg font-semibold">Detalles del vehículo</h2>
                <ul className="mt-3 space-y-3 text-neutral-300 text-sm">
                  <DetailItem label="Año" value={a.year} />
                  <DetailItem label="Kilometraje" value={`${a.mileageKm.toLocaleString("es-CL")} km`} />
                  <DetailItem label="Transmisión" value={getTransmissionLabel(a.transmission)} />
                  <DetailItem label="Dueños" value={a.ownersCount} />
                </ul>
              </div>

              {a.description && (
                <div className="mt-6 border-t border-white/10 pt-6">
                  <h2 className="text-lg font-semibold">Descripción</h2>
                  <p className="mt-2 text-neutral-300 text-sm whitespace-pre-wrap">{a.description[0]?.children[0]?.text}</p>
                </div>
              )}

              {seller && (
                 <div className="mt-6 border-t border-white/10 pt-6">
                   <h2 className="text-lg font-semibold">Información del vendedor</h2>
                   <p className="mt-2 text-neutral-300 text-sm">{seller.name}</p>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <li className="flex justify-between">
      <span className="text-neutral-400">{label}</span>
      <span className="font-medium">{value}</span>
    </li>
  );
}