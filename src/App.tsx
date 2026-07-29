import React, { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { Navigation } from "./components/Navigation";
import { weddingConfig } from "./config/wedding";
import { Hero } from "./components/Hero";
import { TimelineSection } from "./components/timeline/TimelineSection";
import { RitualsSection } from "./components/RitualsSection";
import { EventsSection } from "./components/EventsSection";
import { FoodFeastSection } from "./components/FoodFeastSection";
import { GallerySection } from "./components/GallerySection";
import { FamilySection } from "./components/FamilySection";
import { WishesSection } from "./components/WishesSection";
import { LocationSection } from "./components/LocationSection";
import { WeddingMonogram } from "./components/WeddingMonogram";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Phone, Github, Instagram, Heart, Sparkles, Award } from "lucide-react";

function WeddingAppContent() {
  const { t, language } = useLanguage();
  
  // Theme state: 'crimson' (Royal Dark Maroon) or 'ivory' (Traditional Auspicious Ivory White)
  const [theme, setTheme] = useState<"crimson" | "ivory">("crimson");
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setTheme(theme === "crimson" ? "ivory" : "crimson");
  };

  useEffect(() => {
    // Scroll smoothly back to top on initial page mount/reload
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Simulate Loading Screen for royal entrance effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#1e0104] flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <WeddingMonogram className="w-48 h-48 drop-shadow-[0_0_20px_rgba(217,119,6,0.5)]" animate={true} />
          <motion.div 
            className="h-1 bg-amber-500 rounded-full" 
            initial={{ width: 0 }} 
            animate={{ width: "200px" }} 
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      theme === "crimson" 
        ? "bg-[#110103] text-white" 
        : "bg-white text-stone-900"
    }`} id="wedding-app-root">

      {/* Navigation Header */}
      <Navigation />

      {/* Floating Theme Custom Controller - Traditional Crimson vs Traditional Ivory Saree theme */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-amber-500 text-maroon-950 font-bold shadow-lg hover:shadow-amber-500/35 hover:scale-110 active:scale-95 duration-300 transition-all cursor-pointer border-2 border-amber-300 flex items-center justify-center"
        title={language === "en" ? "Toggle Traditional Theme" : "வலைத்தள தீம் மாற்றம்"}
        id="theme-toggle-floating-bubble"
      >
        {theme === "crimson" ? (
          <Sun className="w-5.5 h-5.5 animate-spin-slow text-[#110103]" />
        ) : (
          <Moon className="w-5.5 h-5.5 text-stone-950" />
        )}
      </button>

      {/* Main Pages Flow wrapper */}
      <main className="relative">
        
        {/* Unit 1: Full-Screen Hero Visual View */}
        <Hero />

        {/* Dynamic theme adaptive wrapper classes */}
        <div className={`transition-colors duration-500 ${
          theme === "ivory" 
            ? "[&_section]:!bg-[#fafaf9] [&_section]:!text-stone-900 [&_h2]:!text-[#5c0612] [&_p]:!text-stone-600 [&_.timeline-block_div]:!bg-white [&_.timeline-block_div]:!border-stone-200 [&_#ritual-details-card]:!bg-stone-100 [&_#ritual-details-card_h3]:!text-maroon-900 [&_#ritual-details-card_p]:!text-stone-700 [&_#food-section]:!bg-stone-100 [&_#food-menu-items-grid_div]:!bg-white [&_#food-menu-items-grid_div]:!border-stone-250 [&_#food-menu-items-grid_div_h4]:!text-maroon-900 [&_#food-menu-items-grid_div_p]:!text-stone-600 [&_#family-section]:!bg-[#330107] [&_#wishes-section]:!bg-stone-100 [&_#wishes-display-feed-list_div]:!bg-white [&_#wishes-display-feed-list_div]:!border-stone-250 [&_#wishes-display-feed-list_div_h4]:!text-maroon-900 [&_#wishes-display-feed-list_div_p]:!text-stone-700 [&_#wishes-submit-form]:!bg-white [&_#wishes-submit-form_input]:!bg-stone-50 [&_#wishes-submit-form_input]:!text-stone-950 [&_#wishes-submit-form_input]:!border-stone-200 [&_#wishes-submit-form_textarea]:!bg-stone-50 [&_#wishes-submit-form_textarea]:!text-stone-950 [&_#wishes-submit-form_textarea]:!border-stone-200"
            : ""
        }`}>
          {/* Unit 2: Location and Directions Summary */}
          <LocationSection />

          {/* Unit 3: Our Story Chronology */}
          <TimelineSection />

          {/* Unit 4: Traditional Temple Rituals slider */}
          <RitualsSection />

          {/* Unit 5: Complete Schedule Timing list */}
          <EventsSection />

          {/* Unit 6: South Indian Gastronomy details */}
          <FoodFeastSection />

          {/* Unit 7: Photography portfolio Grid lightbox */}
          <GallerySection />

          {/* Unit 8: Bride & Groom Loving Families cards */}
          <FamilySection />

          {/* Unit 9: Guest wishes form and ledger Wishes */}
          <WishesSection />

        </div>

      </main>

      {/* Unit 11: Elegant Footer layout */}
      <footer className="bg-[#1e0104] border-t border-amber-500/20 text-white py-16 px-4 relative overflow-hidden" id="wedding-footer">
        
        {/* Border patterns */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
          
          {/* Logo element */}
          <div className="flex flex-col items-center space-y-2">
            <WeddingMonogram className="w-24 h-24 mb-2 drop-shadow-lg" />
            <h3 className="font-serif font-black text-2xl sm:text-3xl tracking-[0.25em] text-amber-400 uppercase mt-2">
              {weddingConfig.couple.groom.name[language]} & {weddingConfig.couple.bride.name[language]}
            </h3>
            <p className="font-mono text-amber-200/50 text-[10px] sm:text-xs uppercase tracking-widest font-extrabold pb-3">
              {t("byLabel")}
            </p>
          </div>

          <p className="text-[#fadcd5] max-w-lg mx-auto text-sm sm:text-base leading-relaxed italic border-y border-amber-500/10 py-6">
            "{t("footerThankYou")}"
          </p>

          {/* Coordinator contact list */}
          <div className="space-y-3 shrink-0">
            <h4 className="font-mono text-[10px] uppercase font-extrabold tracking-widest text-[#fadcd5]">
              {t("contactUs")}
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
              {weddingConfig.contacts.coordinators.map((coord, idx) => (
                <React.Fragment key={idx}>
                  <a href={`tel:${coord.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 hover:text-amber-400 duration-200 text-amber-200 font-mono">
                    <Phone className="w-4.5 h-4.5 text-amber-500" />
                    <span>{coord.phone} ({coord.name[language]})</span>
                  </a>
                  {idx < weddingConfig.contacts.coordinators.length - 1 && (
                    <span className="hidden sm:inline text-amber-500/40">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Technical copyrights, credits, PWA credentials */}
          {/* Technical copyrights, credits, PWA credentials */}
<div className="pt-8 border-t border-white/5 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-stone-400 font-mono">
  <div>
    <p>© 2026 {t("rightsReserved")}</p>
    <p className="text-[10px] text-amber-400/40 mt-0.5">
      {t("byLabel")}
    </p>

    <p className="text-[10px] text-white/30 mt-1">
      Copyright ©{" "}
      <a
        href="https://yokeshcv.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-400 hover:text-amber-300 transition-colors"
      >
        Yokesh
      </a>
    </p>
  </div>

  {/* Fine Social nodes links */}
  <div className="flex items-center gap-4 text-[#fadcd5]/60">
    <a
      href="https://instagram.com/shysnapster"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-amber-400 transition-colors"
    >
      <Instagram className="w-4.5 h-4.5" />
    </a>

    <span className="text-white/10">|</span>

    <span className="text-amber-500 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1">
      <Heart className="w-3 h-3 fill-current text-rose-500" />
      PWA Active
    </span>
  </div>
</div>

        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WeddingAppContent />
    </LanguageProvider>
  );
}
