"use client";

import { useState } from "react";
import { X, Gift } from "lucide-react";
import Image from "next/image";
import { Playfair_Display as PlayfairDisplay } from "next/font/google";

const playfair = PlayfairDisplay({ subsets: ["latin"] });

export default function Regalos() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
      <div className="relative h-32 mb-12">
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
          <Image
            src="/lineaconcorazon.png"
            alt="Divisor decorativo"
            width={500}
            height={50}
            className="w-full object-cover opacity-50"
            priority
          />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-44 h-44 bg-white rounded-full shadow-md flex items-center justify-center p-2">
            <div className="relative w-40 h-40">
              <Image
                src="/regalo.png"
                alt="Novios ilustración"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-lg flex flex-col items-center text-center space-y-4 max-w-sm mx-auto relative">
        <h2
          className={`${playfair.className} text-[#8B6F67] text-5xl font-medium`}
        >
          Regalos
        </h2>
        <p className="text-[#C4A494] text-lg max-w-[250px]">
          Si deseas regalarnos algo más que tu hermosa presencia...
        </p>
        <Gift className="w-12 h-12 text-[#C69C98]" />
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-14 py-2"
          type="button"
        >
          Ver Más
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-red-200 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative border-[#E8D8D0] border">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h3
                className={`${playfair.className} text-2xl text-[#8B6F67] text-center font-medium`}
              >
                Datos Bancarios
              </h3>
            </div>
            <div className="space-y-6 text-[#8B6F67]">
              <div className="space-y-2">
                <h4 className="font-medium">Banco Principal</h4>
                <p className="text-lg">Banco Santander</p>
                <div className="bg-[#FAF7F6] p-4 rounded-lg space-y-2">
                  <p>
                    <span className="font-medium">Titular:</span>
                    Nombre del Titular
                  </p>
                  <p>
                    <span className="font-medium">Cuenta:</span>
                    XXXX XXXX XXXX XXXX
                  </p>
                  <p>
                    <span className="font-medium">CBU:</span>
                    XXXXXXXXXXXXXXXX
                  </p>
                  <p>
                    <span className="font-medium">Alias:</span>
                    BODA.NOMBRES.2024
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Banco Alternativo</h4>
                <p className="text-lg">Banco Galicia</p>
                <div className="bg-[#FAF7F6] p-4 rounded-lg space-y-2">
                  <p>
                    <span className="font-medium">Titular:</span>
                    Nombre del Titular
                  </p>
                  <p>
                    <span className="font-medium">Cuenta:</span>
                    XXXX XXXX XXXX XXXX
                  </p>
                  <p>
                    <span className="font-medium">CBU:</span>
                    XXXXXXXXXXXXXXXX
                  </p>
                  <p>
                    <span className="font-medium">Alias:</span>
                    CASAMIENTO.NOMBRES.2024
                  </p>
                </div>
              </div>
              <p className="text-center italic text-[#C4A494]">
                ¡Gracias por ser parte de nuestro día especial!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
