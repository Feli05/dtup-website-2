import "./globals.css";
import { Metadata } from "next";
import Providers from "@/components/Wrappers/Providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FontOptimization from "@/components/FontOptimization";
import { playfairDisplay, markaziText, inter } from "@/lib/fonts";

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
    icon: "/DTUP-logo-RGB-01.png",
    apple: "/DTUP-logo-RGB-01.png"
  },
  //manifest: "/site.webmanifest",
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: '/',
    title: 'De Todo Un Poco - Directorio de Negocios Locales en Costa Rica',
    description: 'Descubre los mejores negocios y servicios locales en Costa Rica. Directorio completo de emprendedores con más de 52,000 miembros.',
    siteName: 'De Todo Un Poco',
    images: [
      {
        url: '/DTUP-logo-RGB-01.png',
        width: 800,
        height: 800,
        alt: 'De Todo Un Poco - Directorio de Negocios Locales'
      }
    ]
  },
  category: 'business',
  classification: 'Business Directory',
  other: {
    'theme-color': '#ffffff'
  }
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfairDisplay.variable} ${markaziText.variable} ${inter.variable}`}>
      <head>
        <FontOptimization />
        
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
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={playfairDisplay.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
