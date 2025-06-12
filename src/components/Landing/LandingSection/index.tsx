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
      <div className="absolute bottom-6 left-6 md:bottom-6 md:left-24 z-10">
        <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px]">
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={1020}
            height={1020}
            priority
            quality={75}
            sizes="(max-width: 640px) 300px, (max-width: 768px) 350px, 400px"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}