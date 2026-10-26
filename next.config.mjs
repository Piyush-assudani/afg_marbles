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
      { source: '/consultation', destination: '/bespoke-consultation', permanent: true },
      { source: '/consult', destination: '/bespoke-consultation', permanent: true },
      { source: '/bespoke', destination: '/bespoke-consultation', permanent: true },
      { source: '/cad', destination: '/bespoke-consultation', permanent: true },
      { source: '/cad-blueprint', destination: '/bespoke-consultation', permanent: true },
      { source: '/maintenance', destination: '/temple-maintenance-guide', permanent: true },
      { source: '/maintenance-guide', destination: '/temple-maintenance-guide', permanent: true },
      { source: '/care', destination: '/temple-maintenance-guide', permanent: true },
      { source: '/care-guide', destination: '/temple-maintenance-guide', permanent: true },
      { source: '/vastu', destination: '/ayadi-vastu-shastra', permanent: true },
      { source: '/ayadi-vastu', destination: '/ayadi-vastu-shastra', permanent: true },
      { source: '/vastu-shastra', destination: '/ayadi-vastu-shastra', permanent: true },
      { source: '/shipping', destination: '/global-shipping', permanent: true },
      { source: '/international-shipping', destination: '/global-shipping', permanent: true },
      { source: '/crating', destination: '/global-shipping', permanent: true },
      { source: '/projects', destination: '/royal-projects', permanent: true },
      { source: '/portfolio', destination: '/royal-projects', permanent: true },
      { source: '/landmark-portfolio', destination: '/royal-projects', permanent: true },
      { source: '/landmarks', destination: '/royal-projects', permanent: true },
      { source: '/workshop', destination: '/atelier-workshop', permanent: true },
      { source: '/atelier', destination: '/atelier-workshop', permanent: true },
      { source: '/yard', destination: '/pre-assembly-trial', permanent: true },
      { source: '/pre-assembly', destination: '/pre-assembly-trial', permanent: true },
      { source: '/quarry', destination: '/makrana-calcite-mine', permanent: true },
      { source: '/mine', destination: '/makrana-calcite-mine', permanent: true },
      { source: '/calcite', destination: '/makrana-calcite-mine', permanent: true },
      { source: '/materials', destination: '/materials-guide', permanent: true },
      { source: '/stone-library', destination: '/materials-guide', permanent: true },
      { source: '/stones', destination: '/materials-guide', permanent: true },
      { source: '/stone', destination: '/materials-guide', permanent: true },
      { source: '/jaali', destination: '/jaali-screens', permanent: true },
      { source: '/inlay', destination: '/pietra-dura-inlay', permanent: true },
      { source: '/pietra-dura', destination: '/pietra-dura-inlay', permanent: true },
      { source: '/pricing', destination: '/pricing-guide', permanent: true },
      { source: '/price', destination: '/pricing-guide', permanent: true },
      { source: '/terms', destination: '/terms-and-conditions', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/about', destination: '/about-afg', permanent: true },
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
