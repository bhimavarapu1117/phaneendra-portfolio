import { useEffect, useState } from "react";

const HeroBackground = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight || 1;
      const scrubRange = vh * 2;
      const p = Math.min(1, Math.max(0, window.scrollY / scrubRange));
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

  const fade = Math.max(0, (progress - 0.6) / 0.4);
  const opacity = 1 - fade;

  if (opacity <= 0.01) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black"
      style={{ opacity, transition: "opacity 120ms linear" }}
    />
  );
};

export default HeroBackground;
