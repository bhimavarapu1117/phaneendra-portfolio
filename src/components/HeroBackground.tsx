import { useEffect, useState } from "react";
import bgAsset from "@/assets/portrait-bg.webp.asset.json";

const HeroBackground = () => {
  const [progress, setProgress] = useState(0); // 0 = fully visible, 1 = gone

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight || 1;
      // Fade out across the first viewport height (hero is 100vh)
      const p = Math.min(1, Math.max(0, window.scrollY / vh));
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const opacity = 1 - progress;
  const scale = 1 - progress * 0.08; // subtle zoom-out

  // Hide entirely once faded to avoid pointer/paint cost
  if (opacity <= 0.01) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      style={{ opacity, transform: `scale(${scale})`, transition: "transform 120ms linear" }}
    >
      <img
        src={bgAsset.url}
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
      />
      {/* Subtle dark overlay so hero text stays readable */}
      <div className="absolute inset-0 bg-background/55" />
    </div>
  );
};

export default HeroBackground;
