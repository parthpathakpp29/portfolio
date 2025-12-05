"use client";

import React from "react";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiTailwindcss, 
  SiMongodb, 
  SiPostgresql, 
  SiGit, 
  SiAmazon, 
  SiDocker, 
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiMysql
} from "react-icons/si";
import { FaCode } from "react-icons/fa"; // Fallback icon

// 1. Helper to map string skill names to Icons
// You can add/remove from this list based on your actual skillsData
const getSkillIcon = (skillName: string) => {
  const normalized = skillName.toLowerCase();
  
  if (normalized.includes("react")) return SiReact;
  if (normalized.includes("next")) return SiNextdotjs;
  if (normalized.includes("type")) return SiTypescript;
  if (normalized.includes("node")) return SiNodedotjs;
  if (normalized.includes("tailwind")) return SiTailwindcss;
  if (normalized.includes("mongo")) return SiMongodb;
  if (normalized.includes("postgres")) return SiPostgresql;
  if (normalized.includes("git")) return SiGit;
  if (normalized.includes("aws")) return SiAmazon;
  if (normalized.includes("docker")) return SiDocker;
  if (normalized.includes("python")) return SiPython;
  if (normalized.includes("java") && !normalized.includes("script")) return FaCode; // Fallback for Java
  if (normalized.includes("js") || normalized.includes("javascript")) return SiJavascript;
  if (normalized.includes("html")) return SiHtml5;
  if (normalized.includes("css")) return SiCss3;
  if (normalized.includes("framer")) return SiFramer;
  if (normalized.includes("sql")) return SiMysql;

  return FaCode; // Default fallback
};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      type: "spring",
      stiffness: 100,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40 relative z-20"
    >
      {/* Custom Gradient Heading */}
      <div className="flex justify-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            My Tech Stack
          </span>
        </h2>
      </div>

      <ul className="flex flex-wrap justify-center gap-4 text-lg text-gray-800">
        {skillsData.map((skill, index) => {
          const Icon = getSkillIcon(skill);
          
          return (
            <motion.li
              className="group relative bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex items-center justify-center gap-3 backdrop-blur-sm shadow-lg overflow-hidden cursor-default transition-all duration-300"
              key={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(168, 85, 247, 0.5)", // Purple glow on hover
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              custom={index}
            >
              {/* Subtle background gradient blob that moves on hover could go here, but kept clean for performance */}
              
              {/* Icon with group hover color change */}
              <div className="text-gray-400 group-hover:text-purple-300 transition-colors duration-300">
                <Icon size={24} />
              </div>
              
              {/* Text */}
              <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                {skill}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}