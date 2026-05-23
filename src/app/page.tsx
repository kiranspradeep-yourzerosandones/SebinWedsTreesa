"use client";

import { useState } from "react";
import IntroLoader from "@/components/Loader/IntroLoader";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Family from "@/components/Family/Family";
import Event from "@/components/Event/Event";
import Countdown from "@/components/Countdown/Countdown";
import Gallery from "@/components/Gallery/Gallery";
import RSVP from "@/components/RSVP/RSVP";
import Wishes from "@/components/Wishes/Wishes";
import PersonalNote from "@/components/PersonalNote/PersonalNote";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import MusicToggle from "@/components/ui/MusicToggle";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoaderComplete = () => {
    setLoaderDone(true);
  };

  return (
    <>
      {!loaderDone && <IntroLoader onComplete={handleLoaderComplete} />}

      <main
        className={`transition-opacity duration-700 ${
          loaderDone ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: loaderDone ? "auto" : "none" }}
      >
        <Navbar />

        <Hero />

        <SectionDivider variant="dove" color="ivory" />
        <Family />

        <SectionDivider variant="cross" color="blush" />
        <Event />

        <Countdown />

        <SectionDivider variant="diamond" color="blush" />
        <Gallery />

        <SectionDivider variant="simple" color="ivory" />
        <RSVP />

        <Wishes />

        <SectionDivider variant="dove" color="ivory" />
        <PersonalNote />

        <Footer />

        <FloatingButtons />
        <MusicToggle />
      </main>
    </>
  );
}