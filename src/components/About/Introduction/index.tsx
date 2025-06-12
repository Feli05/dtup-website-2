import { memo } from "react";
import Image from "next/image";
import { ABOUT_INTRO } from "./constants";

const AboutIntro = memo(function AboutIntro() {
  return (
    <>
      {/* Title section */}
      <div className="max-w-6xl mx-auto mt-36 mb-16 md:mb-24">
        <h1 className="mt-36 sm:mt-12 md:mt-12 text-4xl md:text-5xl lg:text-6xl font-playfair text-black mb-8 md:mb-12 text-center">
          {ABOUT_INTRO.title}
        </h1>
        <p className="text-black font-playfair text-base md:text-lg leading-relaxed max-w-4xl mx-auto text-justify">
          {ABOUT_INTRO.description}
        </p>
      </div>

      {/* Image section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-24 md:mb-32 overflow-hidden rounded-lg shadow-xl mx-auto max-w-5xl">
        <Image
          src={ABOUT_INTRO.imagePath}
          alt={ABOUT_INTRO.title}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      </div>
    </>
  );
});

export default AboutIntro;