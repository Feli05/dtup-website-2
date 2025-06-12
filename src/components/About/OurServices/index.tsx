import { memo } from "react";
import Image from "next/image";
import type { ServiceItem } from "./types";
import { FIRST_ROW_SERVICES, SECOND_ROW_SERVICES } from "./constants";

const ServiceCard = memo(function ServiceCard({ svc }: { svc: ServiceItem }) {
  return (
    <div className="flex-1 relative">
      <div className="w-full h-72 md:h-80 lg:h-96 overflow-hidden rounded-2xl shadow-lg relative">
        <Image
          src={svc.src}
          alt={svc.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          quality={75}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />

        {/* Text overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg md:text-xl font-playfair text-white mb-1">
            {svc.title}
          </h3>
          <p className="text-sm md:text-base text-white/90 leading-tight">
            {svc.description}
          </p>
        </div>
      </div>
    </div>
  );
});

export default function OurServices() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-12 text-center">
        Nuestros Servicios
      </h2>

      {/* First Row */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {FIRST_ROW_SERVICES.map((svc, i) => (
          <ServiceCard key={`first-${i}`} svc={svc} />
        ))}
      </div>

      {/* Second Row */}
      <div className="flex flex-col md:flex-row gap-6">
        {SECOND_ROW_SERVICES.map((svc, i) => (
          <ServiceCard key={`second-${i}`} svc={svc} />
        ))}
      </div>
    </section>
  );
}