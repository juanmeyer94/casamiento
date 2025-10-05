"use client";

import { useState } from "react";
import { DollarSign, Copy, Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Precio() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCBU, setCopiedCBU] = useState(false);
  const [copiedAlias, setCopiedAlias] = useState(false);

  const cbu = "0070111830004170449413";
  const alias = "BODA.IVANYMICA";

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
    <div className="w-full max-w-md mx-auto px-8 py-12 text-center">
      <motion.div
        className="relative w-full mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border flex flex-col items-center border-[#E8D8D0]">
          <motion.h2
            className="text-[#000000] text-2xl mb-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            TARJETAS DE INVITACIÓN
          </motion.h2>

          {/* Emojis con animación sutil */}
          <motion.div
            className="flex items-center gap-6 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              animate={{
                rotateY: [0, 180, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.1,
                rotateY: [0, 180, 0],
              }}
              className="text-3xl"
            >
              💰
            </motion.div>
            <motion.div
              animate={{
                rotateY: [0, 180, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{
                scale: 1.1,
                rotateY: [0, 180, 0],
              }}
              className="text-3xl"
            >
              💳
            </motion.div>
          </motion.div>

          {/* Elementos flotantes decorativos */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-4 left-4 text-lg"
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
              💵
            </motion.div>
            <motion.div
              className="absolute top-8 right-6 text-sm"
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
              ✨
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-8 text-base"
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
              🎟️
            </motion.div>
          </div>

          <motion.p
            className="text-[#6e6d6c] text-lg mb-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            ✨ Información sobre el costo de la entrada
          </motion.p>

          <motion.div
            className="mb-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="bg-blue-50 border-2 border-[#2563eb] rounded-lg px-4 py-3 inline-block shadow-md">
              <p className="text-[#2563eb] text-lg font-semibold">
                Por favor, no olvides confirmar tu asistencia antes del 20 de octubre
              </p>
              <div className="text-center text-2xl mt-1">
                😊
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={() => setIsOpen(true)}
            className="mt-4 bg-[#ffffff] text-black border-2 border-black rounded-full px-8 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
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
            PRECIO
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-lg w-80 text-center shadow-lg">
            {/* Botón de cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              type="button"
            >
              ×
            </button>
            <Image
              src="/tryit1.png"
              alt="Decorative image"
              width={300}
              height={200}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md -z-10 rotate-90"
            />
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md border border-[#E8D8D0] z-10">
              <DollarSign className="w-10 h-10 text-[#C4A494]" />
            </div>
            <h3 className="text-[#8B6F6F] text-xl mt-8 mb-4">
              Precio de Entrada
            </h3>
            <div className="space-y-4 text-[#8B6F67]">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">
                  💰 Precio por adulto:
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  $100.000 ARS
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">
                  💰 Precio para niños (2 a 12 años):
                </h3>
                <p className="text-2xl font-bold text-green-600">$45.000 ARS</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">Formas de pago:</h3>
                <p>• Transferencia bancaria</p>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 text-center">
                    Titular del banco:
                    <span className="font-bold">MICAELA BRARDA</span>
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
          </div>
        </div>
      )}
    </div>
  );
}
