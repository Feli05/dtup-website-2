"use client";

import AboutIntro from "@/components/About/Introduction";
import MissionVision from "@/components/About/MissionAndVision";
import Services from "@/components/About/OurServices";
import Statistics from "@/components/About/Statistics";
import useSectionBackground from "@/hooks/useSectionBackground";

export default function AboutPage() {
  // Change body bg color based on which section is in view
  useSectionBackground([
    { id: "about-intro",  color: "#A9BFA8" },
    { id: "services",     color: "#FAFFC5" },
    { id: "statistics",   color: "#1a1a1a" },
  ]);

  return (
    <>
      <section id="about-intro" className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-5">
          <AboutIntro />
          <MissionVision />
        </div>
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="statistics">
        <Statistics />
      </section>
    </>
  );
}
