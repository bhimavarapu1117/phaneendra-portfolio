import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Navbar from "./Navbar";
import ProjectCarousel from "./ProjectCarousel";
import VariableProximity from "./variable-proximity/VariableProximity";
import TiltedCard from "./tilted-card/TiltedCard";
// @ts-ignore - JSX module
import LineWaves from "./line-waves/LineWaves.jsx";
import phaneendraPhoto from "@/assets/tilted-photo.jpg.asset.json";


const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme !== "light";

  return (
    <section className={`relative min-h-screen w-full overflow-hidden ${isDark ? "bg-background" : "bg-transparent"}`}>
      {mounted && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <LineWaves
            speed={0.3}
            innerLineCount={32}
            outerLineCount={36}
            warpIntensity={1.0}
            rotation={-45}
            edgeFadeWidth={0.0}
            colorCycleSpeed={1.0}
            brightness={isDark ? 0.12 : 0.28}
            color1={isDark ? "#8B7AB8" : "#4B3F6B"}
            color2={isDark ? "#B497CF" : "#6D5B9A"}
            color3={isDark ? "#6D5B9A" : "#2a2440"}
            enableMouseInteraction={false}
            mouseInfluence={2.0}
          />
          {/* Readability scrim behind hero content */}
          <div
            className={
              isDark
                ? "absolute inset-0 bg-background/70"
                : "absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_0%_100%/0.75)_0%,hsl(0_0%_100%/0.4)_55%,transparent_100%)]"
            }
          />
        </div>
      )}
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
