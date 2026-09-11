
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Family", href: "#family" },
  { label: "Event", href: "#event" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Top Navbar ─── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#D8B26E]/15"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="flex items-center gap-2 group"
            onClick={handleLinkClick}
          >
            <span
              className={`text-xl sm:text-2xl font-light transition-colors ${
                scrolled ? "text-[#6B2D44]" : "text-[#6B2D44]"
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              S
            </span>

            <span
              className="text-[#D8B26E] text-xs"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              &
            </span>

            <span
              className={`text-xl sm:text-2xl font-light transition-colors ${
                scrolled ? "text-[#6B2D44]" : "text-[#6B2D44]"
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              T
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#2A2A2A] text-xs tracking-[0.2em] uppercase hover:text-[#6B2D44] transition-colors duration-300 relative group"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.label}

                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#D8B26E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#6B2D44] hover:text-[#8B3D5A] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Full-Screen Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#FAF7F2] flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-[#6B2D44]"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Top decorative line */}
            <motion.div
              className="absolute top-5 left-5 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className="text-xl font-light text-[#6B2D44]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                S
              </span>

              <span className="text-[#D8B26E] text-xs">&</span>

              <span
                className="text-xl font-light text-[#6B2D44]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                T
              </span>
            </motion.div>

            {/* Menu Items */}
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-[#6B2D44] text-2xl font-light hover:text-[#8B3D5A] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Bottom decoration */}
            <motion.div
              className="absolute bottom-12 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-12 h-[1px] bg-[#D8B26E]/40" />

              <p
                className="text-[#8C8C8C] text-[10px] tracking-[0.25em] uppercase"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Sebin & Treesa
              </p>

              <p
                className="text-[#D8B26E] text-base"
                style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
              >
                മിന്നുകെട്ട്
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
