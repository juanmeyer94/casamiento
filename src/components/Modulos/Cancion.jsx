"use client";

import { useState, useEffect, useRef } from "react";
import { Music } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { motion, useInView } from "framer-motion";

export default function AltaParty() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [song, setSong] = useState("");
  const [link, setLink] = useState("");

  // Referencias para las animaciones de viewport
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      setName(session.user?.name || "Anónimo");
      setEmail(session.user?.email || "Sin correo");
    }
  }, [session]);

  const handleSubmit = async () => {
    if (!song) {
      Swal.fire({
        icon: "warning",
        title: "Faltan datos",
        text: "Por favor, ingresa el nombre de la canción.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          date: new Date().toLocaleString(),
          song,
          link,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Gracias!",
          text: "Tu sugerencia ha sido enviada con éxito.",
        });
        setSong("");
        setLink("");
        setIsModalOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Ocurrió un error al enviar tu sugerencia.",
        });
      }
    } catch (error) {
      Error("Error al enviar la sugerencia:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al enviar tu sugerencia. Inténtalo nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
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
        className="relative h-32 mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
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
                src="/bodanovios.png"
                alt="Novios ilustración"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-white/50 mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.h1
          className="text-[#000000] text-5xl mb-6 font-bold"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Fiesta
        </motion.h1>
        <motion.p
          className="text-[#2e2c2b] text-xl mb-6 font-medium"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Hagamos juntos una fiesta épica. Aquí algunos detalles a tener en
          cuenta.
        </motion.p>
      </motion.div>

      <motion.div
        className="relative w-full mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border flex flex-col items-center border-[#E8D8D0]">
          <motion.h2
            className="text-[#000000] text-2xl mb-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            MÚSICA
          </motion.h2>
          {/* Ícono de música con animación de latido */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Music className="w-12 h-12 text-[#000000]" />
          </motion.div>

          {/* Notas musicales flotantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-4 left-4 text-2xl"
              animate={{
                y: [-10, -30, -10],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🎵
            </motion.div>
            <motion.div
              className="absolute top-8 right-6 text-xl"
              animate={{
                y: [-5, -25, -5],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              🎶
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-8 text-lg"
              animate={{
                y: [-8, -20, -8],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              🎼
            </motion.div>
          </div>

          <motion.p
            className="text-[#6e6d6c] text-lg mb-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            🎶 ¡Ayúdanos a armar la playlist más épica de la fiesta! ¿Qué canción no puede faltar?
          </motion.p>

          <motion.button
            onClick={() => setIsModalOpen(true)}
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
            Sugerir Canción
          </motion.button>
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300/50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-lg w-80 text-center shadow-lg">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md border border-[#E8D8D0] z-10">
              <Music className="w-10 h-10 text-[#000000]" />
            </div>
            <h3 className="text-[#000000] text-xl mt-8 mb-4">
              Sugerir Canción
            </h3>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Nombre de canción y autor"
              value={song}
              onChange={(e) => setSong(e.target.value)}
              className="w-full p-2 mb-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Link de YouTube, Spotify, etc. (opcional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 mb-3 border rounded-md"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#E8B4A4] hover:bg-[#C4A494] text-white font-medium px-6 py-2 rounded-md transition-colors w-full"
              type="button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Sugerir Canción"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
