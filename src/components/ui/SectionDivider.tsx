"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "cross" | "dove" | "diamond" | "simple";
  color?: "ivory" | "blush";
}

export default function SectionDivider({
  variant = "diamond",
  color = "ivory",
}: SectionDividerProps) {
  const bgColor = color === "ivory" ? "bg-[#FAF7F2]" : "bg-[#F6E8E6]/40";

  return (
    <div className={`relative py-10 sm:py-14 ${bgColor}`}>
      <motion.div
        className="flex items-center justify-center gap-4 sm:gap-6"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Left line */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent to-[#D8B26E]/50"
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Center Symbol */}
        <div className="flex items-center justify-center">
          {variant === "cross" && <CrossSymbol />}
          {variant === "dove" && <DoveSymbol />}
          {variant === "diamond" && <DiamondSymbol />}
          {variant === "simple" && <SimpleSymbol />}
        </div>

        {/* Right line */}
        <motion.div
          className="h-[1px] bg-gradient-to-l from-transparent to-[#D8B26E]/50"
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Cross Symbol — for spiritual sections ─── */
function CrossSymbol() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="9.5" stroke="#D8B26E" strokeOpacity="0.4" />
      <path
        d="M10 5V15M7 8H13"
        stroke="#D8B26E"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Dove Symbol — peace/love sections ─── */
function DoveSymbol() {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 10C12 10 8 6 4 8C4 8 6 12 12 12C18 12 20 8 20 8C16 6 12 10 12 10Z"
        stroke="#D8B26E"
        strokeOpacity="0.6"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="0.8" fill="#D8B26E" fillOpacity="0.5" />
    </svg>
  );
}

/* ─── Diamond Symbol — elegant default ─── */
function DiamondSymbol() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1 h-1 rotate-45 bg-[#D8B26E]/60" />
      <div className="w-2 h-2 rotate-45 border border-[#D8B26E]" />
      <div className="w-1 h-1 rotate-45 bg-[#D8B26E]/60" />
    </div>
  );
}

/* ─── Simple — just dots ─── */
function SimpleSymbol() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-1 h-1 rounded-full bg-[#D8B26E]/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#D8B26E]" />
      <div className="w-1 h-1 rounded-full bg-[#D8B26E]/50" />
    </div>
  );
}