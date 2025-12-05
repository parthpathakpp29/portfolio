"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaCode,
  FaDumbbell,
  FaTableTennis,
  FaAws,
  FaDocker,
  // FaBrain removed (unused)
} from "react-icons/fa";
import { IconType } from "react-icons";

interface HighlightedTextProps {
  children: ReactNode;
  icon?: IconType;
  color?: string; // Optional color override
}

// REDESIGNED: Glass-style badges instead of solid blue
const HighlightedText = ({ children, icon: Icon, color = "text-purple-400" }: HighlightedTextProps) => (
  <motion.span
    className="inline-flex items-center bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 text-gray-200 shadow-lg hover:bg-white/10 hover:border-white/30 transition-colors cursor-default"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    {Icon && <Icon className={`mr-2 ${color}`} />}
    {children}
  </motion.span>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[50rem] scroll-mt-28 text-center sm:text-left relative z-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Optimized viewport trigger
      variants={containerVariants}
      id="about"
    >
      {/* Title with Gradient */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        variants={itemVariants}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          About Me
        </span>
      </motion.h2>

      <div className="grid gap-6">
        {/* CARD 1: Professional / Tech Info */}
        <motion.div
          className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl hover:border-purple-500/30 transition-colors duration-500 group"
          variants={itemVariants}
        >
          {/* Subtle glow effect behind card */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg -z-10"></div>

          <motion.p className="mb-6 leading-relaxed text-gray-300 text-lg" variants={itemVariants}>
            I am currently pursuing a{" "}
            <HighlightedText icon={FaGraduationCap} color="text-blue-400">
              B-Tech in CSE
            </HighlightedText>
            , driven by my passion for programming. My focus is on
            <HighlightedText icon={FaLaptopCode} color="text-pink-400">
              full-stack development
            </HighlightedText>
            .
          </motion.p>

          <motion.p className="mb-6 leading-relaxed text-gray-300 text-lg" variants={itemVariants}>
            What I love most is the thrill of problem-solving. There&apos;s nothing quite like the satisfaction of cracking a challenging problem.
          </motion.p>

          <motion.div className="mb-2" variants={itemVariants}>
            <p className="text-gray-400 mb-3 text-sm uppercase tracking-wider font-semibold">Core Stack</p>
            <div className="flex flex-wrap gap-2">
              <HighlightedText icon={FaCode}>React</HighlightedText>
              <HighlightedText icon={FaCode}>Next.js</HighlightedText>
              <HighlightedText icon={FaCode}>Node.js</HighlightedText>
              <HighlightedText icon={FaCode}>MongoDB</HighlightedText>
            </div>
            <p className="mt-4 text-gray-300">
              I&apos;m also proficient with <span className="text-blue-300 font-medium">TypeScript</span> and <span className="text-blue-300 font-medium">MySQL</span>.
            </p>
          </motion.div>

          <motion.div className="mt-6 pt-6 border-t border-white/10" variants={itemVariants}>
            <p className="text-gray-300">
              I&apos;m always eager to expand my skill set and am currently
              exploring opportunities for{" "}
              <HighlightedText icon={undefined} color="text-green-400">
                Internships
              </HighlightedText>{" "}
              and{" "}
              <HighlightedText icon={undefined} color="text-yellow-400">
                Freelancing
              </HighlightedText>.
            </p>
          </motion.div>
        </motion.div>

        {/* CARD 2: Personal / Hobbies */}
        <motion.div
          className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl hover:border-blue-500/30 transition-colors duration-500"
          variants={itemVariants}
        >
          <motion.h3
            className="text-xl font-semibold mb-6 text-white flex items-center gap-2"
            variants={itemVariants}
          >
            <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
            Beyond Coding
          </motion.h3>

          <motion.p className="mb-4 leading-relaxed text-gray-300" variants={itemVariants}>
            When I&apos;m not immersed in code, you can find me:
          </motion.p>

          <motion.ul
            className="flex flex-wrap gap-3 mb-6"
            variants={containerVariants}
          >
            <motion.li variants={itemVariants}>
              <HighlightedText icon={FaTableTennis} color="text-orange-400">
                Playing table tennis
              </HighlightedText>
            </motion.li>
            <motion.li variants={itemVariants}>
              <HighlightedText icon={FaDumbbell} color="text-red-400">
                Hitting the gym
              </HighlightedText>
            </motion.li>
            <motion.li variants={itemVariants}>
              <HighlightedText icon={undefined}>
                Enjoying reels
              </HighlightedText>
            </motion.li>
          </motion.ul>

          <motion.div className="bg-white/5 p-4 rounded-xl border border-white/5" variants={itemVariants}>
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Currently Learning</p>
            <div className="flex flex-wrap gap-2">
              <HighlightedText icon={FaAws} color="text-yellow-500">AWS</HighlightedText>
              <HighlightedText icon={FaDocker} color="text-blue-500">Docker</HighlightedText>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}