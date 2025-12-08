"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
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
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, label: "Next.js", color: "#FFFFFF" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
  { icon: SiGit, label: "Git", color: "#F1502F" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#336791" },
  { icon: SiPython, label: "Python", color: "#3776AB" },
]

export default function OrbitingSystem() {
  // Default to desktop radius to match SSR, then adjust
  const [radius, setRadius] = useState(230)

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth
      if (w < 640) {
        setRadius(120) // Mobile Radius (Ring width = 240px)
      } else if (w < 1024) {
        setRadius(170) // Tablet Radius (Ring width = 340px)
      } else {
        setRadius(230) // Desktop Radius (Ring width = 460px)
      }
    }

    // Initial call
    updateRadius()
    
    // Add listener
    window.addEventListener("resize", updateRadius)
    return () => window.removeEventListener("resize", updateRadius)
  }, [])

  return (
    <div className="relative w-full h-[500px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-visible">
      
      {/* -------------------------------------------------- */}
      {/* 1. CENTER: The Sun (Your Photo)                    */}
      {/* -------------------------------------------------- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
         <div className="absolute inset-0 bg-purple-500 blur-[50px] opacity-30 rounded-full scale-110 animate-pulse"></div>
         
         {/* Responsive Image Size: w-28 (112px) on mobile, w-40 (160px) on desktop */}
         <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-black">
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
      {/* -------------------------------------------------- */}
      <motion.div
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        // Mobile: 160px width | Desktop: 300px width
        className="absolute top-1/2 left-1/2 w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] rounded-full border border-white/5 border-dashed z-0"
      />

      {/* -------------------------------------------------- */}
      {/* 3. OUTER RING: The Orbit Path                      */}
      {/* SIZES MUST MATCH THE JS RADIUS * 2                 */}
      {/* Mobile Radius 120 * 2 = 240px                      */}
      {/* Tablet Radius 170 * 2 = 340px                      */}
      {/* Desktop Radius 230 * 2 = 460px                     */}
      {/* -------------------------------------------------- */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 z-10 w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] md:w-[460px] md:h-[460px]"
      >
        {/* Icons container - Rotates around the center */}
        <motion.div
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
            {technologies.map((tech, index) => {
              const Icon = tech.icon
              const angle = (index / technologies.length) * 360
              const angleRad = (angle * Math.PI) / 180
              
              // We position them using absolute + trigonometry relative to the container center
              // Since the container matches the diameter (2*radius), we can use percentages or simple math.
              // Actually, standard trigonometry with the dynamic radius state is safest:
              
              return (
                <div
                  key={tech.label}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    // Use the calculated JS radius to push items out
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px)`,
                  }}
                >
                    {/* COUNTER ROTATION: Keeps icon upright */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 50, ease: "linear", repeat: Infinity }}
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-110 hover:border-purple-500/50 transition-all duration-300 group">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" style={{ color: tech.color }} />
                        </div>
                    </motion.div>
                </div>
              )
            })}
        </motion.div>
      </div>
      
      {/* -------------------------------------------------- */}
      {/* 4. BACKGROUND GRADIENT                             */}
      {/* -------------------------------------------------- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,69,255,0.15)_0%,transparent_70%)] pointer-events-none"></div>

    </div>
  )
}