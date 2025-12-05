"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. Track mouse movement
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // 2. Check if hovering over links or buttons
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      {/* Main Inner Dot (High precision) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-purple-400 rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_10px_rgba(168,85,247,0.8)]"
        animate={{
          x: mousePosition.x - 6, // Centering (w/2)
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1, // Shrink dot on hover (optional style)
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />
      
      {/* Outer Glowing Ring (follows with delay) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-purple-500/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16, // Centering (w/2)
          y: mousePosition.y - 16,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? "rgba(168, 85, 247, 0.1)" : "transparent",
          borderColor: isHovering ? "rgba(236, 72, 153, 0.8)" : "rgba(168, 85, 247, 0.5)", // Purple to Pink
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20, 
          mass: 0.5 
        }}
      />
    </>
  );
}