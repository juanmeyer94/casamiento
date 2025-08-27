"use client";

import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Music, Pause } from "lucide-react";
import { useAudio } from "../AudioProvider";

export default function Bienvenidos() {
  const { status } = useSession();
  const {
    isPlaying,
    togglePlay,
    mounted,
    audioReady,
  } = useAudio();

  const handleLogin = () => {
    if (status === "unauthenticated") {
      signIn("google");
    }
  };

  // Renderizar un placeholder mientras no esté montado
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center">
          <Image
            src="/titulo-mica-ivan.png"
            alt="Iván & Mica - Invitación"
            width={400}
            height={300}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="mt-16">
          <button
            className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-xl transform transition-all duration-300 text-lg font-semibold lowercase tracking-wide shadow-lg"
            type="button"
          >
            ver invitación
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Imagen principal */}
        <Image
          src="/titulo-mica-ivan.png"
          alt="Iván & Mica - Invitación"
          width={400}
          height={300}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Botón separado más abajo */}
      <div className="mt-16">
        {status === "authenticated" ? (
          <Link
            href="/casamiento"
            className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-xl transform transition-all duration-300 text-lg font-semibold lowercase tracking-wide shadow-lg"
          >
            ver invitación
          </Link>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-xl transform transition-all duration-300 text-lg font-semibold lowercase tracking-wide shadow-lg"
            type="button"
          >
            ver invitación
          </button>
        )}
      </div>

      {/* Botón de música */}
      <div className="fixed bottom-6 right-6 z-50">
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
      </div>
    </div>
  );
}
