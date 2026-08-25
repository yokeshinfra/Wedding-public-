import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { GALLERY_PHOTOS } from "../data";
import { WeddingMonogram } from "./WeddingMonogram";
import { FaceSearchModal } from "./FaceSearchModal";
import { FaceMatchResult } from "../types";
import JSZip from "jszip";
import { motion, AnimatePresence } from "motion/react";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  CheckCircle2,
  Circle,
  Layers,
  Sparkles,
  Loader2,
  CheckSquare,
  Square,
  ScanFace,
  FilterX,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export const GallerySection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  // Face Search state
  const [isFaceSearchOpen, setIsFaceSearchOpen] = useState<boolean>(false);
  const [activeFaceMatches, setActiveFaceMatches] = useState<FaceMatchResult[] | null>(null);
  const [userFacePreview, setUserFacePreview] = useState<string | null>(null);
  const [activeBackendType, setActiveBackendType] = useState<"python_api" | "built_in_engine">("built_in_engine");

  // Multi-selection state
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [isDownloadingSelected, setIsDownloadingSelected] = useState<boolean>(false);
  const [isDownloadingMatchedZip, setIsDownloadingMatchedZip] = useState<boolean>(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  // Determine current displayed photos (If face matches active, show ONLY those photos!)
  const displayedPhotos = activeFaceMatches
    ? activeFaceMatches.map((match) => {
        const cleanName = (match.filename || match.id || "").replace(/^.*[\\/]/, "");
        const existingPhoto = GALLERY_PHOTOS.find(
          (p) =>
            p.id === match.id ||
            p.id === cleanName ||
            p.src.replace(/^.*[\\/]/, "").toLowerCase() === cleanName.toLowerCase()
        );

        if (existingPhoto) {
          return {
            ...existingPhoto,
            confidence: match.confidence || 92
          };
        }

        return {
          id: match.id || cleanName,
          src: match.preview_url || `/Image/${cleanName}`,
          alt: cleanName,
          category: match.category || "wedding",
          title: match.title || { en: cleanName.replace(/\.[^/.]+$/, ""), ta: cleanName.replace(/\.[^/.]+$/, "") },
          description: { en: "Face matched wedding memory", ta: "முக ஒற்றுமை கொண்ட திருமண புகைப்படம்" },
          aspectRatio: "3/2" as const,
          confidence: match.confidence || 92
        };
      })
    : GALLERY_PHOTOS.filter((photo) => {
        if (activeFilter === "all") return true;
        return photo.category === activeFilter;
      });

  const showNotification = (msg: string) => {
    setDownloadNotification(msg);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4500);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIdx === null) return;
      if (e.key === "Escape") {
        setSelectedImageIdx(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIdx((prev) =>
          prev === null ? null : prev === 0 ? displayedPhotos.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setSelectedImageIdx((prev) =>
          prev === null ? null : prev === displayedPhotos.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIdx, displayedPhotos.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIdx === null) return;
    const prevIdx = selectedImageIdx === 0 ? displayedPhotos.length - 1 : selectedImageIdx - 1;
    setSelectedImageIdx(prevIdx);
  }, [selectedImageIdx, displayedPhotos.length]);

  const handleNext = useCallback(() => {
    if (selectedImageIdx === null) return;
    const nextIdx = selectedImageIdx === displayedPhotos.length - 1 ? 0 : selectedImageIdx + 1;
    setSelectedImageIdx(nextIdx);
  }, [selectedImageIdx, displayedPhotos.length]);

  // Face Match Callback from Modal
  const handleFaceMatchesFound = (
    matches: FaceMatchResult[],
    facePreviewUrl: string,
    backendType: "python_api" | "built_in_engine"
  ) => {
    setActiveFaceMatches(matches);
    setUserFacePreview(facePreviewUrl);
    setActiveBackendType(backendType);
    setSelectedPhotoIds([]);
    setSelectedImageIdx(null);
    showNotification(
      language === "en"
        ? `Found ${matches.length} matching photos with your face!`
        : `உங்கள் முகத்துடன் ${matches.length} புகைப்படங்கள் கண்டறியப்பட்டன!`
    );
  };

  // Clear Face Filter
  const handleClearFaceFilter = () => {
    setActiveFaceMatches(null);
    setUserFacePreview(null);
    setSelectedPhotoIds([]);
    setSelectedImageIdx(null);
    showNotification(
      language === "en" ? "Face filter cleared. Showing all photos." : "வடிகட்டி நீக்கப்பட்டது. அனைத்து படங்களும் காட்டப்படுகின்றன."
    );
  };

  // Toggle single photo selection
  const toggleSelectPhoto = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select all or Deselect all currently displayed photos
  const toggleSelectAll = () => {
    const currentDisplayedIds = displayedPhotos.map((p) => p.id);
    const allSelected = currentDisplayedIds.every((id) => selectedPhotoIds.includes(id));

    if (allSelected) {
      setSelectedPhotoIds((prev) => prev.filter((id) => !currentDisplayedIds.includes(id)));
    } else {
      setSelectedPhotoIds((prev) => Array.from(new Set([...prev, ...currentDisplayedIds])));
    }
  };

  // Helper to package and trigger client-side ZIP download if server endpoint is unavailable
  const generateClientZip = async (photosToZip: typeof displayedPhotos, zipFilename: string) => {
    const zip = new JSZip();
    let added = 0;

    for (let i = 0; i < photosToZip.length; i++) {
      const p = photosToZip[i];
      try {
        const res = await fetch(p.src);
        if (res.ok) {
          const blob = await res.blob();
          const cleanName = (p.src.split("/").pop() || `${p.id}.png`).split("?")[0];
          zip.file(cleanName.endsWith(".png") || cleanName.endsWith(".jpg") ? cleanName : `${cleanName}.png`, blob);
          added++;
        }
      } catch (fetchErr) {
        console.warn(`Could not fetch ${p.src} for ZIP:`, fetchErr);
      }
    }

    if (added === 0) {
      throw new Error("No photo blobs could be retrieved");
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = window.URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = zipFilename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // 1. Download Single Photo
  const handleDownloadSingle = async (photoId: string, filename: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      showNotification(language === "en" ? `Downloading ${filename}...` : `${filename} பதிவிறக்கப்படுகிறது...`);
      const response = await fetch(`/api/photos/${photoId}/download`);
      if (!response.ok) {
        // Fallback to direct client image download
        const photo = displayedPhotos.find((p) => p.id === photoId) || GALLERY_PHOTOS.find((p) => p.id === photoId);
        if (photo) {
          const a = document.createElement("a");
          a.href = photo.src;
          const cleanName = photo.src.split("/").pop() || `${photo.id}.png`;
          a.download = cleanName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          return;
        }
        throw new Error("Download failed");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename.endsWith(".png") || filename.endsWith(".jpg") ? filename : `${filename}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download single photo error:", err);
      const photo = displayedPhotos.find((p) => p.id === photoId) || GALLERY_PHOTOS.find((p) => p.id === photoId);
      if (photo) {
        const a = document.createElement("a");
        a.href = photo.src;
        const cleanName = photo.src.split("/").pop() || `wedding_photo_${photoId}.png`;
        a.download = cleanName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  // 2. Download Selected Photos as ZIP
  const handleDownloadSelected = async () => {
    if (selectedPhotoIds.length === 0) return;
    setIsDownloadingSelected(true);
    const targetPhotos = displayedPhotos.filter((p) => selectedPhotoIds.includes(p.id));
    const zipName = "Ramesh_Ramya_Wedding_Selected_Photos.zip";

    showNotification(
      language === "en"
        ? `Preparing ZIP for ${selectedPhotoIds.length} selected photos...`
        : `தேர்ந்தெடுக்கப்பட்ட ${selectedPhotoIds.length} படங்களின் ZIP கோப்பு தயாராகிறது...`
    );

    try {
      const response = await fetch("/api/photos/download-selected", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoIds: selectedPhotoIds,
          zipName: zipName
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = zipName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // Fallback to client-side JSZip packaging
        await generateClientZip(targetPhotos, zipName);
      }

      showNotification(
        language === "en"
          ? "ZIP archive downloaded successfully!"
          : "ZIP கோப்பு வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது!"
      );
    } catch (error) {
      console.warn("Server ZIP download failed, attempting client fallback:", error);
      try {
        await generateClientZip(targetPhotos, zipName);
        showNotification(
          language === "en"
            ? "ZIP archive downloaded successfully!"
            : "ZIP கோப்பு வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது!"
        );
      } catch (clientErr) {
        console.error("Selected photos ZIP download failed:", clientErr);
        showNotification(
          language === "en"
            ? "Failed to download selected photos. Please try again."
            : "பதிவிறக்குவதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
        );
      }
    } finally {
      setIsDownloadingSelected(false);
    }
  };

  // 3. Download ALL Matched Photos for this Face as ZIP
  const handleDownloadMatchedPhotosZip = async () => {
    if (!activeFaceMatches || activeFaceMatches.length === 0) return;
    setIsDownloadingMatchedZip(true);
    const matchedPhotos = displayedPhotos;
    const matchedIds = matchedPhotos.map((p) => p.id);
    const zipName = "My_Wedding_Face_Photos.zip";

    showNotification(
      language === "en"
        ? `Preparing ZIP for all ${matchedIds.length} of your matched face photos...`
        : `உங்கள் முகத்துடன் கூடிய ${matchedIds.length} புகைப்படங்களின் ZIP கோப்பு தயாராகிறது...`
    );

    try {
      const response = await fetch("/api/photos/download-selected", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoIds: matchedIds,
          zipName: zipName
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = zipName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // Fallback to client-side JSZip packaging
        await generateClientZip(matchedPhotos, zipName);
      }

      showNotification(
        language === "en"
          ? "Your matched photos ZIP downloaded successfully!"
          : "உங்கள் புகைப்படங்கள் ZIP வடிவில் வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டன!"
      );
    } catch (error) {
      console.warn("Server ZIP download failed, attempting client fallback:", error);
      try {
        await generateClientZip(matchedPhotos, zipName);
        showNotification(
          language === "en"
            ? "Your matched photos ZIP downloaded successfully!"
            : "உங்கள் புகைப்படங்கள் ZIP வடிவில் வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டன!"
        );
      } catch (clientErr) {
        console.error("Matched photos ZIP download error:", clientErr);
        showNotification(
          language === "en"
            ? "Failed to download matched photos. Please try downloading individual photos."
            : "பதிவிறக்குவதில் பிழை ஏற்பட்டது. தனிப்பட்ட படங்களைப் பதிவிறக்கவும்."
        );
      }
    } finally {
      setIsDownloadingMatchedZip(false);
    }
  };

  const areAllDisplayedSelected =
    displayedPhotos.length > 0 &&
    displayedPhotos.every((p) => selectedPhotoIds.includes(p.id));

  return (
    <section
      className="py-24 px-4 bg-white text-stone-900 relative overflow-hidden"
      id="gallery-section"
    >
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {downloadNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#110103] text-amber-300 border border-amber-500/40 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-mono font-bold tracking-wide backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{downloadNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Face Search Modal */}
      <FaceSearchModal
        isOpen={isFaceSearchOpen}
        onClose={() => setIsFaceSearchOpen(false)}
        onMatchesFound={handleFaceMatchesFound}
      />

      <div className="max-w-6xl mx-auto mb-10 space-y-4">
        {/* Header Badges & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-widest font-semibold border border-amber-200">
            <ImageIcon className="w-3.5 h-3.5" />
            {t("photos")}
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5c0612] tracking-tight">
            {t("gallery")}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t("galleryDesc")}
          </p>
        </div>

        {/* ACTIVE FACE SEARCH MATCH BANNER */}
        <AnimatePresence>
          {activeFaceMatches && userFacePreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#1a0205] via-[#2d040a] to-[#1a0205] border-2 border-amber-400/80 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-4"
              id="active-face-match-banner"
            >
              <div className="flex items-center gap-4">
                {/* Uploaded Face Avatar */}
                <div className="relative">
                  <img
                    src={userFacePreview}
                    alt="Your Face"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-amber-400 shadow-lg ring-4 ring-amber-500/30"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 text-stone-950 p-1 rounded-full shadow">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-serif font-bold text-amber-300">
                      {t("foundMatches")}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                      {displayedPhotos.length} {language === "en" ? "Photos" : "படங்கள்"}
                    </span>
                    {activeBackendType === "python_api" && (
                      <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                        Python AI API
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-300">
                    {language === "en"
                      ? "Showing only photos containing your face. Download single photos or your complete matched package."
                      : "உங்கள் முகம் உள்ள படங்கள் மட்டுமே கீழே காட்டப்பட்டுள்ளன. தனித்தனியாகவோ அல்லது முழு தொகுப்பாகவோ பதிவிறக்கம் செய்யலாம்."}
                  </p>
                </div>
              </div>

              {/* Action Buttons for Matched Photos */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {/* Download My Matched Photos (ZIP) */}
                <button
                  onClick={handleDownloadMatchedPhotosZip}
                  disabled={isDownloadingMatchedZip}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg hover:shadow-xl duration-200 transition-all cursor-pointer disabled:opacity-50"
                  id="btn-download-my-matched-photos-zip"
                >
                  {isDownloadingMatchedZip ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>{t("downloadingZip")}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{t("downloadMyPhotos")}</span>
                    </>
                  )}
                </button>

                {/* Clear Face Filter Button */}
                <button
                  onClick={handleClearFaceFilter}
                  className="px-3.5 py-2.5 rounded-xl border border-stone-600 bg-stone-900/80 hover:bg-stone-800 text-stone-200 text-xs font-mono flex items-center gap-1.5 duration-200 cursor-pointer"
                  id="btn-clear-face-filter"
                >
                  <FilterX className="w-4 h-4 text-amber-400" />
                  <span>{t("clearFaceSearch")}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Toolbar: Category Filters + Find My Photos (Face Search) Button + Multi-Select */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200/60">
          
          {/* Category Tabs (Disabled when face filter is active) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {!activeFaceMatches ? (
              [
                { id: "all", label: t("all") },
                { id: "engagement", label: t("engagement") },
                { id: "wedding", label: t("wedding") },
                { id: "pre-wedding", label: t("prewedding") }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setSelectedImageIdx(null);
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
              ))
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5c0612] bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                <ScanFace className="w-4 h-4 text-[#5c0612]" />
                <span>{t("matchedPhotosOnly")}</span>
              </div>
            )}
          </div>

          {/* Action Tools: Face AI Search Button & Multi-select */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* FACE AI SEARCH BUTTON (Primary Action) */}
            <button
              onClick={() => setIsFaceSearchOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5c0612] to-[#880d1e] hover:from-[#780a19] hover:to-[#9e1024] text-white border border-amber-400/40 text-xs font-mono font-bold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg duration-200 transition-all cursor-pointer scale-100 hover:scale-[1.02]"
              id="btn-open-face-search"
            >
              <ScanFace className="w-4 h-4 text-amber-300" />
              <span>{t("searchByFace")}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </button>

            {/* Multi-select toggle */}
            <button
              onClick={() => {
                setIsSelectionMode(!isSelectionMode);
                if (isSelectionMode) {
                  setSelectedPhotoIds([]);
                }
              }}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-wider flex items-center gap-2 duration-200 transition-all cursor-pointer ${
                isSelectionMode
                  ? "bg-amber-500 border-amber-600 text-[#110103] shadow-md scale-105"
                  : "bg-stone-100 border-stone-300 text-stone-700 hover:bg-stone-200 hover:text-stone-900"
              }`}
              id="btn-toggle-multi-select"
            >
              <Layers className="w-4 h-4" />
              <span>{isSelectionMode ? t("cancelSelect") : t("selectPhotos")}</span>
              {selectedPhotoIds.length > 0 && (
                <span className="bg-[#5c0612] text-amber-300 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                  {selectedPhotoIds.length}
                </span>
              )}
            </button>

            {/* Select All in displayed list button */}
            {isSelectionMode && (
              <button
                onClick={toggleSelectAll}
                className="px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono font-bold flex items-center gap-1.5 duration-200 cursor-pointer"
                id="btn-select-all-filtered"
              >
                {areAllDisplayedSelected ? (
                  <>
                    <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t("deselectAll")}</span>
                  </>
                ) : (
                  <>
                    <Square className="w-3.5 h-3.5 text-stone-600" />
                    <span>{t("selectAll")}</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Responsive Gallery Grid */}
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        id="gallery-masonry-grid"
      >
        <AnimatePresence mode="popLayout">
          {displayedPhotos.map((photo: any, idx: number) => {
            const isSelected = selectedPhotoIds.includes(photo.id);

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 aspect-4/3 bg-stone-100 ${
                  isSelected
                    ? "ring-4 ring-amber-500 border-amber-500 shadow-lg scale-[0.98]"
                    : "border-stone-200 hover:border-amber-500/50 hover:shadow-md"
                }`}
                onClick={() => {
                  if (isSelectionMode) {
                    toggleSelectPhoto(photo.id);
                  } else {
                    setSelectedImageIdx(idx);
                  }
                }}
                id={`gallery-item-${photo.id}`}
              >
                {/* Photo Thumbnail */}
                <img
                  src={photo.src}
                  alt={photo.title[language]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Gallery Watermark */}
                <div className="absolute top-3 left-3 opacity-40 drop-shadow pointer-events-none group-hover:opacity-90 transition-opacity duration-300">
                  <WeddingMonogram className="w-9 h-9" />
                </div>

                {/* Face Match Badge (Displayed when search matches are active) */}
                {activeFaceMatches && photo.confidence && (
                  <div className="absolute top-3 left-3 z-20 bg-[#110103]/90 text-amber-300 border border-amber-400/80 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{photo.confidence}% {t("matchConfidence")}</span>
                  </div>
                )}

                {/* Multi-select Checkbox Badge */}
                {(isSelectionMode || isSelected) && (
                  <button
                    type="button"
                    onClick={(e) => toggleSelectPhoto(photo.id, e)}
                    className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-[#110103]/80 border border-amber-400 text-white shadow-lg transition-transform active:scale-90"
                    id={`checkbox-photo-${photo.id}`}
                    title={isSelected ? "Deselect Photo" : "Select Photo"}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300" />
                    )}
                  </button>
                )}

                {/* Grid Overlay Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4" />

                {/* Photo Details & Actions on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 transition-all flex items-end justify-between gap-2">
                  <div className="space-y-1 min-w-0 pr-2">
                    <span className="text-[9px] uppercase font-mono text-amber-300 font-extrabold tracking-widest bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                      {photo.category}
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-sm tracking-wide text-stone-100 line-clamp-1">
                      {photo.title[language]}
                    </h4>
                  </div>

                  {/* Individual Download & Zoom Icons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) =>
                        handleDownloadSingle(
                          photo.id,
                          photo.title.en.replace(/\s+/g, "_") + ".png",
                          e
                        )
                      }
                      className="p-2 border border-white/30 rounded-full bg-white/15 hover:bg-amber-500 hover:text-black hover:border-amber-400 transition-all text-white shadow-sm"
                      title={t("downloadPhoto")}
                      id={`btn-download-photo-${photo.id}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIdx(idx);
                      }}
                      className="p-2 border border-white/30 rounded-full bg-white/15 hover:bg-white/30 transition-all text-white shadow-sm"
                      title="View Fullscreen"
                      id={`btn-view-fullscreen-${photo.id}`}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Floating Multi-Select Action Bar (Bottom Sticky) */}
      <AnimatePresence>
        {isSelectionMode && selectedPhotoIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#110103]/95 border-2 border-amber-400/80 rounded-2xl shadow-2xl p-3 sm:px-6 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 text-white max-w-xl w-[92%] backdrop-blur-md"
            id="multi-select-floating-toolbar"
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs sm:text-sm font-mono font-bold text-amber-300">
                {selectedPhotoIds.length} {t("selectedCount")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Clear Selection */}
              <button
                onClick={() => setSelectedPhotoIds([])}
                className="px-3 py-1.5 rounded-lg border border-stone-700 bg-stone-900 text-stone-300 hover:text-white text-xs font-mono duration-200 cursor-pointer"
                id="btn-clear-selection"
              >
                {t("deselectAll")}
              </button>

              {/* Download Selected (ZIP) Button */}
              <button
                onClick={handleDownloadSelected}
                disabled={isDownloadingSelected}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-lg duration-200 transition-all cursor-pointer disabled:opacity-50"
                id="btn-download-selected-zip"
              >
                {isDownloadingSelected ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                    <span>{t("downloadingZip")}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{t("downloadSelected")}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Module Dialog */}
      <AnimatePresence>
        {selectedImageIdx !== null && displayedPhotos[selectedImageIdx] && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            id="gallery-lightbox"
          >
            {/* Close Overlay Trigger */}
            <div
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setSelectedImageIdx(null)}
            />

            {/* Top Toolbar Controls */}
            <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
              {/* Direct Download button from lightbox */}
              <button
                onClick={() =>
                  handleDownloadSingle(
                    displayedPhotos[selectedImageIdx].id,
                    displayedPhotos[selectedImageIdx].title.en.replace(/\s+/g, "_") + ".png"
                  )
                }
                className="p-2.5 rounded-full bg-stone-900/90 border border-stone-700 text-amber-300 hover:text-white hover:bg-[#5c0612] duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono px-4 shadow-lg"
                id="lightbox-download-btn"
                title={t("downloadPhoto")}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t("downloadPhoto")}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIdx(null)}
                className="p-2.5 rounded-full bg-stone-900/90 border border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800 duration-200 cursor-pointer shadow-lg"
                id="lightbox-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Counter */}
            <div className="absolute top-5 left-5 z-20 bg-stone-900/90 border border-stone-700 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider">
              {selectedImageIdx + 1} / {displayedPhotos.length}
            </div>

            {/* Prev Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 z-20 p-3 rounded-full bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-amber-300 hover:bg-stone-800 duration-200 cursor-pointer hidden sm:block"
              id="lightbox-prev-btn"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 z-20 p-3 rounded-full bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-amber-300 hover:bg-stone-800 duration-200 cursor-pointer hidden sm:block"
              id="lightbox-next-btn"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Picture Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl max-h-[82vh] relative z-10 space-y-3 pointer-events-auto flex flex-col items-center"
            >
              <img
                src={displayedPhotos[selectedImageIdx].src}
                alt={displayedPhotos[selectedImageIdx].title[language]}
                className="max-w-full max-h-[68vh] rounded-2xl object-contain border border-stone-800 shadow-2xl mx-auto"
                referrerPolicy="no-referrer"
              />

              <div className="text-center text-white space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-amber-400 font-extrabold tracking-widest bg-amber-500/15 px-3 py-0.5 rounded-full border border-amber-500/20 inline-block">
                  {displayedPhotos[selectedImageIdx].category}
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-amber-200">
                  {displayedPhotos[selectedImageIdx].title[language]}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
