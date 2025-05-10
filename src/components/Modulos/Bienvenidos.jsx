"use client";

import { Playfair_Display as playfairDisplay } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

const playfair = playfairDisplay({ subsets: ["latin"] });

export default function Bienvenidos() {
  const { status } = useSession();

  const handleLogin = () => {
    if (status === "unauthenticated") {
      signIn("google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full text-center relative">
        <div className="w-full flex justify-center border-b-2">
          <Image
            src="/flores2.png?height=100&width=300"
            alt="Decorative flowers top"
            width={500}
            height={100}
            className="opacity-80"
          />
        </div>
        <div className="space-y-6">
          <p className="text-rose-300 text-lg">
            Bienvenidos a la invitación de
          </p>
          <div className={playfair.className}>
            <h1 className="text-4xl md:text-5xl text-[#8B6F6F] tracking-wide">
              IVAN
              <span className="inline-block mx-2">&</span>
              MICA
            </h1>
          </div>
          <div className="w-full flex justify-center border-t-2">
            <Image
              src="/flores2.png?height=100&width=300"
              alt="Decorative flowers bottom"
              width={500}
              height={100}
              className="opacity-80 rotate-180"
            />
          </div>
          <p className="text-rose-300 text-sm mt-8">
            La música de fondo es parte de la experiencia
          </p>
          <div>
            {status === "authenticated" ? (
              <Link
                href="/casamiento"
                className="bg-[#8B6F6F] text-white py-2 px-4 rounded-md hover:bg-[#8B6F6F]/80 transition duration-300"
              >
                Ver invitación
              </Link>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-[#8B6F6F] text-white py-2 px-4 rounded-md hover:bg-[#8B6F6F]/80 transition duration-300"
                type="button"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
