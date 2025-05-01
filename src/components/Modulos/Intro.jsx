"use client";

import { useState, useEffect, useRef } from "react";
import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
} from "next/font/google";
import { Music, Pause } from "lucide-react";
import Image from "next/image";

const playfair = PlayfairDisplay({ subsets: ["latin"] });
const cormorant = CormorantGaramond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Intro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/lethergo.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5; // 🔊 Reducir volumen al 50%

      // Intentar reproducción automática
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Si falla, esperar la interacción del usuario
            const handleUserInteraction = () => {
              audioRef.current?.play();
              setIsPlaying(true);
              document.removeEventListener("click", handleUserInteraction);
              document.removeEventListener("touchstart", handleUserInteraction);
            };
            document.addEventListener("click", handleUserInteraction);
            document.addEventListener("touchstart", handleUserInteraction);
          });
      }
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <div className="h-[50vh] md:h-[70vh] relative overflow-hidden">
          <Image
            src="/pareja.jpg"
            alt="Bride and groom in sunset field"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute -bottom-1 left-0 right-0">
            <svg
              viewBox="0 0 1440 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full text-pink-50"
              preserveAspectRatio="none"
            >
              <path
                d="M0 120V0C390 180 720 10 1080 90C1260 130 1440 60 1440 60V200H0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="min-h-[50vh] flex flex-col items-center justify-start px-4 py-6 relative max-w-4xl mx-auto">
        <p className="text-[#C4A494] text-xl mb-8 tracking-widest border-y-2">
          7.11.2025
        </p>
        <div className={`${playfair.className} relative`}>
          <div className="absolute -inset-4">
            <Image
              src="/fondo.png"
              alt="Fondo decorativo"
              fill
              className="object-cover rounded-full -rotate-12"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-[#8B6F6F] tracking-wide relative">
            IVAN
            <span className="inline-block mx-2">&</span>
            MICA
          </h1>
        </div>

        <div
          className={`${cormorant.className} mt-16 max-w-md px-4 text-center`}
        >
          <span className="text-8xl text-[#C4A494] block">&ldquo;</span>
          <p className="text-[#C4A494] text-2xl md:text-2xl lg:text-4xl leading-relaxed">
            Todos somos mortales,
            <br />
            hasta el primer beso y la segunda copa de vino
          </p>
          <span className="text-8xl text-[#C4A494] block mt-4">&rdquo;</span>
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            className="rounded-full bg-[#F5E6E0] border-none hover:bg-[#E5D5CF] p-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-[#8B6F6F]" />
            ) : (
              <Music className="h-6 w-6 text-[#8B6F6F]" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
