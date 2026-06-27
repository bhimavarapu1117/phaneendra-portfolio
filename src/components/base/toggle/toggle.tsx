import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

export type ToggleProps = {
  className?: string;
};

export const Toggle = ({ className }: ToggleProps) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runToggleAnimation = useCallback(
    (nextTheme: "light" | "dark") => {
      const layers = layersRef.current?.querySelectorAll<HTMLElement>(".theme-layer");
      const icon = iconRef.current;
      if (!layers || !icon || layers.length === 0) {
        setTheme(nextTheme);
        return;
      }

      setIsAnimating(true);

      // Capture current colors so they don't shift mid-animation
      const styles = getComputedStyle(document.documentElement);
      const primary = `hsl(${styles.getPropertyValue("--primary").trim()})`;
      const muted = `hsl(${styles.getPropertyValue("--muted").trim()})`;
      const secondary = `hsl(${styles.getPropertyValue("--secondary").trim()})`;
      const colorStack = [primary, secondary, muted];

      layers.forEach((layer, i) => {
        layer.style.background = colorStack[i % colorStack.length];
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(layers, { xPercent: 100, opacity: 1 });
          gsap.set(icon, { rotate: 0 });
          setIsAnimating(false);
        },
      });

      gsap.set(layers, { xPercent: 100 });
      gsap.set(icon, { rotate: 0 });

      // Staggered pre-layers slide in from right (like StaggeredMenu)
      tl.to(layers, {
        xPercent: 0,
        duration: 0.5,
        ease: "power4.out",
        stagger: 0.08,
      });

      // Icon spins while panels sweep across
      tl.to(
        icon,
        { rotate: 180, duration: 0.6, ease: "power4.out" },
        0.1
      );

      // Switch theme at the peak of the sweep
      tl.call(() => setTheme(nextTheme), [], 0.45);

      // Layers sweep off to the left
      tl.to(
        layers,
        {
          xPercent: -100,
          duration: 0.4,
          ease: "power3.in",
          stagger: 0.05,
        },
        0.55
      );
    },
    [setTheme]
  );

  const handleClick = () => {
    if (isAnimating) return;
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    runToggleAnimation(nextTheme);
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative z-[60] flex h-10 w-10 items-center justify-center",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isAnimating}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "relative z-[60] flex h-10 w-10 items-center justify-center overflow-hidden text-foreground transition-colors hover:bg-muted/20 disabled:opacity-70",
          className
        )}
      >
        <span
          ref={iconRef}
          className="relative flex h-5 w-5 items-center justify-center"
          aria-hidden="true"
        >
          <Sun
            size={18}
            className={cn(
              "absolute transition-opacity duration-200",
              isDark ? "opacity-100" : "opacity-0"
            )}
          />
          <Moon
            size={18}
            className={cn(
              "absolute transition-opacity duration-200",
              isDark ? "opacity-0" : "opacity-100"
            )}
          />
        </span>
      </button>

      {/* Sweeping pre-layers, StaggeredMenu-style */}
      <div
        ref={layersRef}
        className="fixed inset-0 z-[55] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="theme-layer absolute inset-0" />
        <div className="theme-layer absolute inset-0" />
        <div className="theme-layer absolute inset-0" />
      </div>
    </>
  );
};

export default Toggle;
