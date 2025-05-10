"use client";

import { useState, useEffect } from "react";
import { Music } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function AltaParty() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [song, setSong] = useState("");
  const [link, setLink] = useState("");
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
    <div className="w-full max-w-md mx-auto px-8 py-12 text-center">
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
                src="/bodanovios.png"
                alt="Novios ilustración"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-[#8B6F6F] text-5xl mb-6">Fiesta</h1>
      <p className="text-[#C4A494] text-xl mb-12 px-4">
        Hagamos juntos una fiesta épica. Aquí algunos detalles a tener en
        cuenta.
      </p>

      <div className="relative w-full mb-8">
        <Image
          src="/floresEsquina.png"
          alt="Decorative floral element"
          width={150}
          height={150}
          className="absolute -left-8 -rotate-12 -top-12 opacity-80 z-20"
        />
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border flex flex-col items-center border-[#E8D8D0]">
          <h2 className="text-[#8B6F6F] text-2xl mb-4 flex items-center justify-center gap-2">
            MÚSICA
          </h2>
          <Music className="w-12 h-12 text-[#C4A494]" />
          <p className="text-[#8B6F6F] text-lg mb-6">
            ¿Cuál es la canción que no debe faltar en la PlayList de la fiesta?
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-[#E5A19A] hover:bg-[#d8958e] text-white rounded-full px-8 py-2"
            type="button"
          >
            Sugerir Canción
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-red-200/50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-lg w-80 text-center shadow-lg">
            <Image
              src="/tryit1.png"
              alt="Decorative image"
              width={300}
              height={200}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md -z-10 rotate-90"
            />
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md border border-[#E8D8D0] z-10">
              <Music className="w-10 h-10 text-[#C4A494]" />
            </div>
            <h3 className="text-[#8B6F6F] text-xl mt-8 mb-4">
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
    </div>
  );
}
