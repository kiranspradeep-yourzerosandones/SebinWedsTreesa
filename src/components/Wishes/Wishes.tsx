
"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Heart, Send, MessageCircle } from "lucide-react";

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

const STORAGE_KEY = "sebin-treesa-wishes";

function getDefaultWishes(): Wish[] {
  const now = Date.now();

  return [
    {
      id: "default-1",
      name: "With Love",
      message: "May God bless your beautiful journey together ❤️",
      timestamp: now - 86400000,
    },
    {
      id: "default-2",
      name: "Family",
      message: "Wishing you both a lifetime of love and happiness 🙏",
      timestamp: now - 172800000,
    },
  ];
}

function getStoredWishes(): Wish[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeWish(wish: Wish) {
  if (typeof window === "undefined") return;

  try {
    const existing = getStoredWishes();
    existing.unshift(wish);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Silent fail
  }
}

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function Wishes() {
  const [hasMounted, setHasMounted] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const stored = getStoredWishes();
    const defaults = getDefaultWishes();

    if (stored.length > 0) {
      setWishes([...stored, ...defaults]);
    } else {
      setWishes(defaults);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  if (!name.trim() || !message.trim()) return;

  const whatsappNumber = "919744996592";

  const whatsappMessage = `Wishes for Sebin & Treesa

From: ${name.trim()}

Message: ${message.trim()}

— Sent from the Sebin & Treesa Wedding Website`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  window.open(whatsappUrl, "_blank");

  // Keep the wish displayed locally on the website
  const newWish: Wish = {
    id: `wish-${Date.now()}`,
    name: name.trim(),
    message: message.trim(),
    timestamp: Date.now(),
  };

  storeWish(newWish);
  setWishes((prev) => [newWish, ...prev]);
  setName("");
  setMessage("");
  setSubmitted(true);

  setTimeout(() => {
    setSubmitted(false);
  }, 3000);
};
  return (
    <section className="section-padding bg-[#F6E8E6]/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#D8B26E]/5" />
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#6B2D44]/5" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-[#D8B26E] text-xs tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Send Your Love
          </p>

          <h2
            className="text-[#6B2D44] text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Blessings & Wishes
          </h2>

          <p
            className="text-[#666666] text-sm mt-3 max-w-sm mx-auto leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Leave a little blessing for Sebin & Treesa
          </p>

          <div className="w-12 h-[1px] bg-[#D8B26E] mx-auto mt-6" />
        </motion.div>

        {/* 
          Form — only rendered after mount to prevent
          browser extension hydration mismatches (fdprocessedid)
        */}
        {!hasMounted ? (
          <div className="bg-white/60 backdrop-blur-sm border border-[#D8B26E]/20 rounded-2xl p-6 mb-8 min-h-[230px]">
            <div className="animate-pulse space-y-4">
              <div className="h-11 bg-[#FAF7F2] rounded-lg border border-[#D8B26E]/10" />
              <div className="h-24 bg-[#FAF7F2] rounded-lg border border-[#D8B26E]/10" />
              <div className="h-11 w-36 bg-[#6B2D44]/10 rounded-lg" />
            </div>
          </div>
        ) : (
          <motion.div
            className="bg-white/60 backdrop-blur-sm border border-[#D8B26E]/20 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              autoComplete="off"
              suppressHydrationWarning
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                suppressHydrationWarning
                className="w-full bg-[#FAF7F2] rounded-lg p-3 border border-[#D8B26E]/20 text-[#2A2A2A] text-sm placeholder:text-[#8C8C8C]/60 focus:outline-none focus:border-[#6B2D44]/40 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your blessing..."
                rows={3}
                required
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                suppressHydrationWarning
                className="w-full bg-[#FAF7F2] rounded-lg p-3 border border-[#D8B26E]/20 resize-none text-[#2A2A2A] text-sm placeholder:text-[#8C8C8C]/60 focus:outline-none focus:border-[#6B2D44]/40 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                suppressHydrationWarning
                className="bg-[#6B2D44] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#8B3D5A] transition-colors duration-300 text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Send size={14} />
                Send Wish
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Wishes list */}
        {hasMounted && (
          <div className="space-y-4">
            {wishes.slice(0, 10).map((wish, index) => (
              <motion.div
                key={wish.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-[#D8B26E]/15"
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6B2D44]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle size={14} className="text-[#6B2D44]/50" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-3 mb-1">
                      <p
                        className="font-medium text-[#2A2A2A] text-sm truncate"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {wish.name}
                      </p>

                      <span
                        className="text-[10px] text-[#8C8C8C] flex-shrink-0"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {formatTime(wish.timestamp)}
                      </span>
                    </div>

                    <p
                      className="text-sm text-[#666666] leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {wish.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Toast notification */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              className="fixed bottom-5 right-5 bg-[#6B2D44] text-white px-4 py-3 rounded-lg flex items-center gap-2 shadow-lg z-50 text-xs tracking-[0.1em] uppercase"
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Heart size={14} className="fill-white" />
              Sent with love
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

