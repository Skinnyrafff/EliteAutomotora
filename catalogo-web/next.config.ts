// next.config.ts
import type { NextConfig } from 'next'

// NEXT_PUBLIC_CLOUDINARY_NAME=dpzld4950 (en .env.local / Vercel)
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME ?? 'dpzld4950'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary (producción)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${cloudName}/image/upload/**`,
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${cloudName}/video/upload/**`,
      },

      // Strapi local (desarrollo) -> para imágenes en /uploads
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Si a veces usas 127.0.0.1, descomenta:
      // {
      //   protocol: 'http',
      //   hostname: '127.0.0.1',
      //   port: '1337',
      //   pathname: '/uploads/**',
      // },
    ],
  },
}

export default nextConfig