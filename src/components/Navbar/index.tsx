"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HoverLink } from "@/components/ui/HoverLink";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { NAV_LINKS } from "./constants";
import Link from "next/link";

const backdropVariants = {
  closed: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  open:   { opacity: 1, scale: 1,    transition: { duration: 0.3 } },
};

export function Navbar() {
  const [lastY, setLastY]     = useState(0);
  const [visible, setVisible] = useState(true);
  const [open, setOpen]       = useState(false);

  // hide/show on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 10 || y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // lock body when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 bg-[#FFF8E7]
          transition-transform duration-300 ease-in-out
          ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-6 flex items-center h-28 justify-between">
          <Link href="/" className="relative z-50">
            <Image
              src="/DTUP-logo-RGB-01.png"
              alt="Logo"
              width={150}
              height={150}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-16">
            {NAV_LINKS.map(link => (
              <HoverLink
                key={link.href}
                href={link.href}
                className="text-lg uppercase tracking-wider text-black/90 hover:text-black transition-colors py-2 font-lato"
              >
                {link.label}
              </HoverLink>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 relative z-50"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open
              ? <CloseIcon className="w-6 h-6" />
              : <MenuIcon  className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-[#FFF8E7] z-40 md:hidden
                       flex flex-col items-center justify-center"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-8 right-6 p-2"
              aria-label="Close menu"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

            <div className="flex flex-col space-y-12">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.2 } }}
                >
                  <HoverLink
                    href={link.href}
                    className="text-3xl uppercase tracking-wider text-black/90 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </HoverLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
