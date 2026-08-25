import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { TRADITIONAL_RITUALS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Compass, BookOpen, Clock, Heart } from "lucide-react";

export const RitualsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedRitual, setSelectedRitual] = useState<string>(TRADITIONAL_RITUALS[0].id);

  const activeRitual = TRADITIONAL_RITUALS.find(r => r.id === selectedRitual) || TRADITIONAL_RITUALS[0];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#1e0104] to-[#3b0209] text-white overflow-hidden relative" id="rituals-section">
      {/* Kolam design overlay corner nodes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-amber-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          {t("traditionalId")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 tracking-tight">
          {t("traditionalRituals")}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        <p className="text-amber-100/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {t("ritualsDesc")}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Vertical List Panel (Navigation of Rituals) */}
        <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-transparent">
          {TRADITIONAL_RITUALS.map((ritual, idx) => (
            <button
              key={ritual.id}
              onClick={() => setSelectedRitual(ritual.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-3 relative overflow-hidden group ${
                selectedRitual === ritual.id
                  ? "bg-amber-500/15 border-amber-500 text-amber-300 shadow-md"
                  : "bg-black/20 border-white/5 text-white/70 hover:bg-[#5c0612]/30 hover:text-amber-200"
              }`}
              id={`nav-ritual-${idx}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                selectedRitual === ritual.id ? "bg-amber-500 text-maroon-900" : "bg-[#5c0612]/70 text-amber-400 border border-amber-500/20"
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif font-semibold text-sm truncate uppercase tracking-widest">
                  {ritual.title[language]}
                </p>
                {language === "en" && ritual.tamilName && (
                  <p className="text-[10px] text-amber-500/60 truncate italic">{ritual.tamilName}</p>
                )}
              </div>
              {selectedRitual === ritual.id && (
                <motion.div 
                  layoutId="active-indicator" 
                  className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Detail Content Box (Interactive view) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRitual.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-black/30 border border-amber-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden space-y-6"
              id="ritual-details-card"
            >
              {/* Corner Traditional Decorative Border Ring */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-amber-500/20 rounded-tr-lg pointer-events-none" />

              {/* Grid with Image & Info details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Ritual Image Frame */}
                <div className="md:col-span-5 h-64 w-full rounded-xl overflow-hidden relative border border-amber-500/30 shadow-lg">
                  <img
                    src={activeRitual.image}
                    alt={activeRitual.title[language]}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 bg-amber-500/90 text-maroon-900 border border-amber-600 px-2.5 py-1 rounded text-xs font-bold font-mono tracking-wide uppercase">
                    {t("traditionalId")}
                  </div>
                </div>

                {/* Ritual Meta details */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-serif text-amber-400 font-extrabold tracking-wide drop-shadow-md">
                    {activeRitual.title[language]}
                  </h3>
                  
                  <div className="w-16 h-1 bg-amber-500/40 rounded" />

                  <p className="text-[#fadcd5] text-sm sm:text-base leading-relaxed text-justify italic">
                    "{activeRitual.description[language]}"
                  </p>
                </div>
              </div>

              {/* Meaning highlight segment */}
              <div className="bg-[#5c0612]/30 border border-amber-500/10 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg shrink-0">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-amber-400 font-bold font-mono">
                    {t("meaningLabel")}
                  </p>
                  <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed">
                    {activeRitual.meaning[language]}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
