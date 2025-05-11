"use client";

import Image from "next/image";
import { VIDEO_SRC, VIDEO_ATTRIBUTION, LOGO } from "./constants";

export default function LandingSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <p className="text-white text-right absolute bottom-0 left-0 right-0 p-4 font-sans">
          {VIDEO_ATTRIBUTION}
        </p>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 md:inset-auto md:bottom-12 md:left-24 p-6 md:p-0 flex md:block items-end z-10">
        <div className="w-full md:w-auto">
          <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-none md:w-[1020px]">
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};