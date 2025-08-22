import VehicleGrid from '@/components/VehicleGrid';

export default function CatalogoPage() {
  return (
    <>
      <div className="text-white text-center py-4">
        DEBUG: La URL de la API es: {process.env.NEXT_PUBLIC_API_URL || "NO ESTÁ DEFINIDA"}
      </div>
      <VehicleGrid />
    </>
  );
}
