"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    // Sequence timer: 
    // 0s: Start
    // 2s: Explosion starts
    // 2.5s: Fade out starts
    // 3s: Remove loader
    const timer = setTimeout(() => {
      setShowLoader(false);
      document.body.style.overflow = "auto"; // Re-enable scroll
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }} // Final fade out revealing the site
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* 1. Sparking Stars (Background) */}
          <div className="absolute inset-0 z-0">
             {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 1 + 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 0.5
                  }}
                  style={{
                    width: Math.random() * 4 + 1 + "px",
                    height: Math.random() * 4 + 1 + "px",
                    boxShadow: "0 0 10px rgba(255,255,255,0.8)"
                  }}
                />
             ))}
          </div>

          {/* 2. The Central Energy Orb (Gathering Power) */}
          <motion.div
             className="relative z-10 w-4 h-4 bg-white rounded-full shadow-[0_0_50px_rgba(255,255,255,1)]"
             initial={{ scale: 0, opacity: 0 }}
             animate={{ 
                scale: [0, 5, 0.5, 100], // Grow -> Shrink (gather) -> Explode
                opacity: [0, 1, 1, 0] 
             }}
             transition={{
                duration: 2.5,
                times: [0, 0.6, 0.8, 1], // Timing of the keyframes
                ease: "easeInOut"
             }}
          >
             {/* The "Ray" Horizontal Flare */}
             <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[2px] bg-blue-500 blur-md"
               animate={{ scaleX: [0, 1, 0.1, 20] }}
               transition={{ duration: 2.5, times: [0, 0.6, 0.8, 1] }}
             />
             <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[2px] bg-purple-500 blur-md rotate-90"
               animate={{ scaleX: [0, 1, 0.1, 20] }}
               transition={{ duration: 2.5, times: [0, 0.6, 0.8, 1] }}
             />
          </motion.div>

          {/* 3. The Flash (White Screen Overlay) */}
          <motion.div
             className="absolute inset-0 bg-white z-20"
             initial={{ opacity: 0 }}
             animate={{ opacity: [0, 0, 1, 0] }} // Flash white at the end
             transition={{
                duration: 2.5,
                times: [0, 0.8, 0.9, 1],
                ease: "easeOut"
             }}
          />
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}