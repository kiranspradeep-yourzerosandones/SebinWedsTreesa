"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";

export default function PersonalNote() {
  const { couple } = weddingData;

  return (
    <section className="relative section-padding bg-[#FAF7F2] overflow-hidden">
      {/* Soft background watermark — subtle dove */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 35C50 35 35 25 25 30C25 30 30 50 50 50C70 50 75 35 75 35C65 25 50 35 50 35Z"
            fill="#6B2D44"
          />
          <circle cx="50" cy="42" r="2" fill="#FAF7F2" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Top label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-8 h-[1px] bg-[#D8B26E]" />
          <p
            className="text-[#D8B26E] text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            A note from us
          </p>
          <div className="w-8 h-[1px] bg-[#D8B26E]" />
        </motion.div>

        {/* The Message */}
        <motion.blockquote
          className="text-[#6B2D44] text-xl sm:text-2xl md:text-3xl italic font-light leading-[1.6] mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          &ldquo;To everyone who has shaped our lives — thank you for being
          part of this moment with us. We can&apos;t wait to see you on
          the 16<sup className="text-base">th</sup>.&rdquo;
        </motion.blockquote>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#D8B26E]/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D8B26E]" />
            <div className="w-12 h-[1px] bg-[#D8B26E]/40" />
          </div>

          {/* Couple Names — handwritten feel */}
          <p
            className="text-[#6B2D44] text-2xl sm:text-3xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            {couple.groomFirstName} & {couple.brideFirstName}
          </p>

          <p
            className="text-[#8C8C8C] text-[10px] tracking-[0.25em] uppercase mt-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            With love
          </p>
        </motion.div>
      </div>
    </section>
  );
}