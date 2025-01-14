"use client";

import { useState } from "react";
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
  const [isPlaying, setIsPlaying] = useState(true);

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
          15.05.2021
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
          <p className="text-[#C4A494] text-xl md:text-2xl lg:text-4xl leading-relaxed">
            Todos somos mortales,
            <br />
            hasta el primer beso y la segunda copa de vino
          </p>
          <span className="text-8xl text-[#C4A494] block mt-4 ">&rdquo;</span>
        </div>

        <div className="fixed bottom-6 right-6">
          <button
            type="button"
            className="rounded-full bg-[#F5E6E0] border-none hover:bg-[#E5D5CF] p-2"
            onClick={() => setIsPlaying(!isPlaying)}
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
