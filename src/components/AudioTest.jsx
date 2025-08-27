"use client";

import { Music, Pause } from "lucide-react";
import { useAudio } from "./AudioProvider";

export default function AudioTest() {
  const {
    isPlaying,
    togglePlay,
    mounted,
    audioReady,
  } = useAudio();

  if (!mounted) {
    return (
      <div className="fixed top-20 left-4 bg-yellow-500 text-white p-2 rounded z-50 text-sm">
        Cargando AudioProvider...
      </div>
    );
  }

  return (
    <div className="fixed top-20 left-4 bg-green-500 text-white p-2 rounded z-50 text-sm">
      <div>Audio Test:</div>
      <div>
        Ready:
        {" "}
        {audioReady ? "✅" : "❌"}
      </div>
      <div>
        Playing:
        {" "}
        {isPlaying ? "🎵" : "⏸️"}
      </div>
      <button
        type="button"
        onClick={togglePlay}
        disabled={!audioReady}
        className={`mt-2 px-2 py-1 rounded text-xs ${
          audioReady ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="inline w-3 h-3 mr-1" />
            Pausar
          </>
        ) : (
          <>
            <Music className="inline w-3 h-3 mr-1" />
            Reproducir
          </>
        )}
      </button>
    </div>
  );
}
