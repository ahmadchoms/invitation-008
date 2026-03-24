"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, CalendarHeart, Clock } from "lucide-react";
import { FloralCorner } from "./floral-corner";
import { weddingData } from "@/data/config";

export function EventSection() {
  return (
    <section className="py-24 px-6 md:py-32 relative bg-background overflow-hidden text-center">
      {/* Decorative Corners */}
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <h2 className="text-sm tracking-widest uppercase text-secondary font-semibold mb-4">Waktu & Tempat</h2>
        <p className="font-heading text-4xl text-primary mb-16">Pelaksanaan Acara</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {weddingData.events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-secondary/10 flex flex-col items-center h-full hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                <CalendarHeart className="w-8 h-8 opacity-80" />
              </div>
              
              <h3 className="font-heading text-3xl text-primary mb-6">{event.title}</h3>
              
              <div className="space-y-4 text-secondary-foreground mb-8 w-full border-y border-border py-6">
                <div className="flex items-center justify-center gap-3">
                  <CalendarHeart className="w-4 h-4 text-accent" />
                  <span className="font-medium text-[15px]">{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="font-medium text-[15px]">{event.time}</span>
                </div>
                <div className="flex items-start justify-center gap-3 pt-2">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <div className="text-left">
                    <span className="block font-semibold text-[15px] text-primary">{event.venue}</span>
                    <span className="block text-sm mt-1 text-muted-foreground">{event.address}</span>
                  </div>
                </div>
              </div>

              {/* Responsive Google Maps Embed */}
              <div className="w-full h-48 rounded-xl overflow-hidden border border-border/50 mb-6 bg-muted/20 relative">
                <iframe 
                  src={event.mapUrl} 
                  className="absolute inset-0 w-full h-full border-0" 
                  aria-hidden="false" 
                  tabIndex={0}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Peta lokasi ${event.title}`}
                />
              </div>

              <a 
                href={event.mapLink}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors w-full sm:w-auto"
              >
                <MapPin className="w-4 h-4" />
                Buka di Aplikasi Maps
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
