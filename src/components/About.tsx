"use client";

import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import TypingText from "./TypingText";

export default function About() {
  const { ref, isVisible } = useAnimateOnScroll<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="bg-background-secondary py-12 md:py-20 px-6 md:px-20 flex flex-col gap-4 md:gap-6"
    >
      <span className="text-accent font-bold text-xs tracking-[2px]">
        {isVisible ? (
          <TypingText text="// ABOUT" speed={60} showCursor={false} />
        ) : (
          "// ABOUT"
        )}
      </span>

      <p
        className={`text-text-light text-base md:text-lg leading-[1.6] max-w-[900px] transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        Developer focused on building efficient, scalable solutions. Currently working at
        Mercado Libre, one of Latin America&apos;s largest e-commerce platforms. I&apos;ve successfully
        implemented AI-optimized SEO strategies that drove real business results. My approach
        combines technical precision with practical problem-solving.
      </p>
    </section>
  );
}
