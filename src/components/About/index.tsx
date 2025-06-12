import AboutIntro from "@/components/About/Introduction";
import MissionVision from "@/components/About/MissionAndVision";
import Services from "@/components/About/OurServices";
import Statistics from "@/components/About/Statistics";
import { WaveSeparator1, WaveSeparator2 } from "@/components/ui/icons";

export default function About() {
  return (
    <div className="relative w-full">
      <section 
        id="about-intro" 
        className="min-h-screen flex flex-col relative bg-dtup-about-intro"
      >
        <div className="container mx-auto px-4 py-5 relative z-10">
          <AboutIntro />
          <MissionVision />
        </div>
        
        <WaveSeparator1 fillColor="#779CB2" />
      </section>

      <section 
        id="services" 
        className="relative bg-dtup-about-services"
      >
        <div className="relative z-10">
          <Services />
        </div>
        
        <WaveSeparator2 fillColor="#1E293B" />
      </section>

      <section 
        id="statistics" 
        className="relative bg-dtup-about-statistics"
      >
        <div className="relative z-10">
          <Statistics />
        </div>
      </section>
    </div>
  );
} 