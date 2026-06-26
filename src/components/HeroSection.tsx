import { useRef } from "react";
import Navbar from "./Navbar";
import ProjectCarousel from "./ProjectCarousel";
import VariableProximity from "./variable-proximity/VariableProximity";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative h-screen w-full overflow-hidden bg-transparent">
      <Navbar />

      <div
        ref={containerRef}
        className="relative z-10 h-full flex items-center justify-center px-6 md:px-16 pt-24 pb-32 md:pb-40"
      >
        <VariableProximity
          label={"Designing experiences that move people."}
          className="text-foreground text-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight max-w-5xl"
          fromFontVariationSettings="'wght' 300, 'opsz' 14"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={140}
          falloff="gaussian"
        />
      </div>

      <ProjectCarousel />
    </section>
  );
};

export default HeroSection;
