"use client";

import { useState, useEffect } from "react";

export default function TimerTest() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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

  return (
    <div className="fixed top-60 left-4 bg-red-500 text-white p-2 rounded z-50 text-sm">
      <div>Timer Test:</div>
      <div>
        Días:
        {" "}
        {String(timeLeft.days).padStart(2, "0")}
      </div>
      <div>
        Horas:
        {" "}
        {String(timeLeft.hours).padStart(2, "0")}
      </div>
      <div>
        Minutos:
        {" "}
        {String(timeLeft.minutes).padStart(2, "0")}
      </div>
      <div>
        Segundos:
        {" "}
        {String(timeLeft.seconds).padStart(2, "0")}
      </div>
    </div>
  );
}
