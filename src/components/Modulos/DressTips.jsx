"use client";

import { useState } from "react";
import Image from "next/image";
import { FolderIcon as ClothesHanger } from "lucide-react";
import { motion } from "framer-motion";

export default function DressTips() {
  const [isOpen, setIsOpen] = useState(false);

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
            DRESS CODE
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
              👔
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
              👗
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
              👗
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
              👔
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
              🎩
            </motion.div>
          </div>

          <motion.p
            className="text-[#6e6d6c] text-lg mb-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            ✨ Un guiño sobre cómo vestirte para estar a tono con la fiesta
          </motion.p>

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
            Ver Más
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-300/50 backdrop-blur-sm z-50"
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
