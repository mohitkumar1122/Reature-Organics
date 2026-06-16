"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(targetDate.getHours() + 5);

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds", highlight: true },
  ];

  return (
    <div className="inline-flex flex-col gap-3">
      <span className="text-[11px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
        Offer Ends In
      </span>
      <div className="flex gap-2 md:gap-3">
        {timeUnits.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <motion.div
                key={unit.value}
                initial={unit.highlight ? { scale: 1.1, opacity: 0.5 } : {}}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl text-xl md:text-2xl font-bold font-mono shadow-large ${
                  unit.highlight
                    ? "bg-gradient-to-br from-secondary to-secondary-dark text-white"
                    : "bg-white text-primary"
                } overflow-hidden`}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                <span className="relative z-10 tabular-nums">{formatNumber(unit.value)}</span>
                
                {/* Bottom line divider effect */}
                <div className="absolute left-0 right-0 top-1/2 h-px bg-black/5" />
              </motion.div>
              <span className="text-[10px] md:text-[11px] text-white/80 uppercase mt-2 font-bold tracking-wider">
                {unit.label}
              </span>
            </div>
            {idx < timeUnits.length - 1 && (
              <span className="text-2xl md:text-3xl font-bold text-white/40 self-start mt-3 md:mt-4">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}