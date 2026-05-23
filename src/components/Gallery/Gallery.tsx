"use client";

import { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";

import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Placeholder gallery data
const galleryImages = [
  {
    id: 1,
    src: "/images/gallery/photo-1.jpg",
    alt: "Anson & Minu — Together",
    aspect: "tall" as const,
  },
  {
    id: 2,
    src: "/images/gallery/photo-2.jpg",
    alt: "Anson & Minu — Smiling",
    aspect: "wide" as const,
  },
  {
    id: 3,
    src: "/images/gallery/photo-3.jpg",
    alt: "Anson & Minu — Candid",
    aspect: "square" as const,
  },
  {
    id: 4,
    src: "/images/gallery/photo-4.jpg",
    alt: "Anson & Minu — Portrait",
    aspect: "tall" as const,
  },
  {
    id: 5,
    src: "/images/gallery/photo-5.jpg",
    alt: "Anson & Minu — Family",
    aspect: "wide" as const,
  },
  {
    id: 6,
    src: "/images/gallery/photo-6.jpg",
    alt: "Anson & Minu — Ceremony",
    aspect: "square" as const,
  },
  {
    id: 7,
    src: "/images/gallery/photo-7.jpg",
    alt: "Anson & Minu — Joy",
    aspect: "tall" as const,
  },
  {
    id: 8,
    src: "/images/gallery/photo-8.jpg",
    alt: "Anson & Minu — Love",
    aspect: "square" as const,
  },
];

const placeholderGradients = [
  "from-[#F6E8E6] to-[#FAF7F2]",
  "from-[#FAF7F2] to-[#F6E8E6]",
  "from-[#F0E0DD] to-[#FAF7F2]",
  "from-[#FAF7F2] to-[#EDD5D1]",
  "from-[#F6E8E6] to-[#F0E0DD]",
  "from-[#EDD5D1] to-[#FAF7F2]",
  "from-[#FAF7F2] to-[#F6E8E6]",
  "from-[#F0E0DD] to-[#FAF7F2]",
];

function getAspectHeight(
  aspect: "tall" | "wide" | "square"
): string {
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
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },

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
  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  const openLightbox = useCallback(
    (index: number) => {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = "hidden";
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const col1 = galleryImages.filter(
    (_, i) => i % 2 === 0
  );

  const col2 = galleryImages.filter(
    (_, i) => i % 2 !== 0
  );

  return (
    <section
      id="gallery"
      className="section-padding bg-[#F6E8E6]/30"
    >
      <motion.div
        className="text-center mb-12"
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
      >
        <p className="text-[#D8B26E] text-xs tracking-[0.25em] uppercase mb-4">
          Our Moments
        </p>

        <h2
          className="text-[#6B2D44] text-4xl"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Gallery
        </h2>

        <div className="w-12 h-[1px] bg-[#D8B26E] mx-auto mt-6" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4">

          {[col1, col2].map(
            (column, columnIndex) => (
              <div
                key={columnIndex}
                className={`flex-1 flex flex-col gap-4 ${
                  columnIndex === 1
                    ? "mt-12"
                    : ""
                }`}
              >
                {column.map(
                  (image, index) => {
                    const originalIndex =
                      galleryImages.findIndex(
                        img =>
                          img.id === image.id
                      );

                    return (
                      <motion.div
                        key={image.id}
                        custom={index}
                        variants={
                          cardVariants
                        }
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                          once: true,
                        }}
                        onClick={() =>
                          openLightbox(
                            originalIndex
                          )
                        }
                        className={`relative ${getAspectHeight(
                          image.aspect
                        )} rounded-xl overflow-hidden cursor-pointer group`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${
                            placeholderGradients[
                              originalIndex %
                                placeholderGradients.length
                            ]
                          } flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}
                        >
                          <span className="text-[#6B2D44]/30">
                            Photo{" "}
                            {originalIndex + 1}
                          </span>
                        </div>

                        <div className="absolute inset-0 bg-[#6B2D44]/0 group-hover:bg-[#6B2D44]/10 transition-colors duration-500" />
                      </motion.div>
                    );
                  }
                )}
              </div>
            )
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[100]"
            onClick={closeLightbox}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6"
            >
              <X
                className="text-white"
                size={28}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}