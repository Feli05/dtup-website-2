import "./globals.css";
import { Metadata } from "next";
import Providers from "@/components/Wrappers/Providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "De Todo Un Poco",
  description: "DTUP Website CMS",
  icons: {
    icon: "/DTUP-logo-RGB-01.png"
  }
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
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
