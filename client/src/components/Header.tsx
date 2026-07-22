import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../images/logo.png";

/**
 * Header Component - Sticky Navigation
 * Features: Logo, navigation links, mobile hamburger menu, scroll-triggered background
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setIsOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Location", id: "location" },
    { label: "Project", id: "project" },
    { label: "Amenities", id: "amenities" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img
            src={logo}
            alt="Mount Castle Logo"
            className="h-12 w-12 object-contain"
          />

          <span
            className="text-2xl font-bold text-foreground hidden sm:block"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MOUNT CASTLE
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-foreground hover:text-yellow-600 transition-colors duration-300 font-medium"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6"
          >
            Enquire Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col p-5 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-foreground hover:text-yellow-600 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black mt-3"
            >
              Enquire Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}