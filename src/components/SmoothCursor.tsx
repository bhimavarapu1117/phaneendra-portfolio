import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Liquid Glass cursor — Apple-inspired circular cursor with frosted
 * backdrop blur, soft refraction highlight, and smooth eased motion.
 * Over text/interactive elements, it expands into a wider pill-shaped
 * glass capsule for a tactile, premium feel. Disabled on touch devices.
 */
const SmoothCursor = () => {
  const { resolvedTheme } = useTheme();
  const glassRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "text" | "interactive">("idle");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest(
        'a, button, [role="button"], input[type="button"], input[type="submit"], select, [data-cursor="hover"]'
      );
      const textual = !interactive && !!el?.closest(
        'p, h1, h2, h3, h4, h5, h6, span, li, blockquote, label, input[type="text"], input[type="email"], input:not([type]), textarea, [data-cursor="text"]'
      );
      setMode(interactive ? "interactive" : textual ? "text" : "idle");
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      if (glassRef.current) {
        glassRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const isLight = resolvedTheme === "light";

  // Size & shape per mode
  const sizes =
    mode === "interactive"
      ? { w: 56, h: 56, r: 28 }
      : mode === "text"
      ? { w: 6, h: 28, r: 3 }
      : { w: 30, h: 30, r: 15 };

  const scale = pressed ? 0.88 : 1;

  const glassBg = isLight
    ? "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.22))"
    : "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))";
  const glassBorder = isLight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.22)";
  const glassShadow = isLight
    ? "0 6px 20px -6px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)"
    : "0 8px 24px -6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.35)";
  const dotColor = isLight ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)";
  const showDot = mode !== "text";

  return (
    <>
      <style>{`html, body, *, *::before, *::after { cursor: none !important; }`}</style>
      <div
        ref={glassRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: sizes.w,
          height: sizes.h,
          borderRadius: sizes.r,
          background: glassBg,
          border: `1px solid ${glassBorder}`,
          boxShadow: glassShadow,
          backdropFilter: "blur(10px) saturate(180%)",
          WebkitBackdropFilter: "blur(10px) saturate(180%)",
          pointerEvents: "none",
          zIndex: 2147483647,
          willChange: "transform, width, height, border-radius",
          transition:
            "width 260ms cubic-bezier(.22,1,.36,1), height 260ms cubic-bezier(.22,1,.36,1), border-radius 260ms cubic-bezier(.22,1,.36,1), background 200ms ease, box-shadow 200ms ease",
          transformOrigin: "center",
        }}
      >
        {/* Inner highlight for refraction feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background:
              "radial-gradient(60% 50% at 30% 25%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%)",
            opacity: isLight ? 0.9 : 0.5,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "45%",
            borderRadius: "inherit",
            background:
              "radial-gradient(70% 100% at 70% 100%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)",
            opacity: isLight ? 0.6 : 0.4,
            pointerEvents: "none",
          }}
        />
        {/* Press scale wrapper via outer transform combine */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${scale})`,
            transition: "transform 140ms ease",
            borderRadius: "inherit",
          }}
        />
      </div>
      {showDot && (
        <div
          ref={dotRef}
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: dotColor,
            pointerEvents: "none",
            zIndex: 2147483647,
            willChange: "transform",
            opacity: mode === "interactive" ? 0 : 1,
            transition: "opacity 180ms ease",
          }}
        />
      )}
    </>
  );
};

export default SmoothCursor;
