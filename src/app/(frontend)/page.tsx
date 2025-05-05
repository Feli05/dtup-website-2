import { LandingSection } from "@/components/Landing/LandingSection";
import { Hero } from "@/components/Landing/Hero";
import { Services } from "@/components/Landing/Services";
import { EventsSection } from "@/components/Landing/EventsSection";

export default function IndexPage() {
  return (
    <main className="relative">
      <LandingSection />
      <Hero />
      <Services />
      <EventsSection />
    </main>
  );
}
