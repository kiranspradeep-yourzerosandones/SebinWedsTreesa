"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";
import { weddingData } from "@/data/weddingData";

interface Petal {
  id: number;
  left: string;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

export default function Hero() {
  const { couple, event } = weddingData;
  const [petals, setPetals] = useState<Petal[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const newPetals: Petal[] = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8,
      rotation: Math.random() * 360,
      size: Math.random() * 8 + 8,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <motion.section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-[#FAF7F2] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* ─── Soft background blurs ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F6E8E6]/40 blur-3xl -translate-y-1/4 translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#D8B26E]/10 blur-3xl translate-y-1/4 -translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
        />
      </div>

      {/* ─── FALLING PETALS ─── */}
      {hasMounted && (
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute -top-8"
              style={{ left: petal.left }}
              animate={{
                y: ["0vh", "110vh"],
                rotate: [petal.rotation, petal.rotation + 360],
                x: [0, 25, -25, 0],
              }}
              transition={{
                duration: petal.duration,
                repeat: Infinity,
                delay: petal.delay,
                ease: "linear",
              }}
            >
              <PetalSVG size={petal.size} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ─── MAIN ARCH FRAME ─── */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center px-4 py-6 sm:py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative w-full max-w-[480px] sm:max-w-[520px] h-full max-h-[920px] aspect-[10/16]">
          <FloralCornerTop position="left" />
          <FloralCornerTop position="right" />
          <FloralCornerBottom position="left" />
          <FloralCornerBottom position="right" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#FCF8F3] to-[#F6E8E6]/30 rounded-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ArchFrame />
          </motion.div>

          <motion.div
            className="absolute top-5 sm:top-7 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <TopOrnament />
          </motion.div>

          <div className="relative z-20 h-full flex flex-col items-center justify-between px-7 sm:px-10 pt-20 sm:pt-24 pb-20 sm:pb-28">
            <motion.div
              className="flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                className="w-6 h-[1px] bg-[#D8B26E]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.75 }}
              />
              <p
                className="text-[#6B2D44] text-[9px] sm:text-[10px] tracking-[0.35em] uppercase"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                We&apos;re getting married
              </p>
              <motion.div
                className="w-6 h-[1px] bg-[#D8B26E]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.85 }}
              />
            </motion.div>

            <div className="flex flex-col items-center justify-center flex-1 w-full">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.h1
                  className="text-[#6B2D44] leading-[1.05]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(46px, 12vw, 72px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.95 }}
                >
                  {couple.groomFirstName}
                </motion.h1>

                <motion.div
                  className="flex items-center justify-center gap-3 my-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <motion.div
                    className="w-5 h-[1px] bg-[#D8B26E]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                  />
                  <span
                    className="text-[#D8B26E] italic"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(24px, 6vw, 36px)",
                    }}
                  >
                    &
                  </span>
                  <motion.div
                    className="w-5 h-[1px] bg-[#D8B26E]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                  />
                </motion.div>

                <motion.h1
                  className="text-[#6B2D44] leading-[1.05]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(46px, 12vw, 72px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.25 }}
                >
                  {couple.brideFirstName}
                </motion.h1>
              </motion.div>

              <motion.h2
                className="text-[#6B2D44]/75 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.35 }}
                style={{
                  fontFamily: "'Noto Sans Malayalam', sans-serif",
                  fontSize: "clamp(18px, 4.5vw, 24px)",
                }}
              >
                {event.name}
              </motion.h2>
            </div>

            <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.45 }}
            >
              <motion.div
                className="w-14 h-[1px] bg-[#D8B26E]/60 mb-5"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              />

              <motion.div
                className="flex items-center justify-center gap-3 sm:gap-5 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.55 }}
              >
                <div className="text-center">
                  <p
                    className="text-[#8C8C8C] text-[9px] tracking-[0.2em] uppercase mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Day
                  </p>
                  <p
                    className="text-[#6B2D44] text-sm sm:text-base"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {event.day}
                  </p>
                </div>

                <div className="w-[1px] h-8 bg-[#D8B26E]/30" />

                <div className="text-center">
                  <p
                    className="text-[#8C8C8C] text-[9px] tracking-[0.2em] uppercase mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Date
                  </p>
                  <p
                    className="text-[#6B2D44] text-sm sm:text-base"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {event.date}
                  </p>
                </div>

                <div className="w-[1px] h-8 bg-[#D8B26E]/30" />

                <div className="text-center">
                  <p
                    className="text-[#8C8C8C] text-[9px] tracking-[0.2em] uppercase mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Time
                  </p>
                  <p
                    className="text-[#6B2D44] text-sm sm:text-base"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {event.time}
                  </p>
                </div>
              </motion.div>

              <motion.p
                className="text-[#666666] text-[10px] sm:text-xs text-center leading-relaxed flex items-center gap-1.5 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <MapPin size={11} className="text-[#D8B26E] flex-shrink-0" />
                <span>{event.venue.name}</span>
              </motion.p>

              <motion.div
                className="w-10 h-[1px] bg-[#D8B26E]/40 mt-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.7 }}
              />
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 right-0 w-40 h-56 sm:w-48 sm:h-64 z-30 pointer-events-none"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <CoupleSilhouette />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-[#D8B26E]" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────────
   DECORATIVE SVG COMPONENTS (used in hero)
────────────────────────────────────────────────────────── */

function ArchFrame() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 640"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M 25 75 Q 25 35, 65 35 Q 130 10, 200 15 Q 270 10, 335 35 Q 375 35, 375 75 L 375 625 L 25 625 Z"
        fill="none"
        stroke="#D8B26E"
        strokeWidth="1.8"
        strokeOpacity="0.85"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 8,
          delay: 0.5,
          repeat: Infinity,
          times: [0, 0.4, 0.8, 1],
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M 32 82 Q 32 42, 70 42 Q 132 17, 200 22 Q 268 17, 330 42 Q 368 42, 368 82 L 368 618 L 32 618 Z"
        fill="none"
        stroke="#D8B26E"
        strokeWidth="1"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 8,
          delay: 0.8,
          repeat: Infinity,
          times: [0, 0.4, 0.8, 1],
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

function TopOrnament() {
  return (
    <motion.svg
      width="60"
      height="50"
      viewBox="0 0 60 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <g>
        <path d="M30 5 L28 12 L30 10 L32 12 Z" fill="#D8B26E" />
        <path d="M30 12 L25 20 L30 28 L35 20 Z" fill="none" stroke="#D8B26E" strokeWidth="1" />
        <circle cx="30" cy="20" r="1.5" fill="#D8B26E" />
        <path d="M18 22 Q14 22, 14 26 Q14 28, 17 27 Q15 25, 18 24" fill="#D8B26E" />
        <path d="M42 22 Q46 22, 46 26 Q46 28, 43 27 Q45 25, 42 24" fill="#D8B26E" />
        <line x1="10" y1="35" x2="50" y2="35" stroke="#D8B26E" strokeWidth="0.5" />
        <circle cx="20" cy="38" r="1" fill="#D8B26E" />
        <circle cx="30" cy="38" r="1.5" fill="#D8B26E" />
        <circle cx="40" cy="38" r="1" fill="#D8B26E" />
        <line x1="22" y1="42" x2="38" y2="42" stroke="#D8B26E" strokeWidth="0.5" opacity="0.6" />
      </g>
    </motion.svg>
  );
}

function FloralCornerTop({ position }: { position: "left" | "right" }) {
  const isLeft = position === "left";
  return (
    <motion.div
      className={`absolute -top-6 ${isLeft ? "-left-6" : "-right-6"} w-32 h-32 sm:w-40 sm:h-40 pointer-events-none z-20`}
      style={{ transform: isLeft ? "none" : "scaleX(-1)" }}
      animate={{ rotate: [0, 1.5, 0, -1.5, 0], scale: [1, 1.02, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.85">
          <path d="M0 20 Q40 15, 80 30 Q120 40, 155 25" stroke="#8B6F47" strokeWidth="0.6" fill="none" opacity="0.6" />
          <path d="M10 30 Q40 40, 75 50 Q110 55, 145 45" stroke="#8B6F47" strokeWidth="0.5" fill="none" opacity="0.5" />
          <ellipse cx="20" cy="18" rx="8" ry="3" fill="#A88B5C" opacity="0.4" transform="rotate(-20 20 18)" />
          <ellipse cx="45" cy="22" rx="10" ry="3" fill="#A88B5C" opacity="0.5" transform="rotate(-10 45 22)" />
          <ellipse cx="70" cy="28" rx="9" ry="3" fill="#A88B5C" opacity="0.4" transform="rotate(5 70 28)" />
          <ellipse cx="100" cy="35" rx="11" ry="3" fill="#A88B5C" opacity="0.5" transform="rotate(15 100 35)" />
          <ellipse cx="130" cy="32" rx="9" ry="3" fill="#A88B5C" opacity="0.4" transform="rotate(20 130 32)" />
          <ellipse cx="55" cy="45" rx="8" ry="2.5" fill="#A88B5C" opacity="0.5" transform="rotate(-5 55 45)" />
          <ellipse cx="90" cy="55" rx="9" ry="2.5" fill="#A88B5C" opacity="0.4" transform="rotate(10 90 55)" />
        </g>
        <g>
          <CherryFlower cx={15} cy={10} size={4} />
          <CherryFlower cx={35} cy={5} size={5} />
          <CherryFlower cx={55} cy={15} size={4.5} />
          <CherryFlower cx={75} cy={8} size={6} />
          <CherryFlower cx={95} cy={20} size={4} />
          <CherryFlower cx={115} cy={12} size={5} />
          <CherryFlower cx={135} cy={22} size={4} />
          <CherryFlower cx={25} cy={45} size={3.5} />
          <CherryFlower cx={50} cy={52} size={4} />
          <CherryFlower cx={80} cy={48} size={4.5} />
          <CherryFlower cx={110} cy={55} size={3.5} />
          <CherryFlower cx={130} cy={50} size={4} />
          <circle cx="25" cy="25" r="2" fill="#6B2D44" />
          <circle cx="50" cy="30" r="1.5" fill="#6B2D44" />
          <circle cx="85" cy="25" r="2" fill="#6B2D44" />
          <circle cx="105" cy="32" r="1.5" fill="#6B2D44" />
          <circle cx="125" cy="35" r="2" fill="#6B2D44" />
          <circle cx="40" cy="60" r="1.5" fill="#6B2D44" />
          <circle cx="70" cy="65" r="2" fill="#6B2D44" />
          <circle cx="100" cy="68" r="1.5" fill="#6B2D44" />
          <circle cx="10" cy="35" r="1" fill="#8B3D5A" />
          <circle cx="62" cy="40" r="1" fill="#8B3D5A" />
          <circle cx="145" cy="45" r="1.2" fill="#8B3D5A" />
        </g>
      </svg>
    </motion.div>
  );
}

function FloralCornerBottom({ position }: { position: "left" | "right" }) {
  const isLeft = position === "left";
  return (
    <motion.div
      className={`absolute -bottom-4 ${isLeft ? "-left-4" : "-right-4"} w-24 h-24 sm:w-32 sm:h-32 pointer-events-none z-20`}
      style={{ transform: `${isLeft ? "" : "scaleX(-1) "}scaleY(-1)` }}
      animate={{ rotate: [0, -1.5, 0, 1.5, 0], scale: [1, 1.02, 1] }}
      transition={{ duration: 6, delay: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.75">
          <path d="M0 15 Q30 20, 60 35" stroke="#8B6F47" strokeWidth="0.5" fill="none" opacity="0.5" />
          <ellipse cx="15" cy="14" rx="6" ry="2" fill="#A88B5C" opacity="0.4" transform="rotate(-15 15 14)" />
          <ellipse cx="35" cy="22" rx="8" ry="2.5" fill="#A88B5C" opacity="0.5" transform="rotate(5 35 22)" />
          <ellipse cx="55" cy="30" rx="7" ry="2" fill="#A88B5C" opacity="0.4" transform="rotate(15 55 30)" />
          <CherryFlower cx={10} cy={8} size={3} />
          <CherryFlower cx={25} cy={12} size={3.5} />
          <CherryFlower cx={45} cy={18} size={3} />
          <CherryFlower cx={65} cy={25} size={3.5} />
          <circle cx="18" cy="25" r="1.5" fill="#6B2D44" />
          <circle cx="50" cy="28" r="1.5" fill="#6B2D44" />
          <circle cx="75" cy="35" r="1.5" fill="#6B2D44" />
        </g>
      </svg>
    </motion.div>
  );
}

function CherryFlower({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={size} fill="#6B2D44" />
      <circle cx={cx - 1.5} cy={cy - 1.5} r={size * 0.4} fill="#8B3D5A" />
      <circle cx={cx + 0.5} cy={cy + 0.5} r={size * 0.2} fill="#4A1F30" />
    </g>
  );
}

function PetalSVG({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="7" cy="7" rx="3.5" ry="2.5" fill="#6B2D44" fillOpacity="0.5" transform="rotate(45 7 7)" />
      <ellipse cx="6" cy="6" rx="1.5" ry="1" fill="#8B3D5A" fillOpacity="0.6" transform="rotate(45 6 6)" />
    </svg>
  );
}

function CoupleSilhouette() {
  return (
    <motion.div
      className="relative w-full h-full"
      animate={{ y: [0, -2, 0], rotateZ: [0, 0.5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/images/chicple.png"
        alt="Couple silhouette"
        fill
        sizes="(max-width: 640px) 160px, 192px"
        className="object-contain object-right object-bottom"
        priority
      />
    </motion.div>
  );
}
// "use client";

// import { motion } from "framer-motion";
// import { MapPin, ChevronDown } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { weddingData } from "@/data/weddingData";

// interface Petal {
//   id: number;
//   left: string;
//   delay: number;
//   duration: number;
//   rotation: number;
//   size: number;
// }

// export default function Hero() {
//   const { couple, event } = weddingData;
//   const [petals, setPetals] = useState<Petal[]>([]);
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//     const newPetals: Petal[] = [...Array(15)].map((_, i) => ({
//       id: i,
//       left: `${Math.random() * 100}%`,
//       delay: Math.random() * 8,
//       duration: Math.random() * 6 + 8,
//       rotation: Math.random() * 360,
//       size: Math.random() * 8 + 8,
//     }));
//     setPetals(newPetals);
//   }, []);

//   return (
//     <section
//       id="home"
//       className="relative h-screen w-full overflow-hidden bg-[#FAF7F2] flex items-center justify-center"
//     >
//       {/* ─── Soft background blurs ─── */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F6E8E6]/40 blur-3xl -translate-y-1/4 translate-x-1/4" />
//         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#D8B26E]/10 blur-3xl translate-y-1/4 -translate-x-1/4" />
//       </div>

//       {/* ─── FALLING PETALS (always animating) ─── */}
//       {hasMounted && (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
//           {petals.map((petal) => (
//             <motion.div
//               key={petal.id}
//               className="absolute -top-8"
//               style={{ left: petal.left }}
//               animate={{
//                 y: ["0vh", "110vh"],
//                 rotate: [petal.rotation, petal.rotation + 360],
//                 x: [0, 25, -25, 0],
//               }}
//               transition={{
//                 duration: petal.duration,
//                 repeat: Infinity,
//                 delay: petal.delay,
//                 ease: "linear",
//               }}
//             >
//               <PetalSVG size={petal.size} />
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* ─── MAIN ARCH FRAME (full screen) ─── */}
//       <div className="relative w-full h-full flex items-center justify-center px-4 py-6 sm:py-10">
//         <div className="relative w-full max-w-[480px] sm:max-w-[520px] h-full max-h-[920px] aspect-[10/16]">

//           {/* ── FLORAL CORNERS (always animating) ── */}
//           <FloralCornerTop position="left" />
//           <FloralCornerTop position="right" />
//           <FloralCornerBottom position="left" />
//           <FloralCornerBottom position="right" />

//           {/* ── Background fill (soft cream inside arch) ── */}
//           <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#FCF8F3] to-[#F6E8E6]/30 rounded-sm" />

//           {/* ── Ornamental Arch SVG Frame (always animating) ── */}
//           <div className="absolute inset-0 z-10 pointer-events-none">
//             <ArchFrame />
//           </div>

//           {/* ── Top Medallion ── */}
//           <motion.div
//             className="absolute top-5 sm:top-7 left-1/2 -translate-x-1/2 z-20"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//           >
//             <TopOrnament />
//           </motion.div>

//           {/* ── CONTENT INSIDE ARCH ── */}
//           <div className="relative z-20 h-full flex flex-col items-center justify-between px-7 sm:px-10 pt-20 sm:pt-24 pb-20 sm:pb-28">

//             {/* ── TOP: Small label ── */}
//             <motion.div
//               className="flex items-center justify-center gap-3"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 1.1 }}
//             >
//               <div className="w-6 h-[1px] bg-[#D8B26E]" />
//               <p
//                 className="text-[#6B2D44] text-[9px] sm:text-[10px] tracking-[0.35em] uppercase"
//                 style={{ fontFamily: "'Poppins', sans-serif" }}
//               >
//                 We&apos;re getting married
//               </p>
//               <div className="w-6 h-[1px] bg-[#D8B26E]" />
//             </motion.div>

//             {/* ── MIDDLE BLOCK: Names + Malayalam ── */}
//             <div className="flex flex-col items-center justify-center flex-1 w-full">

//               {/* Couple Names */}
//               <motion.div
//                 className="text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 1.3 }}
//               >
//                 <h1
//                   className="text-[#6B2D44] leading-[1.05]"
//                   style={{
//                     fontFamily: "'Cormorant Garamond', serif",
//                     fontSize: "clamp(46px, 12vw, 72px)",
//                     fontWeight: 400,
//                     fontStyle: "italic",
//                   }}
//                 >
//                   {couple.groomFirstName}
//                 </h1>

//                 <motion.div
//                   className="flex items-center justify-center gap-3 my-2"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.6, delay: 1.7 }}
//                 >
//                   <div className="w-5 h-[1px] bg-[#D8B26E]" />
//                   <span
//                     className="text-[#D8B26E] italic"
//                     style={{
//                       fontFamily: "'Cormorant Garamond', serif",
//                       fontSize: "clamp(24px, 6vw, 36px)",
//                     }}
//                   >
//                     &
//                   </span>
//                   <div className="w-5 h-[1px] bg-[#D8B26E]" />
//                 </motion.div>

//                 <h1
//                   className="text-[#6B2D44] leading-[1.05]"
//                   style={{
//                     fontFamily: "'Cormorant Garamond', serif",
//                     fontSize: "clamp(46px, 12vw, 72px)",
//                     fontWeight: 400,
//                     fontStyle: "italic",
//                   }}
//                 >
//                   {couple.brideFirstName}
//                 </h1>
//               </motion.div>

//               {/* Malayalam Title */}
//               <motion.h2
//                 className="text-[#6B2D44]/75 mt-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 2.0 }}
//                 style={{
//                   fontFamily: "'Noto Sans Malayalam', sans-serif",
//                   fontSize: "clamp(18px, 4.5vw, 24px)",
//                 }}
//               >
//                 {event.name}
//               </motion.h2>
//             </div>

//             {/* ── BOTTOM BLOCK: Date / Time / Venue ── */}
//             <motion.div
//               className="w-full flex flex-col items-center"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 2.2 }}
//             >
//               {/* Divider above details */}
//               <div className="w-14 h-[1px] bg-[#D8B26E]/60 mb-5" />

//               {/* Day / Date / Time */}
//               <div className="flex items-center justify-center gap-3 sm:gap-5 mb-4">
//                 <div className="text-center">
//                   <p
//                     className="text-[#8C8C8C] text-[9px] tracking-[0.2em] uppercase mb-1"
//                     style={{ fontFamily: "'Poppins', sans-serif" }}
//                   >
//                     Day
//                   </p>
//                   <p
//                     className="text-[#6B2D44] text-sm sm:text-base"
//                     style={{ fontFamily: "'Cormorant Garamond', serif" }}
//                   >
//                     {event.day}
//                   </p>
//                 </div>

//                 <div className="w-[1px] h-8 bg-[#D8B26E]/30" />

//                 <div className="text-center">
//                   <p
//                     className="text-[#8C8C8C] text-[9px] tracking-[0.2em] uppercase mb-1"
//                     style={{ fontFamily: "'Poppins', sans-serif" }}
//                   >
//                     Date
//                   </p>
//                   <p
//                     className="text-[#6B2D44] text-sm sm:text-base"
//                     style={{ fontFamily: "'Cormorant Garamond', serif" }}
//                   >
//                     {event.date}
//                   </p>
//                 </div>

//                 <div className="w-[1px] h-8 bg-[#D8B26E]/30" />

//                 <div className="text-center">
//                   <p
//                     className="text-[#8C8C8C] text-[9px] tracking-[0.2em] uppercase mb-1"
//                     style={{ fontFamily: "'Poppins', sans-serif" }}
//                   >
//                     Time
//                   </p>
//                   <p
//                     className="text-[#6B2D44] text-sm sm:text-base"
//                     style={{ fontFamily: "'Cormorant Garamond', serif" }}
//                   >
//                     {event.time}
//                   </p>
//                 </div>
//               </div>

//               {/* Venue */}
//               <p
//                 className="text-[#666666] text-[10px] sm:text-xs text-center leading-relaxed flex items-center gap-1.5 mb-1"
//                 style={{ fontFamily: "'Poppins', sans-serif" }}
//               >
//                 <MapPin size={11} className="text-[#D8B26E] flex-shrink-0" />
//                 <span>
//                   {event.venue.name}
//                 </span>
//               </p>

//               {/* Bottom divider */}
//               <div className="w-10 h-[1px] bg-[#D8B26E]/40 mt-4" />
//             </motion.div>
//           </div>

//           {/* ── COUPLE FIGURE — Bottom Right Corner ── */}
//           <motion.div
//             className="absolute bottom-0 right-0 w-40 h-56 sm:w-48 sm:h-64 z-30 pointer-events-none"
//             initial={{ opacity: 0, x: 20, y: 20 }}
//             animate={{ opacity: 1, x: 0, y: 0 }}
//             transition={{ duration: 1, delay: 1.5 }}
//           >
//             <CoupleSilhouette />
//           </motion.div>

//         </div>
//       </div>

//       {/* ─── Scroll Indicator ─── */}
//       <motion.div
//         className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-40"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6, delay: 2.6 }}
//       >
//         <motion.div
//           animate={{ y: [0, 5, 0] }}
//           transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <ChevronDown size={14} className="text-[#D8B26E]" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

// /* ──────────────────────────────────────────────────────────
//    DECORATIVE SVG COMPONENTS
// ────────────────────────────────────────────────────────── */

// function ArchFrame() {
//   return (
//     <svg
//       width="100%"
//       height="100%"
//       viewBox="0 0 400 640"
//       preserveAspectRatio="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* Outer arch — animates continuously */}
//       <motion.path
//         d="M 25 75 
//            Q 25 35, 65 35 
//            Q 130 10, 200 15 
//            Q 270 10, 335 35 
//            Q 375 35, 375 75 
//            L 375 625 
//            L 25 625 
//            Z"
//         fill="none"
//         stroke="#D8B26E"
//         strokeWidth="1.8"
//         strokeOpacity="0.85"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: [0, 1, 1, 0] }}
//         transition={{
//           duration: 8,
//           delay: 0.5,
//           repeat: Infinity,
//           times: [0, 0.4, 0.8, 1],
//           ease: "easeInOut",
//         }}
//       />

//       {/* Inner arch */}
//       <motion.path
//         d="M 32 82 
//            Q 32 42, 70 42 
//            Q 132 17, 200 22 
//            Q 268 17, 330 42 
//            Q 368 42, 368 82 
//            L 368 618 
//            L 32 618 
//            Z"
//         fill="none"
//         stroke="#D8B26E"
//         strokeWidth="1"
//         strokeOpacity="0.5"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: [0, 1, 1, 0] }}
//         transition={{
//           duration: 8,
//           delay: 0.8,
//           repeat: Infinity,
//           times: [0, 0.4, 0.8, 1],
//           ease: "easeInOut",
//         }}
//       />
//     </svg>
//   );
// }

// function TopOrnament() {
//   return (
//     <motion.svg
//       width="60"
//       height="50"
//       viewBox="0 0 60 50"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       animate={{ scale: [1, 1.05, 1] }}
//       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//     >
//       <g>
//         <path d="M30 5 L28 12 L30 10 L32 12 Z" fill="#D8B26E" />
//         <path
//           d="M30 12 L25 20 L30 28 L35 20 Z"
//           fill="none"
//           stroke="#D8B26E"
//           strokeWidth="1"
//         />
//         <circle cx="30" cy="20" r="1.5" fill="#D8B26E" />
//         <path
//           d="M18 22 Q14 22, 14 26 Q14 28, 17 27 Q15 25, 18 24"
//           fill="#D8B26E"
//         />
//         <path
//           d="M42 22 Q46 22, 46 26 Q46 28, 43 27 Q45 25, 42 24"
//           fill="#D8B26E"
//         />
//         <line x1="10" y1="35" x2="50" y2="35" stroke="#D8B26E" strokeWidth="0.5" />
//         <circle cx="20" cy="38" r="1" fill="#D8B26E" />
//         <circle cx="30" cy="38" r="1.5" fill="#D8B26E" />
//         <circle cx="40" cy="38" r="1" fill="#D8B26E" />
//         <line x1="22" y1="42" x2="38" y2="42" stroke="#D8B26E" strokeWidth="0.5" opacity="0.6" />
//       </g>
//     </motion.svg>
//   );
// }

// function FloralCornerTop({ position }: { position: "left" | "right" }) {
//   const isLeft = position === "left";
//   return (
//     <motion.div
//       className={`absolute -top-6 ${isLeft ? "-left-6" : "-right-6"} w-32 h-32 sm:w-40 sm:h-40 pointer-events-none z-20`}
//       style={{ transform: isLeft ? "none" : "scaleX(-1)" }}
//       animate={{
//         rotate: [0, 1.5, 0, -1.5, 0],
//         scale: [1, 1.02, 1],
//       }}
//       transition={{
//         duration: 6,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     >
//       <svg
//         width="100%"
//         height="100%"
//         viewBox="0 0 160 160"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* Cherry blossom branches */}
//         <g opacity="0.85">
//           <path
//             d="M0 20 Q40 15, 80 30 Q120 40, 155 25"
//             stroke="#8B6F47"
//             strokeWidth="0.6"
//             fill="none"
//             opacity="0.6"
//           />
//           <path
//             d="M10 30 Q40 40, 75 50 Q110 55, 145 45"
//             stroke="#8B6F47"
//             strokeWidth="0.5"
//             fill="none"
//             opacity="0.5"
//           />

//           {/* Leaves */}
//           <ellipse cx="20" cy="18" rx="8" ry="3" fill="#A88B5C" opacity="0.4" transform="rotate(-20 20 18)" />
//           <ellipse cx="45" cy="22" rx="10" ry="3" fill="#A88B5C" opacity="0.5" transform="rotate(-10 45 22)" />
//           <ellipse cx="70" cy="28" rx="9" ry="3" fill="#A88B5C" opacity="0.4" transform="rotate(5 70 28)" />
//           <ellipse cx="100" cy="35" rx="11" ry="3" fill="#A88B5C" opacity="0.5" transform="rotate(15 100 35)" />
//           <ellipse cx="130" cy="32" rx="9" ry="3" fill="#A88B5C" opacity="0.4" transform="rotate(20 130 32)" />
//           <ellipse cx="55" cy="45" rx="8" ry="2.5" fill="#A88B5C" opacity="0.5" transform="rotate(-5 55 45)" />
//           <ellipse cx="90" cy="55" rx="9" ry="2.5" fill="#A88B5C" opacity="0.4" transform="rotate(10 90 55)" />
//         </g>

//         {/* Cherry/burgundy flowers */}
//         <g>
//           {/* Cluster 1 */}
//           <CherryFlower cx={15} cy={10} size={4} />
//           <CherryFlower cx={35} cy={5} size={5} />
//           <CherryFlower cx={55} cy={15} size={4.5} />
//           <CherryFlower cx={75} cy={8} size={6} />
//           <CherryFlower cx={95} cy={20} size={4} />
//           <CherryFlower cx={115} cy={12} size={5} />
//           <CherryFlower cx={135} cy={22} size={4} />

//           {/* Cluster 2 - lower */}
//           <CherryFlower cx={25} cy={45} size={3.5} />
//           <CherryFlower cx={50} cy={52} size={4} />
//           <CherryFlower cx={80} cy={48} size={4.5} />
//           <CherryFlower cx={110} cy={55} size={3.5} />
//           <CherryFlower cx={130} cy={50} size={4} />

//           {/* Berries */}
//           <circle cx="25" cy="25" r="2" fill="#6B2D44" />
//           <circle cx="50" cy="30" r="1.5" fill="#6B2D44" />
//           <circle cx="85" cy="25" r="2" fill="#6B2D44" />
//           <circle cx="105" cy="32" r="1.5" fill="#6B2D44" />
//           <circle cx="125" cy="35" r="2" fill="#6B2D44" />
//           <circle cx="40" cy="60" r="1.5" fill="#6B2D44" />
//           <circle cx="70" cy="65" r="2" fill="#6B2D44" />
//           <circle cx="100" cy="68" r="1.5" fill="#6B2D44" />

//           {/* Tiny accents */}
//           <circle cx="10" cy="35" r="1" fill="#8B3D5A" />
//           <circle cx="62" cy="40" r="1" fill="#8B3D5A" />
//           <circle cx="145" cy="45" r="1.2" fill="#8B3D5A" />
//         </g>
//       </svg>
//     </motion.div>
//   );
// }

// function FloralCornerBottom({ position }: { position: "left" | "right" }) {
//   const isLeft = position === "left";
//   return (
//     <motion.div
//       className={`absolute -bottom-4 ${isLeft ? "-left-4" : "-right-4"} w-24 h-24 sm:w-32 sm:h-32 pointer-events-none z-20`}
//       style={{ transform: `${isLeft ? "" : "scaleX(-1) "}scaleY(-1)` }}
//       animate={{
//         rotate: [0, -1.5, 0, 1.5, 0],
//         scale: [1, 1.02, 1],
//       }}
//       transition={{
//         duration: 6,
//         delay: 1,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     >
//       <svg
//         width="100%"
//         height="100%"
//         viewBox="0 0 120 120"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g opacity="0.75">
//           <path
//             d="M0 15 Q30 20, 60 35"
//             stroke="#8B6F47"
//             strokeWidth="0.5"
//             fill="none"
//             opacity="0.5"
//           />
//           <ellipse cx="15" cy="14" rx="6" ry="2" fill="#A88B5C" opacity="0.4" transform="rotate(-15 15 14)" />
//           <ellipse cx="35" cy="22" rx="8" ry="2.5" fill="#A88B5C" opacity="0.5" transform="rotate(5 35 22)" />
//           <ellipse cx="55" cy="30" rx="7" ry="2" fill="#A88B5C" opacity="0.4" transform="rotate(15 55 30)" />

//           <CherryFlower cx={10} cy={8} size={3} />
//           <CherryFlower cx={25} cy={12} size={3.5} />
//           <CherryFlower cx={45} cy={18} size={3} />
//           <CherryFlower cx={65} cy={25} size={3.5} />

//           <circle cx="18" cy="25" r="1.5" fill="#6B2D44" />
//           <circle cx="50" cy="28" r="1.5" fill="#6B2D44" />
//           <circle cx="75" cy="35" r="1.5" fill="#6B2D44" />
//         </g>
//       </svg>
//     </motion.div>
//   );
// }

// function CherryFlower({ cx, cy, size }: { cx: number; cy: number; size: number }) {
//   return (
//     <g>
//       <circle cx={cx} cy={cy} r={size} fill="#6B2D44" />
//       <circle cx={cx - 1.5} cy={cy - 1.5} r={size * 0.4} fill="#8B3D5A" />
//       <circle cx={cx + 0.5} cy={cy + 0.5} r={size * 0.2} fill="#4A1F30" />
//     </g>
//   );
// }

// function PetalSVG({ size = 12 }: { size?: number }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 14 14"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <ellipse cx="7" cy="7" rx="3.5" ry="2.5" fill="#6B2D44" fillOpacity="0.5" transform="rotate(45 7 7)" />
//       <ellipse cx="6" cy="6" rx="1.5" ry="1" fill="#8B3D5A" fillOpacity="0.6" transform="rotate(45 6 6)" />
//     </svg>
//   );
// }

// function CoupleSilhouette() {
//   return (
//     <motion.div
//       className="relative w-full h-full"
//       animate={{
//         y: [0, -2, 0],
//         rotateZ: [0, 0.5, 0],
//       }}
//       transition={{
//         duration: 4,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     >
//       <Image
//         src="/images/chicple.png"
//         alt="Couple silhouette"
//         fill
//         sizes="(max-width: 640px) 160px, 192px"
//         className="object-contain object-right object-bottom"
//         priority
//       />
//     </motion.div>
//   );
// }