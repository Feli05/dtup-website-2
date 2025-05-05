"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ABOUT_INTRO } from "./constants";

// Variants for text reveal animations
const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

export function AboutIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll for image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "30%"]);

  return (
    <>
      {/* Title section */}
      <motion.div
        className="max-w-6xl mx-auto mt-36 mb-16 md:mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textRevealVariants}
        custom={0}
      >
        <h1 className="mt-36 sm:mt-12 md:mt-12 text-4xl md:text-5xl lg:text-6xl font-playfair text-black mb-8 md:mb-12 text-center">
          {ABOUT_INTRO.title}
        </h1>
        <p className="text-black font-playfair text-base md:text-lg leading-relaxed max-w-4xl mx-auto text-justify">
          {ABOUT_INTRO.description}
        </p>
      </motion.div>

      {/* Image section */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-24 md:mb-32 overflow-hidden rounded-lg shadow-xl mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <div className="relative w-full h-[120%] -top-[10%]">
            <Image
              src={ABOUT_INTRO.imagePath}
              alt={ABOUT_INTRO.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default AboutIntro;
