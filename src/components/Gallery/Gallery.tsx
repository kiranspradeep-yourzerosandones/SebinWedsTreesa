"use client";

import { useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { id: 1, src: "/images/gallery/photo-1.jpeg", alt: "Anson & Minu — Together", aspect: "tall" as const },
  { id: 2, src: "/images/gallery/photo-2.jpeg", alt: "Anson & Minu — Smiling", aspect: "wide" as const },
  { id: 3, src: "/images/gallery/photo-3.jpeg", alt: "Anson & Minu — Candid", aspect: "square" as const },
  { id: 4, src: "/images/gallery/photo-8.jpeg", alt: "Anson & Minu — Portrait", aspect: "tall" as const },
  { id: 5, src: "/images/gallery/photo-5.jpeg", alt: "Anson & Minu — Family", aspect: "wide" as const },
  { id: 6, src: "/images/gallery/photo-7.jpeg", alt: "Anson & Minu — Ceremony", aspect: "square" as const },
  { id: 7, src: "/images/gallery/photo-6.jpeg", alt: "Anson & Minu — Joy", aspect: "tall" as const },
  { id: 8, src: "/images/gallery/photo-4.jpeg", alt: "Anson & Minu — Love", aspect: "square" as const },
];

function getAspectHeight(aspect: "tall" | "wide" | "square"): string {
  switch (aspect) {
    case "tall":
      return "h-[320px] sm:h-[380px]";
    case "wide":
      return "h-[200px] sm:h-[240px]";
    default:
      return "h-[260px] sm:h-[300px]";
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  const col1 = galleryImages.filter((_, i) => i % 2 === 0);
  const col2 = galleryImages.filter((_, i) => i % 2 !== 0);

  return (
    <section id="gallery" className="section-padding bg-[#F6E8E6]/30">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-[#D8B26E] text-xs tracking-[0.25em] uppercase mb-4">
          Our Moments
        </p>
        <h2
          className="text-[#6B2D44] text-4xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Gallery
        </h2>
        <div className="w-12 h-[1px] bg-[#D8B26E] mx-auto mt-6" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4">
          {[col1, col2].map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex-1 flex flex-col gap-4 ${
                columnIndex === 1 ? "mt-12" : ""
              }`}
            >
              {column.map((image, index) => {
                const originalIndex = galleryImages.findIndex(
                  (img) => img.id === image.id
                );

                return (
                  <motion.div
                    key={image.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    onClick={() => openLightbox(originalIndex)}
                    className={`relative ${getAspectHeight(
                      image.aspect
                    )} rounded-xl overflow-hidden cursor-pointer group`}
                  >
                    {/* ✅ Actual image */}
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 400px"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#6B2D44]/0 group-hover:bg-[#6B2D44]/10 transition-colors duration-500" />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={closeLightbox}
            />

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.3em] tabular-nums">
              {String(currentImageIndex + 1).padStart(2, "0")} /{" "}
              {String(galleryImages.length).padStart(2, "0")}
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all z-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-[85vw] h-[80vh] max-w-[1200px] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                fill
                className="object-contain"
                quality={90}
                sizes="85vw"
              />
            </motion.div>

            {/* Caption */}
            <motion.p
              key={`caption-${currentImageIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.2em] z-10"
            >
              {galleryImages[currentImageIndex].alt}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}