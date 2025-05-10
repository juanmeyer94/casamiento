"use client";

import { useState, useEffect, useRef } from "react";
import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
} from "next/font/google";
import { Music, Pause } from "lucide-react";
import Image from "next/image";
import { motion } from "framer";

const playfair = PlayfairDisplay({ subsets: ["latin"] });
const cormorant = CormorantGaramond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Intro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/lethergo.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
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
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="h-[50vh] md:h-[70vh] relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              clipPath: "url(#multi-wave-clip)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/pareja.jpg"
              alt="Bride and groom in sunset field"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>

          {/* Definición del clip-path para múltiples ondas */}
          <svg className="absolute w-0 h-0">
            <defs>
              <clipPath id="multi-wave-clip" clipPathUnits="objectBoundingBox">
                <path d="M0,0 H1 V0.8 C0.9,0.85,0.7,0.9,0.5,0.85 C0.3,0.8,0.1,0.9,0,0.85 Z" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </motion.div>
      <motion.div
        className="min-h-[50vh] flex flex-col items-center justify-start px-4 py-6 relative max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.p
          className="text-[#C4A494] text-xl mb-8 tracking-widest border-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          7.11.2025
        </motion.p>
        <motion.div
          className={`${playfair.className} relative`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
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
        </motion.div>

        <motion.div
          className={`${cormorant.className} mt-16 max-w-md px-4 text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="text-8xl text-[#C4A494] block">&ldquo;</span>
          <p className="text-[#C4A494] text-2xl md:text-2xl lg:text-4xl leading-relaxed">
            Todos somos mortales,
            <br />
            hasta el primer beso y la segunda copa de vino
          </p>
          <span className="text-8xl text-[#C4A494] block mt-4">&rdquo;</span>
        </motion.div>

        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
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
        </motion.div>
      </motion.div>
    </>
  );
}
