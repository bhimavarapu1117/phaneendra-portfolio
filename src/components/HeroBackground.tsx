import { useEffect, useRef, useState } from "react";
import videoAsset from "@/assets/hero-bg.mp4.asset.json";

const HeroBackground = () => {
  const [progress, setProgress] = useState(0); // 0 = fully visible, 1 = gone
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);

  // Lazy-load: only attach src when hero is near the viewport
  useEffect(() => {
    const check = () => {
      const vh = window.innerHeight || 1;
      // Load when within 1.5 viewports of the top (covers hero area)
      if (window.scrollY < vh * 1.5) {
        setShouldLoad(true);
      }
    };
    check();
    if (shouldLoad) return;
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [shouldLoad]);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight || 1;
      const scrubRange = vh * 2;
      const p = Math.min(1, Math.max(0, window.scrollY / scrubRange));
      setProgress(p);

      const v = videoRef.current;
      const d = durationRef.current;
      if (v && d > 0) {
        const t = Math.min(d - 0.05, p * d);
        if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t;
      }
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
  const scale = 1 - fade * 0.08;

  if (opacity <= 0.01) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      style={{ opacity, transform: `scale(${scale})`, transition: "transform 120ms linear" }}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          src={videoAsset.url}
          className="h-full w-full object-contain"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            durationRef.current = e.currentTarget.duration || 0;
          }}
        />
      )}
      
    </div>
  );
};

export default HeroBackground;
