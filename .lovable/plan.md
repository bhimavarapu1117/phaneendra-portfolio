## Goal
Replace the current fullscreen hamburger menu overlay in `Navbar.tsx` with the React Bits `BubbleMenu` overlay, while keeping the top navbar links (Projects / About / Contact) and the theme toggle exactly as they are. Items: **Projects, About, Contact**. Colors adapt to dark/light theme.

## Changes

### 1. Install dependency
- `bun add gsap`

### 2. Add component files
- `src/components/bubble-menu/BubbleMenu.tsx` — port of the provided JSX to TSX (typed props). Keep behavior identical but:
  - Use `hsl(var(--background))` / `hsl(var(--foreground))` for `menuBg` / `menuContentColor` via a small wrapper that reads computed CSS vars on mount + on theme change (listen to a `MutationObserver` on `documentElement` class changes). This makes it theme-aware automatically.
  - Render only when `isOpen` prop is true (controlled from `Navbar`), so the existing hamburger button keeps controlling open/close — no duplicate toggle.
  - Hide the internal `nav` (logo + toggle row) since the existing Navbar already provides both; expose a `hideChrome` prop and render only the overlay + pill list.
- `src/components/bubble-menu/BubbleMenu.css` — copy provided CSS verbatim, then:
  - Override `--pill-bg`, `--pill-color`, `--pill-border` to use HSL theme tokens.
  - Keep sharp visual identity consistent with the project (rounded pills are part of this component's identity — acceptable exception scoped to this overlay only, since the request is to integrate the component as-is).

### 3. Wire into `Navbar.tsx`
- Remove the existing `<div className="fixed inset-0 z-40 ...">` fullscreen overlay block (the liquid-glass menu with nav links and social links).
- Keep: top bar with Projects/About/Contact links, Theme `Toggle`, and the hamburger button.
- Render `<BubbleMenu isOpen={isMenuOpen} items={items} hideChrome />` instead of the removed overlay.
- Items wired to existing `handleNavClick` (hash routing to `/#about`, `/#projects`, `/#contact`):
  - Projects — rotation -8, hover bg `hsl(var(--primary))`, text `hsl(var(--primary-foreground))`
  - About — rotation 8, same hover tokens
  - Contact — rotation -8, same hover tokens
- Keep `body.overflow = hidden` logic when open.
- `useFixedPosition` = true so it follows the viewport.

### 4. Theme sync detail
Inside `BubbleMenu.tsx`, a `useThemeTokens()` hook returns `{ bg, fg }` by reading `getComputedStyle(document.documentElement).getPropertyValue('--background' | '--foreground')` and wrapping as `hsl(...)`. Re-reads on `MutationObserver` (class change) so toggling dark/light updates pill colors live.

## Out of scope
- No changes to social links (already removed previously).
- No changes to ProjectsSection / AboutSection / ContactSection content.
- Hamburger icon and theme toggle stay as the existing geometric ones.

## Technical notes
- New deps: `gsap`.
- New files: `src/components/bubble-menu/BubbleMenu.tsx`, `src/components/bubble-menu/BubbleMenu.css`.
- Edited: `src/components/Navbar.tsx` (overlay block replaced).
- No backend, no schema changes.