"use client";

import {
  Playfair_Display as PlayfairDisplay,
  Cormorant_Garamond as CormorantGaramond,
} from "next/font/google";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import Swal from "sweetalert2";
import Modal from "../Modal";

const playfair = PlayfairDisplay({ subsets: ["latin"] });
const cormorant = CormorantGaramond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function GeneralInfo() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isPartyMapModalOpen, setIsPartyMapModalOpen] = useState(false);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [attending, setAttending] = useState("Sí");
  const [peopleCount, setPeopleCount] = useState("1");
  const [vegetarianMenu, setVegetarianMenu] = useState("0");
  const [message, setMessage] = useState("");

  // Referencias para las animaciones de viewport
  const ref = useRef(null);
  const titleRef = useRef(null);
  const infoCardsRef = useRef(null);

  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const titleInView = useInView(titleRef, { once: true, threshold: 0.3 });
  const infoCardsInView = useInView(infoCardsRef, {
    once: true,
    threshold: 0.3,
  });

  const agendarCelebracion = () => {
    const title = encodeURIComponent("Casamiento de Mica y Ivan");
    const details = encodeURIComponent(
      "¡Acompañanos a celebrar este día tan especial!"
    );
    const location = encodeURIComponent(
      "Establecimiento Las Marías, Rafaela, Santa Fe"
    );
    const startDate = "20251108T210000Z";
    const endDate = "20251109T080000Z";
    const calendarUrl =
      `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}` +
      `&details=${details}&location=${location}&dates=${startDate}/${endDate}`;
    window.open(calendarUrl, "_blank");
  };

  const handleModal = () => {
    if (!session?.user) {
      return signIn("google");
    }
    setOpen(!open);
    setConfirmed(!confirmed);
    return null;
  };

  const handleConfirm = async () => {
    if (!session?.user) {
      return signIn("google");
    }
    Swal.fire({
      title: "Procesando...",
      text: "Por favor, espera mientras confirmamos tu asistencia.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch("/api/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        attending,
        peopleCount,
        vegetarianMenu,
        message,
      }),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Asistencia confirmada!",
        text: "Gracias por confirmar tu asistencia. ¡Nos vemos pronto!",
      });
      setOpen(false);
      setConfirmed(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al confirmar tu asistencia. Por favor, intenta nuevamente.",
      });
    }
  };

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-md mx-auto px-4 py-24"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      {/* Divisorio de celebración */}
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
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-44 h-44 bg-white rounded-full shadow-md flex items-center justify-center p-2">
            <div className="relative w-32 h-32">
              <Image
                src="/noviosboda2.png"
                alt="Novios ilustración"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Celebración título */}
      <motion.div
        ref={titleRef}
        className="relative flex justify-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="relative bg-white/95 backdrop-blur-sm px-24 py-4 rounded-lg shadow-lg border border-white/50 transform -skew-x-12 overflow-hidden">
          <h1
            className={`${playfair.className} text-[#000000] text-3xl transform skew-x-12 relative z-10 font-bold`}
          >
            Celebración
          </h1>
        </div>
      </motion.div>

      {/* Información de la celebración */}
      <motion.div
        ref={infoCardsRef}
        className="space-y-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={infoCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/50">
          <h2
            className={`${cormorant.className} text-[#000000] text-2xl font-semibold mb-2`}
          >
            DÍA
          </h2>
          <p
            className={`${cormorant.className} text-[#2e2c2b] text-xl font-medium mb-4`}
          >
            Sábado 8 de Noviembre - 18hs
          </p>
          <button
            onClick={agendarCelebracion}
            className="bg-white text-black border-2 border-black py-2 px-6 rounded-full hover:bg-gray-100 hover:scale-105 hover:shadow-xl transform transition-all duration-300 text-base font-semibold lowercase tracking-wide shadow-lg"
            type="button"
          >
            agendar
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/50">
          <h2
            className={`${cormorant.className} text-[#000000] text-2xl font-semibold mb-2`}
          >
            ASISTENCIA
          </h2>
          <p
            className={`${cormorant.className} text-[#2e2c2b] text-xl font-medium mb-4`}
          >
            Por favor, confirma tu asistencia antes del
            <br />
            20 de octubre.
          </p>
          <button
            onClick={handleModal}
            className="bg-white text-black border-2 border-black py-2 px-6 rounded-full hover:bg-gray-100 hover:scale-105 hover:shadow-xl transform transition-all duration-300 text-base font-semibold lowercase tracking-wide shadow-lg"
            type="button"
          >
            confirmar asistencia
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/50">
          <h2
            className={`${cormorant.className} text-[#000000] text-2xl font-semibold mb-2`}
          >
            DIRECCIÓN
          </h2>
          <p
            className={`${cormorant.className} text-[#2e2c2b] text-xl font-medium mb-4`}
          >
            María, Hostal y Eventos - Rafaela, Santa Fe
          </p>
          <button
            className="bg-white text-black border-2 border-black py-2 px-6 rounded-full hover:bg-gray-100 hover:scale-105 hover:shadow-xl transform transition-all duration-300 text-base font-semibold lowercase tracking-wide shadow-lg"
            type="button"
            onClick={() => setIsPartyMapModalOpen(true)}
          >
            <div className="flex items-center justify-center gap-2">
              <MapPin size={16} />
              cómo llegar
            </div>
          </button>
        </div>
      </motion.div>
      {isMapModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-lg w-96 text-center shadow-lg">
            <h3 className="text-[#8B6F6F] text-xl mb-4 flex items-center justify-center gap-2">
              Cómo llegar
              <MapPin className="w-6 h-6 text-[#C4A494]" />
            </h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4072.535002684345!2d-61.49178479999999!3d-31.253860399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95caae37f4ad98e7%3A0x70298b01c7633f9e!2sCatedral%20San%20Rafael!5e1!3m2!1ses!2sar!4v1738416547977!5m2!1ses!2sar"
              width="100%"
              height="300"
              title="Celebration location"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <button
              onClick={() => setIsMapModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {isPartyMapModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-lg w-96 text-center shadow-lg">
            <h3 className="text-[#8B6F6F] text-xl mb-4 flex items-center justify-center gap-2">
              Cómo llegar
              <MapPin className="w-6 h-6 text-[#C4A494]" />
            </h3>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2040.3614229876814!2d-61.460713!3d-31.063535299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943553c9421c3b6d%3A0x8d3c3c039df9284f!2sMaria%2C%20Hostal%20y%20Eventos!5e1!3m2!1ses!2sar!4v1738417205493!5m2!1ses!2sar"
              width="100%"
              height="300"
              title="Party location"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <button
              onClick={() => setIsPartyMapModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">Confirmar asistencia</h2>
        <p>Hola! Nos alegra que hayas entrado a nuestra página 😀</p>

        <div className="mb-3">
          <label className="block text-sm font-medium" htmlFor="attending">
            ¿Vas a venir?
          </label>
          <select
            id="attending"
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option>Sí</option>
            <option>No</option>
          </select>
        </div>

        {attending === "Sí" && (
          <div className="mb-3">
            <label className="block text-sm font-medium" htmlFor="peopleCount">
              ¿Cuántas personas vienen? (incluyéndote)
            </label>
            <select
              id="peopleCount"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="1">1 persona</option>
              <option value="2">2 personas</option>
              <option value="3">3 personas</option>
              <option value="4">4 personas</option>
              <option value="5">5 personas</option>
              <option value="6">6 personas</option>
              <option value="7">7 personas</option>
              <option value="8">8 personas</option>
              <option value="9">9 personas</option>
              <option value="10">10 personas</option>
            </select>
            <p className="text-xs text-gray-600 mt-1">
              Ejemplo: Si vienes con tu pareja e hijo, selecciona &quot;3
              personas&quot;
            </p>
          </div>
        )}

        {attending === "Sí" && (
          <div className="mb-3">
            <label
              className="block text-sm font-medium"
              htmlFor="vegetarianMenu"
            >
              ¿Cuántas personas necesitan menú vegetariano/vegano?
            </label>
            <select
              id="vegetarianMenu"
              value={vegetarianMenu}
              onChange={(e) => setVegetarianMenu(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="0">Ninguna - menú normal</option>
              <option value="1">1 persona</option>
              <option value="2">2 personas</option>
              <option value="3">3 personas</option>
              <option value="4">4 personas</option>
              <option value="5">5 personas</option>
              <option value="6">6 personas</option>
              <option value="7">7 personas</option>
              <option value="8">8 personas</option>
              <option value="9">9 personas</option>
              <option value="10">10 personas</option>
            </select>
            <p className="text-xs text-gray-600 mt-1">
              Selecciona cuántas personas de tu grupo necesitan menú vegetariano
              o vegano
            </p>
          </div>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium" htmlFor="message">
            Mensaje o aclaración
          </label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Recordar que quiero menu vegetariano."
          />
        </div>

        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          type="button"
        >
          Confirmar
        </button>
      </Modal>
    </motion.div>
  );
}
