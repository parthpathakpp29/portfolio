"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Tilt } from "react-tilt"; 

type ProjectProps = {
  title: string;
  description: string;
  tags: string[] | readonly string[];
  imageUrl?: string | StaticImageData;
  liveLink?: string;
};

// 2. Configure the 3D Physics
const defaultOptions = {
  reverse: false,        
  max: 20,               
  perspective: 1000,     
  scale: 1.05,          
  speed: 1000,        
  transition: true,      
  axis: null,       
  reset: true,  
  easing: "cubic-bezier(.03,.98,.52,.99)", 
  glare: true,          
  "max-glare": 0.3,   
};

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  liveLink,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const safeTags = Array.isArray(tags) ? tags : [];

  // Content Component
  const ProjectContent = () => (
    <section className="bg-white/5 max-w-[45rem] border border-white/10 rounded-2xl overflow-hidden sm:pr-8 relative sm:h-[24rem] transition-all duration-500 sm:group-even:pl-8 backdrop-blur-sm hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]">
      
      {/* Background Gradient Blob for depth */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[20rem] relative z-20">
        <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {title}
        </h3>
        
        <p className="mt-2 leading-relaxed text-gray-300 dark:text-gray-300">
          {description}
        </p>
        
        {safeTags.length > 0 && (
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {safeTags.map((tag, index) => (
              <li
                className="bg-white/10 border border-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white/90 rounded-full hover:bg-white/20 hover:scale-105 transition-all cursor-default shadow-lg"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          className="absolute hidden sm:block top-8 -right-40 w-[30rem] rounded-t-xl shadow-2xl
          transition-all duration-500
          border border-white/10
          group-hover:scale-[1.04]
          group-hover:-translate-x-3
          group-hover:translate-y-3
          group-hover:-rotate-2
          
          group-even:group-hover:translate-x-3
          group-even:group-hover:translate-y-3
          group-even:group-hover:rotate-2
          
          group-even:right-[initial] group-even:-left-40
          z-10" // Ensure image is above background but below glare
        />
      )}
    </section>
  );

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-8 sm:mb-16 last:mb-0 w-full max-w-[45rem]"
    >
      {/* 4. Wrap the card in Tilt */}
      <Tilt options={defaultOptions}>
         {liveLink ? (
            <Link href={liveLink} target="_blank" rel="noopener noreferrer" className="block outline-none cursor-none">
                <ProjectContent />
            </Link>
         ) : (
            <div className="cursor-default">
                <ProjectContent />
            </div>
         )}
      </Tilt>
    </motion.div>
  );
}