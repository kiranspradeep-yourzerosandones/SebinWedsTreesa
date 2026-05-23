"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle, User, Phone, Users, MessageSquare } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  guests: string;
  attending: "yes" | "no" | "";
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  attending?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number";
  } else if (!/^[0-9+\-\s()]{7,15}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.attending) {
    errors.attending = "Please select your attendance";
  }

  return errors;
}

export default function RSVP() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    guests: "1",
    attending: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAttendingChange = (value: "yes" | "no") => {
    setFormData((prev) => ({ ...prev, attending: value }));
    if (errors.attending) {
      setErrors((prev) => ({ ...prev, attending: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          guests: "1",
          attending: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="section-padding bg-[#FAF7F2] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#D8B26E]/5" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#6B2D44]/5" />
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D8B26E] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4">
  Will you be there?
</p>
          <h2
            className="text-[#6B2D44] text-3xl sm:text-4xl md:text-5xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            RSVP
          </h2>
          <p className="text-[#666666] text-sm mt-3 max-w-sm mx-auto leading-relaxed">
  Let us know if you can make it. We'd love to celebrate with you.
</p>
          <div className="w-12 h-[1px] bg-[#D8B26E] mx-auto mt-6" />
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm border border-[#D8B26E]/20 rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {/* Success State */}
            {status === "success" ? (
              <motion.div
                key="success"
                className="py-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#6B2D44]/10 flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-[#6B2D44]" />
                </div>
                <h3
                  className="text-[#6B2D44] text-2xl mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Thank You!
                </h3>
                <p
                  className="text-[#666666] text-sm leading-relaxed"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Your response has been received.
                  <br />
                  We look forward to celebrating with you.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-[#6B2D44] text-xs tracking-[0.15em] uppercase underline underline-offset-4 hover:text-[#8B3D5A] transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              /* Form */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Name */}
                <div>
                  <label
                    className="flex items-center gap-2 text-[#2A2A2A] text-xs tracking-[0.1em] uppercase mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    htmlFor="rsvp-name"
                  >
                    <User size={13} className="text-[#D8B26E]" />
                    Full Name
                  </label>
                  <input
  id="rsvp-name"
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your full name"
  suppressHydrationWarning
  className={`w-full bg-[#FAF7F2] border ${
    errors.name ? "border-red-400" : "border-[#D8B26E]/20"
  } rounded-lg px-4 py-3 text-[#2A2A2A] text-sm placeholder:text-[#8C8C8C]/60 focus:outline-none focus:border-[#6B2D44]/40 transition-colors`}
  style={{ fontFamily: "'Poppins', sans-serif" }}
/>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="flex items-center gap-2 text-[#2A2A2A] text-xs tracking-[0.1em] uppercase mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    htmlFor="rsvp-phone"
                  >
                    <Phone size={13} className="text-[#D8B26E]" />
                    Phone Number
                  </label>
                  <input
  id="rsvp-phone"
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Enter your phone number"
  suppressHydrationWarning
  className={`w-full bg-[#FAF7F2] border ${
    errors.phone ? "border-red-400" : "border-[#D8B26E]/20"
  } rounded-lg px-4 py-3 text-[#2A2A2A] text-sm placeholder:text-[#8C8C8C]/60 focus:outline-none focus:border-[#6B2D44]/40 transition-colors`}
  style={{ fontFamily: "'Poppins', sans-serif" }}
/>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Number of Guests */}
                <div>
                  <label
                    className="flex items-center gap-2 text-[#2A2A2A] text-xs tracking-[0.1em] uppercase mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    htmlFor="rsvp-guests"
                  >
                    <Users size={13} className="text-[#D8B26E]" />
                    Number of Guests
                  </label>
                  <select
  id="rsvp-guests"
  name="guests"
  value={formData.guests}
  onChange={handleChange}
  suppressHydrationWarning
  className="w-full bg-[#FAF7F2] border border-[#D8B26E]/20 rounded-lg px-4 py-3 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#6B2D44]/40 transition-colors appearance-none"
  style={{ fontFamily: "'Poppins', sans-serif" }}
>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Attendance */}
                <div>
                  <label
                    className="flex items-center gap-2 text-[#2A2A2A] text-xs tracking-[0.1em] uppercase mb-3"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Will You Attend?
                  </label>
                  <div className="flex gap-3">
                    <button
  type="button"
  onClick={() => handleAttendingChange("yes")}
  suppressHydrationWarning
  className={`flex-1 py-3 rounded-lg text-sm tracking-[0.1em] uppercase transition-all duration-300 border ${
    formData.attending === "yes"
      ? "bg-[#6B2D44] text-white border-[#6B2D44]"
      : "bg-transparent text-[#6B2D44] border-[#D8B26E]/30 hover:border-[#6B2D44]/40"
  }`}
  style={{ fontFamily: "'Poppins', sans-serif" }}
>
  Counting me in!
</button>

<button
  type="button"
  onClick={() => handleAttendingChange("no")}
  suppressHydrationWarning
  className={`flex-1 py-3 rounded-lg text-sm tracking-[0.1em] uppercase transition-all duration-300 border ${
    formData.attending === "no"
      ? "bg-[#6B2D44] text-white border-[#6B2D44]"
      : "bg-transparent text-[#6B2D44] border-[#D8B26E]/30 hover:border-[#6B2D44]/40"
  }`}
  style={{ fontFamily: "'Poppins', sans-serif" }}
>
  Sadly can&apos;t join
</button>
                  </div>
                  {errors.attending && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.attending}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="flex items-center gap-2 text-[#2A2A2A] text-xs tracking-[0.1em] uppercase mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    htmlFor="rsvp-message"
                  >
                    <MessageSquare size={13} className="text-[#D8B26E]" />
                    Message (Optional)
                  </label>
                  <textarea
  id="rsvp-message"
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Write a message or blessing..."
  rows={3}
  suppressHydrationWarning
  className="w-full bg-[#FAF7F2] border border-[#D8B26E]/20 rounded-lg px-4 py-3 text-[#2A2A2A] text-sm placeholder:text-[#8C8C8C]/60 focus:outline-none focus:border-[#6B2D44]/40 transition-colors resize-none"
  style={{ fontFamily: "'Poppins', sans-serif" }}
/>
                </div>

                {/* Error state */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 px-4 py-3 rounded-lg">
                    <AlertCircle size={14} />
                    <p>Something went wrong. Please try again or contact us directly.</p>
                  </div>
                )}

                {/* Submit */}
                <motion.button
  type="submit"
  disabled={status === "loading"}
  suppressHydrationWarning
  className="w-full flex items-center justify-center gap-2 bg-[#6B2D44] text-white text-xs tracking-[0.15em] uppercase py-4 rounded-lg hover:bg-[#8B3D5A] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
  style={{ fontFamily: "'Poppins', sans-serif" }}
  whileTap={{ scale: 0.98 }}
>
                  {status === "loading" ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Response
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}