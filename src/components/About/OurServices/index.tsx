"use client";

import { motion } from "framer-motion";
import type { ServiceItem } from "./types";
import { FIRST_ROW_SERVICES, SECOND_ROW_SERVICES } from "./constants";

const hoverTransition = { type: "spring", stiffness: 120, damping: 20, duration: 0.4 };

function ServiceCard({ svc }: { svc: ServiceItem }) {
  return (
    <motion.div
      className="flex-1 h-72 md:h-80 lg:h-96 cursor-pointer relative"
      whileHover={{ scale: 1.03 }}
      transition={hoverTransition}
    >
      <div className="w-full h-full overflow-hidden rounded-2xl shadow-lg relative">
        <motion.img
          src={svc.src}
          alt={svc.title}
          className="w-full h-full object-cover"
          transition={hoverTransition}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />

        {/* Text overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg md:text-xl font-playfair text-white mb-1">
            {svc.title}
          </h3>
          <p className="text-sm md:text-base text-white/90">
            {svc.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurServices() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-12 text-center">
        Nuestros Servicios
      </h2>

      {/* First Row */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {FIRST_ROW_SERVICES.map((svc, i) => (
          <ServiceCard key={i} svc={svc} />
        ))}
      </div>

      {/* Second Row */}
      <div className="flex flex-col md:flex-row gap-6">
        {SECOND_ROW_SERVICES.map((svc, i) => (
          <ServiceCard key={i} svc={svc} />
        ))}
      </div>
    </section>
  );
}