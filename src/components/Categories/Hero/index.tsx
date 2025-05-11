"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { HERO_IMAGES, HERO_CONTENT } from "./constants";
import type { HeroProps } from "./types";
import useMobile from "@/hooks/useMobile";

export default function CategoriesHero({ categories }: HeroProps) {
  const isMobile = useMobile();
  
  const handleSearch = (query: string, category?: string) => {
    // This is just a UI placeholder - actual implementation will be added later
    console.log("Search:", query, "Category:", category);
    alert(`Búsqueda: ${query} - Categoría: ${category || 'Todas'}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-dtup-beige">
      {/* Spacer div to push content down */}
      <div className="h-32"></div>
      
      {/* Hero content with min height */}
      <div className="relative min-h-[500px] mb-12">
        {/* Background decorative images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left image - top half */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute ${isMobile ? 'hidden' : 'left-8 top-8 w-[350px] h-[350px]'} rounded-full overflow-hidden`}
          >
            <Image
              src={HERO_IMAGES[0].src}
              alt={HERO_IMAGES[0].alt}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>

          {/* Right image - bottom half, smaller */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className={`absolute ${isMobile ? 'hidden' : 'right-8 bottom-8 w-[275px] h-[275px]'} rounded-full overflow-hidden`}
          >
            <Image
              src={HERO_IMAGES[1].src}
              alt={HERO_IMAGES[1].alt}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-4 text-black"
            >
              {HERO_CONTENT.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-700 mx-auto"
            >
              {HERO_CONTENT.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <SearchBar categories={categories} onSearch={handleSearch} />
          </motion.div>
        </div>
      </div>
      
      {/* Thick gray separator */}
      <div className="w-full h-8 bg-dtup-highlight"></div>
    </section>
  );
}; 