"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
}

interface MousePosition {
  x: number
  y: number
}

export default function ParticleEffect({ mousePosition }: { mousePosition: MousePosition }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }))
    setParticles(initialParticles)

    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let { x, y, vx, vy } = particle

          // Move particle
          x += vx
          y += vy

          // Bounce off walls
          if (x < 0 || x > window.innerWidth) vx *= -1
          if (y < 0 || y > window.innerHeight) vy *= -1

          // Keep in bounds
          x = Math.max(0, Math.min(window.innerWidth, x))
          y = Math.max(0, Math.min(window.innerHeight, y))

          return { ...particle, x, y, vx, vy }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
          style={{
            x: particle.x,
            y: particle.y,
            opacity: 0.6,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.id * 0.1,
          }}
        />
      ))}
    </div>
  )
}
