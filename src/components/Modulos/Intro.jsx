"use client";

import { useState } from "react";
import {
  Playfair_Display as playfairDisplay,
  Cormorant_Garamond as cormorantGaramond,
} from "next/font/google";
import { Music, Pause } from "lucide-react";
import Image from "next/image";

const playfair = playfairDisplay({ subsets: ["latin"] });
const cormorant = cormorantGaramond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Intro() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="min-h-screen relative bg-white">
      <div className="h-[50vh] relative overflow-hidden">
        <Image
          src="/pareja.jpg"
          alt="Bride and groom in sunset field"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute -bottom-1 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120V0C240 80 480 120 720 120C960 120 1200 80 1440 0V120H0Z"
              fill="white"
            />
          </svg>
          <div className="absolute bottom-0 w-32 h-32">
            <Image
              src="/flores2.png"
              alt="Left decorative flowers"
              width={128}
              height={128}
              className="opacity-80"
            />
          </div>
          <div className="absolute bottom-0  w-32 h-32">
            <Image
              src="/flores2.png"
              alt="Right decorative flowers"
              width={128}
              height={128}
              className="opacity-80 scale-x-[-1]"
            />
          </div>
        </div>
      </div>
      <div className="min-h-[50vh] flex flex-col items-center justify-start px-4 pt-12 pb-24 relative">
        <p className="text-[#C4A494] text-xl mb-8 tracking-widest">
          15.05.2021
        </p>

        <div className={`${playfair.className} relative`}>
          <div className="absolute -inset-4 bg-[#F5E6E0] rounded-full -rotate-12 opacity-50" />
          <h1 className="text-4xl md:text-6xl text-[#8B6F6F] tracking-wide relative">
            IVAN
            <span className="inline-block mx-2">&</span>
            MICA
          </h1>
        </div>

        <div className={`${cormorant.className} mt-16 max-w-md px-4`}>
          <span className="text-6xl text-[#C4A494] block mb-4">&ldquo;</span>
          <p className="text-[#C4A494] text-xl md:text-2xl leading-relaxed">
            Todos somos mortales,
            <br />
            hasta el primer beso y la segunda copa de vino
          </p>
          <span className="text-6xl text-[#C4A494] block mt-4">&rdquo;</span>
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
    </div>
  );
}
