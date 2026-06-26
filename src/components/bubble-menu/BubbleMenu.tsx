import { useEffect, useRef, useState, CSSProperties, MouseEvent } from "react";
import { gsap } from "gsap";
import "./BubbleMenu.css";

export interface BubbleMenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

interface BubbleMenuProps {
  isOpen: boolean;
  items: BubbleMenuItem[];
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}

export default function BubbleMenu({
  isOpen,
  items,
  useFixedPosition = true,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) setShowOverlay(true);
  }, [isOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLElement[];
    if (!overlay || !bubbles.length) return;

    if (isOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
        if (labels[i]) {
          tl.to(
            labels[i],
            { y: 0, autoAlpha: 1, duration: animationDuration, ease: "power3.out" },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: "power3.in" });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (!isOpen) return;
      const bubbles = bubblesRef.current.filter(Boolean) as HTMLElement[];
      const isDesktop = window.innerWidth >= 900;
      bubbles.forEach((bubble, i) => {
        const item = items[i];
        if (bubble && item) {
          gsap.set(bubble, { rotation: isDesktop ? item.rotation ?? 0 : 0 });
        }
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, items]);

  if (!showOverlay) return null;

  return (
    <div
      ref={overlayRef}
      className={`bubble-menu-items ${useFixedPosition ? "fixed" : "absolute"}`}
      aria-hidden={!isOpen}
    >
      <ul className="pill-list" role="menu" aria-label="Menu links">
        {items.map((item, idx) => (
          <li key={idx} role="none" className="pill-col">
            <a
              role="menuitem"
              href={item.href}
              onClick={item.onClick}
              aria-label={item.ariaLabel || item.label}
              className="pill-link"
              style={{ ["--item-rot" as any]: `${item.rotation ?? 0}deg` } as CSSProperties}
              ref={(el) => {
                bubblesRef.current[idx] = el;
              }}
            >
              <span
                className="pill-label"
                ref={(el) => {
                  labelRefs.current[idx] = el;
                }}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
