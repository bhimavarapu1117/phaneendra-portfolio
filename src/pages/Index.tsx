import HeroSection from "@/components/HeroSection";
import ScrollDebugOverlay from "@/components/ScrollDebugOverlay";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import ResumeSection from "@/components/ResumeSection";

import ContactSection from "@/components/ContactSection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative">
      <ScrollDebugOverlay />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TimelineSection />
      <ResumeSection />

      <ContactSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
};

export default Index;

