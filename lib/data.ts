import React from "react";
import { LuGraduationCap } from "react-icons/lu";
import schImage from "@/public/schss1.png";
import jobtrakkImage from "@/public/jobtrakkImage.png"
import saasImage from "@/public/ss1.png";
import zcrumImage from "@/public/zcrumshots.png"
import aishotsImage from "@/public/aisaas.png"

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Frontend Developer",
    location: "Remote",
    description:
      "I worked as a Frontend developer at a Startup where I convert figma design into react code",
    icon: React.createElement(LuGraduationCap),
  },
] as const;

export const projectsData = [
  {
    title: "JobTrakk",
    description: "Built an AI-powered platform that automates and manages job applications end-to-end.",
    tags: ["NextJs", "NodeJS", "Tailwind", "SupaBase","Gemini API"],
    imageUrl: jobtrakkImage,
    liveLink: "https://jobtrakk.vercel.app/", 
  },
  {
    title: "Schedulee",
    description: "This is a 1:1 meeting booking site just like Calendly . It has all the features that are required.",
    tags: ["React", "Next.js", "Tailwind", "NeonDB"],
    imageUrl: schImage,
    liveLink: "https://schedulee.vercel.app/", 
  },
  {
    title: "Zcrum",
    description: "A web-based project management tool that helps teams organize work through organizations, projects, and sprints - similar to Jira but simplified.",
    tags: ["Next.js", "Prisma", "PostgresSQL", "Tailwindcss"],
    imageUrl: zcrumImage,
    liveLink: "https://zcrum-khaki.vercel.app/", // Add live link
  },
  {
    title: "AI Saas Landing Page",
    description: "AI-powered project management made simple. Create, track, and deliver projects smarter",
    tags: ["Next.js", "Framer Motion", "Typescript"],
    imageUrl: aishotsImage,
    liveLink: "https://ai-saas-landing-page-six.vercel.app", // Add live link
  },
  {
    title: "SaaS Application",
    description: "It is a beautiful frontend application made for a SaaS business.",
    tags: ["Next.js", "Framer Motion"],
    imageUrl: saasImage,
    liveLink: "https://nextjs-saas-ten.vercel.app", // Add live link
  },
  {
    title: "JobTrakk",
    description: "Built an AI-powered platform that automates and manages job applications end-to-end.",
    tags: ["NextJs", "NodeJS", "Tailwind", "SupaBase","Gemini API"],
    imageUrl: jobtrakkImage,
    liveLink: "https://jobtrakk.vercel.app/", 
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MySQL",
  "MongoDB",
  "Redux",
  "Express",
  "Framer Motion",
] as const;
