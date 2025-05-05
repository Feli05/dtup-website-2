"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Service, ServicesData } from "./types";
import { fetchServices } from "./constants";

// slide animation presets
const slideVariants = {
  left:  { initial: { x: "0%"   }, animate: { x: "-50%" } },
  right: { initial: { x: "-50%" }, animate: { x: "0%"   } },
};

interface SlideProps {
  services: Service[];
  direction: "left" | "right";
}

function Slide({ services, direction }: SlideProps) {
  const { initial, animate } = slideVariants[direction];
  // repeat 6× for infinite scroll
  const repeated = Array(6).fill(services).flat();

  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={initial}
        animate={animate}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 75, ease: "linear" },
        }}
        className="flex whitespace-nowrap"
        style={{ width: "fit-content" }}
      >
        {repeated.map((svc, idx) => (
          <div
            key={idx}
            className={`
              flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px]
              mx-4 sm:mx-6 md:mx-10
              p-4 sm:p-6 md:p-8 rounded-full ${svc.bgColor}
              flex flex-col justify-center items-center text-center
              shadow-sm border border-gray-100 hover:shadow-md transition-shadow
            `}
          >
            <h3 className="text-xl sm:text-2xl font-playfair mb-2">
              {svc.title}
            </h3>
            <p className="text-xs sm:text-sm text-black">
              {svc.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** Main Services Slider */
export const Services = () => {
  const [data, setData] = useState<ServicesData>({ row1: [], row2: [] });
  const router = useRouter();

  useEffect(() => {
    fetchServices().then(setData);
  }, []);

  return (
    <section className="min-h-[50vh] overflow-hidden bg-[#FFF8E7] transition-colors duration-1000">
      <div className="py-4 pb-16 sm:py-6 sm:pb-24 md:py-8 md:pb-32">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair mb-6 sm:mb-8 md:mb-12 text-center">
          Comunidad
        </h2>

        {/* Row 1 */}
        <div className="relative overflow-hidden mb-4 sm:mb-6 md:mb-8">
          <Slide services={data.row1} direction="left" />
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden mb-4 sm:mb-6 md:mb-8">
          <Slide services={data.row2} direction="right" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-10 md:mt-12 text-center"
        >
          <button
            className="elegant-button"
            onClick={() => router.push("/comunidad")}
          >
            VER CATÁLOGO
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
