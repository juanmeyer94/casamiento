"use client";

import { useState } from "react";
import { ClipboardCheck, X } from "lucide-react";
import Image from "next/image";

export default function Tips() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto px-8 py-12 text-center ">
      <div className="relative w-full mb-8 ">
        <Image
          src="/floresEsquina.png"
          alt="Decorative floral element"
          width={150}
          height={150}
          className="absolute -left-8 -rotate-12 -top-12 opacity-80 z-20"
        />

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-[#E8D8D0] flex flex-col items-center">
          <h2 className="text-[#8B6F67] text-2xl">TIPS Y NOTAS</h2>
          <ClipboardCheck className="w-12 h-12 text-[#C4A494] m-4" />

          <p className="text-[#8B6F67]">
            Información adicional para tener en cuenta
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-16 py-2"
            type="button"
          >
            + Info
          </button>
        </div>
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
              <h3 className="text-2xl text-[#8B6F67] text-center font-medium">
                Tips y Notas
              </h3>
            </div>

            <div className="space-y-4 text-[#8B6F67]">
              <h3 className="font-medium">Ubicación:</h3>
              <p>El lugar cuenta con estacionamiento gratuito.</p>
              <h3 className="font-medium">Clima:</h3>
              <p>
                La ceremonia y recepción serán al aire libre. Se recomienda
                traer un abrigo ligero para la noche.
              </p>
              <h3 className="font-medium">Regalos:</h3>
              <p>
                Tu presencia es nuestro mejor regalo. Si deseas contribuir,
                encontrarás un buzón para sobres en la recepción.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
