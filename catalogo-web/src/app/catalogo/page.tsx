import VehicleGrid from '@/components/VehicleGrid';
import PageHero from '@/components/PageHero'; // Import PageHero

export default function CatalogoPage() {
  return (
    <>
      <PageHero
        title="NUESTRO CATÁLOGO"
        description="Explora nuestra selección de vehículos disponibles."
        imageUrl="/vehicleteam.jpg" // Using vehicleteam.jpg as requested
      />
      <VehicleGrid />
    </>
  );
}
