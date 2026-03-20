"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavConfig } from "@/types";
import { SITE_CONFIG } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";
import BackToDoors from "./BackToDoors";

interface NavbarProps {
  config: NavConfig;
}

export default function Navbar({ config }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSectionClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30 bg-bg-primary/40 shadow-xl backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left — Logo */}
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight text-text-primary transition-colors duration-fast hover:text-accent"
        >
          {SITE_CONFIG.name.split(" ")[0].toUpperCase()}
          <span className="text-accent">.</span>
        </Link>

        {/* Center — Section links (desktop) */}
        {config.showSectionLinks && config.sectionLinks && (
          <ul className="hidden items-center gap-8 md:flex">
            {config.sectionLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleSectionClick(link.href)}
                  className="text-sm font-medium text-text-secondary transition-colors duration-fast hover:text-accent"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Right — actions (desktop) */}
        <div className="hidden items-center gap-4 md:flex">
          <BackToDoors />
          <Link
            href={config.otherSideHref}
            className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
          >
            {config.otherSideLabel}
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="glass-card flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/30 md:hidden"
          >
            <div className="flex flex-col px-4 py-4">
              {/* Section links */}
              {config.showSectionLinks && config.sectionLinks && (
                <div className="flex flex-col gap-3 pb-4">
                  {config.sectionLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleSectionClick(link.href)}
                      className="text-left text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Navigation actions */}
              <div className="flex items-center justify-between border-t border-border/30 pt-4">
                <div className="flex items-center gap-4">
                  <Link
                    href={config.otherSideHref}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
                  >
                    {config.otherSideLabel}
                  </Link>
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-border px-4 py-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    Doorway
                  </Link>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
