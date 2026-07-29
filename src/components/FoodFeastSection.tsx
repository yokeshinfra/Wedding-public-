import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FOOD_MENU } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Columns, Flame, Leaf, Award } from "lucide-react";

export const FoodFeastSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const activeCategory = FOOD_MENU[selectedIdx];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#3b0209] to-[#1e0104] text-white relative overflow-hidden" id="food-section">
      {/* Decorative Ornate Kolam design rings */}
      <div className="absolute top-10 left-10 w-48 h-48 border border-amber-500/10 rounded-full flex items-center justify-center animate-spin-slow pointer-events-none">
        <div className="w-40 h-40 border border-dashed border-amber-500/10 rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto text-center mb-16 space-y-3 relative z-10">
        <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-300 text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-emerald-500/15">
          <Leaf className="w-3.5 h-3.5 fill-current animate-pulse text-emerald-500" />
          {t("vegLabel")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 tracking-tight">
          {t("foodFestival")}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        <p className="text-amber-100/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {t("foodDesc")}
        </p>

        {/* Traditional Large Tab selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8 max-w-xl mx-auto">
          {FOOD_MENU.map((category, idx) => (
            <button
              key={category.id}
              onClick={() => setSelectedIdx(idx)}
              className={`w-full p-4 rounded-2xl border font-serif font-bold text-center duration-300 transition-all cursor-pointer relative overflow-hidden ${
                selectedIdx === idx
                  ? "bg-gradient-to-r from-[#d97706] to-[#b45309] border-amber-400 text-maroon-900 shadow-lg shadow-amber-500/15 scale-[1.02]"
                  : "bg-black/30 border-white/5 text-[#fadcd5] hover:bg-[#5c0612]/30 hover:border-amber-500/15"
              }`}
              id={`tab-food-cate-${idx}`}
            >
              <div className="flex items-center justify-center gap-2">
                {idx === 0 ? <Coffee className="w-4.5 h-4.5" /> : <Leaf className="w-4.5 h-4.5" />}
                <span className="tracking-wide text-xs sm:text-sm uppercase font-extrabold">{category.title[language]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Culinary Display Grid Card items */}
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            id="food-menu-items-grid"
          >
            {activeCategory.items.map((item, index) => (
              <div
                key={item.id}
                className="bg-black/25 border border-white/5 hover:border-amber-500/35 rounded-2xl p-5 hover:bg-black/45 hover:shadow-[0_8px_32px_rgba(217,119,6,0.08)] duration-300 transition-all group flex flex-col justify-between"
                id={`food-item-${item.id}`}
              >
                <div className="space-y-3">
                  {/* Cards top Header with Tags and Veg Indicators */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1 border border-emerald-500/50 rounded p-1 bg-emerald-500/5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </span>
                    {item.tag && (
                      <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider">
                        {item.tag[language]}
                      </span>
                    )}
                  </div>

                  {/* Food Name & Details description */}
                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-base sm:text-lg font-serif font-bold text-amber-300 tracking-wide leading-snug group-hover:text-amber-200 transition-colors">
                      {item.name[language]}
                    </h4>
                    <p className="text-amber-100/60 text-xs leading-relaxed text-justify group-hover:text-amber-100/80 transition-colors">
                      {item.description[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>Traditional Catering</span>
                  <Leaf className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative banana leaf elements in background styling, representing 21 items feast */}
      {selectedIdx === 1 && (
        <div className="mt-12 text-center max-w-lg mx-auto bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 backdrop-blur-sm space-y-2 relative z-10">
          <p className="text-xs font-mono uppercase text-emerald-400 font-extrabold tracking-widest flex items-center justify-center gap-1.5">
            <Award className="w-4 h-4 animate-bounce" />
            <span>Traditional Visual Masterpiece</span>
          </p>
          <p className="text-xs text-stone-300">
            {language === "en" ? "Fresh country banana leaves are handwashed and styled carefully. Rice is served unlimited alongside traditional Ghee streams, payasams, paruppu and crisps." : "புதிதாய் அறுவடை செய்த நாட்டு வாழை இலையைத் தூய்மை செய்து பரிமாறப்படும் மங்கள மாபெரும் பாரம்பரிய கல்யாண அறுசுவை மதிய விருந்து."}
          </p>
        </div>
      )}
    </section>
  );
};
