"use client";

import { SessionProvider } from "next-auth/react";
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
    <div className="min-h-screen relative bg-pink-50 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
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
    </div>
  );
}
