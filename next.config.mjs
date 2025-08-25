/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para archivos multimedia
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Configuración de imágenes
  images: {
    domains: [],
    unoptimized: false,
  },
};

export default nextConfig;
