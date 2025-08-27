"use client";

import { useState, useEffect } from "react";

export default function AudioLoader() {
  const [audioStatus, setAudioStatus] = useState("Cargando...");

  useEffect(() => {
    const testAudio = new Audio("/san-lucas-song.mp3");

    testAudio.addEventListener("loadstart", () => {
      setAudioStatus("Iniciando carga...");
    });

    testAudio.addEventListener("canplay", () => {
      setAudioStatus("✅ Audio cargado correctamente");
    });

    testAudio.addEventListener("error", (e) => {
      setAudioStatus(`❌ Error cargando audio: ${e.message}`);
    });

    testAudio.load();
  }, []);

  return (
    <div className="fixed top-40 left-4 bg-purple-500 text-white p-2 rounded z-50 text-sm">
      <div>Audio Loader:</div>
      <div>{audioStatus}</div>
    </div>
  );
}
