"use client";

import { useState, useRef } from "react";
import { X, Gift } from "lucide-react";
import Image from "next/image";
import { Playfair_Display as PlayfairDisplay } from "next/font/google";
import { motion, useInView } from "framer-motion";

const playfair = PlayfairDisplay({ subsets: ["latin"] });

export default function Regalos() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Referencias para las animaciones de viewport
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="w-full max-w-md mx-auto px-8 py-12 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative w-full mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Área central con regalo principal y elementos alrededor */}
        <div className="relative h-48 mb-6 flex items-center justify-center">
          {/* Título en el centro */}
          <motion.h2
            className="absolute z-20 text-[#000000] text-2xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            REGALOS
          </motion.h2>

          {/* Elementos decorativos alrededor */}
          <motion.div
            className="absolute top-2 left-4 text-2xl"
            animate={{
              y: [-5, -15, -5],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🎀
          </motion.div>

          <motion.div
            className="absolute top-4 right-6 text-xl"
            animate={{
              y: [-3, -12, -3],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            💝
          </motion.div>

          <motion.div
            className="absolute bottom-6 left-6 text-lg"
            animate={{
              y: [-4, -10, -4],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          >
            💕
          </motion.div>

          <motion.div
            className="absolute bottom-4 right-4 text-xl"
            animate={{
              y: [-6, -18, -6],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            🎁
          </motion.div>

          <motion.div
            className="absolute top-8 left-1/2 transform -translate-x-1/2 text-lg"
            animate={{
              y: [-2, -8, -2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute bottom-8 right-1/2 transform translate-x-1/2 text-lg"
            animate={{
              y: [-3, -9, -3],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          >
            🎀
          </motion.div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-white/50 mb-6">
          <motion.p
            className="text-[#2e2c2b] text-lg mb-6 text-center max-w-sm mx-auto font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            ✨ Si deseas regalarnos algo más que tu hermosa presencia...
          </motion.p>
        </div>

        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-[#ffffff] text-black border-2 border-black rounded-full px-8 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
          type="button"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Ver Más
        </motion.button>
      </motion.div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-300/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                <p className="text-lg">Banco Galicia</p>
                <div className="bg-[#FAF7F6] p-4 rounded-lg space-y-2">
                  <p>
                    <span className="font-medium">Titular: </span>
                    Ivan Alejandro Meyer
                  </p>
                  <p>
                    <span className="font-medium">CBU: </span>
                    0070111830004170374926
                  </p>
                  <p>
                    <span className="font-medium">Alias: </span>
                    IVAN.MEYER.GALICIA
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
    </motion.div>
  );
}
