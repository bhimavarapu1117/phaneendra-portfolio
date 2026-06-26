import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
// @ts-ignore - JSX component
import ShapeGrid from "./shape-grid/ShapeGrid.jsx";

const ShapeGridBackground = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = resolvedTheme === "light";
  const borderColor = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.10)";
  const hoverFillColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.10)";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-background"
    >
      <div className="absolute inset-0 pointer-events-auto">
        <ShapeGrid
          speed={0.4}
          squareSize={44}
          direction="diagonal"
          borderColor={borderColor}
          hoverFillColor={hoverFillColor}
          shape="square"
          hoverTrailAmount={5}
        />
      </div>
    </div>
  );
};

export default ShapeGridBackground;
