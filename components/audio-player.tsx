"use client";

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Disc3, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
}

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ src, autoPlay = false }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsVisible(true);
            })
            .catch((err) => {
              console.error("Audio playback failed:", err);
              setIsPlaying(false);
            });
        }
      },
      pause: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      },
    }));

    useEffect(() => {
      // Delay showing the button slightly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    const togglePlay = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => console.error(err));
        }
      }
    };

    return (
      <>
        <audio
          ref={audioRef}
          src={src}
          loop
          preload="auto"
          {...(autoPlay ? { autoPlay: true } : {})}
        />

        <button
          onClick={togglePlay}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full",
            "bg-primary text-primary-foreground shadow-lg border-2 border-primary-foreground/20",
            "transition-all duration-500 hover:scale-110",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0",
          )}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Disc3 className="w-6 h-6 animate-spin-slow opacity-90" />
          ) : (
            <Music className="w-5 h-5 opacity-90 ml-0.5" />
          )}

          {/* Ripple effect when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary opacity-20 -z-10" />
          )}
        </button>
      </>
    );
  },
);

AudioPlayer.displayName = "AudioPlayer";
