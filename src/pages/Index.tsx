import HeroSection from "@/components/HeroSection";
import ScrollDebugOverlay from "@/components/ScrollDebugOverlay";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
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
      <ContactSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
};

export default Index;

