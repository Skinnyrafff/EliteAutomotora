// Utilidades para trabajar con la API de Strapi v5

/**
 * Convierte una URL relativa en absoluta usando NEXT_PUBLIC_API_URL
 */
export function absUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return ""

  // Si ya es una URL absoluta, devolverla tal como está
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  return `${baseUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`
}

/**
 * Formatea un número como precio en pesos chilenos
 */
export function fmtCLP(value: number) {
  if (typeof value !== 'number') return ''
  return value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  });
}


/**
 * Genera un enlace de WhatsApp con mensaje predefinido
 */
export function wspLink(numberLike: string, message: string): string {
  // Quitar todo excepto dígitos
  const digits = numberLike.replace(/[^\d]/g, "")
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/**
 * Mapea códigos de transmisión a etiquetas legibles
 */
export function getTransmissionLabel(transmission: string): string {
  const labels: Record<string, string> = {
    AT: "Automática",
    MT: "Manual",
    CVT: "CVT",
    DCT: "DCT",
  }
  return labels[transmission] || transmission
}

// Tipos TypeScript para la respuesta de Strapi v5
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiEntity<T> {
  id: number
  attributes: T
}

export interface Vehicle {
  title: string
  slug: string
  location: string
  price: number
  year: number
  mileageKm: number
  transmission: string
  ownersCount: number
    description: Array<{ type: string, children: Array<{ type: string, text: string }> }>
  primaryPhoto: {
    data: StrapiEntity<{
      url: string
      formats?: {
        small?: { url: string }
        medium?: { url: string }
        thumbnail?: { url: string }
      }
    }> | null
  }
  Photos?: {
    data: Array<StrapiEntity<{
      url: string
      formats?: {
        small?: { url: string }
        medium?: { url: string }
        thumbnail?: { url: string }
      }
    }>>
  }
  seller: {
    data: StrapiEntity<{
      name: string
      email?: string
      phone?: string
      whatsapp?: string
    }> | null
  }
}

/**
 * Busca un vehículo por su slug en la API de Strapi
 */
export async function getVehicleBySlug(
  slug: string
): Promise<StrapiEntity<Vehicle> | null> {
  // Construir la URL con el filtro por slug y populando todas las relaciones
  const query = new URLSearchParams({ "filters[slug][$eq]": slug, populate: "*" })
  const url = absUrl(`/api/vehicles?${query.toString()}`)

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error("Error fetching vehicle:", response.status, response.statusText)
      // Throw an error to be caught by the page component's try...catch
      throw new Error(`Failed to fetch vehicle: ${response.status} ${response.statusText}`)
    }

    const result: StrapiResponse<StrapiEntity<Vehicle>[]> = await response.json()

    if (result.data.length === 0) {
      return null // No se encontró el vehículo
    }

    return result.data[0]
  } catch (error) {
    console.error("Error fetching vehicle by slug:", error)
    return null
  }
}

/**
 * Busca vehículos en la API de Strapi con paginación
 */
export async function getVehicles(
  page = 1,
  pageSize = 5
): Promise<StrapiResponse<StrapiEntity<Vehicle>[]>> {
  // Construir la URL con paginación y populando relaciones
  const query = new URLSearchParams({
    populate: "*",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    "sort[0]": "createdAt:desc", // Opcional: ordenar por más nuevos
  })
  const url = absUrl(`/api/vehicles?${query.toString()}`)

  try {
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.status} ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    // Devolver una estructura vacía en caso de error
    return {
      data: [],
      meta: {
        pagination: { page, pageSize, pageCount: 0, total: 0 },
      },
    }
  }
}