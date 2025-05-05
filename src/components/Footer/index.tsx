"use client";

import Image from "next/image";
import { HoverLink } from "@/components/ui/HoverLink";
import { LinkSection } from "@/components/ui/LinkSection";
import {
  CTA_LINKS,
  SOCIAL_LINKS,
  SITEMAP_LINKS,
  CREDIT_LINKS,
} from "./constants";

export function Footer() {
  return (
    <footer className="bg-[#FFF8E7] text-black pt-16 font-playfair w-full">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 gap-y-12 mb-16">

          {/* CTA */}
          <div>
            <h2 className="text-4xl mb-4">¡Colaboremos!</h2>
            {CTA_LINKS.map(({ to, text }) => (
              <HoverLink
                key={to}
                href={to}
                className="inline-flex items-center border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
              >
                {text}
              </HoverLink>
            ))}
          </div>

          {/* Social */}
          <LinkSection title="Redes" links={SOCIAL_LINKS} external />

          {/* Sitemap */}
          <LinkSection title="Navegación" links={SITEMAP_LINKS} />

          {/* Credits */}
          <LinkSection title="Diseñado por:" links={CREDIT_LINKS} external />
        </div>

        {/* Full-width logo */}
        <div className="-mx-4 md:-mx-6">
          <Image
            src="/DTUP-logo-RGB-01.png"
            alt="DTUP Logo"
            width={1200}
            height={400}
            className="w-full"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
