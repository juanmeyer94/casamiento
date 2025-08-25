"use client";

import { useAudio } from "./AudioProvider";

export default function AudioDebug() {
  const { isPlaying, mounted, audioReady } = useAudio();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 bg-blue-500 text-white p-2 rounded z-50 text-sm">
      <div>Audio Debug:</div>
      <div>Mounted: {mounted ? "✅" : "❌"}</div>
      <div>Ready: {audioReady ? "✅" : "❌"}</div>
      <div>Playing: {isPlaying ? "🎵" : "⏸️"}</div>
    </div>
  );
}
