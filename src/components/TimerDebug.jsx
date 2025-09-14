"use client";

import { useState, useEffect } from "react";

export default function TimerDebug() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Verificar si estamos cerca de donde debería estar el FechaYTimer
      // El FechaYTimer debería estar después del Intro (aproximadamente 100vh)
      if (position > 500 && position < 1500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-80 left-4 bg-orange-500 text-white p-2 rounded z-50 text-sm">
      <div>Timer Debug:</div>
      <div>
        Scroll:
        {" "}
        {scrollPosition}
        px
      </div>
      <div>
        Timer visible:
        {" "}
        {isVisible ? "✅" : "❌"}
      </div>
      <div>Posición esperada: 500-1500px</div>
    </div>
  );
}
