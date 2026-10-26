/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/gallery/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/models/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/fountains', destination: '/palatial-fountains', permanent: true },
      { source: '/fountain', destination: '/palatial-fountains', permanent: true },
      { source: '/palatial-fountain', destination: '/palatial-fountains', permanent: true },
      { source: '/water-features', destination: '/palatial-fountains', permanent: true },
      { source: '/water-architecture', destination: '/palatial-fountains', permanent: true },
      { source: '/chhatris', destination: '/heritage-chhatris', permanent: true },
      { source: '/chhatri', destination: '/heritage-chhatris', permanent: true },
      { source: '/mandirs', destination: '/pooja-sanctums', permanent: true },
      { source: '/mandir', destination: '/pooja-sanctums', permanent: true },
      { source: '/temples', destination: '/pooja-sanctums', permanent: true },
      { source: '/sanctums', destination: '/pooja-sanctums', permanent: true },
      { source: '/sanctum', destination: '/pooja-sanctums', permanent: true },
      { source: '/deities', destination: '/marble-deities', permanent: true },
      { source: '/murtis', destination: '/marble-deities', permanent: true },
      { source: '/murti', destination: '/marble-deities', permanent: true },
    ];
  },
};

export default nextConfig;
