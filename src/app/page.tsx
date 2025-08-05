import { Navigation } from "@/components/layout/navigation";
import { HeroSectionWithSpline } from "@/components/sections/hero-section-with-spline";
import { ServicesSection } from "@/components/sections/services-section";
import { D8sEcosystemSection } from "@/components/sections/d8s-ecosystem-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSectionWithSpline />
        <ServicesSection />
        <D8sEcosystemSection />
      </main>
    </div>
  );
}