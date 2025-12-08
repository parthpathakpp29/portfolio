"use client";

import React from "react";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { FaReact, FaLaptopCode, FaBriefcase } from "react-icons/fa";

// Data extracted from your Resume
const experiencesData = [
  {
    title: "Full Stack Developer Intern",
    location: "AlgoFlow AI (Remote)",
    description:
      "Developed a food delivery dashboard from Figma designs using React.js. Optimized code performance and resolved critical bugs to improve user experience.",
    icon: React.createElement(FaReact),
    date: "Feb 2025 - May 2025",
    tags: ["React.js", "Figma", "Optimization"],
  },
  {
    title: "Frontend Developer Intern",
    location: "Runon Private Limited (Remote)",
    description:
      "Built pixel-perfect components from Figma and integrated APIs. Managed the entire frontend lifecycle from design to deployment independently.",
    icon: React.createElement(FaLaptopCode),
    date: "Nov 2023 - Dec 2023",
    tags: ["Frontend", "API Integration", "Responsive Design"],
  },
  {
    title: "Freelance Full-Stack Developer",
    location: "Self-Employed",
    description:
      "Completed multiple projects including restaurant and course-selling websites. Delivered production-ready full-stack applications to clients.",
    icon: React.createElement(FaBriefcase),
    date: "2024 - Present",
    tags: ["Full-Stack", "Client Handling", "Web Development"],
  },
] as const;

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40 relative z-20 w-full max-w-[60rem]">
      
      {/* Section Heading */}
      <div className="flex justify-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            My Experience
          </span>
        </h2>
      </div>

      {/* Main Container - Reduced padding on mobile to maximize width */}
      <div className="relative container mx-auto px-2 md:px-6 flex flex-col space-y-8">
        
        {/* The Timeline Line */}
        {/* MOBILE: Left-aligned (left-6) | DESKTOP: Centered (left-1/2) */}
        <div className="absolute left-6 md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30 -translate-x-1/2 md:translate-x-0" />

        {experiencesData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            // MOBILE: Flex-col | DESKTOP: Alternating Rows
            className={`relative z-10 flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* 1. The Timeline Icon Node */}
            {/* MOBILE: Left-aligned (left-6) | DESKTOP: Centered (left-1/2) */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center z-20 relative">
                <span className="text-purple-400 text-lg md:text-xl">{item.icon}</span>
                {/* Ping Effect */}
                <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping opacity-75"></div>
              </div>
            </div>

            {/* 2. Spacer to push card to side (Desktop only) */}
            <div className="hidden md:block w-1/2" />

            {/* 3. The Glass Card */}
            {/* MOBILE: pl-16 (pushes text right of line) | DESKTOP: Alternating padding */}
            <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                index % 2 === 0 ? "md:pr-12" : "md:pl-12"
            }`}>
              <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                
                {/* Date Tag */}
                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-300 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                  {item.date}
                </span>

                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="font-medium text-gray-400 text-xs md:text-sm mb-3">
                  {item.location}
                </p>
                <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] md:text-xs text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                            #{tag}
                        </span>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}