"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TypingText from "./TypingText";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-background py-16 md:py-[120px] px-6 md:px-20 flex flex-col gap-6 md:gap-8">
      <div className="text-accent font-bold text-sm md:text-base">
        {mounted ? (
          <TypingText
            text="$ whoami"
            speed={80}
            delay={500}
            showCursor={true}
            onComplete={() => setTypingComplete(true)}
          />
        ) : (
          <span>$ whoami</span>
        )}
      </div>

      <h1
        className={`text-foreground font-bold text-4xl md:text-6xl lg:text-[72px] leading-none tracking-[-2px] transition-all duration-700 ease-out ${
          typingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "0ms" }}
      >
        Diego Moraes
      </h1>

      <p
        className={`text-text-muted text-lg md:text-xl transition-all duration-700 ease-out ${
          typingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "150ms" }}
      >
        &gt; Senior Software Engineer @ Mercado Libre
      </p>

      <div
        className={`flex flex-col sm:flex-row gap-2 sm:gap-4 transition-all duration-700 ease-out ${
          typingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <span className="text-text-muted-dark text-sm md:text-base">
          📍 Punta del Este, Uruguay
        </span>
        <span className="text-accent text-sm md:text-base">
          <span className="pulse-dot">●</span> Available for interesting projects
        </span>
      </div>

      <div
        className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-700 ease-out ${
          typingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "450ms" }}
      >
        <a
          href="https://github.com/dieg0moraes"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-primary px-7 py-3.5 border-2 border-accent text-accent font-bold text-sm md:text-base hover:bg-accent hover:text-background text-center"
        >
          GitHub →
        </a>
        <a
          href="https://linkedin.com/in/dieg0moraes"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-secondary px-7 py-3.5 border-2 border-border text-foreground font-bold text-sm md:text-base hover:border-text-muted text-center"
        >
          LinkedIn →
        </a>
        <Link
          href="/thoughts"
          className="btn-cta-secondary px-7 py-3.5 border-2 border-border text-foreground font-bold text-sm md:text-base hover:border-text-muted text-center"
        >
          Thoughts →
        </Link>
      </div>
    </section>
  );
}
