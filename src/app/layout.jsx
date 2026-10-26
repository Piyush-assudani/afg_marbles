import '../style.css';
import '../premium.css';
import '../security.css';
import LayoutClientWrapper from './LayoutClientWrapper';

export const metadata = {
  title: 'A.F.G Marble And Art — Crafting Divine Spaces In Marble | Makrana Mandirs',
  description:
    'Purveyors of pure 99% Makrana calcite marble pooja sanctums, palatial fountains, and bespoke architectural temple carvings since 1987. Zero yellowing guarantee.',
  keywords:
    'Makrana marble mandir, luxury temple for home, marble temple manufacturer, palatial fountain, marble carving Jaipur, Makrana white marble, AFG Marble And Art',
  authors: [{ name: 'A.F.G Marble And Art' }],
  metadataBase: new URL('https://afgmarbel.com'),
  icons: {
    icon: '/afg-logo.svg',
    apple: '/afg-logo.png'
  },
  openGraph: {
    title: 'A.F.G Marble And Art — Crafting Divine Spaces In Marble',
    description:
      'Purveyors of pure 99% Makrana calcite marble pooja sanctums, palatial fountains, and bespoke architectural temple carvings since 1987.',
    url: 'https://afgmarbel.com',
    siteName: 'A.F.G Marble And Art',
    images: [
      {
        url: '/gallery/mandir-pure-makrana.webp',
        width: 1200,
        height: 630,
        alt: 'A.F.G Marble & Arts Masterpiece Temple'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
};

export const viewport = {
  themeColor: '#f7f3ec',
  width: 'device-width',
  initialScale: 1
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
        <link rel="preload" href="/models/mandir_premium_v4.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/textures/makrana.jpg" as="image" />
        <link rel="preload" href="/hero-palace-backdrop.jpg" as="image" />
      </head>
      <body suppressHydrationWarning>
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
