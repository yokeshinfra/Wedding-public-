import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { LANDMARKS } from "../data";
import { MapPin, Navigation, Train, Bus, Info, Bike, Car } from "lucide-react";
import { weddingConfig } from "../config/wedding";

export const LocationSection: React.FC = () => {
  const { t, language } = useLanguage();

  const handleOpenMap = () => {
    window.open(weddingConfig.venue.mapsDirectionsUrl, "_blank");
  };

  return (
    <section className="py-24 px-4 bg-stone-50 text-stone-900 overflow-hidden relative" id="location-section">
      <div className="max-w-5xl mx-auto text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-mono uppercase tracking-widest font-semibold border border-amber-200">
          <MapPin className="w-3.5 h-3.5" />
          {t("venueAndTravel")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5c0612] tracking-tight">
          {t("venueAndTravel")}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Detail Cards Panel */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-white border border-stone-200 shadow-sm rounded-3xl p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#5c0612]/5 text-[#5c0612] rounded-2xl border border-amber-500/10 shadow-sm">
                <MapPin className="w-6 h-6 shrink-0 animate-bounce" />
              </div>
              <div className="space-y-1.5 min-w-0">
                <h4 className="font-serif font-bold text-lg text-stone-950 uppercase tracking-wide">
                  {t("venueAddressLabel")}
                </h4>
                <p className="text-sm text-[#5c0612] font-semibold">
                  {weddingConfig.venue.name[language]}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {weddingConfig.venue.address[language]}
                </p>
              </div>
            </div>

            {/* Navigation Button */}
            <button
              onClick={handleOpenMap}
              className="w-full py-3 px-5 font-serif rounded-xl bg-[#5c0612] text-white hover:bg-[#430209] transition-all font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-maroon-950/10 border-b-2 border-amber-500"
              id="btn-trigger-maps"
            >
              <Navigation className="w-4 h-4 fill-current text-amber-400" />
              {t("oneClickNav")}
            </button>
          </div>

          {/* Transit & Landmark connection cards */}
          <div className="bg-white border border-stone-200 shadow-sm rounded-3xl p-6 space-y-4">
            <h4 className="font-serif font-bold text-base text-stone-950 uppercase tracking-widest pb-2 border-b border-stone-100 flex items-center gap-2">
              <Train className="w-4.5 h-4.5 text-amber-600" />
              {t("transitTitle")}
            </h4>

            <div className="space-y-4 text-xs">
              {/* Landmark item */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 font-mono flex items-center justify-center shrink-0">
                  L
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-900">{t("nearbyLandmarksTitle")}</p>
                  <p className="text-stone-600">{LANDMARKS.metro[language]}</p>
                </div>
              </div>

              {/* Rails item */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 font-mono flex items-center justify-center shrink-0">
                  R
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-900">{t("railfile") || t("railStationLabel")}</p>
                  <p className="text-stone-600 leading-relaxed">{LANDMARKS.railway[language]}</p>
                </div>
              </div>

              {/* Bus stand item */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 font-mono flex items-center justify-center shrink-0">
                  B
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-900">{t("busStandLabel")}</p>
                  <p className="text-stone-600">{LANDMARKS.busStand[language]}</p>
                </div>
              </div>

              {/* Bus numbers */}
              <div className="flex items-start gap-3 bg-[#5c0612]/5 p-3 rounded-xl border border-amber-500/10">
                <Bus className="w-4 h-4 text-amber-700 mt-0.5 shrink-0 animate-pulse" />
                <div className="space-y-0.5 min-w-0">
                  <p className="font-bold text-amber-950 uppercase tracking-widest text-[9px] mb-0.5">{t("busNumbersLabel")}</p>
                  <p className="text-stone-700 text-[11px] leading-relaxed truncate">{LANDMARKS.busNumbers[language]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Maps Frame and Valet Guides */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Iframe Maps block */}
          <div className="bg-white border border-stone-200 shadow-sm rounded-3xl p-3 h-96 w-full relative overflow-hidden group">
            {/* Embedded map showing Sree Murugan Mahal in Arumbakkam, Chennai */}
            <iframe
              src={weddingConfig.venue.mapsEmbedUrl}
              className="w-full h-full rounded-2xl border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${weddingConfig.venue.name[language]} location`}
            />
          </div>

          {/* Bike & Car Route with Parking specifications details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bike routing guideline */}
            <div className="bg-white border border-stone-200/80 shadow-sm rounded-2xl p-4.5 space-y-2.5">
              <div className="flex items-center gap-2 font-serif font-extrabold text-sm text-[#5c0612] uppercase tracking-wider">
                <Bike className="w-5 h-5 text-amber-500 animate-pulse" />
                <span>{language === "en" ? "Bike Parking Guide" : "இருசக்கர வாகனங்கள்"}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed text-justify">
                {language === "en"
                  ? "Enter through Gate 2 of the Mahal. Follow signs leading directly to the basement storage. Safe racks are provided."
                  : "மண்டபத்தின் 2வது கேட் வழியாக நுழையவும். வாகன நிறுத்தக் குறியீடுகளை பின்பற்றி பேஸ்மென்ட் பார்க்கிங்கில் நிறுத்தவும்."}
              </p>
            </div>

            {/* Car routing guideline with Valet Parking */}
            <div className="bg-white border border-stone-200/80 shadow-sm rounded-2xl p-4.5 space-y-2.5">
              <div className="flex items-center gap-2 font-serif font-extrabold text-sm text-[#5c0612] uppercase tracking-wider">
                <Car className="w-5 h-5 text-amber-500" />
                <span>{language === "en" ? "Car Valet Parking" : "கார்கள் பார்க்கிங்"}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed text-justify">
                {language === "en"
                  ? "Complimentary high-speed valet service is available at Gate 1 threshold for all marriage family guests."
                  : "மண்டபத்தின் முன் நுழைவாயில் கேட் 1-ல் பிரத்யேக இலவச வேலட் பார்க்கிங் மற்றும் கார் நிறுத்துமிடம் உள்ளது."}
              </p>
            </div>
          </div>

          {/* Parking statement footer bar */}
          <div className="bg-amber-100/50 border border-amber-500/20 rounded-2xl p-4.5 flex gap-3.5 items-start">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              <p className="font-bold text-amber-950 uppercase tracking-widest text-[9px]">{t("parkingTitle")}</p>
              <p className="text-stone-700 leading-relaxed">{LANDMARKS.parking[language]}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
