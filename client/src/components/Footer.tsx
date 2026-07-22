import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logo from "../images/logo.png";

/**
 * Footer Component
 * Features: Company info, links, social media, copyright
 * Design: Luxury minimalism with gold accents
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Mount Castle Logo"
                className="h-12 w-12 object-contain"
              />

              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                MOUNT CASTLE
              </span>
            </div>

            <p className="text-background/80 text-sm leading-relaxed">
              Premium residential living redefined. Experience luxury,
              comfort, and community at Mount Castle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#location"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  Location
                </a>
              </li>

              <li>
                <a
                  href="#project"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  Project
                </a>
              </li>

              <li>
                <a
                  href="#amenities"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  Amenities
                </a>
              </li>

              <li>
                <a
                  href="#gallery"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4
              className="font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Information
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#contact"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-accent transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4
              className="font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Follow Us
            </h4>

            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/20 hover:bg-accent hover:text-foreground transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/20 hover:bg-accent hover:text-foreground transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/20 hover:bg-accent hover:text-foreground transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/20 hover:bg-accent hover:text-foreground transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-background/80">
          <p>&copy; {currentYear} Mount Castle. All rights reserved.</p>

          <p>Designed with luxury in mind. Built with excellence.</p>
        </div>
      </div>
    </footer>
  );
}