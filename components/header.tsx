"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { HiMenuAlt3, HiX } from "react-icons/hi";
// 1. Import the SectionName type (this matches what your Context expects)
import type { SectionName } from "@/lib/types";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Apply the type here instead of 'string'
  const handleNavClick = (name: SectionName) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
    setMobileMenuOpen(false);
  };

  return (
    <header className="z-[999] relative flex justify-center pt-0 sm:pt-0">
      
      {/* ======================= */}
      {/* DESKTOP VIEW (Pill)  */}
      {/* ======================= */}
      <motion.div
        className="hidden sm:block fixed top-4 sm:top-6 h-[3.5rem] w-full max-w-[28rem] rounded-full border border-white/10 bg-black/20 shadow-[0_0_20px_rgba(147,51,234,0.15)] backdrop-blur-[10px]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <nav className="flex h-full items-center justify-center px-4">
          <ul className="flex w-full items-center justify-between gap-1 text-[0.9rem] font-medium text-gray-400">
            {links.map((link) => (
              <motion.li className="relative h-full flex items-center" key={link.hash}>
                <Link
                  className={clsx(
                    "relative flex w-full items-center justify-center px-3 py-2 transition hover:text-white whitespace-nowrap",
                    {
                      "text-white": activeSection === link.name,
                    }
                  )}
                  href={link.hash}
                  // TypeScript now knows link.name matches SectionName because of 'as const' in data.ts
                  onClick={() => handleNavClick(link.name)}
                >
                  {link.name}
                  {link.name === activeSection && (
                    <motion.span
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-purple-900/50 to-slate-900/50 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-purple-400 blur-[2px]" />
                    </motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* ======================= */}
      {/* MOBILE VIEW (Floating)*/}
      {/* ======================= */}
      <motion.div
        layout 
        className="sm:hidden fixed top-4 inset-x-4 z-[999] rounded-2xl border border-white/10 bg-black/70 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
            y: 0, 
            opacity: 1,
            boxShadow: mobileMenuOpen ? "0 0 40px rgba(147, 51, 234, 0.15)" : "0 0 30px rgba(0,0,0,0.5)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="flex flex-col">
            {/* Header Row: Logo & Toggle */}
            <div className="flex items-center justify-between p-4 h-16">
                <span className="text-lg font-bold text-white tracking-wide pl-2">Parth</span>
                
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <AnimatePresence mode="wait">
                        {mobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <HiX size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <HiMenuAlt3 size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Expandable Menu Items */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <nav className="px-2 pb-4 pt-0">
                            <ul className="flex flex-col gap-1">
                                {links.map((link, index) => (
                                    <motion.li
                                        key={link.hash}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            href={link.hash}
                                            onClick={() => handleNavClick(link.name)}
                                            className={clsx(
                                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                                                {
                                                    "bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 text-white shadow-[0_0_20px_rgba(147,51,234,0.2)]": activeSection === link.name,
                                                    "text-gray-400 hover:text-white hover:bg-white/5": activeSection !== link.name,
                                                }
                                            )}
                                        >
                                            <span className={clsx(
                                                "w-1.5 h-1.5 rounded-full transition-all",
                                                activeSection === link.name ? "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" : "bg-gray-600"
                                            )} />
                                            <span className="font-medium text-sm tracking-wide">
                                                {link.name}
                                            </span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}