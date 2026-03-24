"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CalendarHeart,
  Clock,
  CalendarDays,
  ExternalLink,
  Apple,
} from "lucide-react";
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
        <h2 className="text-sm tracking-widest uppercase text-secondary font-semibold mb-4">
          Waktu & Tempat
        </h2>
        <p className="font-heading text-4xl text-primary mb-16">
          Pelaksanaan Acara
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {weddingData.events.map((event, index) => {
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + " Romeo & Juliet")}&dates=${event.startDateTime.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}/${event.endDateTime.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}&details=${encodeURIComponent("Pernikahan Romeo & Juliet")}&location=${encodeURIComponent(event.venue + ", " + event.address)}`;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [showCalendarMenu, setShowCalendarMenu] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const menuRef = useRef<HTMLDivElement>(null);

            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              function handleClickOutside(event: MouseEvent) {
                if (
                  menuRef.current &&
                  !menuRef.current.contains(event.target as Node)
                ) {
                  setShowCalendarMenu(false);
                }
              }
              document.addEventListener("mousedown", handleClickOutside);
              return () =>
                document.removeEventListener("mousedown", handleClickOutside);
            }, []);

            const downloadIcs = () => {
              const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Romeo Juliet Wedding//ID\nBEGIN:VEVENT\nSUMMARY:${event.title} Romeo & Juliet\nDTSTART:${event.startDateTime.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}\nDTEND:${event.endDateTime.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}\nLOCATION:${event.venue}, ${event.address}\nEND:VEVENT\nEND:VCALENDAR`;
              const blob = new Blob([icsContent], {
                type: "text/calendar;charset=utf-8",
              });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute(
                "download",
                `${event.title.replace(/\s+/g, "_")}.ics`,
              );
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setShowCalendarMenu(false);
            };

            return (
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

                <h3 className="font-heading text-3xl text-primary mb-6">
                  {event.title}
                </h3>

                <div className="space-y-4 text-secondary mb-8 w-full border-y border-border py-6">
                  <div className="flex items-center justify-center gap-3">
                    <CalendarHeart className="w-4 h-4 text-accent" />
                    <span className="font-medium text-[15px]">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-medium text-[15px]">
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-start justify-center gap-3 pt-2">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <div className="text-left">
                      <span className="block font-semibold text-[15px] text-primary">
                        {event.venue}
                      </span>
                      <span className="block text-sm mt-1 text-muted-foreground">
                        {event.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calendar Add Button */}
                <div className="relative w-full mb-8 z-20" ref={menuRef}>
                  <button
                    onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-secondary/30 bg-secondary/5 px-6 py-2.5 text-sm font-medium text-secondary hover:bg-secondary/10 transition-colors"
                  >
                    <CalendarDays className="w-4 h-4 text-secondary" />
                    Simpan ke Kalender
                  </button>

                  <AnimatePresence>
                    {showCalendarMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border overflow-hidden"
                      >
                        <a
                          href={googleCalendarUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-primary hover:bg-muted transition-colors border-b border-border/50 text-left"
                          onClick={() => setShowCalendarMenu(false)}
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          <span>Google Calendar</span>
                        </a>
                        <button
                          onClick={downloadIcs}
                          className="flex items-center w-full gap-3 px-4 py-3 text-sm text-primary hover:bg-muted transition-colors text-left"
                        >
                          <Apple className="w-4 h-4 text-muted-foreground" />
                          <span>Apple Calendar / Outlook (.ics)</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Responsive Google Maps Embed */}
                <div className="w-full h-48 rounded-xl overflow-hidden border border-border/50 mb-6 bg-muted/20 relative group">
                  <iframe
                    src={event.mapUrl}
                    className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                    aria-hidden="false"
                    tabIndex={-1}
                    loading="lazy"
                    title={`Peta lokasi ${event.title}`}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-secondary shadow-sm pointer-events-none">
                    Preview Peta
                  </div>
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
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
