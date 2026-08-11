/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permissivo de propósito: a Isabella pode colar a URL de qualquer imagem de capa no painel admin.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
