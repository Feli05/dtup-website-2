"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EVENTS } from "./constants";
import type { YearBlock } from "./types";
import useMobile from "@/hooks/useMobile";

export default function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  // Parallax header y-offset with fixed position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  
  const headerY = useTransform(scrollYProgress, 
    [0, 0.15, 0.5], 
    ["50%", "0%", "0%"]
  );

  return (
    <section
      ref={containerRef}
      className="relative text-white transition-colors duration-1000 bg-dtup-dark"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-36 gap-x-8 min-h-screen">

          <motion.div
            className={`md:col-span-4 relative md:sticky ${!isMobile && 'top-32'} h-fit mt-0 md:mt-32`}
            style={!isMobile ? { y: headerY } : undefined}
          >
            <h2 className="font-playfair text-6xl md:text-7xl lg:text-[5.4rem] leading-tight">
              Nuestros <br />eventos
            </h2>
          </motion.div>

          {/* Content */}
          <div className="md:col-span-8 space-y-12 py-24">
            {EVENTS.map((block: YearBlock) => (
              <div key={block.year}>
                <h3 className="flex items-center text-2xl md:text-3xl lg:text-[2.175rem] mb-4 font-markazi">
                  {block.year}
                  <span className="flex-grow border-t border-gray-500 mx-4" />
                </h3>
                <div className="space-y-8">
                  {block.items.map((item, i) => (
                    <div key={i}>
                      <h4 className="text-xl md:text-2xl lg:text-[1.5625rem] font-playfair mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 italic">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}