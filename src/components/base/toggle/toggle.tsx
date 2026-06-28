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

  useEffect(() => {
    setMounted(true);
  }, []);

  const runToggleAnimation = useCallback(
    (nextTheme: "light" | "dark") => {
      const icon = iconRef.current;
      if (!icon) {
        setTheme(nextTheme);
        return;
      }

      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(icon, { rotate: 0, scale: 1 });
          setIsAnimating(false);
        },
      });

      gsap.set(icon, { rotate: 0, scale: 1 });

      // Squash and spin the icon
      tl.to(icon, { scale: 0.75, duration: 0.15, ease: "power2.in" }, 0);
      tl.to(icon, { rotate: 360, duration: 0.55, ease: "power4.out" }, 0);
      // Flip theme at the midpoint of the spin
      tl.call(() => setTheme(nextTheme), [], 0.28);
      // Pop back into place
      tl.to(icon, { scale: 1.15, duration: 0.15, ease: "power2.out" }, 0.5);
      tl.to(icon, { scale: 1, duration: 0.2, ease: "power2.out" }, 0.65);
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
        className="relative flex h-5 w-5 items-center justify-center will-change-transform"
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
  );
};

export default Toggle;
