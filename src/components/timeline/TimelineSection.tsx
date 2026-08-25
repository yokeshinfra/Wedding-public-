import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { STORY_MILESTONES } from "../../data";
import { motion } from "motion/react";
import { Heart, Calendar } from "lucide-react";

export const TimelineSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-24 px-4 bg-stone-50 text-stone-900 overflow-hidden relative" id="story-section">
      {/* Decorative Ornate Background Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-mono uppercase tracking-widest font-semibold border border-amber-200">
          <Heart className="w-3 h-3 fill-current text-rose-500" />
          {t("weddingWebsite")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-900 tracking-tight">
          {t("ourStory")}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {t("storyDesc")}
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Central Vertical Connector Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-200 md:-translate-x-1/2 rounded-full" />

        {/* Story Milestone Card Items iteration */}
        <div className="space-y-12 md:space-y-16 relative">
          {STORY_MILESTONES.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div 
                key={milestone.id} 
                className={`flex flex-col md:flex-row items-stretch timeline-block ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                id={`story-item-${milestone.id}`}
              >
                {/* Visual timeline node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#5c0612] border-4 border-amber-400 shadow-md flex items-center justify-center -translate-x-1/2 z-10 transition-transform hover:scale-110">
                  <Heart className="w-3.5 h-3.5 text-amber-400 fill-current" />
                </div>

                {/* Content Side */}
                <div className="pl-12 md:pl-0 w-full md:w-[46%]">
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="p-6 bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative group overflow-hidden"
                  >
                    {/* Top traditional color banner band */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-[#5c0612]" />

                    {/* Milestone Image */}
                    <div className="w-full h-48 relative overflow-hidden rounded-xl mb-4 bg-stone-100">
                      <img 
                        src={milestone.image} 
                        alt={milestone.title[language]} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Premium elegant golden gradient mask overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Title & Date */}
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5c0612] bg-[#5c0612]/5 px-2.5 py-1 rounded-full font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{milestone.date[language]}</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-amber-900 group-hover:text-amber-800 transition-colors">
                        {milestone.title[language]}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed text-justify">
                        {milestone.description[language]}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Spacer Side (for symmetrical spacing on large screens) */}
                <div className="hidden md:block w-[46%] pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
