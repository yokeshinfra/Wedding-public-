import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { WeddingMonogram } from "./WeddingMonogram";
import { Menu, X, Globe, Heart } from "lucide-react";
import { weddingConfig } from "../config/wedding";

export const Navigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ta" : "en");
    setIsOpen(false);
  };

  const navLinks = [
    { id: "story-section", label: t("ourStory") },
    { id: "rituals-section", label: language === "en" ? "Rituals" : "சடங்குகள்" },
    { id: "events-section", label: language === "en" ? "Schedule" : "அட்டவணை" },
    { id: "food-section", label: language === "en" ? "Feast" : "விருந்து" },
    { id: "gallery-section", label: language === "en" ? "Gallery" : "புகைப்படங்கள்" },
    { id: "family-section", label: language === "en" ? "Families" : "குடும்பங்கள்" },
    { id: "wishes-section", label: language === "en" ? "Wishes" : "வாழ்த்துகள்" },
    { id: "location-section", label: language === "en" ? "Location" : "விலாசம்" }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset slightly for the sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-serif ${
      isScrolled 
        ? "bg-[#330107]/90 border-b border-amber-500/25 py-3 shadow-md backdrop-blur-md" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Branding label */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 duration-300 transition-transform">
            <WeddingMonogram className="w-full h-full" />
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-[0.15em] text-amber-400 uppercase drop-shadow">
            {weddingConfig.couple.groom.name[language]} & {weddingConfig.couple.bride.name[language]}
          </span>
        </div>

        {/* Large screen layout links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-xs uppercase tracking-widest font-sans font-bold text-[#fafcd5]/85 hover:text-amber-300 cursor-pointer duration-300 transition-colors"
              id={`nav-link-lg-${link.id}`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="h-4 w-[1px] bg-amber-500/20" />

          {/* Quick Active translation bubble button */}
          <button
            onClick={toggleLanguage}
            className="px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 duration-200 transition-colors cursor-pointer"
            id="nav-lang-bar-toggle"
          >
            <Globe className="w-3.5 h-3.5 shrink-0 animate-spin-slow text-amber-400" />
            <span>{language === "en" ? "தமிழ்" : "English"}</span>
          </button>
        </div>

        {/* Small Screen Control switches */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="p-1 px-2.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-300 text-xs font-mono font-bold tracking-wider flex items-center gap-1 duration-200 cursor-pointer"
            id="nav-lang-bar-sm-toggle"
          >
            <Globe className="w-3 h-3 text-amber-500" />
            <span>{language === "en" ? "தமிழ்" : "EN"}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-amber-400 border border-amber-500/20 rounded-lg hover:bg-[#5c0612]/30 duration-200 cursor-pointer"
            id="nav-menu-drawer-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Drawer layout for small screens */}
      {isOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 right-0 py-6 px-4 bg-[#3d0208] border-b border-amber-500/30 shadow-2xl space-y-4 backdrop-blur-lg flex flex-col items-stretch z-40 animate-fade-in" id="nav-dropdown-drawer">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="w-full text-left py-2 border-b border-white/5 font-sans font-bold text-xs uppercase tracking-widest text-stone-200 hover:text-amber-400 cursor-pointer"
              id={`nav-link-sm-${link.id}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
