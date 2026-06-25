import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Smooth "magic" cursor — a small dot follows the pointer instantly while
 * a larger ring trails it with eased interpolation. Theme-aware: inverts
 * colors between light and dark mode for visibility. Disabled on touch.
 */
const SmoothCursor = () => {
  const { resolvedTheme } = useTheme();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

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
      const interactive = !!el?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]');
      setHovering(interactive);
    };

    let raf = 0;
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [hovering]);

  if (!enabled) return null;

  const isLight = resolvedTheme === "light";
  const dotColor = isLight ? "#000" : "#fff";
  const ringColor = isLight ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.6)";
  const ringBg = hovering ? (isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)") : "transparent";

  return (
    <>
      <style>{`html, body, *, *::before, *::after { cursor: none !important; }`}</style>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: `1.5px solid ${ringColor}`,
          background: ringBg,
          pointerEvents: "none",
          zIndex: 2147483647,
          transition: "background-color 150ms ease, border-color 200ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          background: dotColor,
          pointerEvents: "none",
          zIndex: 2147483647,
          willChange: "transform",
          boxShadow: isLight ? "0 0 0 1px rgba(255,255,255,0.6)" : "0 0 0 1px rgba(0,0,0,0.6)",
        }}
      />
    </>
  );
};

export default SmoothCursor;
