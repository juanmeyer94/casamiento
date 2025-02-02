"use client";

import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
} from "next/font/google";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const playfair = PlayfairDisplay({ subsets: ["latin"] });
const cormorant = CormorantGaramond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function GeneralInfo() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isPartyMapModalOpen, setIsPartyMapModalOpen] = useState(false);

  const handleAgendar = () => {};

  return (
    <div className="w-full max-w-md mx-auto px-4 py-24">
      {/* Divisorio inicial */}
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
                src="/anillosbodas2.png"
                alt="Novios ilustración"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
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
            className={`${playfair.className} text-[#8B6F6F] text-3xl transform skew-x-12 relative z-10`}
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
            className={`${cormorant.className} text-[#C4A494] text-xl font-semimedium`}
          >
            Sábado 15 de Mayo - 17hs
          </p>
          <button
            onClick={handleAgendar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-16 py-2 font-bold"
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
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-6 py-2 font-bold"
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
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-10 py-2"
            type="button"
            onClick={() => setIsMapModalOpen(true)}
          >
            <div className="flex items-center justify-center gap-2 font-bold">
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
                src="/noviosboda2.png"
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
            className={`${playfair.className} text-[#8B6F6F] text-3xl transform skew-x-12 relative z-10`}
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
            Sábado 8 de Noviembre - 21hs
          </p>
          <button
            onClick={handleAgendar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-16 py-2 font-bold"
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
            Ruta Nacional 34 - Rafaela
          </p>
          <button
            onClick={handleAgendar}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-6 py-2 font-bold"
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
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-10 py-2"
            type="button"
            onClick={() => setIsPartyMapModalOpen(true)}
          >
            <div className="flex items-center justify-center gap-2 font-bold">
              <MapPin size={18} />
              Cómo llegar
            </div>
          </button>
        </div>
      </div>
      {isMapModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-lg w-96 text-center shadow-lg">
            <h3 className="text-[#8B6F6F] text-xl mb-4 flex items-center justify-center gap-2">
              Cómo llegar
              <MapPin className="w-6 h-6 text-[#C4A494]" />
            </h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4072.535002684345!2d-61.49178479999999!3d-31.253860399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95caae37f4ad98e7%3A0x70298b01c7633f9e!2sCatedral%20San%20Rafael!5e1!3m2!1ses!2sar!4v1738416547977!5m2!1ses!2sar"
              width="100%"
              height="300"
              title="Celebration location"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <button
              onClick={() => setIsMapModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {isPartyMapModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-lg w-96 text-center shadow-lg">
            <h3 className="text-[#8B6F6F] text-xl mb-4 flex items-center justify-center gap-2">
              Cómo llegar
              <MapPin className="w-6 h-6 text-[#C4A494]" />
            </h3>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2040.3614229876814!2d-61.460713!3d-31.063535299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943553c9421c3b6d%3A0x8d3c3c039df9284f!2sMaria%2C%20Hostal%20y%20Eventos!5e1!3m2!1ses!2sar!4v1738417205493!5m2!1ses!2sar"
              width="100%"
              height="300"
              title="Party location"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <button
              onClick={() => setIsPartyMapModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
