
import { getVehicles } from '@/lib/strapi';
import { MetadataRoute } from 'next';

const baseUrl = 'https://www.eliteautomotora.cl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
        url: `${baseUrl}/nosotros`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/vender`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    }
  ];

  try {
    // Fetch all vehicles to include in the sitemap
    const vehiclesResponse = await getVehicles(1, 100); // Assuming there are less than 100 vehicles
    const vehicleRoutes = vehiclesResponse.data.map((vehicle) => ({
      url: `${baseUrl}/vehiculos/${vehicle.attributes.slug}`,
      lastModified: new Date(vehicle.attributes.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...vehicleRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}
