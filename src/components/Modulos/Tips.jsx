"use client";

import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
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
        <div
          className="fixed inset-0 flex items-center justify-center bg-red-200/50 backdrop-blur-sm z-50"
          role="button"
          tabIndex="0"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsOpen(false);
            }
          }}
        >
          <div className="relative bg-white p-6 rounded-lg w-80 text-center shadow-lg">
            <Image
              src="/tryit1.png"
              alt="Decorative image"
              width={300}
              height={200}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md -z-10 rotate-90"
            />
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md border border-[#E8D8D0] z-10">
              <ClipboardCheck className="w-10 h-10 text-[#C4A494]" />
            </div>
            <h3 className="text-[#8B6F6F] text-xl mt-8 mb-4">Tips y Notas</h3>
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
            <button
              onClick={() => setIsOpen(false)}
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
