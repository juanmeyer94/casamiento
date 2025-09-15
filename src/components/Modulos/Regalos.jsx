"use client";

import { useState, useRef } from "react";
import { X, Copy, Check } from "lucide-react";
import { Playfair_Display as PlayfairDisplay } from "next/font/google";
import { motion, useInView } from "framer-motion";

const playfair = PlayfairDisplay({ subsets: ["latin"] });

export default function Regalos() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCBU, setCopiedCBU] = useState(false);
  const [copiedAlias, setCopiedAlias] = useState(false);

  // Referencias para las animaciones de viewport
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const cbu = "0070665630004003642015";
  const alias = "BODA.IVAN.Y.MICA";

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "cbu") {
        setCopiedCBU(true);
        setTimeout(() => setCopiedCBU(false), 3000);
      } else if (type === "alias") {
        setCopiedAlias(true);
        setTimeout(() => setCopiedAlias(false), 3000);
      }
    } catch (err) {
      // Error al copiar al portapapeles
    }
  };

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
                <div className="bg-[#FAF7F6] p-4 rounded-lg space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-800 text-center">
                      Titular:
                      <span className="font-bold">Ivan Alejandro Meyer</span>
                    </p>
                  </div>

                  {/* CBU con botón de copia */}
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">CBU:</p>
                    <p className="font-mono text-sm mb-2">{cbu}</p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => copyToClipboard(cbu, "cbu")}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
                          copiedCBU
                            ? "bg-green-500 text-white scale-105"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        type="button"
                      >
                        {copiedCBU ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Alias con botón de copia */}
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Alias:</p>
                    <p className="font-mono text-sm mb-2">{alias}</p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => copyToClipboard(alias, "alias")}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
                          copiedAlias
                            ? "bg-green-500 text-white scale-105"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        type="button"
                      >
                        {copiedAlias ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
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
