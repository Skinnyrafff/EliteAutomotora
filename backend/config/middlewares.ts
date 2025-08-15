// config/middlewares.ts
export default ({ env }) => ([
  'strapi::errors',

  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // Permite cargar imágenes y media desde Cloudinary
          'img-src': ["'self'", 'data:', 'blob:', '*.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', '*.cloudinary.com'],

          // Llamadas XHR/fetch desde tu frontend y admin
          'connect-src': ["'self'", 'https:', 'http:'],

          // Opcionales (más estrictos)
          'frame-ancestors': ["'self'"], // evita que te embequen en iframes externos
        },
      },
    },
  },

  {
    name: 'strapi::cors',
    config: {
      origin: [
        env('FRONTEND_URL', 'http://localhost:3000'), // tu frontend (local o prod)
        env('ADMIN_URL', 'http://localhost:1337'),    // admin/local
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true,
      keepHeadersOnError: true,
    },
  },

  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]);
