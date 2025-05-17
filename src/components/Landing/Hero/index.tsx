"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RoughNotation } from "react-rough-notation";

import { HERO_CONTENT, HIGHLIGHT_CONFIG, HERO_IMAGE } from "./constants";

const containerHover: Variants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

const imageHover: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

const titleHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5,
    },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // parallax scroll for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center py-10 md:py-20 overflow-hidden bg-dtup-beige"
    >
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-32 items-center">

        {/* — IMAGE WITH PARALLAX & HOVER — */}
        <motion.div
          className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg shadow-xl order-2 md:order-1"
          variants={containerHover}
          whileHover="hover"
        >
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <motion.div
              className="relative w-full h-full"
              variants={imageHover}
              whileHover="hover"
            >
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* — TEXT BLOCK — */}
        <div className="space-y-6 md:space-y-8 animate-fadeIn text-left order-1 md:order-2">
          <motion.h1
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight inline-block"
            variants={titleHover}
            initial="initial"
            whileHover="hover"
          >
            {HERO_CONTENT.title}
          </motion.h1>

          {/* description with highlight */}
          <p className="text-black font-playfair text-base md:text-lg leading-relaxed max-w-lg text-justify">
            <RoughNotation
              type="highlight"
              show
              color={HIGHLIGHT_CONFIG.color}
              strokeWidth={HIGHLIGHT_CONFIG.strokeWidth}
              animationDuration={HIGHLIGHT_CONFIG.animationDuration}
              iterations={HIGHLIGHT_CONFIG.iterations}
              animationDelay={HIGHLIGHT_CONFIG.animationDelay}
            >
              {HERO_CONTENT.highlightText}
            </RoughNotation>{" "}
            {HERO_CONTENT.description}
          </p>

          <div className="pt-2 md:pt-4">
            <Link
              href={HERO_CONTENT.ctaHref}
              className="elegant-button text-sm md:text-base"
            >
              {HERO_CONTENT.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
