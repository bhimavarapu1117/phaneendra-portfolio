import HeroSection from "@/components/HeroSection";
import HeroBackground from "@/components/HeroBackground";
import ScrollDebugOverlay from "@/components/ScrollDebugOverlay";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import SecretStuffSection from "@/components/SecretStuffSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative">
      <HeroBackground />
      <ScrollDebugOverlay />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TimelineSection />
      <SecretStuffSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
