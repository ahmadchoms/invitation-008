"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FloralCorner } from "./floral-corner";
import { weddingData } from "@/data/config";

export function RsvpSection() {
  const handleRsvp = () => {
    const encodedMessage = encodeURIComponent(
      weddingData.contact.defaultMessage,
    );
    window.open(
      `https://wa.me/${weddingData.contact.whatsapp}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <section className="py-24 px-6 md:py-32 relative bg-muted/20 text-center overflow-hidden">
      {/* Decorative Corners */}
      <FloralCorner position="top-left" />
      <FloralCorner position="bottom-right" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-secondary/20 relative z-10"
      >
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4">
          Konfirmasi Kehadiran
        </h2>
        <p className="text-secondary mb-8 text-sm md:text-base leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada
          kedua mempelai.
        </p>

        {/* Message Template Preview */}
        <div className="bg-[#E1F7CB] text-left p-4 rounded-2xl rounded-tr-none shadow-sm mb-10 max-w-sm mx-auto relative text-sm text-[#303030]">
          <div className="whitespace-pre-line font-mono text-xs">
            {weddingData.contact.defaultMessage}
          </div>
          {/* WA bubble tail */}
          <div
            className="absolute top-0 -right-2 w-4 h-4 bg-[#E1F7CB]"
            style={{ clipPath: "polygon(0 0, 0% 100%, 100% 0)" }}
          />
        </div>

        <button
          onClick={handleRsvp}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          <span className="relative">Kirim Konfirmasi via WhatsApp</span>
        </button>
      </motion.div>
    </section>
  );
}
