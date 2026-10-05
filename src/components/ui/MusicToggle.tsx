"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { audioManager } from "@/lib/audioManager";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Sync state with audioManager
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents background click triggers
    audioManager.toggle();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-6 left-6 z-[120] w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-[#D8B26E]/50 shadow-xl flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
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
          <Music size={18} className="text-[#6B2D44] animate-pulse" />
        ) : (
          <VolumeX size={18} className="text-[#6B2D44]/70" />
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