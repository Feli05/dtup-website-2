import "./globals.css";
import { Metadata } from "next";
import Providers from "@/components/Wrappers/Providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "De Todo Un Poco - Directorio de Negocios Locales en Costa Rica",
    template: "%s | De Todo Un Poco"
  },
  description: "Descubre los mejores negocios y servicios locales en Costa Rica. Directorio completo de emprendedores con más de 52,000 miembros. Encuentra moda, gastronomía, servicios profesionales y más.",
  keywords: [
    "negocios Costa Rica",
    "directorio empresarial",
    "emprendedores costarricenses", 
    "servicios locales",
    "pequeñas empresas",
    "comercio local",
    "moda Costa Rica",
    "gastronomía",
    "servicios profesionales",
    "DTUP",
    "De Todo Un Poco"
  ],
  authors: [{ name: "De Todo Un Poco" }],
  creator: "De Todo Un Poco",
  publisher: "De Todo Un Poco",
  metadataBase: new URL('https://detodounpoco.cr'),
  alternates: {
    canonical: '/',
    languages: {
      'es-CR': '/',
      'es': '/'
    }
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
  icons: {
    icon: [
      { url: "/DTUP-logo-RGB-01.png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }
    ]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: '/',
    title: 'De Todo Un Poco - Directorio de Negocios Locales en Costa Rica',
    description: 'Descubre los mejores negocios y servicios locales en Costa Rica. Directorio completo de emprendedores con más de 52,000 miembros.',
    siteName: 'De Todo Un Poco',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'De Todo Un Poco - Directorio de Negocios Locales'
      }
    ]
  },
  category: 'business',
  classification: 'Business Directory',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'DTUP',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#ffffff',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#ffffff'
  }
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "De Todo Un Poco",
              "alternateName": "DTUP",
              "url": "https://detodounpoco.cr",
              "logo": "https://detodounpoco.cr/DTUP-logo-RGB-01.png",
              "description": "Comunidad de emprendedores y directorio de negocios locales en Costa Rica con más de 52,000 miembros",
              "areaServed": {
                "@type": "Country",
                "name": "Costa Rica"
              },
              "memberOf": {
                "@type": "Organization",
                "name": "Emprendedores Costa Rica"
              },
              "slogan": "Conectando emprendedores, fortaleciendo comunidades"
            })
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
