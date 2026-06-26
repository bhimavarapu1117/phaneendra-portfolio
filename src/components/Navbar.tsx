import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toggle } from "@/components/base/toggle/toggle";
import BubbleMenu, { type BubbleMenuItem } from "@/components/bubble-menu/BubbleMenu";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only track active section on home page
      if (!isHomePage) return;
      
      const sections = ["contact", "about", "projects"];
      let current = "home";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/", id: "home" },
    { label: "About", href: "/#about", id: "about" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Linkedin", href: "https://linkedin.com" },
  ];

  const scrollToSection = (sectionId: string) => {
    // Small delay to ensure DOM is ready after navigation
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; id: string }) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveSection(link.id);

    if (link.href === "/") {
      // Navigate to home
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else if (link.href.startsWith("/#")) {
      const sectionId = link.href.replace("/#", "");
      
      if (isHomePage) {
        // Already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home page first, then scroll
        navigate("/");
        scrollToSection(sectionId);
      }
    }
  };

  const handleSocialClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-start px-8 py-4 md:px-16 transition-all duration-300 ${
          isScrolled && !isMenuOpen
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        {/* Theme + Menu Toggle Buttons (left side) */}
        <div className="relative z-[60] flex items-center gap-3">
          <Toggle className="glass-surface" />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex flex-col items-center justify-center w-10 h-10 glass-surface hover:opacity-70 transition-opacity"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-8 h-0.5 bg-foreground transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 mt-1.5 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5 w-8" : ""
              }`}
            />
          </button>
        </div>
      </nav>



      {/* Bubble Menu Overlay */}
      <BubbleMenu
        isOpen={isMenuOpen}
        useFixedPosition
        items={[
          {
            label: "Projects",
            href: "/#projects",
            ariaLabel: "Projects",
            rotation: -8,
            onClick: (e) => handleNavClick(e, { href: "/#projects", id: "projects" }),
          },
          {
            label: "About",
            href: "/#about",
            ariaLabel: "About",
            rotation: 8,
            onClick: (e) => handleNavClick(e, { href: "/#about", id: "about" }),
          },
          {
            label: "Contact",
            href: "/#contact",
            ariaLabel: "Contact",
            rotation: -8,
            onClick: (e) => handleNavClick(e, { href: "/#contact", id: "contact" }),
          },
        ] satisfies BubbleMenuItem[]}
      />
    </>
  );
};

export default Navbar;
