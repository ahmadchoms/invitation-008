"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/data/config";

export function CoupleSection() {
  return (
    <section className="py-24 px-6 md:py-32 bg-muted/30 relative overflow-hidden text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-sm tracking-widest uppercase text-accent font-semibold mb-4">
          Mempelai
        </h2>
        <p className="text-secondary-foreground max-w-2xl mx-auto mb-16 text-sm md:text-base leading-relaxed">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
          Ya Allah perkenankanlah kami merangkaikan kasih sayang yang Kau
          ciptakan di antara putra-putri kami:
        </p>

        {/* Bride */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center flex-1 max-w-[300px]"
          >
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6 relative group">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-linear-to-tr from-accent/20 to-secondary/30" />
              <img
                src="https://images.unsplash.com/photo-1541250264006-25fdbf72e38c?auto=format&fit=crop&q=80&w=600"
                alt={weddingData.bride.fullName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h3 className="font-heading text-3xl md:text-4xl text-primary mb-2">
              {weddingData.bride.fullName}
            </h3>
            <p className="text-sm text-secondary-foreground mb-4">
              {weddingData.bride.parents}
            </p>
            <a
              href={`https://instagram.com/${weddingData.bride.instagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xs text-accent hover:text-primary transition-colors bg-white/50 px-3 py-1.5 rounded-full border border-accent/20"
            >
              <Heart className="w-3 h-3 mr-1.5" />
              {weddingData.bride.instagram}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <span className="font-heading text-6xl text-accent/80 font-light">
              &amp;
            </span>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center flex-1 max-w-[300px]"
          >
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6 relative group">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-linear-to-bl from-accent/20 to-secondary/30" />
              <img
                src="https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&q=80&w=600"
                alt={weddingData.groom.fullName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h3 className="font-heading text-3xl md:text-4xl text-primary mb-2">
              {weddingData.groom.fullName}
            </h3>
            <p className="text-sm text-secondary-foreground mb-4">
              {weddingData.groom.parents}
            </p>
            <a
              href={`https://instagram.com/${weddingData.groom.instagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xs text-accent hover:text-primary transition-colors bg-white/50 px-3 py-1.5 rounded-full border border-accent/20"
            >
              <Heart className="w-3 h-3 mr-1.5" />
              {weddingData.groom.instagram}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
