import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toggle } from "@/components/base/toggle/toggle";
import StaggeredMenu, { type StaggeredMenuItem } from "@/components/staggered-menu/StaggeredMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleMenuNav = (href: string) => {
    if (href === "/") {
      if (isHomePage) window.scrollTo({ top: 0, behavior: "smooth" });
      else navigate("/");
      return;
    }
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      if (isHomePage) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        scrollToSection(sectionId);
      }
    }
  };

  const menuItems: StaggeredMenuItem[] = [
    { label: "Home", link: "/", ariaLabel: "Home", onClick: (e) => { e.preventDefault(); handleMenuNav("/"); } },
    { label: "Projects", link: "/#projects", ariaLabel: "Projects", onClick: (e) => { e.preventDefault(); handleMenuNav("/#projects"); } },
    { label: "About", link: "/#about", ariaLabel: "About", onClick: (e) => { e.preventDefault(); handleMenuNav("/#about"); } },
    { label: "Contact", link: "/#contact", ariaLabel: "Contact", onClick: (e) => { e.preventDefault(); handleMenuNav("/#contact"); } },
  ];

  const socialItems = [
    { label: "Instagram", link: "https://www.instagram.com/phani1117" },
    { label: "Behance", link: "https://www.behance.net/phaneendrareddy" },
    { label: "LinkedIn", link: "https://in.linkedin.com/in/bhimavarapu-phaneendra-reddy-2663a9211/en" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-start px-4 sm:px-6 md:px-12 lg:px-16 py-3 sm:py-4 transition-all duration-300 pointer-events-none`}
      >
        <div className="absolute inset-0 glass-surface pointer-events-none" aria-hidden="true" />
        <div className="relative z-[60] flex items-center gap-3 pointer-events-auto">
          <Toggle />
        </div>
      </nav>

      <StaggeredMenu
        className="!z-[60]"
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        isFixed
        closeOnClickAway
      />
    </>
  );
};

export default Navbar;
