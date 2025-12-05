"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import ParthImage from "@/public/parthphoto.jpg"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiPostgresql,
  SiPython,
} from "react-icons/si"

const technologies = [
  { icon: SiReact, label: "React", color: "#61DAFB", delay: 0 },
  { icon: SiNextdotjs, label: "Next.js", color: "#FFFFFF", delay: 0.1 },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6", delay: 0.2 },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933", delay: 0.3 },
  { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4", delay: 0.4 },
  { icon: SiGit, label: "Git", color: "#F1502F", delay: 0.5 },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#336791", delay: 0.6 },
  { icon: SiPython, label: "Python", color: "#3776AB", delay: 0.7 },
]

export default function OrbitingSystem() {
  return (
    // This container essentially reserves space but creates a localized coordinate system
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-visible">
      
      {/* -------------------------------------------------- */}
      {/* 1. CENTER: The Sun (Your Photo)                    */}
      {/* -------------------------------------------------- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
         {/* Glow behind image */}
         <div className="absolute inset-0 bg-purple-500 blur-[60px] opacity-40 rounded-full scale-150 animate-pulse"></div>
         
         <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-black">
            <Image
                src={ParthImage}
                alt="Parth Pathak"
                fill
                quality={95}
                priority
                className="object-cover"
            />
         </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. INNER RING: Decorative Dashed Lines             */}
      {/* Matches reference: "h-[344px] w-[344px]" logic     */}
      {/* -------------------------------------------------- */}
      <motion.div
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="absolute top-1/2 left-1/2 h-[280px] w-[280px] md:h-[380px] md:w-[380px] rounded-full border border-white/5 border-dashed z-0"
      />

      {/* -------------------------------------------------- */}
      {/* 3. OUTER RING: The Icons Orbit                     */}
      {/* Matches reference: "h-[544px] w-[544px]" logic     */}
      {/* -------------------------------------------------- */}
      <motion.div
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        className="absolute top-1/2 left-1/2 h-[460px] w-[460px] md:h-[580px] md:w-[580px] rounded-full border border-white/10 opacity-100 z-10"
      >
        {/* Place Icons on the circumference */}
        {technologies.map((tech, index) => {
          const Icon = tech.icon
          // Calculate position on the circle edge
          const angle = (index / technologies.length) * 360
          
          return (
             <div
               key={tech.label}
               className="absolute top-1/2 left-1/2"
               style={{
                 transform: `rotate(${angle}deg) translate(${230}px) rotate(-${angle}deg)`, 
                 // Note: 230px is roughly radius of the mobile ring (460/2). 
                 // For responsive, we rely on the container scaling or media queries if needed, 
                 // but typically this fixed pixel offset works well if container scales.
               }}
             >
                {/* COUNTER ROTATION: Keeps icon upright while parent spins */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, ease: "linear", repeat: Infinity }}
                >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-110 hover:border-purple-500/50 transition-all duration-300 group">
                        <Icon size={24} style={{ color: tech.color }} />
                        
                        {/* Tooltip */}
                        <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition text-xs text-white bg-gray-900 px-2 py-1 rounded border border-white/10 pointer-events-none whitespace-nowrap">
                            {tech.label}
                        </div>
                    </div>
                </motion.div>
             </div>
          )
        })}
      </motion.div>
      
      {/* -------------------------------------------------- */}
      {/* 4. BACKGROUND GRAIN/GRADIENT (Like Reference)      */}
      {/* -------------------------------------------------- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,69,255,0.15)_0%,transparent_70%)] pointer-events-none"></div>

    </div>
  )
}