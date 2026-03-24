"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className={cn("flex gap-4 justify-center animate-pulse", className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center border border-border/50 shadow-sm" />
            <span className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-sans w-10 h-3 bg-muted/50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const timeUnits = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className={cn("flex gap-3 md:gap-5 justify-center", className)}>
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center border border-accent/20 shadow-sm relative overflow-hidden group hover:border-accent/40 transition-colors">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-50" />

            <span className="text-2xl md:text-3xl font-heading text-primary z-10 tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs md:text-sm text-secondary/70 mt-3 uppercase tracking-widest font-sans font-medium">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
