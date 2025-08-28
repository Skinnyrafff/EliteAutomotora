import { getVehicles } from "@/lib/strapi";

export async function generateStaticParams() {
  const vehicles = await getVehicles(1, 1000); // Fetch up to 1000 vehicles, adjust as needed
  return vehicles.data.map((vehicle) => ({
    slug: vehicle.attributes.slug,
  }));
}

export default function VehicleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}