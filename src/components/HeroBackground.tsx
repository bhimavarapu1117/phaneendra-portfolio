import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import videoAsset from "@/assets/hero-bg.mp4.asset.json";

const HeroBackground = () => {
  const { resolvedTheme } = useTheme();
  const [progress, setProgress] = useState(0); // 0 = fully visible, 1 = gone
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);
  const aboutTopRef = useRef(0);
  const isLight = resolvedTheme === "light";

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
    const about = document.getElementById("about");
    const update = () => {
      const vh = window.innerHeight || 1;
      // Use the top of the About section as the full-playback point so the
      // intro video finishes right as the About images come on screen.
      const scrubRange = aboutTopRef.current || about?.offsetTop || vh;
      const p = Math.min(1, Math.max(0, window.scrollY / scrubRange));
      setProgress(p);

      const v = videoRef.current;
      const d = durationRef.current;
      if (v && d > 0) {
        const t = Math.min(d - 0.02, p * d);
        if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t;
      }
    };

    const measure = () => {
      const about = document.getElementById("about");
      aboutTopRef.current = about?.offsetTop || window.innerHeight || 1;
      update();
    };

    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
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
          className={cn(
            // contain everywhere so the full video plays without cropping on any device
            "h-full w-full object-contain transition-[filter,opacity] duration-300",
            isLight && "mix-blend-multiply brightness-125 contrast-110"
          )}
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

