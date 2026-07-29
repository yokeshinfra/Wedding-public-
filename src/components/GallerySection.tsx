import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { GALLERY_PHOTOS } from "../data";
import { WeddingMonogram } from "./WeddingMonogram";
import { motion, AnimatePresence } from "motion/react";
import { Image, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export const GallerySection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => {
    if (activeFilter === "all") return true;
    return photo.category === activeFilter;
  });

  const handlePrev = () => {
    if (selectedImageIdx === null) return;
    const prevIdx = selectedImageIdx === 0 ? filteredPhotos.length - 1 : selectedImageIdx - 1;
    setSelectedImageIdx(prevIdx);
  };

  const handleNext = () => {
    if (selectedImageIdx === null) return;
    const nextIdx = selectedImageIdx === filteredPhotos.length - 1 ? 0 : selectedImageIdx + 1;
    setSelectedImageIdx(nextIdx);
  };

  return (
    <section className="py-24 px-4 bg-white text-stone-900 relative overflow-hidden" id="gallery-section">
      <div className="max-w-5xl mx-auto text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-amber-200">
          <Image className="w-3.5 h-3.5" />
          {t("gallery")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5c0612] tracking-tight">
          {t("gallery")}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {t("galleryDesc")}
        </p>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {[
            { id: "all", label: t("all") },
            { id: "engagement", label: t("engagement") },
            { id: "wedding", label: t("wedding") },
            { id: "pre-wedding", label: t("prewedding") }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setSelectedImageIdx(null); // Clear lightbox pointer to avoid filtered limits crash
              }}
              className={`px-4 py-2 text-xs sm:text-sm rounded-full border transition-all duration-300 font-serif font-semibold cursor-pointer ${
                activeFilter === filter.id
                  ? "bg-[#5c0612] border-[#5c0612] text-white shadow-sm"
                  : "bg-stone-50 border-stone-200 text-stone-600 hover:border-[#5c0612]/30 hover:text-[#5c0612]"
              }`}
              id={`btn-filter-photo-${filter.id}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Grid Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-masonry-grid">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, idx) => {
            // Find its index in the filtered photos array so that slides are mapped
            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-stone-150 shadow-sm aspect-4/3 bg-stone-100"
                onClick={() => setSelectedImageIdx(idx)}
                id={`gallery-item-${photo.id}`}
              >
                {/* Photo Thumbnail */}
                <img
                  src={photo.src}
                  alt={photo.title[language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Sublte Gallery Watermark */}
                <div className="absolute top-4 left-4 opacity-50 drop-shadow-md pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
                  <WeddingMonogram className="w-12 h-12" />
                </div>

                {/* Grid Overlay Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                {/* Photo Details Floating Information */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 transition-all flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono text-amber-400 font-extrabold tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/15">
                      {photo.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm tracking-wide mt-1">
                      {photo.title[language]}
                    </h4>
                  </div>
                  <div className="p-2 border border-white/20 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox Module Dialog */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" id="gallery-lightbox">
            {/* Close Overlay Trigger */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImageIdx(null)} />

            {/* Top Close Control button */}
            <button
              onClick={() => setSelectedImageIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white duration-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 p-3 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white duration-200 cursor-pointer hidden sm:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 p-3 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white duration-200 cursor-pointer hidden sm:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Picture Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[80vh] relative z-10 space-y-3 pointer-events-auto"
            >
              <img
                src={filteredPhotos[selectedImageIdx].src}
                alt={filteredPhotos[selectedImageIdx].title[language]}
                className="max-w-full max-h-[70vh] rounded-xl object-contain border border-stone-800 shadow-2xl mx-auto"
                referrerPolicy="no-referrer"
              />

              <div className="text-center text-white space-y-1">
                <span className="text-[10px] uppercase font-mono text-amber-400 font-extrabold tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/15 inline-block">
                  {filteredPhotos[selectedImageIdx].category}
                </span>
                <h3 className="font-serif font-bold text-lg text-amber-200">
                  {filteredPhotos[selectedImageIdx].title[language]}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
