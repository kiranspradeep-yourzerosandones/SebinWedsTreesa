"use client";

import { useState } from "react";
import Image from "next/image";

interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholderLabel?: string;
  sizes?: string;
}

/**
 * Smart Image Component
 * - Tries to load real image from `src`
 * - Falls back to elegant gradient placeholder if image is missing
 * - Just drop your images into /public/images/ and they'll show up
 */
export default function SmartImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  placeholderLabel,
  sizes,
}: SmartImageProps) {
  const [imageFailed, setImageFailed] = useState(false);

  // If image fails to load OR isn't provided, show placeholder
  if (imageFailed || !src) {
    return (
      <div
        className={`relative bg-gradient-to-br from-[#F6E8E6] via-[#FAF7F2] to-[#F0E0DD] ${className}`}
        style={!fill && width && height ? { width, height } : undefined}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(216,178,110,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(107,45,68,0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-12 h-12 rounded-full border border-[#D8B26E]/30 flex items-center justify-center mx-auto mb-3">
              <span
                className="text-[#6B2D44]/40 text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                A & M
              </span>
            </div>
            {placeholderLabel && (
              <p
                className="text-[#6B2D44]/30 text-[10px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {placeholderLabel}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Real image
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes || "100vw"}
        className={className}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setImageFailed(true)}
    />
  );
}