"use client";

import { useState } from "react";
import Image from "next/image";
import { X, FolderIcon as ClothesHanger } from "lucide-react";

export default function DressTips() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto px-8 text-center">
      <div className="relative w-full mb-8 ">
        <Image
          src="/floresEsquina.png"
          alt="Decorative floral element"
          width={150}
          height={150}
          className="absolute -top-14 -right-8 rotate-8 opacity-80 z-20 scale-x-[-1]"
        />

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-[#E8D8D0] flex-col items-center flex">
          <h2 className="text-[#8B6F6F] text-2xl mb-4 flex items-center justify-center gap-2">
            DRESS CODE
          </h2>
          <ClothesHanger className="w-12 h-12 text-[#C4A494]" />
          <p className="text-[#8B6F67] text-lg">
            Una orientación para tu vestuario
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-14 py-2"
            type="button"
          >
            Ver Más
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
                Dress Code
              </h3>
            </div>

            <div className="space-y-4 text-[#8B6F67]">
              <p>Formal</p>
              <h3 className="font-medium">Para ellas:</h3>
              <p>
                Vestido largo, en tonos suaves o pasteles. Evitar blanco
                y negro.
              </p>
              <h3 className="font-medium">Para ellos:</h3>
              <p>Traje oscuro o claro con corbata. Evitar smoking.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
