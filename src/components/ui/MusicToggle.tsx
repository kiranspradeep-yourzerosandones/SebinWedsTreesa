"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [visible, setVisible] = useState(false);

  // Show button after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = new Audio("/music/wedding-song.mp3");
    audio.loop = true;
    audio.volume = 0.3;

    // Check if audio file exists
    audio.addEventListener("error", () => {
      setAudioAvailable(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log("Audio not available:", err);
      setAudioAvailable(false);
    }
  };

  if (!audioAvailable || !visible) return null;

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#D8B26E]/30 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {/* Pulsing rings when playing */}
      {isPlaying && (
        <>
          <span className="absolute inset-0 rounded-full border border-[#D8B26E]/40 animate-ping" />
          <span
            className="absolute inset-[-4px] rounded-full border border-[#D8B26E]/20 animate-ping"
            style={{ animationDelay: "0.3s" }}
          />
        </>
      )}

      {/* Icon */}
      <div className="relative">
        {isPlaying ? (
          <Music
            size={16}
            className="text-[#6B2D44] animate-pulse"
          />
        ) : (
          <VolumeX size={16} className="text-[#6B2D44]/70" />
        )}
      </div>

      {/* Tooltip */}
      <span
        className="absolute left-full ml-3 bg-[#6B2D44] text-white text-[10px] tracking-wider uppercase px-2.5 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {isPlaying ? "Pause music" : "Play music"}
      </span>
    </motion.button>
  );
}