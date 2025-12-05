"use client"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(139,92,246,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.15)_0%,transparent_50%)]" />

      {/* Animated gradient orb 1 - Purple */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl"
      />

      {/* Animated gradient orb 2 - Blue */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"
      />

      {/* Animated gradient orb 3 - Pink */}
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={{
          opacity: [0.15, 0.4, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(139,92,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </svg>
    </div>
  )
}
