"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { audioManager } from "@/lib/audioManager";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 1. Sync UI with core audio state
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // 2. Try to auto-play immediately on mount
    audioManager.play();

    // 3. Fallback: Listen for the very first click, tap, scroll, or key press anywhere on the site
    const handleGlobalInteraction = () => {
      if (!audioManager.isPlaying && !audioManager.userManuallyPaused) {
        audioManager.play();
      }
    };

    const events = ["click", "touchstart", "scroll", "keydown"];

    // Use capture: true so that we intercept gestures even if other components try to stop propagation
    events.forEach((evt) => {
      window.addEventListener(evt, handleGlobalInteraction, { capture: true, passive: true });
    });

    // Clean up event listeners once music successfully starts playing
    const checkPlayingAndCleanup = audioManager.subscribe((playing) => {
      if (playing) {
        events.forEach((evt) => {
          window.removeEventListener(evt, handleGlobalInteraction, { capture: true });
        });
      }
    });

    return () => {
      unsubscribe();
      checkPlayingAndCleanup();
      events.forEach((evt) => {
        window.removeEventListener(evt, handleGlobalInteraction, { capture: true });
      });
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering background interaction listeners
    audioManager.toggle();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-6 left-6 z-[120] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-[#D8B26E]/40 shadow-xl flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
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
      <div className="relative pointer-events-none">
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
  );
}