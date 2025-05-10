"use client";

import { SessionProvider } from "next-auth/react";
import Bienvenidos from "../components/Modulos/Bienvenidos";

export default function Home() {
  return (
    <div>
      <SessionProvider>
        <Bienvenidos />
      </SessionProvider>
    </div>
  );
}
