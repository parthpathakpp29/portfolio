"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs"
import { HiDownload } from "react-icons/hi"
import AnimatedBackground from "./animated-background"
import OrbitingIcons from './orbiting-system'
import ParticleEffect from './particle-effect'

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-0 pb-0">
      {/* Background layers */}
      <AnimatedBackground />
      
      {/* FIXED: Removed mousePosition prop */}
      <ParticleEffect />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl">
        {/* Profile Section with Orbiting Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-12 w-full flex justify-center"
        >
          <OrbitingIcons />
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              I’m Parth Pathak —
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Full‑Stack Engineer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            I design scalable, high-performance web applications and developer tools.
            Specialties: <span className="text-purple-400 font-semibold">Next.js</span>, <span className="text-blue-400 font-semibold">TypeScript</span>,
            and <span className="text-pink-400 font-semibold">AI integrations</span> — focused on performance and delightful UX.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 items-center mt-12 z-30"
        >
          <Link
            href="#contact"
            className="group relative px-8 py-4 text-lg font-semibold text-black bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Hire Me <BsArrowRight className="group-hover:translate-x-1 transition" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>

          <div className="flex gap-4">
            {[
              { icon: BsGithub, href: "https://github.com/parthpathakpp29", label: "GitHub" },
              { icon: BsLinkedin, href: "https://linkedin.com/in/parthpathakpp29", label: "LinkedIn" },
              { icon: HiDownload, href: "/resume.pdf", label: "Resume" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
              >
                <Icon size={24} className="group-hover:scale-110 transition" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
         
        </motion.div>
      </div>
    </section>
  )
}
