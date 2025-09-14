/* eslint-disable */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
  Caveat,
} from "next/font/google";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const playfair = PlayfairDisplay({ subsets: ["latin"] });
const cormorant = CormorantGaramond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
const caveat = Caveat({ subsets: ["latin"] });

export default function Photos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Referencias para las animaciones de viewport
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const images = [
    {
      src: "/ivan-mica-1.jpg?height=1200&width=600",
      caption: "2017",
    },
    {
      src: "/ivan-mica-2.jpg?height=800&width=600",
      caption: "2018",
    },
    {
      src: "/ivan-mica-3.jpg?height=800&width=600",
      caption: "2019",
    },
    { src: "/ivan-mica-4.jpg?height=800&width=600", caption: "2020" },
    { src: "/ivan-mica-5.jpg?height=800&width=600", caption: "2021" },
    { src: "/ivan-mica-6.jpg?height=800&width=600", caption: "2022" },
    { src: "/ivan-mica-7.jpg?height=800&width=600", caption: "2023" },
    { src: "/ivan-mica-8.jpg?height=800&width=600", caption: "2024" },
    { src: "/ivan-mica-9.jpg?height=800&width=600", caption: "2025" },
  ];

  const totalImages = images.length;

  // Autoplay con loop infinito
  useEffect(() => {
    if (isInView && isAutoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
      }, 4000); // Cambia cada 4 segundos
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isInView, isAutoplay, totalImages]);

  // Funciones de navegación
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Funciones para manejo táctil
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      previousImage();
    }
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
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

  // Obtener las imágenes visibles (actual, anterior y siguiente)
  const getVisibleImages = () => {
    const prev = (currentIndex - 1 + totalImages) % totalImages;
    const next = (currentIndex + 1) % totalImages;
    return [prev, currentIndex, next];
  };

  return (
    <motion.div 
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-orange-50/80 via-white/80 to-pink-50/80 py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      {/* Video de fondo */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/video-background.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 mb-8">
            <motion.h1
              className={`${playfair.className} text-4xl md:text-5xl mb-4 font-bold text-gray-800`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Retratos de Nuestro Amor
            </motion.h1>
            <motion.p
              className={`${cormorant.className} text-xl md:text-2xl font-medium text-gray-600`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Un minuto, un segundo, un instante que queda en la eternidad
            </motion.p>
          </div>
        </motion.div>

        {/* Carrusel 3D Elegante */}
        <motion.div 
          ref={carouselRef}
          className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          {/* Contenedor del carrusel 3D */}
          <div className="relative flex items-center justify-center w-full h-full">
            {getVisibleImages().map((imageIndex, position) => {
              const isActive = position === 1; // La imagen del medio es la activa
              const isLeft = position === 0;
              const isRight = position === 2;
              
              return (
                <motion.div
                  key={`${imageIndex}-${currentIndex}`}
                  className={`absolute transition-all duration-800 ease-out ${
                    isActive 
                      ? 'w-[320px] md:w-[380px] h-[400px] md:h-[480px] z-20' 
                      : 'w-[200px] md:w-[240px] h-[250px] md:h-[300px] z-10'
                  }`}
                  style={{
                    transform: isActive 
                      ? 'translateX(0) scale(1) rotateY(0deg)' 
                      : isLeft 
                        ? 'translateX(-140px) scale(0.75) rotateY(15deg)' 
                        : 'translateX(140px) scale(0.75) rotateY(-15deg)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1 : 0.75,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  onClick={() => isActive && openModal(imageIndex)}
                  onKeyDown={(e) => isActive && handleKeyDown(e, () => openModal(imageIndex))}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                >
                  <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
                    <div className="relative w-full h-[85%] bg-gray-100">
                      <Image
                        src={images[imageIndex].src}
                        alt={`Foto ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                        priority={isActive}
                      />
                    </div>
                    <div className="h-[15%] bg-white flex items-center justify-center px-4">
                      <p className={`${caveat.className} text-center text-lg text-gray-700 font-medium`}>
                        {images[imageIndex].caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Botones de navegación */}
          <button
            className="absolute left-4 z-30 glass-button"
            onClick={previousImage}
            aria-label="Imagen anterior"
            type="button"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="absolute right-4 z-30 glass-button"
            onClick={nextImage}
            aria-label="Siguiente imagen"
            type="button"
          >
            <ChevronRight size={28} />
          </button>

          {/* Botón de autoplay */}
          <button
            className="absolute top-4 right-4 z-30 glass-button"
            onClick={toggleAutoplay}
            aria-label={isAutoplay ? "Pausar autoplay" : "Reanudar autoplay"}
            type="button"
          >
            {isAutoplay ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </motion.div>

        {/* Indicadores */}
        <motion.div 
          className="flex flex-col items-center gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {/* Indicador de autoplay */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isAutoplay ? 'bg-orange-500 animate-pulse' : 'bg-gray-400'
            }`} />
          </div>
          
          {/* Puntos de navegación */}
          <div className="flex justify-center items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => goToImage(index)}
                aria-label={`Ir a foto ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 glass-button"
                onClick={closeModal}
                type="button"
              >
                <X size={24} />
              </button>
              
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <Image
                  src={images[modalIndex].src}
                  alt="Foto ampliada"
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="p-6 bg-white">
                <p className={`${caveat.className} text-center text-2xl text-gray-700`}>
                  {images[modalIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
