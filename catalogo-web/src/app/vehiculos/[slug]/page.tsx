import { notFound } from "next/navigation";
import { getVehicleBySlug, absUrl } from "@/lib/strapi";
import type { StrapiEntity, Vehicle } from "@/lib/strapi";
import { Metadata, ResolvingMetadata } from 'next';
import VehicleDetailClient from "@/components/VehicleDetailClient";

type Props = {
  params: { slug: string }
}

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

type RichTextChild = { text: string };
type RichTextParagraph = { type: "paragraph"; children: RichTextChild[] };
type RichTextBlock = RichTextParagraph;

// Aplana la data de Strapi
function flattenAttributes<T>(
  data: StrapiEntity<T> | null | undefined
): (T & { id: number }) | null {
  if (!data) return null;
  return { id: data.id, ...data.attributes };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: 'Vehículo no encontrado',
    }
  }

  const flatVehicle = flattenAttributes(vehicle);
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${flatVehicle?.title} | ELITE Automotora`,
    description: flatVehicle?.description ? flatVehicle.description.map((block: RichTextBlock) => block.children.map((child: RichTextChild) => child.text).join(' ')).join(' ') : 'Encuentra los mejores vehículos en ELITE Automotora.',
    openGraph: {
      images: [absUrl(flattenAttributes(flatVehicle?.primaryPhoto?.data)?.url ?? ""), ...previousImages],
    },
  }
}

export default async function VehiclePage({ params }: PageProps) {
  const { slug } = params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  return <VehicleDetailClient vehicle={vehicle} />;
}
