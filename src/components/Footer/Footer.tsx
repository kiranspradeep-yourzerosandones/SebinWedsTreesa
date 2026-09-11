"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function Footer() {
  const { hosts, couple, event, verse } = weddingData;

  return (
    <footer className="relative bg-[#6B2D44] overflow-hidden">

      {/* Decorative top border */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D8B26E]/40 to-transparent" />

      {/* Background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/[0.02]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.01]" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 px-6 pt-16 pb-10 sm:pt-20 sm:pb-12 max-w-2xl mx-auto text-center">

        {/* Small label */}
        <motion.p
          className="text-[#D8B26E] text-[10px] tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          We found each other
        </motion.p>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2
            className="text-white font-light leading-[1.1]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 10vw, 72px)",
            }}
          >
            {couple.groomFirstName}
          </h2>

          <p
            className="text-[#D8B26E] my-1"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(24px, 6vw, 40px)",
            }}
          >
            &
          </p>

          <h2
            className="text-white font-light leading-[1.1]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 10vw, 72px)",
            }}
          >
            {couple.brideFirstName}
          </h2>
        </motion.div>

        {/* Malayalam Title */}
        <motion.p
          className="text-[#D8B26E]/80 text-xl sm:text-2xl mt-5 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
        >
          {event.name}
        </motion.p>

        {/* Gold divider */}
        <motion.div
          className="w-16 h-[1px] bg-[#D8B26E]/30 mx-auto mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Bible Verse */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p
            className="text-white/60 text-base sm:text-lg md:text-xl italic font-light leading-relaxed mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &ldquo;{verse.english}&rdquo;
          </p>

          <p
            className="text-[#D8B26E]/50 text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {verse.reference}
          </p>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="w-8 h-[1px] bg-[#D8B26E]/20 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* Event Quick Info */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-[#D8B26E]/60" />

            <p
              className="text-white/50 text-xs tracking-[0.1em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {event.date}
            </p>
          </div>

          <div className="hidden sm:block w-[1px] h-3 bg-[#D8B26E]/20" />

          <div className="flex items-center gap-2">
            <Clock size={13} className="text-[#D8B26E]/60" />

            <p
              className="text-white/50 text-xs tracking-[0.1em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {event.time}
            </p>
          </div>

          <div className="hidden sm:block w-[1px] h-3 bg-[#D8B26E]/20" />

          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[#D8B26E]/60" />

            <p
              className="text-white/50 text-xs tracking-[0.1em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {event.venue.name}
            </p>
          </div>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="w-8 h-[1px] bg-[#D8B26E]/20 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        />

        {/* Hosts Block */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <p
            className="text-[#D8B26E]/60 text-[10px] tracking-[0.25em] uppercase mb-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Sharing our happiness
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <p
              className="text-white/80 text-lg sm:text-xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {hosts.name1}
            </p>

            <div className="flex flex-col gap-1">
              <div className="w-1 h-1 rounded-full bg-[#D8B26E]/40" />
              <div className="w-1 h-1 rounded-full bg-[#D8B26E]/40" />
            </div>

            <p
              className="text-white/80 text-lg sm:text-xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {hosts.name2}
            </p>
          </div>

          <p
            className="text-white/30 text-xs mt-3 tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {hosts.tagline}
          </p>
        </motion.div>

        {/* Heart */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.85,
            type: "spring",
            stiffness: 200,
          }}
        >
          <Heart
            size={20}
            className="text-[#D8B26E]/50 fill-[#D8B26E]/20"
          />
        </motion.div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p
            className="text-white/20 text-[10px] tracking-wide text-center sm:text-left"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            With love,{" "}
            <span className="text-white/35">
              {couple.groomFirstName} & {couple.brideFirstName}
            </span>
          </p>

          <p
            className="text-white/15 text-[10px] tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            © {new Date().getFullYear()}
          </p>

        </div>
      </div>

    </footer>
  );
}