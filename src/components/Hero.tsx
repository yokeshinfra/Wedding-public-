import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { HERO_DATA, WEDDING_DATE } from "../data";
import { FlowerPetals } from "./FlowerPetals";
import { WeddingMonogram } from "./WeddingMonogram";
import { motion } from "motion/react";
import { ChevronDown, Calendar, MapPin, Heart, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +WEDDING_DATE - +new Date();
      if (difference <= 0) {
        setTimeLeft((prev) => ({ ...prev, isOver: true }));
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#3b0209] via-[#4a040d] to-[#1e0104] text-white p-4 overflow-hidden" id="hero-section">
      {/* Dynamic Animated Flower Petals */}
      <FlowerPetals />

      {/* Decorative Ornate Temple Kolam Grid Background overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Ornate Gold Border Corners */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500 rounded-tl-lg pointer-events-none opacity-80" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-500 rounded-tr-lg pointer-events-none opacity-80" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-500 rounded-bl-lg pointer-events-none opacity-80" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-500 rounded-br-lg pointer-events-none opacity-80" />

      {/* Top Wedding Header */}
      <div className="mt-16 z-20 space-y-2 px-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs tracking-widest font-mono uppercase">
          <Heart className="w-3.5 h-3.5 fill-current animate-pulse text-amber-500" />
          {t("saveTheDate")}
        </div>
        <h2 className="font-serif tracking-[0.2em] text-amber-400 text-lg md:text-xl font-medium mt-3 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          {t("weddingTitle")}
        </h2>
        {/* Ornate Gold Dividers */}
        <div className="flex items-center justify-center gap-2 text-amber-400 mt-2">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-500" />
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z" />
          </svg>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-500" />
        </div>
      </div>

      {/* Main Couple Names & Luxury Monogram */}
      <div className="my-auto z-20 max-w-4xl px-4 space-y-8 flex flex-col items-center pt-8">
        
        {/* Luxury Animated Monogram */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 my-2 shadow-[0_0_50px_rgba(217,119,6,0.15)] rounded-full"
        >
          <WeddingMonogram className="w-full h-full drop-shadow-2xl" animate={true} />
        </motion.div>

        {/* Full Names Displayed Below */}
        <div className="flex flex-col items-center justify-center gap-2 mt-4 relative z-10 w-full text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fcf6ba] to-[#bf953f] font-extrabold tracking-wide drop-shadow-[0_4px_12px_rgba(217,119,6,0.3)]"
            >
              {HERO_DATA.groom.name[language]} <span className="text-2xl sm:text-4xl text-amber-500/70 mx-2 font-light">&</span> {HERO_DATA.bride.name[language]}
            </motion.h1>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-amber-100/70 italic font-sans mt-3">
              <span>{HERO_DATA.groom.title[language]}</span>
              <span className="hidden sm:inline text-amber-500/50">|</span>
              <span>{HERO_DATA.bride.title[language]}</span>
            </div>
        </div>

        {/* Vishwakarma Parent Linage Line with Temple Lamp Accents */}
        <div className="max-w-2xl mx-auto py-2 border-y border-amber-500/20 px-4 space-y-2 bg-[#4a040d]/40 rounded-xl">
          <p className="text-xs sm:text-sm text-amber-200 tracking-wide">
            {HERO_DATA.groom.details[language]}
          </p>
          <div className="w-1/4 h-[1px] bg-amber-500/30 mx-auto" />
          <p className="text-xs sm:text-sm text-amber-200 tracking-wide">
            {HERO_DATA.bride.details[language]}
          </p>
        </div>

        {/* Timing and Location Highlights */}
        <div className="space-y-3 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm text-amber-100/90 font-mono tracking-wider">
            <div className="flex items-center gap-2 bg-black/30 px-3.5 py-1.5 rounded-lg border border-amber-500/15">
              <Calendar className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{HERO_DATA.dateStr[language]}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-3.5 py-1.5 rounded-lg border border-amber-500/15">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{HERO_DATA.venue[language]}</span>
            </div>
          </div>
          <p className="text-sm font-serif text-amber-400 font-semibold italic">
            {HERO_DATA.muhurthamTime[language]}
          </p>
        </div>

        {/* Live Premium Countdown Timer widget */}
        <div className="pt-6 relative">
          {!timeLeft.isOver ? (
            <div className="grid grid-cols-4 gap-2 max-w-sm sm:max-w-md mx-auto">
              {[
                { label: t("days"), value: timeLeft.days },
                { label: t("hours"), value: timeLeft.hours },
                { label: t("minutes"), value: timeLeft.minutes },
                { label: t("seconds"), value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center bg-[#5c0612]/70 border border-amber-500/35 rounded-xl px-2 py-3.5 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                  <span className="text-2xl sm:text-3xl font-mono text-amber-300 font-bold tracking-tight">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-amber-200/70 font-mono mt-1 uppercase tracking-widest font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl px-6 py-4 max-w-sm mx-auto backdrop-blur-sm animate-pulse">
              <p className="text-amber-400 font-serif font-bold text-lg">
                {language === "en" ? "✨ The Holy Auspicious Weaving Has Begun! ✨" : "✨ மங்கள சுப முகூர்த்தம் இனிதே தொடங்கியுள்ளது! ✨"}
              </p>
            </div>
          )}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col xs:flex-row items-center justify-center gap-3 pt-8">
          <button
            onClick={() => scrollToSection("events-section")}
            className="w-full sm:w-auto px-6 py-3 font-serif rounded-lg border border-amber-500 text-amber-300 bg-transparent hover:bg-amber-500/15 duration-300 transition-colors cursor-pointer text-sm font-semibold tracking-wider flex items-center justify-center gap-2"
            id="cta-view-events"
          >
            <Calendar className="w-4 h-4" />
            {t("viewEvents")}
          </button>

          <button
            onClick={() => scrollToSection("location-section")}
            className="w-full sm:w-auto px-6 py-3 font-serif rounded-lg bg-stone-900 border border-stone-800 text-stone-200 hover:text-amber-400 hover:border-amber-500/30 duration-300 transition-colors cursor-pointer text-sm font-semibold tracking-wider flex items-center justify-center gap-2"
            id="cta-location"
          >
            <MapPin className="w-4 h-4" />
            {t("locationBtn")}
          </button>
        </div>
      </div>

      {/* Slide down arrow indicator */}
      <div className="mt-8 mb-4 z-20 animate-bounce cursor-pointer opacity-70" onClick={() => scrollToSection("story-section")}>
        <ChevronDown className="w-6 h-6 text-amber-500" />
      </div>
    </section>
  );
};
