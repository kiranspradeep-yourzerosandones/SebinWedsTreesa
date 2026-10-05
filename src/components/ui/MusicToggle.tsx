"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [visible, setVisible] = useState(false);

  // Show toggle button after brief delay
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Function to start playback
  const startAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.3;
    
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked by browser policy; waiting for user gesture
        setIsPlaying(false);
      });
  };

  useEffect(() => {
    // 1. Try to autoplay immediately
    startAudio();

    // 2. Fallback: Catch the very first user interaction anywhere on the screen
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        startAudio();
      }
      cleanup();
    };

    const events = ["click", "touchstart", "touchend", "pointerdown", "keydown"];

    const cleanup = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, { capture: true });
        document.removeEventListener(evt, handleFirstInteraction, { capture: true });
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { capture: true, once: true });
      document.addEventListener(evt, handleFirstInteraction, { capture: true, once: true });
    });

    return () => {
      cleanup();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback error:", err));
    }
  };

  if (!audioAvailable) return null;

  return (
    <>
      {/* Hidden native audio tag */}
      <audio
        ref={audioRef}
        src="/music/wedding-song.mp3"
        loop
        preload="auto"
        playsInline
        onError={() => setAudioAvailable(false)}
      />

      {/* Floating Toggle Button */}
      {visible && (
        <motion.button
          onClick={toggleMusic}
          className="fixed bottom-6 left-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#D8B26E]/40 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 group cursor-pointer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          aria-label={isPlaying ? "Mute music" : "Play music"}
        >
          {/* Pulsing rings when playing */}
          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full border border-[#D8B26E]/50 animate-ping pointer-events-none" />
              <span
                className="absolute inset-[-4px] rounded-full border border-[#D8B26E]/30 animate-ping pointer-events-none"
                style={{ animationDelay: "0.3s" }}
              />
            </>
          )}

          {/* Icon */}
          <div className="relative">
            {isPlaying ? (
              <Music size={16} className="text-[#6B2D44] animate-pulse" />
            ) : (
              <VolumeX size={16} className="text-[#6B2D44]/70" />
            )}
          </div>

          {/* Tooltip */}
          <span
            className="absolute left-full ml-3 bg-[#6B2D44] text-white text-[10px] tracking-wider uppercase px-2.5 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {isPlaying ? "Pause music" : "Play music"}
          </span>
        </motion.button>
      )}
    </>
  );
}