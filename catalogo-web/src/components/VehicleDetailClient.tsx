'use client';

import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { absUrl, fmtCLP, getTransmissionLabel, wspLink } from "@/lib/strapi";
import type { Vehicle, StrapiEntity } from "@/lib/strapi";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

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

export default function VehicleDetailClient({ vehicle: initialVehicle }: { vehicle: StrapiEntity<Vehicle> }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const vehicle = flattenAttributes(initialVehicle);

  if (!vehicle) {
    return null;
  }

  const seller = flattenAttributes(vehicle.seller?.data);
  const mainPhotoUrl = absUrl(flattenAttributes(vehicle.primaryPhoto?.data)?.url ?? "");
  const galleryUrls =
    vehicle.Photos?.data?.map((p) => absUrl(flattenAttributes(p)?.url ?? "")) ?? [];
  
  const allImages = [mainPhotoUrl, ...galleryUrls].filter(Boolean);
  const lightboxSlides = allImages.map(url => ({ src: url }));

  const staticWhatsappNumber = "+56933338281"; 
  const wsp = wspLink(staticWhatsappNumber, `Hola, me interesa el ${vehicle.title}`);

  const renderArrowPrev = (onClickHandler: () => void, hasPrev: boolean, label: string) =>
    hasPrev && (
      <button type="button" onClick={onClickHandler} title={label} className="arrow-prev">
        <ChevronLeft size={32} />
      </button>
    );

  const renderArrowNext = (onClickHandler: () => void, hasNext: boolean, label: string) =>
    hasNext && (
      <button type="button" onClick={onClickHandler} title={label} className="arrow-next">
        <ChevronRight size={32} />
      </button>
    );

  const renderThumbs = (children: React.ReactNode[]) => {
    return children.map((child, index) => {
      const image = allImages[index];
      return (
        <div key={index} className={`thumb`}>
          <Image src={image} alt={`thumbnail ${index}`} width={100} height={60} className="object-cover h-full" />
        </div>
      );
    });
  };

  return (
    <> 
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Galería */}
          <div className="lg:col-span-3">
            {allImages.length > 0 ? (
              <Carousel 
                showArrows={true} 
                showThumbs={true} 
                infiniteLoop={true} 
                useKeyboardArrows={true} 
                className="rounded-2xl overflow-hidden"
                renderArrowPrev={renderArrowPrev}
                renderArrowNext={renderArrowNext}
                emulateTouch={true}
                swipeable={true}
                renderThumbs={renderThumbs}
                onClickItem={(index) => { setLightboxIndex(index); setLightboxOpen(true); }}
              >
                {allImages.map((url, index) => (
                  <div key={index} className="relative aspect-[16/10] w-full bg-[#121212]">
                    <Image
                      src={url}
                      alt={`Foto ${index + 1} de ${vehicle.title}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#121212] grid place-items-center text-neutral-400">
                Sin fotos
              </div>
            )}
          </div>

          {/* Información */}
          <div className="lg:col-span-2">
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{vehicle.title}</h1>
              <p className="text-neutral-400 mt-1">{vehicle.location}</p>

              <div className="mt-4 text-3xl md:text-4xl font-extrabold text-red-500">
                {fmtCLP(vehicle.price)}
              </div>

              {wsp && (
                <div className="mt-4 space-y-2">
                    <a
                        href={wsp}
                        target="_blank" rel="noopener noreferrer"
                        className="animate-pulse w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/80 px-5 py-2.5 text-base font-semibold text-white hover:bg-[#1EAE54] transition-colors"
                    >
                        <FaWhatsapp className="h-6 w-6" />
                        Contactar por WhatsApp
                    </a>
                    <a
                        href="https://www.instagram.com/eliteautomotora"
                        target="_blank" rel="noopener noreferrer"
                        className="animate-pulse w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/80 px-5 py-2.5 text-base font-semibold text-white hover:bg-red-600 transition-colors"
                    >
                        <FaInstagram className="h-6 w-6" />
                        Contactar por Instagram
                    </a>
                </div>
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
          target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition"
          aria-label="WhatsApp flotante"
        >
          <FaWhatsapp className="h-7 w-7 text-white" />
        </a>
      )}
    </div>
    <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 2,
          
          
          scrollToZoom: true,
        }}
      />
    </>
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
