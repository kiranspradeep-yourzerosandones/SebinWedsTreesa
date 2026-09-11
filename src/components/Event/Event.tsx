
"use client";

import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  Navigation,
} from "lucide-react";

import { weddingData } from "@/data/weddingData";

export default function Event() {
  const { event, verse } = weddingData;

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section
      id="event"
      className="section-padding bg-[#F6E8E6]/40 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#D8B26E]/5" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[#6B2D44]/5" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D8B26E] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4">
            Join us
          </p>

          <h2
            className="text-[#6B2D44] text-3xl sm:text-4xl md:text-5xl mb-3"
            style={{
              fontFamily: "'Noto Sans Malayalam', sans-serif",
            }}
          >
            {event.name}
          </h2>

          <p
            className="text-[#666666] text-sm sm:text-base italic"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {event.nameEnglish}
          </p>

          <div className="w-12 h-[1px] bg-[#D8B26E] mx-auto mt-6" />
        </motion.div>

        {/* Verse */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <p
            className="text-[#6B2D44]/70 text-base sm:text-lg md:text-xl italic font-light leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            &ldquo;{verse.english}&rdquo;
          </p>

          <p className="text-[#8C8C8C] text-xs tracking-[0.15em] uppercase mt-3">
            {verse.reference}
          </p>
        </motion.div>

        {/* Event Details Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">

          {[
            {
              icon: Calendar,
              label: "Date",
              value: event.date,
              sub: event.day,
            },
            {
              icon: Clock,
              label: "Time",
              value: event.time,
              sub: "Evening",
            },
            {
              icon: MapPin,
              label: "Venue",
              value: event.venue.name,
              sub: event.venue.address,
              mapsUrl: event.venue.mapsUrl,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                className="bg-white/70 backdrop-blur-sm border border-[#D8B26E]/20 rounded-2xl p-6 text-center"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#6B2D44]/8 flex items-center justify-center">
                    <Icon
                      size={18}
                      className="text-[#6B2D44]"
                    />
                  </div>
                </div>

                {/* Label */}
                <p className="text-[#D8B26E] text-[10px] tracking-[0.2em] uppercase mb-2">
                  {item.label}
                </p>

                {/* Value */}
                <p
                  className="text-[#6B2D44] text-xl sm:text-2xl font-medium mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {item.value}
                </p>

                {/* Address / Day */}
                <p className="text-[#8C8C8C] text-xs mb-4">
                  {item.sub}
                </p>

                {/* Google Maps button — Venue only */}
                {"mapsUrl" in item && item.mapsUrl && (
                  <motion.a
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#6B2D44] text-white text-[10px] uppercase tracking-wide px-5 py-2.5 rounded-sm hover:bg-[#8B3D5A] transition-colors"
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <Navigation size={13} />
                    Maps
                  </motion.a>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

