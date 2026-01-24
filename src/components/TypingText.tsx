"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  trigger?: boolean;
}

export default function TypingText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  showCursor = true,
  onComplete,
  trigger = true,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!trigger || hasStarted) return;

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [trigger, text, speed, delay, onComplete, hasStarted]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (isTyping || displayedText === text) && (
        <span className="typing-cursor" />
      )}
    </span>
  );
}
