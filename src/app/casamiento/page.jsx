"use client";

import { SessionProvider } from "next-auth/react";
import VideoBackground from "../../components/VideoBackground";
import ClientOnly from "../../components/ClientOnly";
import GeneralInfo from "../../components/Modulos/LugarYHorarios";
import Timer from "../../components/Modulos/FechaYTimer";
import Intro from "../../components/Modulos/Intro";
import Photos from "../../components/Modulos/NuestrasFotos";
import AltaParty from "../../components/Modulos/Cancion";
import Regalos from "../../components/Modulos/Regalos";
import PhotosShare from "../../components/Modulos/ComparteFotos";
import DressTips from "../../components/Modulos/DressTips";
import Tips from "../../components/Modulos/Tips";

export default function Home() {
  return (
    <ClientOnly
      fallback={(
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Cargando invitación...
            </h1>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto" />
          </div>
        </div>
      )}
    >
      <div className="min-h-screen relative flex flex-col items-center">
        <VideoBackground videoSrc="/video-background.mp4">
          <div className="w-full">
            <SessionProvider>
              <Intro />
              <Timer />
              <GeneralInfo />
              <Photos />
              <AltaParty />
              <DressTips />
              <Tips />
              <Regalos />
              <PhotosShare />
            </SessionProvider>
          </div>
        </VideoBackground>
      </div>
    </ClientOnly>
  );
}
