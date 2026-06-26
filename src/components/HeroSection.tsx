import { useRef } from "react";
import Navbar from "./Navbar";
import ProjectCarousel from "./ProjectCarousel";
import VariableProximity from "./variable-proximity/VariableProximity";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    const about = document.getElementById("about");
    if (about) about.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-transparent">
      <Navbar />

      <div
        ref={containerRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-16 pt-24 pb-24"
      >
        <h1 className="max-w-6xl text-center">
          <VariableProximity
            label={"Design experiences people actually feel."}
            className="text-foreground text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight"
            fromFontVariationSettings="'wght' 400, 'opsz' 14"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={140}
            falloff="gaussian"
          />
        </h1>

        <p className="mt-8 text-center text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A beautiful journey starts with a quiet note.
          <br />
          Great design always <span className="text-primary font-medium">speaks.</span>
        </p>

      </div>

      <ProjectCarousel />
    </section>
  );
};

export default HeroSection;
