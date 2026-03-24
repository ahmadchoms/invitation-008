"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import { FloralCorner } from "./floral-corner";
import { weddingData } from "@/data/config";

interface WelcomeScreenProps {
  isOpen: boolean;
  onOpen: () => void;
  guestName?: string;
}

export function WelcomeScreen({
  isOpen,
  onOpen,
  guestName = "Tamu Undangan",
}: WelcomeScreenProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Decorative Corners */}
          <FloralCorner position="top-left" />
          <FloralCorner position="top-right" />
          <FloralCorner position="bottom-left" />
          <FloralCorner position="bottom-right" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-sm tracking-[0.3em] uppercase text-secondary font-semibold mb-6"
            >
              The Wedding Of
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-heading text-5xl md:text-7xl text-primary mb-8 leading-tight tracking-tight"
            >
              {weddingData.bride.nickname}{" "}
              <span className="text-accent italic font-normal">&amp;</span>{" "}
              {weddingData.groom.nickname}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-10 w-full"
            >
              <p className="text-muted-foreground text-sm mb-2">Kepada Yth.</p>
              <p className="text-xl font-heading text-primary font-medium border-b border-accent/30 pb-2 mx-auto inline-block min-w-50">
                {guestName}
              </p>
              <p className="text-xs text-muted-foreground mt-3 px-4">
                Mohon maaf bila ada kesalahan penulisan nama/gelar.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              onClick={onOpen}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <MailOpen className="w-5 h-5 mr-3 group-hover:-translate-y-1 transition-transform" />
              <span className="relative">Buka Undangan</span>
            </motion.button>
          </div>

          {/* Subtle background overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background/80 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
