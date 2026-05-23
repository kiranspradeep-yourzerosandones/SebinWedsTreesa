import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const nowDate = new Date();
  const targetDateObj = new Date(targetDate);
  let months =
    (targetDateObj.getFullYear() - nowDate.getFullYear()) * 12 +
    (targetDateObj.getMonth() - nowDate.getMonth());
  if (targetDateObj.getDate() < nowDate.getDate()) {
    months -= 1;
  }
  months = Math.max(0, months);

  const afterMonths = new Date(nowDate);
  afterMonths.setMonth(afterMonths.getMonth() + months);
  const remainingMs = target - afterMonths.getTime();

  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (remainingMs % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

  return { months, days, hours, minutes, seconds };
}

function pad(num: number): string {
  return String(num).padStart(2, "0");
}

interface UnitCardProps {
  value: string;
  label: string;
  index: number;
}

function UnitCard({ value, label, index }: UnitCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center flex-1 min-w-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Glass Card */}
      <div className="relative w-full bg-white/50 backdrop-blur-md border border-[#D8B26E]/25 rounded-xl sm:rounded-2xl px-1.5 py-3 sm:px-5 sm:py-5 md:px-6 md:py-6 text-center shadow-sm">
        {/* Top shimmer line */}
        <div className="absolute top-0 left-2 right-2 sm:left-4 sm:right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D8B26E]/40 to-transparent" />

        {/* Number */}
        <span
          className="text-[#6B2D44] text-xl sm:text-3xl md:text-4xl font-light block leading-none"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {value}
        </span>
      </div>

      {/* Label below card */}
      <p
        className="text-[#8C8C8C] text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-2 sm:mt-3"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function Countdown() {
  const { event, couple } = weddingData;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(event.dateISO)
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(event.dateISO));
    }, 1000);
    return () => clearInterval(interval);
  }, [event.dateISO]);

  const units = [
    { value: pad(timeLeft.months), label: "Months" },
    { value: pad(timeLeft.days), label: "Days" },
    { value: pad(timeLeft.hours), label: "Hours" },
    { value: pad(timeLeft.minutes), label: "Minutes" },
    { value: pad(timeLeft.seconds), label: "Seconds" },
  ];

  return (
    <section className="section-padding bg-[#FAF7F2] relative overflow-hidden">
      {/* Background soft decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D8B26E]/4" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 px-3 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-[#D8B26E] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Counting Down To
          </p>
          <h2
            className="text-[#6B2D44] text-3xl sm:text-4xl md:text-5xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {couple.groomFirstName} & {couple.brideFirstName}
          </h2>
          <p
            className="text-[#8C8C8C] text-sm mt-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {event.date} · {event.time}
          </p>
          <div className="w-12 h-[1px] bg-[#D8B26E] mx-auto mt-6" />
        </motion.div>

        {/* Countdown Units — Grid on mobile, Flex on desktop */}
        {hasMounted ? (
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 md:gap-5 items-start max-w-2xl mx-auto">
            {units.map((unit, index) => (
              <UnitCard
                key={unit.label}
                value={unit.value}
                label={unit.label}
                index={index}
              />
            ))}
          </div>
        ) : (
          // SSR Skeleton
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 md:gap-5 items-start max-w-2xl mx-auto">
            {units.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center flex-1 min-w-0">
                <div className="w-full bg-white/50 border border-[#D8B26E]/25 rounded-xl sm:rounded-2xl px-1.5 py-3 sm:px-5 sm:py-5 md:px-6 md:py-6 text-center">
                  <span
                    className="text-[#6B2D44] text-xl sm:text-3xl md:text-4xl font-light block leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    --
                  </span>
                </div>
                <p
                  className="text-[#8C8C8C] text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-2 sm:mt-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom note */}
        <motion.p
          className="text-center text-[#8C8C8C] text-xs mt-10 sm:mt-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          We can&apos;t wait to celebrate with you
        </motion.p>
      </div>
    </section>
  );
}