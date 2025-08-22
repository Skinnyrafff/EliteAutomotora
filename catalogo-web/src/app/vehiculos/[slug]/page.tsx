// src/app/vehiculos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { getVehicleBySlug, absUrl, fmtCLP, getTransmissionLabel, wspLink } from "@/lib/strapi";
import type { Vehicle, StrapiEntity } from "@/lib/strapi";

// Tipos para los bloques Rich Text
type RichTextChild = { text: string };
type RichTextParagraph = { type: "paragraph"; children: RichTextChild[] };
type RichTextBlock = RichTextParagraph;

function StrapiBlocks({ blocks }: { blocks: Vehicle["description"] | undefined }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    const b = block as Partial<RichTextBlock>;
    if (b.type === "paragraph" && Array.isArray(b.children)) {
      return (
        <p key={index} className="mt-2 text-neutral-300 text-sm whitespace-pre-wrap">
          {b.children.map((child: RichTextChild) => child.text).join("")}
        </p>
      );
    }
    return null;
  });
}

// Aplana la data de Strapi
function flattenAttributes<T>(
  data: StrapiEntity<T> | null | undefined
): (T & { id: number }) | null {
  if (!data) return null;
  return { id: data.id, ...data.attributes };
}

type Params = { slug: string };

export default async function VehiclePage({
  params,
}: {
  params: Promise<Params>; // Next 15: params puede ser Promise
}) {
  const { slug } = await params;

  let vehicleResult;
  try {
    vehicleResult = await getVehicleBySlug(slug);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return (
      <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8 rounded-lg bg-[#121212] border border-white/10">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            ¡Ups! Algo salió mal.
          </h1>
          <p className="text-neutral-300">
            No pudimos cargar la información del vehículo. Por favor, intenta de nuevo más tarde.
          </p>
          <p className="text-neutral-400 text-sm mt-4">
            Si el problema persiste, contacta a soporte.
          </p>
        </div>
      </div>
    );
  }

  if (!vehicleResult) return notFound();

  const vehicle = flattenAttributes(vehicleResult);
  if (!vehicle) return notFound();

  const seller = flattenAttributes(vehicle.seller?.data);
  const mainPhotoUrl = absUrl(flattenAttributes(vehicle.primaryPhoto?.data)?.url ?? "");
  const galleryUrls =
    vehicle.Photos?.data?.map((p) => absUrl(flattenAttributes(p)?.url ?? "")) ?? [];

  const wsp = seller?.whatsapp
    ? wspLink(seller.whatsapp, `Hola, me interesa el ${vehicle.title}`)
    : null;

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Galería */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#121212] mb-4">
              {mainPhotoUrl ? (
                <Image
                  src={mainPhotoUrl}
                  alt={`Foto principal de ${vehicle.title}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="grid place-items-center h-full text-neutral-400">
                  Sin foto principal
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {galleryUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#121212]"
                >
                  <Image
                    src={url}
                    alt={`Foto ${index + 1} de ${vehicle.title}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Información */}
          <div className="lg:col-span-2">
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{vehicle.title}</h1>
              <p className="text-neutral-400 mt-1">{vehicle.location}</p>

              <div className="mt-4 text-3xl md:text-4xl font-extrabold text-red-500">
                {fmtCLP(vehicle.price)}
              </div>

              {/* Botón largo de WhatsApp debajo del precio */}
              {wsp && (
                <a
                  href={wsp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-lg font-semibold text-white hover:bg-[#1EAE54] transition-colors"
                >
                  <FaWhatsapp className="h-6 w-6" />
                  Contactar por WhatsApp
                </a>
              )}

              <div className="mt-6 border-t border-white/10 pt-6">
                <h2 className="text-lg font-semibold">Detalles del vehículo</h2>
                <ul className="mt-3 space-y-3 text-neutral-300 text-sm">
                  <DetailItem label="Año" value={vehicle.year} />
                  <DetailItem
                    label="Kilometraje"
                    value={`${vehicle.mileageKm.toLocaleString("es-CL")} km`}
                  />
                  <DetailItem
                    label="Transmisión"
                    value={getTransmissionLabel(vehicle.transmission)}
                  />
                  <DetailItem label="Dueños" value={vehicle.ownersCount} />
                </ul>
              </div>

              {vehicle.description && (
                <div className="mt-6 border-t border-white/10 pt-6">
                  <h2 className="text-lg font-semibold">Descripción</h2>
                  <StrapiBlocks blocks={vehicle.description} />
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

      {/* Botón flotante de WhatsApp abajo a la derecha */}
      {wsp && (
        <a
          href={wsp}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition"
          aria-label="WhatsApp flotante"
        >
          <FaWhatsapp className="h-7 w-7 text-white" />
        </a>
      )}
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
