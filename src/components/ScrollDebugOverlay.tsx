import { useEffect, useRef, useState } from "react";

const ScrollDebugOverlay = () => {
  const [enabled, setEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFiring, setIsFiring] = useState(false);
  const lastLog = useRef(0);

  useEffect(() => {
    setEnabled(window.location.search.includes("debug=scroll"));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const update = () => {
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / vh));
      const firing = p > 0 && p < 1;

      setProgress(p);
      setIsFiring(firing);

      const now = performance.now();
      if (now - lastLog.current > 200) {
        lastLog.current = now;
        console.log(
          `%c[ScrollDebug]%c progress: ${p.toFixed(3)} | firing: ${firing}`,
          "color: #3B82F6; font-weight: bold;",
          "color: inherit;"
        );
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed top-4 left-4 z-[100] border border-border bg-background/90 p-3 font-mono text-xs text-foreground shadow-lg pointer-events-none">
      <div className="font-bold text-primary uppercase tracking-wider">Scroll Debug</div>
      <div className="mt-1">Progress: {progress.toFixed(3)}</div>
      <div className="mt-1">
        Status:{" "}
        {isFiring ? (
          <span className="font-semibold text-primary">FIRING</span>
        ) : (
          <span className="text-muted-foreground">IDLE</span>
        )}
      </div>
      <div className="mt-2 h-1 w-32 bg-border">
        <div
          className="h-full bg-primary"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ScrollDebugOverlay;
