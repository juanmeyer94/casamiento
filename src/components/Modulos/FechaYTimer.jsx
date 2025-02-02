"use client";

import { useState, useEffect } from "react";
import { Playfair_Display as PlayfairDisplay } from "next/font/google";
import Image from "next/image";
import { Heart } from "lucide-react";
import Countdown from "react-countdown";

const playfair = PlayfairDisplay({ subsets: ["latin"] });

export default function Timer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      return (
        <div className="text-center">
          <h2
            className={`${playfair.className} text-[#C4A494] text-2xl sm:text-3xl md:text-4xl mb-4`}
          >
            ¡El gran día ha llegado!
          </h2>
        </div>
      );
    }

    return (
      <div className="relative w-full max-w-[280px] sm:max-w-[400px] aspect-square bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-2 md:p-6">
        <h2
          className={`${playfair.className} text-[#C4A494] text-lg sm:text-xl mb-2 sm:mb-4 text-center`}
        >
          ¡Estamos contando!
        </h2>
        <div className="flex items-center justify-center gap-1 sm:gap-4 text-center">
          <div>
            <div className="text-[#8B6F6F] text-lg sm:text-xl font-bold">
              {String(days).padStart(2, "0")}
            </div>
            <div className="text-[#C4A494] text-xs sm:text-sm">días</div>
          </div>
          <div className="h-10 border-l-2 border-[#C4A494]" />
          <div>
            <div className="text-[#8B6F6F] text-lg sm:text-xl font-bold">
              {String(hours).padStart(2, "0")}
            </div>
            <div className="text-[#C4A494] text-xs sm:text-sm">horas</div>
          </div>
          <div className="h-10 border-l-2 border-[#C4A494] " />
          <div>
            <div className="text-[#8B6F6F] text-lg sm:text-xl font-bold">
              {String(minutes).padStart(2, "0")}
            </div>
            <div className="text-[#C4A494] text-xs sm:text-sm">minutos</div>
          </div>
          <div className="h-10 border-l-2 border-[#C4A494] " />
          <div>
            <div className="text-[#8B6F6F] text-lg sm:text-xl font-bold">
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="text-[#C4A494] text-xs sm:text-sm">segundos</div>
          </div>
        </div>
        <Heart className="text-[#E5A19A] mt-4 sm:mt-6" size={20} />
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-[600px] aspect-square mx-auto flex items-center justify-center p-4">
      <div className="z-20 relative">
        <Countdown date={new Date("2025-11-08T20:00:00")} renderer={renderer} />
      </div>
      <Image
        src="/timer5.png"
        alt="Fondo decorativo"
        fill
        sizes="(max-width: 600px) 100vw, 600px"
        className="object-contain"
        priority
      />
    </div>
  );
}
