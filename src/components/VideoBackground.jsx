"use client";

import { useRef, useEffect, useState } from "react";

export default function VideoBackground({ videoSrc, children }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (videoRef.current) {
      const video = videoRef.current;

      const handleLoadedData = () => {
        setIsLoaded(true);
      };

      const handleCanPlay = () => {
        setIsLoaded(true);
      };

      const handleError = () => {
        setIsLoaded(false);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);

      // Intentar cargar el video
      video.load();

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
      };
    }
  }, [videoSrc]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Video de fondo fijo */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.7) contrast(1.1)",
            opacity: mounted && isLoaded ? 1 : 0.3,
            transition: "opacity 2s ease-in-out",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        {/* Overlay elegante */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
      </div>

      {/* Contenido principal con scroll */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
