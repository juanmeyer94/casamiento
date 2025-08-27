"use client";

import { useState, useEffect } from "react";

export default function Timer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    const targetDate = new Date("2025-11-08T20:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-lg mb-4">Cargando...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full text-white text-center bg-black/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <h3 className="text-lg mb-4">8 DE NOVIEMBRE DE 2025</h3>
        <h2 className="text-xl mb-8">FALTAN...</h2>
        <div className="flex items-center justify-center gap-6 text-center">
          <div>
            <div className="text-4xl font-bold">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-base">días</div>
          </div>
          <div>
            <div className="text-4xl font-bold">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-base">horas</div>
          </div>
          <div>
            <div className="text-4xl font-bold">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-base">minutos</div>
          </div>
          <div>
            <div className="text-4xl font-bold">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-base">segundos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
