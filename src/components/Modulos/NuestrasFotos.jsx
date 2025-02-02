"use client";

import { useState } from "react";
import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
  Caveat,
} from "next/font/google";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const playfair = PlayfairDisplay({ subsets: ["latin"] });
const cormorant = CormorantGaramond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
const caveat = Caveat({ subsets: ["latin"] });

export default function Photos() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const images = [
    {
      src: "/pareja1.webp?height=800&width=600",
      caption: "Nuestro primer día juntos",
    },
    {
      src: "/pareja2.webp?height=800&width=600",
      caption: "Bajo la luz de la luna",
    },
    {
      src: "/pareja3.webp?height=800&width=600",
      caption: "Momentos especiales",
    },
    { src: "/pareja4.jpg?height=800&width=600", caption: "Risas compartidas" },
    { src: "/pareja5.jpeg?height=800&width=600", caption: "Amor eterno" },
    { src: "/pareja6.jpg?height=800&width=600", caption: "Juntos por siempre" },
  ];

  const nextImage = (index, length) => (index + 1) % length;
  const previousImage = (index, length) => (index - 1 + length) % length;

  const getVisibleCarouselImages = () => {
    const prev = previousImage(carouselIndex, images.length);
    const next = nextImage(carouselIndex, images.length);
    return [prev, carouselIndex, next];
  };

  const openModal = (index) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const getRotationClass = (index) => {
    if (index === 1) return "transform-none";
    if (index === 0) return "-rotate-6";
    return "rotate-6";
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
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
                src="/camerafloressf.png"
                alt="Novios ilustración"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-6">
        <h1
          className={`${playfair.className} text-[#8B6F6F] text-4xl md:text-5xl mb-4`}
        >
          Retratos de Nuestro Amor
        </h1>
        <p
          className={`${cormorant.className} text-[#C4A494] text-xl md:text-2xl`}
        >
          Un minuto, un segundo, un instante que queda en la eternidad
        </p>
      </div>

      <div className="relative flex justify-center items-center gap-4 h-[400px] md:h-[500px]">
        <button
          className="absolute left-0 z-10 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Previous image"
          type="button"
          onClick={() => setCarouselIndex((prev) => previousImage(prev, images.length))}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex justify-center items-center gap-4 overflow-hidden">
          {getVisibleCarouselImages().map((index, i) => (
            <div
              key={index}
              className={`relative transition-all duration-500 ease-in-out 
                ${
                  i === 1
                    ? "w-[280px] md:w-[320px] h-[340px] md:h-[400px] z-10"
                    : "w-[40px] md:w-[100px] h-[340px] md:h-[400px] opacity-60"
                }
              `}
              onClick={() => i === 1 && openModal(index)}
              onKeyDown={(e) => i === 1 && handleKeyDown(e, () => openModal(index))}
              role="button"
              tabIndex={i === 1 ? 0 : -1}
            >
              <div
                className={`absolute inset-0 bg-white p-3 shadow-[0_0_10px_rgba(0,0,0,0.1)] 
              ${getRotationClass(i)}
              `}
              >
                <div className="relative w-full h-[85%] bg-gray-100">
                  <Image
                    src={images[index].src || "/placeholder.svg"}
                    alt={`Foto ${index + 1}`}
                    fill
                    className="object-cover sepia brightness-[0.95] contrast-[1.05]"
                  />
                </div>
                <div className="h-[15%] bg-white pt-2">
                  <p
                    className={`${caveat.className} text-center text-lg text-gray-700`}
                  >
                    {images[index].caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 z-10 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Next image"
          type="button"
          onClick={() => setCarouselIndex((prev) => nextImage(prev, images.length))}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 bg-red-200 bg-opacity-65 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={(e) => handleKeyDown(e, closeModal)}
          role="button"
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 bg-red-400 rounded-full"
            onClick={closeModal}
            type="button"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-h-[90vh] w-[190vw] md:max-w-3xl bg-white rounded-xl p-6 shadow-2xl shadow-black"
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute left-0 text-gray-700 text-6xl h-full px-1 z-20 font-bold"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((prev) => previousImage(prev, images.length));
              }}
              type="button"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="relative w-full" style={{ paddingBottom: "80%" }}>
              <div className="">
                <div className=" w-full h-[85%]">
                  <Image
                    src={images[modalIndex].src || "/placeholder.svg"}
                    alt="Foto ampliada"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="h-[15%] bg-white flex items-center justify-center">
                  <p
                    className={`${caveat.className} text-center text-2xl md:text-3xl text-gray-700`}
                  >
                    {images[modalIndex].caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="absolute right-0 z-10 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setModalIndex((prev) => nextImage(prev, images.length));
            }}
            type="button"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
