import '../style.css';
import '../premium.css';
import '../security.css';
import LayoutClientWrapper from './LayoutClientWrapper';

export const metadata = {
  title: 'A.F.G Marble & Arts — Handcrafted Makrana Marble Mandirs & Palatial Fountains',
  description:
    'Purveyors of pure 99% Makrana calcite marble pooja sanctums, palatial fountains, and bespoke architectural temple carvings since 1987. Zero yellowing guarantee.',
  keywords:
    'Makrana marble mandir, luxury temple for home, marble temple manufacturer, palatial fountain, marble carving Jaipur, Makrana white marble, AFG Marble',
  authors: [{ name: 'A.F.G Marble & Arts' }],
  metadataBase: new URL('https://afgmarbel.com'),
  icons: {
    icon: '/favicon.svg',
    apple: '/afg-logo.jpeg'
  },
  openGraph: {
    title: 'A.F.G Marble & Arts — Handcrafted Makrana Marble Mandirs & Palatial Fountains',
    description:
      'Purveyors of pure 99% Makrana calcite marble pooja sanctums, palatial fountains, and bespoke architectural temple carvings since 1987.',
    url: 'https://afgmarbel.com',
    siteName: 'A.F.G Marble & Arts',
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
      </head>
      <body suppressHydrationWarning>
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
