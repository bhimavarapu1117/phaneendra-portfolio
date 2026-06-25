import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  life: number;
  maxLife: number;
};

/**
 * Smooth "magic" cursor — a small dot follows the pointer instantly while
 * a larger ring trails it with eased interpolation. Tiny sparkles trail behind
 * the cursor on movement. Theme-aware for visibility. Disabled on touch.
 */
const SmoothCursor = () => {
  const { resolvedTheme } = useTheme();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleIdRef = useRef(0);
  const lastSpawnRef = useRef(0);

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

      // Spawn sparkle trail
      const now = performance.now();
      if (now - lastSpawnRef.current > 35) {
        lastSpawnRef.current = now;
        const id = sparkleIdRef.current++;
        const size = Math.random() * 3 + 2;
        const rotation = Math.random() * 45;
        const offset = 8;
        const x = e.clientX + (Math.random() - 0.5) * offset;
        const y = e.clientY + (Math.random() - 0.5) * offset;
        const maxLife = Math.random() * 300 + 350;
        setSparkles((prev) => [...prev, { id, x, y, size, rotation, life: maxLife, maxLife }]);
      }
    };

    let raf = 0;
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;
      }

      setSparkles((prev) => {
        const updated = prev
          .map((s) => ({ ...s, life: s.life - 16 }))
          .filter((s) => s.life > 0);
        return updated.length === prev.length ? prev : updated;
      });

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
  const sparkleColor = isLight ? "#000" : "#fff";

  return (
    <>
      <style>{`html, body, *, *::before, *::after { cursor: none !important; }`}</style>
      {sparkles.map((s) => {
        const progress = s.life / s.maxLife;
        return (
          <div
            key={s.id}
            aria-hidden
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: s.size,
              height: s.size,
              background: sparkleColor,
              transform: `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%) rotate(${s.rotation}deg) scale(${progress})`,
              opacity: progress,
              pointerEvents: "none",
              zIndex: 2147483646,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
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
          borderRadius: "50%",
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
