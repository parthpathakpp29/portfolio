import About from "@/components/about";
import Contact from "@/components/contact";
import Hero from "@/components/hero"; 
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import Experience from "@/components/experience";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 overflow-x-hidden">

      <Hero />
      
      <SectionDivider />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}