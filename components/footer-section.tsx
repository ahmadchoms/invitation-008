"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/config";

export function FooterSection() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto relative z-10 flex flex-col items-center"
      >
        <p className="font-heading text-xl italic mb-6 text-primary-foreground/90 leading-relaxed max-w-xl">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <p className="text-xs tracking-widest uppercase text-accent/80 mb-12">
          (QS. Ar-Rum: 21)
        </p>

        <p className="text-sm font-medium mb-4 text-primary-foreground/80">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </p>
        
        <p className="text-sm font-medium mb-10 text-primary-foreground/60">
          Kami yang berbahagia
        </p>

        <h2 className="font-heading text-4xl md:text-5xl mb-16 text-white drop-shadow-md">
          {weddingData.bride.nickname} &amp; {weddingData.groom.nickname}
        </h2>

        {/* Branding Watermark */}
        <div className="border-t border-primary-foreground/20 pt-8 mt-8 w-full">
          <p className="text-xs text-primary-foreground/50 tracking-widest font-sans">
            Made with <span className="text-accent">❤</span> by
          </p>
          <a 
            href="#" 
            className="text-sm font-semibold tracking-wider hover:text-accent transition-colors block mt-2"
          >
            CHOZY SPACE
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
