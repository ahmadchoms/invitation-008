"use client";

import React from "react";
import { motion } from "framer-motion";
import { CountdownTimer } from "./countdown-timer";
import { FloralCorner } from "./floral-corner";
import { weddingData } from "@/data/config";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-background">
      {/* Decorative Corners */}
      <FloralCorner position="top-left" />
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />
      <FloralCorner position="bottom-right" />

      {/* Floating background elements (optional, can replace with subtle PNGs) */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm tracking-widest uppercase text-secondary font-medium mb-6"
        >
          Pernikahan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-6xl md:text-8xl text-primary mb-6 leading-none"
        >
          {weddingData.bride.nickname} 
          <span className="block text-4xl md:text-6xl text-accent font-normal my-2">&amp;</span> 
          {weddingData.groom.nickname}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-muted-foreground font-medium mb-12 italic border-b border-accent/30 pb-4 inline-block px-8"
        >
          {weddingData.dateDisplay}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full"
        >
          <CountdownTimer targetDate={weddingData.date} />
        </motion.div>
      </div>
    </section>
  );
}
