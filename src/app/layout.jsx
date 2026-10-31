import '../style.css';
import '../premium.css';
import '../security.css';
import LayoutClientWrapper from './LayoutClientWrapper';

export const metadata = {
  metadataBase: new URL('https://afgmarbel.com'),
  title: {
    default: 'A.F.G Marble & Arts — Consecrated Makrana Marble Temples & Palatial Fountains',
    template: '%s | A.F.G Marble & Arts',
  },
  description:
    'Four generations of Master Shilawats hand-chiseling pure 99.2% Makrana calcite marble pooja sanctums, palatial fountains, and Vastu-compliant temples since 1987. Certified zero yellowing guarantee. White-glove worldwide delivery.',
  keywords: [
    'Makrana marble mandir',
    'luxury home temple',
    'marble pooja mandir for villa',
    'pure Makrana calcite marble',
    'hand carved marble temple Jaipur',
    'palatial tiered fountain',
    'royal garden chhatri',
    'Pietra Dura marble inlay',
    'Ayadi Vastu temple architecture',
    'AFG Marble and Arts',
    'marble deity murtis',
    'Makrana marble manufacturer Rajasthan',
    'pure Taj Mahal marble',
  ],
  authors: [{ name: 'A.F.G Marble & Arts', url: 'https://afgmarbel.com' }],
  creator: 'A.F.G Marble & Arts',
  publisher: 'A.F.G Marble & Arts',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://afgmarbel.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/afg-logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/afg-logo-square.png',
  },
  openGraph: {
    title: 'A.F.G Marble & Arts — Consecrated Makrana Marble Temples & Palatial Fountains',
    description:
      'Purveyors of pure 99.2% Makrana calcite marble mandirs, royal chhatris, and palatial fountains since 1987. Certified zero porosity, zero yellowing.',
    url: 'https://afgmarbel.com',
    siteName: 'A.F.G Marble & Arts',
    locale: 'en_IN',
    alternateLocale: ['en_US', 'en_GB', 'en_AE'],
    type: 'website',
    images: [
      {
        url: 'https://afgmarbel.com/gallery/img_7237.webp',
        width: 1200,
        height: 630,
        alt: 'A.F.G Marble & Arts Masterpiece Consecrated Mandir',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A.F.G Marble & Arts — Consecrated Makrana Marble Temples',
    description:
      'Handcrafted Makrana pure calcite mandirs, palatial fountains, and Ayadi Vastu architecture since 1987. Zero yellowing guarantee.',
    images: ['https://afgmarbel.com/gallery/img_7237.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#1c1813',
  width: 'device-width',
  initialScale: 1,
};

// Rich JSON-LD Schemas for Traditional SEO & Generative AI Engines (GEO)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'HomeGoodsStore'],
  '@id': 'https://afgmarbel.com/#organization',
  name: 'A.F.G Marble & Arts',
  alternateName: ['AFG Marble', 'AFG Mandirs', 'AFG Marble And Arts'],
  url: 'https://afgmarbel.com',
  logo: 'https://afgmarbel.com/afg-logo.svg',
  image: 'https://afgmarbel.com/gallery/img_7237.webp',
  description:
    'Purveyors of generational hand-carved Makrana pure calcite marble mandirs, palatial estate fountains, and royal garden chhatris compliant with sacred Ayadi Sthapatya Veda since 1987.',
  telephone: '+917597417274',
  email: 'mh213702@gmail.com',
  priceRange: '$$$$',
  foundingDate: '1987',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Makrana Bypass Rd, Borawar, Gunawati Jageer',
      addressLocality: 'Makrana',
      addressRegion: 'Rajasthan',
      postalCode: '341502',
      addressCountry: 'IN',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.0434,
    longitude: 74.7268,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '20:30',
    },
  ],
  sameAs: [
    'https://wa.me/917597417274',
  ],
  knowsAbout: [
    'Makrana Calcite Pure White Marble (99.2% CaCO3)',
    'Ayadi Sthapatya Veda Temple Architecture',
    'Hand-Carved Home Mandirs & Garbhagrihas',
    'Palatial Cascading Fountains & Watercraft',
    'Pietra Dura Semi-Precious Lapidary Inlay',
    'Global ISPM-15 Crating & Turnkey International Installation',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://afgmarbel.com/#website',
  url: 'https://afgmarbel.com',
  name: 'A.F.G Marble & Arts',
  description: 'Official Digital Atelier Portal for Consecrated Makrana Marble Temples & Fountains',
  publisher: {
    '@id': 'https://afgmarbel.com/#organization',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes authentic Makrana marble superior for home mandirs and temples?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Genuine Makrana marble has a 99.2% pure calcium carbonate calcite crystalline structure with practically zero porosity (0.01%). It does not absorb milk, panchamrit, oil, or kumkum during daily abhishek, and comes with a lifetime guarantee against yellowing, unlike porous commercial Italian or dolomitic stones.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can an empty alcove or dedicated room be customized with Ayadi Vastu proportions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. A.F.G Marble & Arts' marble temple experts calculate auspicious Vastu measurements based on your room dimensions and family requirements, providing free 2D design drawings within 24 hours.",
      },
    },
    {
      '@type': 'Question',
      name: 'How are heavy marble mandirs and fountains shipped safely overseas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every commission is modularly dismantled into interlocking numbered sections, vacuum-sealed in moisture barriers, and secured inside ISPM-15 certified fumigated pine wood crates with 50mm EVA shock foam and tilt sensors. Over 40% of commissions are exported with a 100% zero-breakage record to the USA, UK, UAE, Canada, and Australia.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are the physical ateliers of A.F.G Marble & Arts located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Master Atelier, Pre-Assembly Fitment Yard, and Primary Works are located at Makrana Bypass Rd, Borawar, Gunawati Jageer, Rajasthan 341502, India. Direct concierge phone and WhatsApp: +91 7597417274.',
      },
    },
    {
      '@type': 'Question',
      name: 'What marble varieties are used by A.F.G Marble & Arts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The atelier crafts exclusively with three certified noble white marbles: 1) Makrana Pure White Marble (100% spotless virgin calcite for mandirs), 2) Vietnam Pure White Marble (99.6% spotless crystalline snow-white for sacred deities and contemporary sanctums), and 3) Rajnagar White Marble (high-density hydraulic calcite for palatial fountains).',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Marcellus&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />

        {/* Preload critical hero 3D model, texture, and backdrop for instant first render */}
        <link rel="preload" href="/models/mandir_premium_v4.glb" as="fetch" crossOrigin="anonymous" fetchPriority="high" />
        <link rel="preload" href="/textures/makrana.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/hero-palace-backdrop.jpg" as="image" fetchPriority="high" />

        {/* JSON-LD Schemas for Search Engines & AI Crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
