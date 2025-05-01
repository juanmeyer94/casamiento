"use client";

import { useState } from "react";
import Image from "next/image";
import { FolderIcon as ClothesHanger } from "lucide-react";

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
              <ClothesHanger className="w-10 h-10 text-[#C4A494]" />
            </div>
            <h3 className="text-[#8B6F6F] text-xl mt-8 mb-4">Dress Code</h3>
            <div className="space-y-4 text-[#8B6F67]">
              <p>Formalsss</p>
              <h3 className="font-medium">Para ellas:</h3>
              <p>
                Vestido largo, en tonos suaves o pasteles. Evitar blanco y
                negro.
              </p>
              <h3 className="font-medium">Para ellos:</h3>
              <p>Traje oscuro o claro con corbata. Evitar smoking.</p>
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
