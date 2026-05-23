"use client";

import { motion, Variants } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function Family() {
  const { families } = weddingData;

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // easeOut cubic-bezier
      },
    },
  };

  const cardVariantsRight: Variants = {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const FamilyCard = ({
    data,
    direction,
  }: {
    data: (typeof families)["groom"];
    direction: "left" | "right";
  }) => (
    <motion.div
      className="flex-1 min-w-0"
      variants={
        direction === "left"
          ? cardVariants
          : cardVariantsRight
      }
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-80px",
      }}
    >
      <div className="bg-white/60 backdrop-blur-sm border border-[#D8B26E]/20 rounded-2xl p-6 sm:p-8 md:p-10 text-center h-full shadow-sm">

        {/* Side Label */}
        <p className="text-[#D8B26E] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-6">
          {data.side === "Groom"
            ? "Groom's Family"
            : "Bride's Family"}
        </p>

        {/* Divider */}
        <div className="w-8 h-[1px] bg-[#D8B26E] mx-auto mb-6" />

        {/* House Name */}
        <h3
          className="font-cormorant text-[#6B2D44] text-2xl sm:text-3xl font-medium mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {data.houseName}
        </h3>

        {/* Address */}
        <p className="text-[#8C8C8C] text-xs sm:text-sm mb-6 leading-relaxed">
          {data.houseAddress}
          <br />
          {data.location}
        </p>

        {/* Divider */}
        <div className="gold-divider-full mb-6" />

        {/* Parents */}
        <div className="space-y-1">
          <p className="text-[#2A2A2A] text-sm sm:text-base font-light">
            {data.parents.mother}
          </p>

          <p className="text-[#8C8C8C] text-xs">
            &
          </p>

          <p className="text-[#2A2A2A] text-sm sm:text-base font-light">
            {data.parents.father}
          </p>
        </div>

        {/* Label */}
        <p className="text-[#8C8C8C] text-[10px] tracking-[0.15em] uppercase mt-4">
          {data.side === "Groom"
            ? "Parents of the Groom"
            : "Parents of the Bride"}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section
      id="family"
      className="section-padding bg-[#FAF7F2]"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <p className="text-[#D8B26E] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4">
          With Blessings Of
        </p>

        <h2
          className="font-cormorant text-[#6B2D44] text-3xl sm:text-4xl md:text-5xl font-light"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Our Families
        </h2>

        <div className="w-12 h-[1px] bg-[#D8B26E] mx-auto mt-6" />
      </motion.div>

      {/* Family Cards */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">

        <FamilyCard
          data={families.groom}
          direction="left"
        />

        {/* Desktop Heart */}
        <motion.div
          className="hidden md:flex flex-col items-center justify-center px-2"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
        >
          <Heart
            size={24}
            className="text-[#D8B26E] fill-[#D8B26E]/20"
          />
        </motion.div>

        <FamilyCard
          data={families.bride}
          direction="right"
        />
      </div>

      {/* Mobile Heart */}
      <motion.div
        className="flex md:hidden justify-center my-4"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
          delay: 0.4,
        }}
      >
        <Heart
          size={20}
          className="text-[#D8B26E] fill-[#D8B26E]/20"
        />
      </motion.div>
    </section>
  );
}