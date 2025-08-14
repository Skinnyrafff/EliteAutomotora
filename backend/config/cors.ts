export default {
  origin: [
    // Dominios de producción (reemplazar con los tuyos)
    'https://www.mi-catalogo.com',
    'https://mi-catalogo.com',

    // Dominio de vista previa de Vercel (si usas Vercel)
    /\.vercel\.app$/,

    // Dominio de vista previa de Render (si usas Render)
    /\.onrender\.com$/,

    // Entorno de desarrollo local
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  keepHeaderOnError: true,
};
