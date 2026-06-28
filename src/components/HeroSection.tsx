import { useRef } from "react";
import Navbar from "./Navbar";
import ProjectCarousel from "./ProjectCarousel";
import VariableProximity from "./variable-proximity/VariableProximity";
import TiltedCard from "./tilted-card/TiltedCard";
import phaneendraPhoto from "@/assets/tilted-photo.jpg.asset.json";


const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);


  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent">
      <Navbar />

      <div
        ref={containerRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-16 pt-32 md:pt-28 pb-24"
      >
        <div className="mb-8 md:mb-10">
          <TiltedCard
            imageSrc={phaneendraPhoto.url}
            altText="Phaneendra Reddy"
            captionText="Phaneendra Reddy"
            containerHeight="200px"
            containerWidth="200px"
            imageHeight="200px"
            imageWidth="200px"
            rotateAmplitude={14}
            scaleOnHover={1.08}
            showMobileWarning={false}
            showTooltip
          />
        </div>

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
