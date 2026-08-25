import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FAMILY_MEMBERS } from "../data";
import { motion } from "motion/react";
import { Users, Heart } from "lucide-react";

export const FamilySection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeSide, setActiveSide] = useState<"groom" | "bride">("groom");

  // Filter family members based on active side selected
  const filteredFamily = FAMILY_MEMBERS.filter(member => {
    if (activeSide === "groom") {
      // Groom side role or relation mentions Groom
      return ["fam-1", "fam-2", "fam-6", "fam-7"].includes(member.id);
    } else {
      // Bride side
      return ["fam-3", "fam-4", "fam-5"].includes(member.id);
    }
  });

  return (
    <section className="py-24 px-4 bg-[#1e0104] text-white relative overflow-hidden" id="family-section">
      {/* Decorative Traditional Mandap lines background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-5 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-5xl mx-auto text-center mb-16 space-y-3 relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-amber-500/20">
          <Users className="w-4 h-4 text-amber-500" />
          {t("familySecTitle")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 tracking-tight">
          {t("familyPortal") || t("familySecTitle")}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        <p className="text-amber-100/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {t("familySecDesc")}
        </p>

        {/* Traditional Slide Navigation switch */}
        <div className="flex items-center justify-center pt-8">
          <div className="inline-flex bg-black/45 p-1.5 rounded-2xl border border-amber-500/15 max-w-xs sm:max-w-md w-full">
            <button
              onClick={() => setActiveSide("groom")}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer text-center ${
                activeSide === "groom"
                  ? "bg-[#5c0612] text-amber-300 border border-amber-500/20"
                  : "text-[#fadcd5] hover:text-white"
              }`}
              id="btn-active-groom-fam"
            >
              {t("groomFamily")}
            </button>
            <button
              onClick={() => setActiveSide("bride")}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer text-center ${
                activeSide === "bride"
                  ? "bg-[#5c0612] text-amber-300 border border-amber-500/20"
                  : "text-[#fadcd5] hover:text-white"
              }`}
              id="btn-active-bride-fam"
            >
              {t("brideFamily")}
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Family Profile Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 justify-center items-stretch" id="family-grid">
        {filteredFamily.map((person) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-black/35 border border-amber-500/15 hover:border-amber-400/40 rounded-3xl p-5 hover:bg-black/55 duration-300 transition-all flex flex-col justify-between overflow-hidden group relative"
            id={`family-member-card-${person.id}`}
          >
            {/* Top decorative visual corner arches */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500/25 rounded-tr-3xl pointer-events-none group-hover:border-amber-400 duration-300" />
            
            <div className="space-y-4">
              {/* Profile Image Avatar frame */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/80 p-1 mx-auto overflow-hidden relative">
                {person.image ? (
                  <img
                    src={person.image}
                    alt={person.name[language]}
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 group-hover:scale-105 duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#5c0612]/50 flex items-center justify-center font-bold text-amber-400 text-3xl">
                    {person.name[language][0]}
                  </div>
                )}
              </div>

              {/* Character descriptions */}
              <div className="text-center space-y-1">
                <h3 className="font-serif font-extrabold text-base sm:text-lg text-amber-300 group-hover:text-amber-200 transition-colors">
                  {person.name[language]}
                </h3>
                <p className="text-[#fadcd5]/70 text-[11px] font-semibold tracking-wider font-mono uppercase">
                  {person.relation[language]}
                </p>
              </div>

              <div className="w-8 h-[1px] bg-amber-500/30 mx-auto" />

              {/* Devotional Family Blessing statement with quote symbol */}
              {person.blessing && (
                <div className="relative">
                  <p className="text-stone-300 text-[11px] sm:text-xs leading-relaxed italic text-center text-justify bg-[#5c0612]/20 border border-amber-500/5 rounded-xl p-3">
                    "{person.blessing[language]}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom tiny graphic bar */}
            <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-center gap-1 text-[10px] text-amber-400/40 uppercase font-mono font-bold tracking-widest">
              <Heart className="w-2.5 h-2.5 fill-current" />
              <span>Full Guardian</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
