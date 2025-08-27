"use client";

import { useRef } from "react";
import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
} from "next/font/google";
import { Music, Pause } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useAudio } from "../AudioProvider";

const playfair = PlayfairDisplay({ subsets: ["latin"] });
const cormorant = CormorantGaramond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Intro() {
  const {
    isPlaying,
    togglePlay,
    mounted,
    audioReady,
  } = useAudio();

  // Referencias para las animaciones de viewport
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 });
  const contentInView = useInView(contentRef, { once: true, threshold: 0.3 });

  // Renderizar un placeholder mientras no esté montado
  if (!mounted) {
    return (
      <>
        <div className="relative w-full">
          <div className="h-[50vh] md:h-[70vh] relative overflow-hidden mx-auto">
            <div>
              <div className="absolute inset-0">
                <Image
                  src="/titulo-mica-ivan.png"
                  alt="Bride and groom in sunset field"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[50vh] flex flex-col items-center justify-start px-4 py-6 relative max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/50 mb-8">
            <p className="text-[#000000] text-xl tracking-widest border-y-2 py-2 font-semibold">
              8.11.2025
            </p>
          </div>
          <div className={`${playfair.className} relative bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-white/50`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-[#000000] tracking-wide relative font-bold">
              IVAN
              <span className="inline-block mx-2">&</span>
              MICA
            </h1>
          </div>
          <div className={`${cormorant.className} mt-16 max-w-md px-4 text-center bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/50`}>
            <span className="text-6xl text-gray-500 block">&ldquo;</span>
            <p className="text-gray-700 text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium">
              Todos somos mortales,
              <br />
              hasta el primer beso y la segunda copa de vino
            </p>
            <span className="text-6xl text-gray-500 block mt-4">&rdquo;</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <motion.div
        ref={heroRef}
        className="relative w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
      >
        <div className="h-[50vh] md:h-[70vh] relative overflow-hidden mx-auto">
          <div>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/titulo-mica-ivan.png"
                alt="Bride and groom in sunset field"
                fill
                className="object-contain object-center"
                priority
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        ref={contentRef}
        className="min-h-[50vh] flex flex-col items-center justify-start px-4 py-6 relative max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/50 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-[#000000] text-xl tracking-widest border-y-2 py-2 font-semibold">
            8.11.2025
          </p>
        </motion.div>

        <motion.div
          className={`${playfair.className} relative bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-white/50`}
          initial={{ opacity: 0, y: 40 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-[#000000] tracking-wide relative font-bold">
            IVAN
            <span className="inline-block mx-2">&</span>
            MICA
          </h1>
        </motion.div>

        <motion.div
          className={`${cormorant.className} mt-16 max-w-md px-4 text-center bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/50`}
          initial={{ opacity: 0, y: 40 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <span className="text-6xl text-gray-500 block">&ldquo;</span>
          <p className="text-gray-700 text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium">
            Todos somos mortales,
            <br />
            hasta el primer beso y la segunda copa de vino
          </p>
          <span className="text-6xl text-gray-500 block mt-4">&rdquo;</span>
        </motion.div>

        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={contentInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            type="button"
            className={`rounded-full p-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
              audioReady
                ? "bg-gray-100 border-none hover:bg-gray-200"
                : "bg-gray-300 border-none cursor-not-allowed"
            }`}
            onClick={togglePlay}
            disabled={!audioReady}
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-gray-600" />
            ) : (
              <Music className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}
