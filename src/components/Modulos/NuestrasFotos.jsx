/* eslint-disable */
"use client";

import { useState, useRef } from "react";
import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
  Caveat,
} from "next/font/google";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

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
  
  // Referencias para las animaciones de viewport
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const images = [
    {
      src: "/ivan-mica-1.png?height=800&width=600",
      caption: "Nuestro primer día juntos",
    },
    {
      src: "/ivan-mica-2.png?height=800&width=600",
      caption: "Bajo la luz de la luna",
    },
    {
      src: "/ivan-mica-3.png?height=800&width=600",
      caption: "Momentos especiales",
    },
    { src: "/ivan-mica-4.png?height=800&width=600", caption: "Risas compartidas" },
    { src: "/ivan-mica-5.png?height=800&width=600", caption: "Amor eterno" },
    { src: "/ivan-mica-6.png?height=800&width=600", caption: "Juntos por siempre" },
    { src: "/ivan-mica-7.png?height=800&width=600", caption: "Juntos por siempre" },
    { src: "/ivan-mica-8.png?height=800&width=600", caption: "Juntos por siempre" },
    { src: "/ivan-mica-9.png?height=800&width=600", caption: "Juntos por siempre" },
    { src: "/ivan-mica-10.png?height=800&width=600", caption: "Juntos por siempre" },
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
    <motion.div 
      ref={ref}
      className="w-full max-w-md mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
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
          <div className="w-44 h-44 bg-white shadow-md flex items-center justify-center p-2">
            <div className="relative w-32 h-32">
              <Image
                src="/camera-example.jpg"
                alt="Novios ilustración"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-white/50 mb-6">
          <motion.h1
            className={`${playfair.className} text-[#000000] text-4xl md:text-5xl mb-4 font-bold`}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Retratos de Nuestro Amor
          </motion.h1>
          <motion.p
            className={`${cormorant.className} text-[#2e2c2b] text-xl md:text-2xl font-medium`}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Un minuto, un segundo, un instante que queda en la eternidad
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className="relative flex justify-center items-center gap-4 h-[400px] md:h-[500px]"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <button
          className="absolute left-0 z-10 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Previous image"
          type="button"
          onClick={() =>
            setCarouselIndex((prev) => previousImage(prev, images.length))
          }
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
              onKeyDown={(e) =>
                i === 1 && handleKeyDown(e, () => openModal(index))
              }
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
          onClick={() =>
            setCarouselIndex((prev) => nextImage(prev, images.length))
          }
        >
          <ChevronRight size={24} />
        </button>
        </motion.div>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-3 rounded-full shadow-md hover:bg-opacity-90 transition-all"
              aria-label="Previous image"
              type="button"
              onClick={() =>
                setCarouselIndex((prev) => previousImage(prev, images.length))
              }
            >
              <ChevronLeft size={28} className="text-[#8B6F6F]" />
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
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-3 rounded-full shadow-md hover:bg-opacity-90 transition-all"
              aria-label="Next image"
              type="button"
              onClick={() =>
                setCarouselIndex((prev) => nextImage(prev, images.length))
              }
            >
              <ChevronRight size={28} className="text-[#8B6F6F]" />
            </button>
          </div>
        {/* Cierre correcto del contenedor modal */}
        </div>
      )}
    </motion.div>
  );
}
