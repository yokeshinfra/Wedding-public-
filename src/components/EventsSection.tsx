import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SCHEDULE_ITEMS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { Sparkles, Heart, Music, Utensils, Camera, Flame, Award, Leaf, FlameKindling } from "lucide-react";

export const EventsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "reception" | "muhurtham">("all");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />;
      case "Heart": return <Heart className="w-5 h-5 text-rose-500 fill-current" />;
      case "Music": return <Music className="w-5 h-5 text-purple-500" />;
      case "Utensils": return <Utensils className="w-5 h-5 text-green-500" />;
      case "Camera": return <Camera className="w-5 h-5 text-amber-500" />;
      case "Flame": return <Flame className="w-5 h-5 text-amber-500 animate-bounce" />;
      case "Award": return <Award className="w-5 h-5 text-amber-500 animate-pulse" />;
      case "Leaf": return <Leaf className="w-5 h-5 text-emerald-500" />;
      default: return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  const filteredSchedule = SCHEDULE_ITEMS.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "reception") {
      // Sub items sch-1, sch-2, sch-3, sch-4, sch-5 are reception events
      return ["sch-1", "sch-2", "sch-3", "sch-4", "sch-5"].includes(item.id);
    }
    if (activeTab === "muhurtham") {
      // Sub items sch-6, sch-7, sch-8 are muhurtham/wedding events
      return ["sch-6", "sch-7", "sch-8"].includes(item.id);
    }
    return true;
  });

  return (
    <section className="py-24 px-4 bg-stone-50 text-stone-900 overflow-hidden relative" id="events-section">
      <div className="max-w-5xl mx-auto text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-mono uppercase tracking-widest font-semibold border border-amber-200">
          <Sparkles className="w-3.5 h-3.5" />
          {t("eventSchedule")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5c0612] tracking-tight">
          {t("eventSchedule")}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {t("scheduleDesc")}
        </p>

        {/* Dynamic Category Toggle Buttons */}
        <div className="flex items-center justify-center gap-2 pt-6 max-w-sm sm:max-w-md mx-auto">
          {[
            { id: "all", label: language === "en" ? "Full Schedule" : "முழு விபரம்" },
            { id: "reception", label: language === "en" ? "Reception (Sep 5)" : "மாலை வரவேற்பு" },
            { id: "muhurtham", label: language === "en" ? "Muhurtham (Sep 6)" : "சுப முகூர்த்தம்" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold tracking-wider font-serif transition-all duration-300 cursor-pointer text-center ${
                activeTab === tab.id
                  ? "bg-[#5c0612] border-[#5c0612] text-white shadow-md shadow-maroon-900/10"
                  : "bg-white border-stone-200 text-stone-600 hover:border-[#5c0612]/30 hover:text-[#5c0612]"
              }`}
              id={`tab-event-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout 
            className="space-y-6"
            id="event-timeline-container"
          >
            {filteredSchedule.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col sm:flex-row gap-5 items-start group overflow-hidden"
              >
                {/* Visual Accent Bar */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#5c0612] transition-transform duration-300" />

                {/* Left Time segment */}
                <div className="sm:w-1/4 shrink-0 font-mono text-xs uppercase font-extrabold tracking-widest text-amber-700 bg-amber-500/5 px-3 py-1.5 rounded-lg border border-amber-500/15 flex items-center gap-1.5">
                  <Icons.Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.time[language]}</span>
                </div>

                {/* Main Content Section */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 bg-stone-100 rounded-xl group-hover:bg-[#5c0612]/5 transition-colors border border-stone-200/50">
                      {getIcon(item.iconName)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-extrabold text-[#5c0612]/95 group-hover:text-amber-800 transition-colors">
                      {item.title[language]}
                    </h3>
                  </div>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed text-justify pl-12">
                    {item.description[language]}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
