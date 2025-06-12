import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, LOGO } from "./constants";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="bg-dtup-beige text-black pt-16 font-playfair w-full">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16">
          {/* Logo */}
          <div className="flex flex-col">
            <div className="w-44 h-32 relative">
              <Image
                src={LOGO.src}
                alt={LOGO.alt}
                fill
                style={{ objectFit: "contain", objectPosition: "left" }}
                sizes="176px"
                loading="lazy"
              />
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((column, index) => (
            <div key={column.heading}>
              <h3 className="font-medium uppercase tracking-wider mb-4 text-xl">
                {column.heading}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-lg hover:underline transition-all flex items-center gap-2"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {index === 0 && link.label === "Facebook" && <FacebookIcon className="w-5 h-5" />}
                      {index === 0 && link.label === "Instagram" && <InstagramIcon className="w-5 h-5" />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
