"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VideoSection({ videoSrc, children, className = "" }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setIsLoaded(true);
      });
    }
  }, []);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Video de fondo para la sección */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.6) contrast(1.2) saturate(0.8)",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Overlay elegante para sección */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </motion.div>

      {/* Contenido de la sección */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

