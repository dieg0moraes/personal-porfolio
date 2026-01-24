"use client";

import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import TypingText from "./TypingText";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string;
  highlighted?: boolean;
  index: number;
  isVisible: boolean;
}

function ProjectCard({ title, description, tech, highlighted = false, index, isVisible }: ProjectCardProps) {
  return (
    <div
      className={`project-card ${highlighted ? "project-card-highlighted" : ""} p-6 md:p-8 flex flex-col gap-4 md:gap-5 w-full border-2 ${
        highlighted ? "border-accent" : "border-border"
      } transition-all duration-600 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${300 + index * 150}ms` }}
    >
      <h3 className={`font-bold text-xl md:text-2xl ${highlighted ? "text-accent" : "text-foreground"}`}>
        {title}
      </h3>

      <p className="text-text-light text-sm md:text-base leading-[1.5]">
        {description}
      </p>

      <p className="text-text-muted-dark text-xs md:text-sm">
        {tech}
      </p>
    </div>
  );
}

export default function Projects() {
  const { ref, isVisible } = useAnimateOnScroll<HTMLElement>({ threshold: 0.1 });

  const projects = [
    {
      title: "lahonditadelabuelo.com",
      description:
        "AI-Optimized SEO Case Study: Built a restaurant website optimized for LLM discovery. Result: 75 milanesas ordered via Microsoft Copilot. Demonstrated how AI-first optimization differs from traditional SEO.",
      tech: "Tech: AI Integration, LLM-Compatible Metadata, Modern Web",
      highlighted: true,
    },
    {
      title: "Fuzzer",
      description:
        "Python-based fuzzing tool for security testing. Open source project focused on automated vulnerability discovery.",
      tech: "Tech: Python, Security Testing",
      highlighted: false,
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-background-secondary py-12 md:py-20 px-6 md:px-20 flex flex-col gap-8 md:gap-10"
    >
      <span className="text-accent font-bold text-xs tracking-[2px]">
        {isVisible ? (
          <TypingText text="// NOTABLE PROJECTS" speed={50} showCursor={false} />
        ) : (
          "// NOTABLE PROJECTS"
        )}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
