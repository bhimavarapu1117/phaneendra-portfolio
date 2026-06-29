import { lazy, Suspense, useEffect, useState } from "react";

// Lazy-load the heavy WebGL background so it doesn't block first paint
// and so the main thread stays responsive while the rest of the app hydrates.
// @ts-ignore - JSX module
const PixelBlast = lazy(() => import("./pixel-blast/PixelBlast.jsx"));

const PixelBlastBackground = () => {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const [shouldRender, setShouldRender] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Detect low-power / touch devices and skip the expensive shader there.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = (navigator as any).hardwareConcurrency || 8;
    setIsLowPower(coarse || reduced || cores <= 4);

    // Defer mounting until after first paint so initial load isn't blocked.
    const idle = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined;
    const handle = idle
      ? idle(() => setShouldRender(true), { timeout: 1200 })
      : window.setTimeout(() => setShouldRender(true), 400);

    return () => {
      obs.disconnect();
      if (idle && (window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(handle);
      } else {
        clearTimeout(handle as number);
      }
    };
  }, []);

  const bg = isDark ? "#0a0a0a" : "#fafafa";

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
        background: bg,
      }}
    >
      {shouldRender && !isLowPower && (
        <Suspense fallback={null}>
          <PixelBlast
            variant="circle"
            pixelSize={8}
            color={isDark ? "#B497CF" : "#4B3F6B"}
            patternScale={3}
            patternDensity={1}
            pixelSizeJitter={0.4}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.2}
            speed={0.5}
            edgeFade={0.25}
            transparent
          />
        </Suspense>
      )}
    </div>
  );
};

export default PixelBlastBackground;
