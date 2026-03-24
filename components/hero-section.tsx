"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CountdownTimer } from "./countdown-timer";
import { FloralCorner } from "./floral-corner";
import { weddingData } from "@/data/config";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax translation for the background image
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-svh flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-background"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src={weddingData.heroImage}
          alt="Pre-wedding"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Decorative Corners (Optional - can be adjusted or removed if they clash with bg) */}
      <FloralCorner
        position="top-left"
        className="opacity-90 mix-blend-screen"
      />
      <FloralCorner
        position="top-right"
        className="opacity-90 mix-blend-screen"
      />
      <FloralCorner
        position="bottom-left"
        className="opacity-90 mix-blend-screen"
      />
      <FloralCorner
        position="bottom-right"
        className="opacity-90 mix-blend-screen"
      />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center flex-1 justify-center py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm tracking-widest uppercase text-white/90 font-medium mb-6 drop-shadow-md"
        >
          Pernikahan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-6xl md:text-8xl text-white mb-6 leading-none drop-shadow-lg"
        >
          {weddingData.bride.nickname}
          <span className="block text-6xl md:text-8xl text-accent font-script font-normal my-4 leading-[0.5] drop-shadow-md">
            &amp;
          </span>
          {weddingData.groom.nickname}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-white/90 font-medium mb-12 italic border-b border-accent/60 pb-4 inline-block px-8 drop-shadow-md"
        >
          {weddingData.dateDisplay}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-full pb-10 mt-auto"
      >
        <CountdownTimer targetDate={weddingData.date} />
      </motion.div>
    </section>
  );
}
