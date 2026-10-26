import { NextResponse } from 'next/server';

const ROUTE_ALIASES = {
  // Catalog & Products
  '/products': '/pooja-sanctums',
  '/product': '/pooja-sanctums',
  '/catalog': '/pooja-sanctums',
  '/collection': '/pooja-sanctums',
  '/collections': '/pooja-sanctums',
  '/creations': '/pooja-sanctums',
  '/creation': '/pooja-sanctums',
  '/gallery': '/royal-projects',
  '/photos': '/royal-projects',
  '/images': '/royal-projects',
  '/works': '/royal-projects',
  '/work': '/royal-projects',
  '/portfolio': '/royal-projects',
  '/landmarks': '/royal-projects',
  '/landmark-portfolio': '/royal-projects',

  // Mandirs & Sanctums
  '/mandir': '/pooja-sanctums',
  '/mandirs': '/pooja-sanctums',
  '/temple': '/pooja-sanctums',
  '/temples': '/pooja-sanctums',
  '/sanctum': '/pooja-sanctums',
  '/sanctums': '/pooja-sanctums',
  '/pooja': '/pooja-sanctums',
  '/pooja-room': '/pooja-sanctums',
  '/pooja-mandir': '/pooja-sanctums',

  // Fountains & Watercraft
  '/fountain': '/palatial-fountains',
  '/fountains': '/palatial-fountains',
  '/palatial-fountain': '/palatial-fountains',
  '/water-features': '/palatial-fountains',
  '/water-architecture': '/palatial-fountains',

  // Chhatris & Pavilions
  '/chhatri': '/heritage-chhatris',
  '/chhatris': '/heritage-chhatris',
  '/pavilion': '/heritage-chhatris',
  '/pavilions': '/heritage-chhatris',

  // Deities & Murtis
  '/deity': '/marble-deities',
  '/deities': '/marble-deities',
  '/murti': '/marble-deities',
  '/murtis': '/marble-deities',
  '/idol': '/marble-deities',
  '/idols': '/marble-deities',

  // Jaali & Inlay
  '/jaali': '/jaali-screens',
  '/jali': '/jaali-screens',
  '/jalis': '/jaali-screens',
  '/inlay': '/pietra-dura-inlay',
  '/pietra-dura': '/pietra-dura-inlay',
  '/parchin-kari': '/pietra-dura-inlay',

  // Consultations & CAD
  '/consultation': '/bespoke-consultation',
  '/consult': '/bespoke-consultation',
  '/bespoke': '/bespoke-consultation',
  '/cad': '/bespoke-consultation',
  '/cad-blueprint': '/bespoke-consultation',
  '/booking': '/bespoke-consultation',
  '/book': '/bespoke-consultation',
  '/appointment': '/bespoke-consultation',

  // Maintenance & Care
  '/maintenance': '/temple-maintenance-guide',
  '/maintenance-guide': '/temple-maintenance-guide',
  '/care': '/temple-maintenance-guide',
  '/care-guide': '/temple-maintenance-guide',

  // Vastu & Science
  '/vastu': '/ayadi-vastu-shastra',
  '/ayadi-vastu': '/ayadi-vastu-shastra',
  '/vastu-shastra': '/ayadi-vastu-shastra',
  '/ayadi': '/ayadi-vastu-shastra',

  // Materials & Quarry
  '/materials': '/materials-guide',
  '/material': '/materials-guide',
  '/stone-library': '/materials-guide',
  '/stones': '/materials-guide',
  '/stone': '/materials-guide',
  '/quarry': '/makrana-calcite-mine',
  '/mine': '/makrana-calcite-mine',
  '/mines': '/makrana-calcite-mine',
  '/calcite': '/makrana-calcite-mine',

  // Workshops & Yard
  '/workshop': '/atelier-workshop',
  '/ateliers': '/atelier-workshop',
  '/atelier': '/atelier-workshop',
  '/yard': '/pre-assembly-trial',
  '/pre-assembly': '/pre-assembly-trial',
  '/yard-feed': '/pre-assembly-trial',
  '/live-yard': '/pre-assembly-trial',
  '/live-feed': '/pre-assembly-trial',
  '/live': '/pre-assembly-trial',

  // Shipping & Pricing
  '/shipping': '/global-shipping',
  '/international-shipping': '/global-shipping',
  '/crating': '/global-shipping',
  '/delivery': '/global-shipping',
  '/export': '/global-shipping',
  '/pricing': '/pricing-guide',
  '/price': '/pricing-guide',
  '/cost': '/pricing-guide',
  '/rates': '/pricing-guide',

  // Heritage & About
  '/about': '/about-afg',
  '/about-us': '/about-afg',
  '/story': '/about-afg',
  '/history': '/about-afg',
  '/heritage': '/about-afg',

  // Contact
  '/contact-us': '/contact',
  '/enquiry': '/contact',
  '/inquiry': '/contact',

  // Legal
  '/terms': '/terms-and-conditions',
  '/privacy': '/privacy-policy',
  '/policy': '/privacy-policy',

  // Misc
  '/sitemap': '/sitemap.xml',
};

export default function proxy(request) {
  const url = request.nextUrl.clone();
  const rawPath = url.pathname;

  // Skip static files, api, _next, favicon
  if (
    rawPath.startsWith('/_next') ||
    rawPath.startsWith('/api') ||
    rawPath.startsWith('/gallery') ||
    rawPath.startsWith('/models') ||
    rawPath.startsWith('/textures') ||
    rawPath.startsWith('/draco') ||
    rawPath.includes('.')
  ) {
    return NextResponse.next();
  }

  // 1. Lowercase normalization
  const lowerPath = rawPath.toLowerCase();

  // 2. Trailing slash normalization (except root)
  const cleanPath = lowerPath.length > 1 && lowerPath.endsWith('/')
    ? lowerPath.slice(0, -1)
    : lowerPath;

  // 3. Alias redirection
  if (ROUTE_ALIASES[cleanPath]) {
    url.pathname = ROUTE_ALIASES[cleanPath];
    return NextResponse.redirect(url, 308);
  }

  // 4. If uppercase or trailing slash was present, redirect to clean path
  if (rawPath !== cleanPath) {
    url.pathname = cleanPath;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
