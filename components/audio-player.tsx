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
    const [autoplayFailed, setAutoplayFailed] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsVisible(true);
              setAutoplayFailed(false);
            })
            .catch((err) => {
              console.error("Audio playback failed, likely blocked by browser:", err);
              setIsPlaying(false);
              setAutoplayFailed(true);
              setIsVisible(true); // Ensure button is visible so user can click it
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
              setAutoplayFailed(false); // Clear the warning once successfully played
            })
            .catch((err) => console.error(err));
        }
      }
    };

    return (
      <div className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"
      )}>
        <audio
          ref={audioRef}
          src={src}
          loop
          preload="auto"
          {...(autoPlay ? { autoPlay: true } : {})}
        />

        {/* Fallback Tooltip for Mobile Autoplay Block */}
        {autoplayFailed && !isPlaying && (
          <div className="bg-white text-primary text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-accent/20 animate-bounce relative right-2 mb-1">
            Tap to play music
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white border-b border-r border-accent/20 rotate-45" />
          </div>
        )}

        <button
          onClick={togglePlay}
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full relative group",
            "bg-primary text-primary-foreground shadow-lg border-2 border-primary-foreground/20",
            "transition-all duration-500 hover:scale-110",
            autoplayFailed && !isPlaying ? "animate-pulse ring-4 ring-accent/50" : ""
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
      </div>
    );
  },
);

AudioPlayer.displayName = "AudioPlayer";
