import Image from "next/image";
import { Instagram } from "lucide-react";

export default function PhotosShare() {
  return (
    <div className="relative w-full mx-auto px-4 py-12 h-screen flex flex-col items-center justify-center text-center bg-black">
      <div className="absolute inset-0">
        <Image
          src="/fondo-button-page.jpeg"
          alt="Fondo romántico"
          fill
          className="object-cover object-center brightness-75"
          priority
        />
      </div>
      {/* Efecto ondulado superior */}
      <div className="absolute -top-3 left-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-28 text-pink-50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,224L60,197.3C120,171,240,117,360,101.3C480,85,600,107,720,144C840,181,960,235,1080,218.7C1200,203,1320,117,1380,74.7L1440,32V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z" />
        </svg>
      </div>
      <div className="relative z-10 text-white space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Compartimos este día junto a ti
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Comparte tus fotos y videos de este hermoso día
        </p>
        <div className="flex flex-col items-center space-y-8">
          <Instagram className="h-10 w-10 opacity-90" />
          <p className="text-xl md:text-2xl font-semibold bg-white text-[#8B6F6F] px-4 py-1 rounded-md">
            #MicaIvan2025
          </p>
        </div>
      </div>
    </div>
  );
}
