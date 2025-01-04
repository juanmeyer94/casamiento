'use client'

import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function Bienvenidos() {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full text-center relative">
        <div className="w-full flex justify-center border-b-2">
          <Image
            src="/flores2.png?height=100&width=300"
            alt="Decorative flowers top"
            width={500}
            height={100}
            className="opacity-80"
          />
        </div>
        <div className="space-y-6">
          <p className="text-rose-300 text-lg">
            Bienvenidos a la invitación de
          </p>
          <div className={playfair.className}>
            <h1 className="text-4xl md:text-5xl text-[#8B6F6F] tracking-wide">
              IVAN
              <span className="inline-block mx-2">&</span>
              MICA
            </h1>
          </div>
        <div className="w-full flex justify-center border-t-2">
          <Image
            src="/flores2.png?height=100&width=300"
            alt="Decorative flowers bottom"
            width={500}
            height={100}
            className="opacity-80 rotate-180"
          />
        </div>
          <p className="text-rose-300 text-sm mt-8">
            La música de fondo es parte de la experiencia
          </p>
          <div>
          <Link
            type="button"
            href="/casamiento"
            className="mt-6 px-8 py-2 bg-[#E5A19A] text-white rounded-md hover:bg-[#d8958e] transition-colors duration-300"
          >
            Ingresar
          </Link>
          </div>
        </div>

      
      </div>
    </div>
  )
}


