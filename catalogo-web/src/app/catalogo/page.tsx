import { Suspense } from "react"
import VehicleCard from "@/components/VehicleCard"
import { absUrl } from "@/lib/strapi"
import type { StrapiResponse, StrapiEntity, Vehicle } from "@/lib/strapi"

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

async function getVehicles(page = 1) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error("NEXT_PUBLIC_API_URL environment variable is not set")
    return { error: "API URL not configured" }
  }

  const apiUrl = absUrl(
    `/api/vehicles?populate[primaryPhoto]=true&populate[seller]=true&pagination[page]=${page}&pagination[pageSize]=12&sort=createdAt:desc`,
  )

  console.log("Fetching from URL:", apiUrl) // Log para debugging

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.error(`HTTP Error: ${response.status} ${response.statusText}`)
      return { error: `HTTP ${response.status}: ${response.statusText}` }
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Response is not JSON:", contentType)
      const text = await response.text()
      console.error("Response body:", text.slice(0, 200))
      return { error: "API returned non-JSON response" }
    }

    const data: StrapiResponse<StrapiEntity<Vehicle>[]> = await response.json()
    return { data }
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return { error: error instanceof Error ? error.message : "Unknown error" }
  }
}

function VehicleGrid({ vehicles }: { vehicles: StrapiEntity<Vehicle>[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {hasPrevious ? (
        <a
          href={`/catalogo?page=${currentPage - 1}`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          ← Anterior
        </a>
      ) : (
        <span className="bg-muted text-muted-foreground px-6 py-2 rounded-lg font-medium cursor-not-allowed">
          ← Anterior
        </span>
      )}

      <span className="text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>

      {hasNext ? (
        <a
          href={`/catalogo?page=${currentPage + 1}`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Siguiente →
        </a>
      ) : (
        <span className="bg-muted text-muted-foreground px-6 py-2 rounded-lg font-medium cursor-not-allowed">
          Siguiente →
        </span>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
          <div className="aspect-video bg-muted" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded w-16" />
              <div className="h-6 bg-muted rounded w-20" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded" />
              <div className="h-3 bg-muted rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-muted rounded flex-1" />
              <div className="h-8 bg-muted rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error de configuración</h1>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-destructive font-medium mb-4">Error: {error}</p>

            {error.includes("API URL not configured") && (
              <div className="text-left space-y-3">
                <p className="text-muted-foreground">Para solucionar este problema:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>
                    Ve a <strong>Project Settings</strong> en la esquina superior derecha
                  </li>
                  <li>
                    Selecciona la pestaña <strong>Environment Variables</strong>
                  </li>
                  <li>Agrega una nueva variable:</li>
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>
                      <strong>Name:</strong> NEXT_PUBLIC_API_URL
                    </li>
                    <li>
                      <strong>Value:</strong> http://localhost:1337 (o tu URL de Strapi)
                    </li>
                  </ul>
                  <li>Guarda los cambios y recarga la página</li>
                </ol>
              </div>
            )}

            {error.includes("non-JSON response") && (
              <div className="text-left space-y-3">
                <p className="text-muted-foreground">La URL de la API no está devolviendo JSON válido.</p>
                <p className="text-sm text-muted-foreground">
                  Verifica que tu servidor Strapi esté ejecutándose en la URL configurada y que la ruta
                  <code className="bg-muted px-1 rounded">/api/vehicles</code> esté disponible.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page } = await searchParams;                // 👈 importante
  const currentPage = Number.parseInt(page ?? "1", 10);
  const result = await getVehicles(currentPage);

  if ("error" in result) {
    return <ErrorMessage error={result.error} />
  }

  const { data: vehiclesData } = result

  if (!vehiclesData) {
    return <ErrorMessage error="No data received from API" />
  }

  const { data: vehicles, meta } = vehiclesData
  const { pagination } = meta

  return (
    <div className="min-h-screen">
  <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-8">
    {/* Header */}
    <div className="mb-8 text-center">
      <h1 className="mb-2 text-3xl font-bold md:text-4xl">Catálogo de Vehículos</h1>
      <p className="text-neutral-400">Encuentra tu próximo auto ideal</p>
    </div>

        {/* Contenido principal */}
        {vehicles.length > 0 ? (
          <>
            <Suspense fallback={<LoadingSkeleton />}>
              <VehicleGrid vehicles={vehicles} />
            </Suspense>

            {pagination.pageCount > 1 && <Pagination currentPage={pagination.page} totalPages={pagination.pageCount} />}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">No hay vehículos disponibles</h2>
            <p className="text-muted-foreground">Vuelve pronto para ver nuevos vehículos en nuestro catálogo.</p>
          </div>
        )}
      </div>
    </div>
  )
}