// src/components/VehicleCard.tsx
import Link from "next/link";
import Image from "next/image";
import { absUrl, fmtCLP, wspLink, getTransmissionLabel } from "@/lib/strapi";
import type { StrapiEntity, Vehicle } from "@/lib/strapi";

type VehiculoIn = StrapiEntity<Vehicle> | Vehicle;

// Tipos mínimos para media (evita any)
type MediaFormats = {
  small?: { url: string };
  medium?: { url: string };
  large?: { url: string };
  thumbnail?: { url: string };
};
type MediaAttributes = { url?: string; formats?: MediaFormats };
type MediaRel = { data?: StrapiEntity<MediaAttributes> | null };

// Type guard: detecta si viene como StrapiEntity
function isEntity(v: VehiculoIn): v is StrapiEntity<Vehicle> {
  return typeof (v as StrapiEntity<Vehicle>).attributes !== "undefined";
}

// Helper: obtiene URL de imagen principal (resiliente)
function getPrimaryUrl(v: Vehicle): string | null {
  const rel = (v as Partial<{ primaryPhoto: MediaRel }>).primaryPhoto;
  const base = rel?.data?.attributes as MediaAttributes | undefined;
  const url =
    base?.formats?.medium?.url ??
    base?.formats?.small?.url ??
    base?.url;
  return url ? absUrl(url) : null;
}

// Helper: obtiene whatsapp del vendedor si existe
function getSellerWhatsApp(v: Vehicle): string | null {
  type SellerAttrs = { whatsapp?: string };
  type SellerRel = { data?: StrapiEntity<SellerAttrs> | null };
  const sellerRel = (v as Partial<{ seller: SellerRel }>).seller;
  const wa = sellerRel?.data?.attributes?.whatsapp;
  return wa ?? null;
}

export default function VehicleCard({ vehicle }: { vehicle: VehiculoIn }) {
  // Atributos aplanados sin any
  const a: Vehicle = isEntity(vehicle) ? vehicle.attributes : vehicle;

  // ---------- Imagen principal ----------
  const imgUrl = getPrimaryUrl(a);

  // ---------- WhatsApp ----------
  const whatsapp = getSellerWhatsApp(a);
  const wsp = whatsapp ? wspLink(whatsapp, `Hola, me interesa el ${a?.title ?? "vehículo"}`) : null;

  // ---------- Precio ----------
  const priceNumber = Number(a?.price);
  const priceText =
    Number.isFinite(priceNumber) && priceNumber > 0 ? fmtCLP(priceNumber) : "Consultar precio";

  const owners = a?.ownersCount ?? 0;

  return (
    <article className="group rounded-2xl border border-white/10 bg-[#121212] shadow-sm transition hover:shadow-xl hover:border-white/20">
      {/* Imagen */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="aspect-[16/9] w-full">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={a?.title ?? "Vehículo"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority={false}
            />
          ) : (
            <div className="h-full w-full grid place-items-center bg-neutral-800 text-neutral-400">
              Sin foto
            </div>
          )}
        </div>

        {owners > 0 && (
          <span className="absolute left-3 bottom-3 z-10 inline-flex items-center rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            {owners} Dueño{owners > 1 ? "s" : ""}
          </span>
        )}

        {wsp && (
          <a
            href={wsp}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition"
            aria-label="WhatsApp"
          >
            {/* logo oficial */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-5 w-5" fill="white">
              <path d="M16 .5C7.5.5.5 7.5.5 16c0 2.8.7 5.4 2 7.8L.5 31.5l8-2.1c2.3 1.3 4.9 2 7.8 2 8.5 0 15.5-7 15.5-15.5S24.5.5 16 .5zm0 28c-2.5 0-4.9-.7-7-2l-.5-.3-4.7 1.3 1.3-4.6-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.2 5.8-13 13-13s13 5.8 13 13-5.8 13-13 13zm7.1-9.7c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.5-.2-.7.2s-.8 1.2-1 1.4c-.2.2-.4.3-.7.1-.4-.2-1.5-.6-2.8-1.9-1-1-1.7-2.3-1.9-2.7-.2-.4 0-.6.1-.8.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.2.1-.3 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.6 1.1 3 1.2 3.2c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.6-.5z"/>
            </svg>
          </a>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{a?.title ?? "Vehículo"}</h3>
        <p className="mt-0.5 text-sm text-neutral-400">{a?.location ?? "Ubicación no especificada"}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-[1.35rem] font-extrabold text-red-500">{priceText}</div>

          <Link
            href={`/vehiculos/${a?.slug ?? "#"}`}
            className="group inline-flex items-center gap-1 text-sm text-neutral-300 hover:text-white"
          >
            Ver detalles
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Fila inferior con iconos */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-neutral-300">
          <Item
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M7 12a5 5 0 1 1 10 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            }
          >
            {a?.mileageKm ? `${Number(a.mileageKm).toLocaleString("es-CL")} km` : "—"}
          </Item>

          <Item
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M4 12h16M12 4v16M7 7l10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            }
          >
            {a?.transmission ? getTransmissionLabel(String(a.transmission)) : "—"}
          </Item>

          <Item
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M7 3h10a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            {a?.year ?? "—"}
          </Item>
        </div>
      </div>
    </article>
  );
}

function Item({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-neutral-400">{icon}</span>
      <span>{children}</span>
    </span>
  );
}
