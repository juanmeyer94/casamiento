"use client";

import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
} from "next/font/google";
import { MapPin } from "lucide-react";
import Image from "next/image";

const playfair = PlayfairDisplay({ subsets: ["latin"] });
const cormorant = CormorantGaramond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function GeneralInfo() {
  const handleAgendar = () => {
  };

  const handleComoLlegar = () => {
    window.open(
      "https://maps.google.com/?q=Parroquia+Nuestra+Señora+de+Lujan",
      "_blank",
    );
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-24">
      {/* Divisorio inicial */}
      <div className="relative h-24 mb-24">
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
          <Image
            src="/lineaconcorazon.png"
            alt="Divisor decorativo"
            width={1000}
            height={50}
            className="w-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Ceremonia */}
      <div className="relative flex justify-center mb-12">
        <div className="relative bg-transparent px-24 py-2 rounded-sm transform -skew-x-12 overflow-hidden">
          <Image
            src="/fondo2.png"
            alt="Fondo decorativo"
            fill
            className="object-cover"
            priority
          />
          <h1
            className={`${playfair.className} text-[#8B6F6F] text-2xl transform skew-x-12 relative z-10`}
          >
            Ceremonia
          </h1>
        </div>
      </div>

      {/* Información de la ceremonia */}
      <div className="space-y-8 text-center mb-24">
        <div>
          <h2
            className={`${cormorant.className} text-[#8B6F6F] text-2xl font-semibold mb-2`}
          >
            DÍA
          </h2>
          <p
            className={`${cormorant.className} text-[#C4A494] text-xl font-medium`}
          >
            Sábado 15 de Mayo - 17hs
          </p>
          <button
            onClick={handleAgendar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-8 py-2"
            type="button"
          >
            Agendar
          </button>
        </div>

        <div>
          <h2
            className={`${cormorant.className} text-[#8B6F6F] text-2xl font-semibold mb-2`}
          >
            LUGAR
          </h2>
          <p
            className={`${cormorant.className} text-[#C4A494] text-xl font-medium`}
          >
            Catedral Rafaela
          </p>
          <button
            onClick={handleAgendar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-8 py-2"
            type="button"
          >
            Confirmar asistencia
          </button>
        </div>

        <div>
          <h2
            className={`${cormorant.className} text-[#8B6F6F] text-2xl font-semibold mb-2`}
          >
            DIRECCIÓN
          </h2>
          <p
            className={`${cormorant.className} text-[#C4A494] text-xl font-medium`}
          >
            Belgrano 20 - Rafaela, Santa Fe
          </p>
          <button
            onClick={handleComoLlegar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-12 py-2"
            type="button"
          >
            <div className="flex items-center justify-center gap-2">
              <MapPin size={18} />
              Cómo llegar
            </div>
          </button>
        </div>
      </div>

      {/* Divisorio de celebración */}
      <div className="relative h-32 mb-12">
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
          <Image
            src="/lineaconcorazon.png"
            alt="Divisor decorativo"
            width={1000}
            height={50}
            className="w-full object-cover opacity-50"
            priority
          />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-44 h-44 bg-white rounded-full shadow-md flex items-center justify-center p-2">
            <div className="relative w-32 h-32">
              <Image
                src="/bodanovios.png"
                alt="Novios ilustración"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Celebración título */}
      <div className="relative flex justify-center mb-12">
        <div className="relative bg-transparent px-24 py-2 rounded-sm transform -skew-x-12 overflow-hidden">
          <Image
            src="/fondo2.png"
            alt="Fondo decorativo"
            fill
            className="object-cover"
            priority
          />
          <h1
            className={`${playfair.className} text-[#8B6F6F] text-2xl transform skew-x-12 relative z-10`}
          >
            Celebración
          </h1>
        </div>
      </div>

      {/* Información de la celebración */}
      <div className="space-y-8 text-center">
        <div>
          <h2
            className={`${cormorant.className} text-[#8B6F6F] text-2xl font-semibold mb-2`}
          >
            DÍA
          </h2>
          <p
            className={`${cormorant.className} text-[#C4A494] text-xl font-medium`}
          >
            Sábado 15 de Mayo - 17hs
          </p>
          <button
            onClick={handleAgendar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-8 py-2"
            type="button"
          >
            Agendar
          </button>
        </div>

        <div>
          <h2
            className={`${cormorant.className} text-[#8B6F6F] text-2xl font-semibold mb-2`}
          >
            LUGAR
          </h2>
          <p
            className={`${cormorant.className} text-[#C4A494] text-xl font-medium`}
          >
            No me acuerdo - Rafaela
          </p>
          <button
            onClick={handleAgendar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-8 py-2"
            type="button"
          >
            Confirmar asistencia
          </button>
        </div>

        <div>
          <h2
            className={`${cormorant.className} text-[#8B6F6F] text-2xl font-semibold mb-2`}
          >
            DIRECCIÓN
          </h2>
          <p
            className={`${cormorant.className} text-[#C4A494] text-xl font-medium`}
          >
            Ruta km tanto - Rafaela, Santa Fe
          </p>
          <button
            onClick={handleComoLlegar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-12 py-2"
            type="button"
          >
            <div className="flex items-center justify-center gap-2">
              <MapPin size={18} />
              Cómo llegar
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
