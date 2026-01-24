"use client";

import { useState } from "react";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import TypingText from "./TypingText";

interface ContactBoxProps {
  label: string;
  value: string;
  href?: string;
  highlighted?: boolean;
  index: number;
  isVisible: boolean;
  onCopyEmail?: () => void;
}

function ContactBox({ label, value, href, highlighted = false, index, isVisible, onCopyEmail }: ContactBoxProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (label === "Email" && onCopyEmail) {
      e.preventDefault();
      navigator.clipboard.writeText("dmoraes11cb@gmail.com");
      onCopyEmail();
    }
  };

  const content = (
    <>
      <span className="text-text-muted-dark text-xs md:text-sm">{label}</span>
      <span className={`font-bold text-base md:text-lg ${highlighted ? "text-accent" : "text-foreground"}`}>
        {value}
      </span>
    </>
  );

  const baseClass = `flex flex-col gap-2 flex-1 transition-all duration-500 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${baseClass} footer-link`}
        style={{ transitionDelay: `${300 + index * 100}ms` }}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={baseClass}
      style={{ transitionDelay: `${300 + index * 100}ms` }}
    >
      {content}
    </div>
  );
}

export default function Footer() {
  const { ref, isVisible } = useAnimateOnScroll<HTMLElement>({ threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contacts = [
    {
      label: "Email",
      value: copied ? "Copied!" : "dmoraes11cb@gmail.com",
      href: "mailto:dmoraes11cb@gmail.com",
      highlighted: true,
    },
    {
      label: "GitHub",
      value: "github.com/dieg0moraes",
      href: "https://github.com/dieg0moraes",
      highlighted: false,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/dieg0moraes",
      href: "https://linkedin.com/in/dieg0moraes",
      highlighted: false,
    },
    {
      label: "X",
      value: "x.com/techbydie",
      href: "https://x.com/techbydie",
      highlighted: false,
    },
  ];

  return (
    <footer
      ref={ref}
      className="bg-background-secondary py-12 md:py-20 px-6 md:px-20 flex flex-col gap-8 md:gap-12"
    >
      <span className="text-accent font-bold text-xs tracking-[2px]">
        {isVisible ? (
          <TypingText text="// GET IN TOUCH" speed={50} showCursor={false} />
        ) : (
          "// GET IN TOUCH"
        )}
      </span>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-[60px] w-full">
        {contacts.map((contact, index) => (
          <ContactBox
            key={contact.label}
            {...contact}
            index={index}
            isVisible={isVisible}
            onCopyEmail={contact.label === "Email" ? handleCopyEmail : undefined}
          />
        ))}
      </div>

      <div
        className={`w-full h-px bg-border transition-all duration-700 ${
          isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
        style={{ transitionDelay: "600ms", transformOrigin: "left" }}
      />

      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <span className="text-text-muted-dark text-xs md:text-sm">
          © 2026 Diego Moraes
        </span>
        <span className="text-text-muted-dark text-xs md:text-sm">
          Built with precision &gt; Built with tools
        </span>
      </div>
    </footer>
  );
}
