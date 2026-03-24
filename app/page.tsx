"use client";

import React, { useState, useRef, useEffect } from "react";
import { WelcomeScreen } from "@/components/welcome-screen";
import { AudioPlayer, type AudioPlayerRef } from "@/components/audio-player";
import { HeroSection } from "@/components/hero-section";
import { CoupleSection } from "@/components/couple-section";
import { EventSection } from "@/components/event-section";
import { GallerySection } from "@/components/gallery-section";
import { GiftSection } from "@/components/gift-section";
import { RsvpSection } from "@/components/rsvp-section";
import { FooterSection } from "@/components/footer-section";
import { Toaster } from "@/components/ui/sonner";
import { weddingData } from "@/data/config";

export default function Home() {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const audioRef = useRef<AudioPlayerRef>(null);

  const handleOpenInvitation = () => {
    setIsWelcomeOpen(false);
    // Play audio when welcome screen is closed
    if (audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 500); // Slight delay for smoother transition
    }
  };

  // Prevent scrolling while welcome screen is open
  useEffect(() => {
    if (isWelcomeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isWelcomeOpen]);

  return (
    <div className="flex min-h-screen flex-col relative selection:bg-accent/30 selection:text-primary">
      {/* Welcome Cover Overlay */}
      <WelcomeScreen 
        isOpen={isWelcomeOpen} 
        onOpen={handleOpenInvitation} 
        guestName="Keluarga Besar & Sahabat" 
      />

      {/* Floating Audio Player */}
      <AudioPlayer ref={audioRef} src={weddingData.audio} />

      {/* Main Content wrapper */}
      <main className="flex-1 w-full mx-auto shadow-2xl bg-white max-w-none md:max-w-[768px] lg:max-w-none">
        <HeroSection />
        <CoupleSection />
        <EventSection />
        <GallerySection />
        <GiftSection />
        <RsvpSection />
        <FooterSection />
      </main>
      
      {/* Toast Notifications */}
      <Toaster position="bottom-center" />
    </div>
  );
}
