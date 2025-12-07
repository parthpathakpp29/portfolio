"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <header className="z-[999] relative flex justify-center pt-6">
      {/* The Navigation Pill */}
      <motion.div
        className="fixed top-6 h-[3.5rem] w-full max-w-[28rem] rounded-full border border-white/10 bg-black/20 shadow-[0_0_20px_rgba(147,51,234,0.15)] backdrop-blur-[10px] sm:h-[3.5rem]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Shine effect on top of the pill */}
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Navigation List */}
        <nav className="flex h-full items-center justify-center px-4">
          <ul className="flex w-full items-center justify-between gap-1 text-[0.9rem] font-medium text-gray-400">
            {links.map((link) => (
              <motion.li
                className="relative h-full flex items-center"
                key={link.hash}
              >
                <Link
                  className={clsx(
                    "relative flex w-full items-center justify-center px-3 py-2 transition hover:text-white",
                    {
                      "text-white": activeSection === link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}

                  {/* The Active "Tab" - A glowing purple pill background */}
                  {link.name === activeSection && (
                    <motion.span
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-purple-900/50 to-slate-900/50 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    >
                        {/* Little bottom light on the active tab */}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-purple-400 blur-[2px]" />
                    </motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}