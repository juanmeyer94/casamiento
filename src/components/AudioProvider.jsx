"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);
  const autoplayAttemptedRef = useRef(false);
  const pathname = usePathname();

  // Verificar si estamos en una ruta de admin
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    setMounted(true);

    // Si estamos en una ruta de admin, no inicializar el audio
    if (isAdminRoute) {
      return;
    }

    if (typeof window !== "undefined") {
      try {
        audioRef.current = new Audio("/san-lucas-song.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.preload = "auto";

        // Función para intentar autoplay
        const attemptAutoplay = async () => {
          if (!hasInteractedRef.current && audioRef.current && audioRef.current.readyState >= 2) {
            try {
              await audioRef.current.play();
              setIsPlaying(true);
              hasInteractedRef.current = true;
            } catch (error) {
              // Autoplay bloqueado, esperando interacción del usuario
            }
          }
        };

        // Event listeners para el audio
        const handleEnded = () => {
          setIsPlaying(false);
        };

        const handlePause = () => {
          setIsPlaying(false);
        };

        const handlePlay = () => {
          setIsPlaying(true);
        };

        const handleError = () => {
          setIsPlaying(false);
          setAudioReady(false);
        };

        const handleCanPlay = () => {
          setAudioReady(true);
          // Intentar autoplay cuando el audio esté listo
          if (!autoplayAttemptedRef.current) {
            autoplayAttemptedRef.current = true;
            attemptAutoplay();
          }
        };

        audioRef.current.addEventListener("ended", handleEnded);
        audioRef.current.addEventListener("pause", handlePause);
        audioRef.current.addEventListener("play", handlePlay);
        audioRef.current.addEventListener("error", handleError);
        audioRef.current.addEventListener("canplay", handleCanPlay);

        // Intentar cargar el audio
        audioRef.current.load();

        // Función para manejar la primera interacción
        const handleFirstInteraction = async () => {
          if (!hasInteractedRef.current && audioRef.current && audioRef.current.readyState >= 2) {
            hasInteractedRef.current = true;
            try {
              await audioRef.current.play();
              setIsPlaying(true);
            } catch (error) {
              // Error al reproducir en interacción
            }
          }
        };

        // Agregar listeners para múltiples eventos de interacción
        const events = ["click", "touchstart", "keydown", "mousedown", "scroll"];

        events.forEach((event) => {
          document.addEventListener(event, handleFirstInteraction, { once: true });
        });

        // Intentar autoplay después de un delay
        setTimeout(attemptAutoplay, 1000);

        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener("ended", handleEnded);
            audioRef.current.removeEventListener("pause", handlePause);
            audioRef.current.removeEventListener("play", handlePlay);
            audioRef.current.removeEventListener("error", handleError);
            audioRef.current.removeEventListener("canplay", handleCanPlay);
            audioRef.current.pause();
            audioRef.current = null;
          }

          // Remover event listeners
          events.forEach((event) => {
            document.removeEventListener(event, handleFirstInteraction);
          });
        };
      } catch (error) {
        setAudioReady(false);
      }
    }
  }, [isAdminRoute]);

  // Efecto para pausar la música cuando se navega a admin
  useEffect(() => {
    if (isAdminRoute && audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isAdminRoute, isPlaying]);

  const togglePlay = useCallback(async () => {
    // Si estamos en una ruta de admin, no permitir reproducir música
    if (isAdminRoute || !audioRef.current) {
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (error) {
      setIsPlaying(false);
    }
  }, [isPlaying, isAdminRoute]);

  const value = useMemo(
    () => ({
      isPlaying: isAdminRoute ? false : isPlaying,
      togglePlay,
      mounted,
      audioReady: isAdminRoute ? false : audioReady,
    }),
    [isPlaying, mounted, audioReady, togglePlay, isAdminRoute],
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
