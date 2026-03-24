"use client";

import React from "react";
import { motion } from "framer-motion";
import { Copy, Gift } from "lucide-react";
import { toast } from "sonner";
import { weddingData } from "@/data/config";

export function GiftSection() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Nomor rekening berhasil disalin!", {
      style: {
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        border: "none",
      },
      icon: <Copy className="w-4 h-4 text-white" />,
    });
  };

  return (
    <section className="py-24 px-6 md:py-32 relative bg-background overflow-hidden text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
          <Gift className="w-8 h-8 opacity-80" />
        </div>

        <h2 className="font-heading text-4xl text-primary mb-6">
          Wedding Gift
        </h2>
        <p className="text-secondary mb-12 text-sm md:text-base leading-relaxed px-4">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan
          jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado
          secara cashless.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center mb-6">
          {weddingData.banks.map((bank, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-lg border border-accent/10 relative overflow-hidden group h-full flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />

              <div>
                <h3 className="font-heading text-xl font-bold text-primary mb-4">
                  {bank.name}
                </h3>
                <p className="font-mono text-xl md:text-2xl tracking-widest text-secondary mb-2">
                  {bank.accountNumber}
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
                  a.n. {bank.recipient}
                </p>
              </div>

              <button
                onClick={() => handleCopy(bank.accountNumber)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-sm font-medium text-secondary hover:bg-secondary hover:text-white transition-colors w-full mt-auto"
              >
                <Copy className="w-4 h-4" />
                Salin No. Rekening
              </button>
            </motion.div>
          ))}
        </div>

        {/* QRIS Card */}
        {weddingData.qris && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-lg border border-accent/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              QRIS
            </h3>

            <div className="bg-white p-4 rounded-xl border border-secondary/20 inline-block mb-4 shadow-inner">
              <img
                src={weddingData.qris.imageUrl}
                alt="QRIS Payment"
                className="w-48 h-48 object-contain"
              />
            </div>

            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {weddingData.qris.label}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
