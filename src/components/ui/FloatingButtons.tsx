"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ExternalLink } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { couple, event } = weddingData;

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Build calendar event details ───
  const eventTitle = `${couple.groomFirstName} & ${couple.brideFirstName} - Wedding`;
  const eventDescription = `Join us in celebrating the wedding of ${couple.groomFirstName} ${couple.groomLastName} & ${couple.brideFirstName} ${couple.brideLastName}. ${event.name ? `\n\n${event.name}` : ""}`;
  const eventLocation = event.venue?.name || "";

  // Format date for calendar (YYYYMMDDTHHmmss)
  const formatDateForCalendar = (isoDate: string, durationHours = 3) => {
    const start = new Date(isoDate);
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    return {
      start: formatDate(start),
      end: formatDate(end),
    };
  };

  const { start, end } = formatDateForCalendar(event.dateISO);

  // ─── Google Calendar URL ───
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${start}/${end}&details=${encodeURIComponent(
    eventDescription
  )}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;

  // ─── Outlook Calendar URL ───
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(
    eventTitle
  )}&startdt=${new Date(event.dateISO).toISOString()}&enddt=${new Date(
    new Date(event.dateISO).getTime() + 3 * 60 * 60 * 1000
  ).toISOString()}&body=${encodeURIComponent(
    eventDescription
  )}&location=${encodeURIComponent(eventLocation)}`;

  // ─── Apple Calendar / iCal (.ics file) ───
  const generateICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@wedding`,
      `DTSTAMP:${start}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription.replace(/\n/g, "\\n")}`,
      `LOCATION:${eventLocation}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      "DESCRIPTION:Wedding Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${couple.groomFirstName}-${couple.brideFirstName}-wedding.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const calendarOptions = [
    {
      name: "Google Calendar",
      icon: "🗓️",
      action: () => {
        window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
        setShowMenu(false);
      },
    },
    {
      name: "Apple Calendar",
      icon: "📅",
      action: () => {
        generateICS();
        setShowMenu(false);
      },
    },
    {
      name: "Outlook",
      icon: "📆",
      action: () => {
        window.open(outlookCalendarUrl, "_blank", "noopener,noreferrer");
        setShowMenu(false);
      },
    },
  ];

  return (
    <>
      {/* ─── Backdrop (when menu is open) ─── */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Calendar Options Menu ─── */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-[#D8B26E]/30 overflow-hidden min-w-[220px]"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#6B2D44] to-[#8B3D5A] px-4 py-3 flex items-center justify-between">
              <div>
                <p
                  className="text-white text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Save the Date
                </p>
                <p
                  className="text-[#D8B26E] text-[10px] tracking-[0.1em] mt-0.5"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Choose Calendar
                </p>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Options */}
            <div className="py-2">
              {calendarOptions.map((option, index) => (
                <motion.button
                  key={option.name}
                  onClick={option.action}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAF7F2] transition-colors group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span
                    className="text-[#2A2A2A] text-sm flex-1 text-left"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {option.name}
                  </span>
                  <ExternalLink
                    size={12}
                    className="text-[#D8B26E] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
              ))}
            </div>

            {/* Footer date display */}
            <div className="border-t border-[#D8B26E]/20 px-4 py-3 bg-[#FAF7F2]/50">
              <p
                className="text-[#8C8C8C] text-[10px] tracking-[0.15em] uppercase mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Event Date
              </p>
              <p
                className="text-[#6B2D44] text-sm"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {event.date} · {event.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Button ─── */}
      <AnimatePresence>
        {visible && (
          <motion.button
            onClick={() => setShowMenu(!showMenu)}
            className="fixed bottom-6 right-6 z-40 group"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-label="Save the date to calendar"
          >
            {/* Pulsing ring (only when menu closed) */}
            {!showMenu && (
              <span className="absolute inset-0 rounded-full bg-[#6B2D44]/30 animate-ping" />
            )}

            {/* Button */}
            <div className="relative bg-[#6B2D44] text-white rounded-full shadow-lg hover:bg-[#8B3D5A] transition-colors duration-300 flex items-center gap-2 pl-3 pr-4 sm:pl-4 sm:pr-5 py-3 sm:py-3.5">
              <motion.div
                animate={{ rotate: showMenu ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showMenu ? (
                  <X size={16} className="text-[#D8B26E]" />
                ) : (
                  <Calendar size={16} className="text-[#D8B26E]" />
                )}
              </motion.div>
              <span
                className="text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Save the Date
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}