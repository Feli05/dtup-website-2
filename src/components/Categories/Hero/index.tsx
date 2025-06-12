import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { HERO_IMAGES, HERO_CONTENT } from "./constants";
import type { HeroProps } from "./types";

export default function CategoriesHero({ categories, onSearch }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-dtup-beige">
      {/* Spacer div to push content down */}
      <div className="h-32"></div>
      
      {/* Hero content with min height */}
      <div className="relative min-h-[500px] mb-12">
        {/* Background decorative images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left image - top half */}
          <div className="absolute hidden md:block left-8 top-8 w-[350px] h-[350px] rounded-full overflow-hidden animate-fadeIn">
            <Image
              src={HERO_IMAGES[0].src}
              alt={HERO_IMAGES[0].alt}
              fill
              className="object-cover object-center"
              loading="lazy"
              sizes="350px"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Right image - bottom half, smaller */}
          <div className="absolute hidden md:block right-8 bottom-8 w-[275px] h-[275px] rounded-full overflow-hidden animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <Image
              src={HERO_IMAGES[1].src}
              alt={HERO_IMAGES[1].alt}
              fill
              className="object-cover object-center"
              loading="lazy"
              sizes="275px"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-4 text-black animate-fadeIn">
              {HERO_CONTENT.title}
            </h1>
            <p className="text-lg text-gray-700 mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              {HERO_CONTENT.description}
            </p>
          </div>

          <div className="max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <SearchBar categories={categories} onSearch={onSearch} />
          </div>
        </div>
      </div>
      
      {/* Thick gray separator */}
      <div className="w-full h-8 bg-dtup-highlight"></div>
    </section>
  );
} 