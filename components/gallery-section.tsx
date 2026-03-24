"use client";

import React, { useState } from "react";
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
import { GalleryLightbox } from "./gallery-lightbox";
import { ZoomIn } from "lucide-react";

export function GallerySection() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
    plugin.current.stop(); // Pause carousel when lightbox is open
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    plugin.current.reset(); // Resume carousel after closing
  };

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
                    <Card 
                      className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 rounded-2xl bg-white/50 cursor-pointer group"
                      onClick={() => openLightbox(index)}
                    >
                      <CardContent className="flex aspect-[4/5] items-center justify-center p-0 relative">
                        <div className="absolute inset-0 bg-secondary/10 animate-pulse" /> {/* Placeholder loading state */}
                        <img 
                          src={imgSrc} 
                          alt={`Gallery photo ${index + 1}`} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Interactive overlay */}
                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <ZoomIn className="w-6 h-6" />
                          </div>
                        </div>
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

      <GalleryLightbox 
        isOpen={lightboxOpen} 
        onClose={closeLightbox} 
        currentIndex={selectedIndex} 
        onNavigate={setSelectedIndex} 
      />
    </section>
  );
}
