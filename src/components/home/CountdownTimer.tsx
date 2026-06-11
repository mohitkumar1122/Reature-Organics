"use client";

import React, { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Generate a moving end date that always ends exactly 2 days and 5 hours from the user's current session start.
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

  return (
    <div className="flex gap-3 text-darkText font-mono">
      <div className="flex flex-col items-center">
        <span className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm text-lg font-bold text-primary">
          {formatNumber(timeLeft.days)}
        </span>
        <span className="text-[10px] text-gray-500 uppercase mt-1 font-semibold tracking-wider">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm text-lg font-bold text-primary">
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-[10px] text-gray-500 uppercase mt-1 font-semibold tracking-wider">Hrs</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm text-lg font-bold text-primary">
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-[10px] text-gray-500 uppercase mt-1 font-semibold tracking-wider">Mins</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm text-lg font-bold text-secondary">
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="text-[10px] text-gray-500 uppercase mt-1 font-semibold tracking-wider">Secs</span>
      </div>
    </div>
  );
}
