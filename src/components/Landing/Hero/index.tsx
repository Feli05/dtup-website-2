"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoughNotation } from "react-rough-notation";

import { HERO_CONTENT, HIGHLIGHT_CONFIG, HERO_IMAGE } from "./constants";

const Hero = memo(function Hero() {
  return (
    <section className="relative min-h-screen flex items-center py-10 md:py-20 overflow-hidden bg-dtup-beige">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-32 items-center">

        {/* Image Section */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg shadow-xl order-2 md:order-1">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Text Block */}
        <div className="space-y-6 md:space-y-8 text-left order-1 md:order-2">
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            {HERO_CONTENT.title}
          </h1>

          {/* Description with highlight */}
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
});

export default Hero;
