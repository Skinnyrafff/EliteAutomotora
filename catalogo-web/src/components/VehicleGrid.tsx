"use client";

import { useState, useEffect } from "react";
import {
  getVehicles,
  StrapiEntity,
  Vehicle,
  StrapiResponse,
} from "@/lib/strapi";
import VehicleCard from "./VehicleCard";

export default function VehicleGrid() {
  const [page, setPage] = useState(1);
  const [vehicleData, setVehicleData] = useState<
    StrapiResponse<StrapiEntity<Vehicle>[]>
  >({
    data: [],
    meta: { pagination: { page: 1, pageSize: 6, pageCount: 0, total: 0 } },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      const data = await getVehicles(page, 6); // Fetch 6 vehicles
      setVehicleData(data);
      setLoading(false);
    };
    fetchVehicles();
  }, [page]);

  const { data: vehicles, meta } = vehicleData;
  const { pageCount } = meta.pagination;

  return (
    <div className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Nuestro Catálogo
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-400">
            Encuentra el auto de tus sueños.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10 text-white">
            Cargando vehículos...
          </div>
        ) : vehicles.length > 0 ? (
          <>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <span className="text-white">
                Página {page} de {pageCount}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= pageCount}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-white">
            No se encontraron vehículos.
          </div>
        )}
      </div>
    </div>
  );
}
