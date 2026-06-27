import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, MouseEvent } from "react";
import { gsap } from "gsap";
import "./StaggeredMenu.css";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors,
  items,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor,
  openMenuButtonColor,
  accentColor,
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  // Read theme tokens at runtime
  const getThemeColors = useCallback(() => {
    if (typeof window === "undefined") return { fg: "#fff", accent: "#fff", bg: "#000" };
    const styles = getComputedStyle(document.documentElement);
    const fg = `hsl(${styles.getPropertyValue("--foreground").trim()})`;
    const accent = `hsl(${styles.getPropertyValue("--primary").trim()})`;
    const bg = `hsl(${styles.getPropertyValue("--background").trim()})`;
    return { fg, accent, bg };
  }, []);

  const effectiveMenuButtonColor = menuButtonColor;
  const effectiveOpenMenuButtonColor = openMenuButtonColor;
  const effectiveAccent = accentColor;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current && effectiveMenuButtonColor) {
        gsap.set(toggleBtnRef.current, { color: effectiveMenuButtonColor });
      }
    });
    return () => ctx.revert();
  }, [position, effectiveMenuButtonColor, getThemeColors]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-panel-list[data-numbering] .sm-panel-item")
    );
    const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>(".sm-socials-link"));

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 } as any);
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(panel, { xPercent: panelStart }, { xPercent: 0, duration: panelDuration, ease: "power4.out" }, panelInsertTime);

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1, from: "start" } }, itemsStart);
      if (numberEls.length) {
        tl.to(numberEls, { duration: 0.6, ease: "power2.out", "--sm-num-opacity": 1, stagger: { each: 0.08, from: "start" } } as any, itemsStart + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else busyRef.current = false;
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll<HTMLElement>(".sm-panel-list[data-numbering] .sm-panel-item"));
        if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 } as any);
        const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
        const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>(".sm-socials-link"));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = opening
      ? gsap.to(icon, { rotate: 225, duration: 0.8, ease: "power4.out", overwrite: "auto" })
      : gsap.to(icon, { rotate: 0, duration: 0.35, ease: "power3.inOut", overwrite: "auto" });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      const { fg } = getThemeColors();
      const closedColor = effectiveMenuButtonColor || fg;
      const openColor = effectiveOpenMenuButtonColor || fg;
      if (changeMenuColorOnOpen) {
        colorTweenRef.current = gsap.to(btn, {
          color: opening ? openColor : closedColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: closedColor });
      }
    },
    [changeMenuColorOnOpen, effectiveMenuButtonColor, effectiveOpenMenuButtonColor, getThemeColors]
  );

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: Event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  // Build prelayer color array
  const prelayerColors = (() => {
    const fallback = ["hsl(var(--muted))", "hsl(var(--secondary))"];
    const raw = colors && colors.length ? colors.slice(0, 4) : fallback;
    let arr = [...raw];
    if (arr.length >= 3) {
      const mid = Math.floor(arr.length / 2);
      arr.splice(mid, 1);
    }
    return arr;
  })();

  const accentVar = effectiveAccent ? { ["--sm-accent" as any]: effectiveAccent } : {};

  return (
    <div
      className={`staggered-menu-wrapper ${isFixed ? "fixed-wrapper" : ""} ${className || ""}`}
      data-position={position}
      data-open={open ? "" : undefined}
      style={accentVar as React.CSSProperties}
    >
      <div className="sm-prelayers" ref={preLayersRef} aria-hidden="true">
        {prelayerColors.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <header className="staggered-menu-header">
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span className="sm-toggle-textInner" ref={textInnerRef}>
              {textLines.map((l, i) => (
                <span key={i} className="sm-toggle-line">
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span className="sm-icon" ref={iconRef} aria-hidden="true">
            <span className="sm-icon-line" ref={plusHRef} />
            <span className="sm-icon-line" ref={plusVRef} />
          </span>
        </button>
      </header>

      <aside
        ref={panelRef as React.RefObject<HTMLElement>}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering ? "" : undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={idx}>
                  <a
                    className="sm-panel-item"
                    href={it.link}
                    aria-label={it.ariaLabel || it.label}
                    onClick={(e) => {
                      it.onClick?.(e);
                      if (!e.defaultPrevented) closeMenu();
                      else closeMenu();
                    }}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap">
                <span className="sm-panel-item">No items</span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={i}>
                    <a className="sm-socials-link" href={s.link} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
