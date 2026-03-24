"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/config";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function GallerySection() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="py-24 px-6 md:py-32 bg-muted/40 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-sm tracking-widest uppercase text-secondary font-semibold mb-4">Gallery</h2>
          <p className="font-heading text-4xl text-primary">Momen Bahagia Kami</p>
        </div>

        <div className="relative px-0 md:px-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {weddingData.gallery.map((imgSrc, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-500 rounded-2xl bg-white/50">
                      <CardContent className="flex aspect-[4/5] items-center justify-center p-0 relative group">
                        <div className="absolute inset-0 bg-secondary/10 animate-pulse" /> {/* Placeholder loading state */}
                        <img 
                          src={imgSrc} 
                          alt={`Gallery photo ${index + 1}`} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom styled carousel controls */}
            <div className="hidden md:block">
              <CarouselPrevious className="bg-white/80 border-accent/20 text-primary hover:bg-primary hover:text-white" />
              <CarouselNext className="bg-white/80 border-accent/20 text-primary hover:bg-primary hover:text-white" />
            </div>
          </Carousel>
        </div>
      </motion.div>
    </section>
  );
}
