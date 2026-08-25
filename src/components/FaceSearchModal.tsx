import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FaceMatchResult } from "../types";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Upload,
  Sparkles,
  X,
  ScanFace,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye
} from "lucide-react";

interface FaceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatchesFound: (
    matches: FaceMatchResult[],
    userFacePreviewUrl: string,
    backendType: "python_api" | "built_in_engine"
  ) => void;
  defaultPythonApiUrl?: string;
}

export const FaceSearchModal: React.FC<FaceSearchModalProps> = ({
  isOpen,
  onClose,
  onMatchesFound,
  defaultPythonApiUrl = "http://127.0.0.1:5000/search"
}) => {
  const { t, language } = useLanguage();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Background Python Face API Endpoint
  const pythonApiUrl = defaultPythonApiUrl || "http://127.0.0.1:5000/search";

  // Camera video ref and stream ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setIsScanning(false);
      setErrorMessage(null);
    }
  }, [isOpen]);

  // Ensure stream is bound to video element whenever camera becomes active
  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      video.play().catch((err) => {
        console.warn("Video auto-play warning:", err);
      });
    }
  }, [isCameraActive]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  const startCamera = async () => {
    setCameraError(null);
    setImagePreview(null);

    // If getUserMedia is not supported in the current environment
    if (!navigator?.mediaDevices?.getUserMedia) {
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
        return;
      }
      setCameraError(
        language === "en"
          ? "Camera is not directly accessible in this browser frame. Please use the button below to snap or upload your selfie."
          : "இந்த உலாவியில் நேரடி கேமரா அணுகல் ஆதரிக்கப்படவில்லை. 'செல்ஃபி எடுக்கவும்' அல்லது படத்தைப் பதிவேற்றவும்."
      );
      return;
    }

    try {
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 720 },
            height: { ideal: 720 }
          },
          audio: false
        });
      } catch (constraintErr) {
        console.warn("Front camera constraint fallback:", constraintErr);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      if (stream) {
        streamRef.current = stream;
        setIsCameraActive(true);

        // Bind immediately if element is already available
        setTimeout(() => {
          if (videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
            videoRef.current.play().catch((e) => console.warn("Video play start:", e));
          }
        }, 80);
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setIsCameraActive(false);

      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraError(
          language === "en"
            ? "Camera permission was blocked. Please tap the camera/lock icon in your browser address bar to allow access, or use the camera shutter button below."
            : "கேமரா அனுமதி மறுக்கப்பட்டுள்ளது. தயவுசெய்து உலாவி அமைப்புகளில் கேமராவை அனுமதிக்கவும் அல்லது கீழே உள்ள பொத்தானைப் பயன்படுத்தவும்."
        );
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setCameraError(
          language === "en"
            ? "No active camera found. Please choose or upload a photo from your gallery."
            : "கேமரா சாதனம் கிடைக்கவில்லை. உங்கள் புகைப்படத்தை பதிவேற்றவும்."
        );
      } else {
        setCameraError(
          language === "en"
            ? "Could not start live camera preview. You can snap a photo directly using the camera button below."
            : "கேமராவைத் தொடங்க முடியவில்லை. கீழே உள்ள கேமரா பொத்தானைப் பயன்படுத்தி படம் எடுக்கலாம்."
        );
      }
    }
  };

  const captureCameraPhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const canvas = document.createElement("canvas");
      const width = video.videoWidth || video.clientWidth || 640;
      const height = video.videoHeight || video.clientHeight || 640;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Draw the current video frame
        ctx.drawImage(video, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        setImagePreview(dataUrl);
        stopCamera();
      }
    } catch (err) {
      console.error("Capture photo error:", err);
      setErrorMessage(
        language === "en"
          ? "Failed to capture snapshot. Please try again or upload a photo."
          : "படம் எடுப்பதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage(language === "en" ? "Please select a valid image file." : "சரியான படக் கோப்பைத் தேர்ந்தெடுக்கவும்.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
        setErrorMessage(null);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage(language === "en" ? "Please drop a valid image file." : "சரியான படக் கோப்பைத் தேர்ந்தெடுக்கவும்.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
        setErrorMessage(null);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  // Perform Face Search API Call
  const handlePerformFaceSearch = async () => {
    if (!imagePreview) {
      setErrorMessage(
        language === "en"
          ? "Please upload or snap a face selfie first."
          : "முதலில் ஒரு செல்ஃபியைப் பதிவேற்றவும்."
      );
      return;
    }

    setIsScanning(true);
    setErrorMessage(null);

    try {
      // Convert base64 preview to Blob
      const response = await fetch(imagePreview);
      const blob = await response.blob();

      // Create multipart/form-data
      const formData = new FormData();

      // IMPORTANT: Flask expects "photo"
      formData.append(
        "photo",
        blob,
        "face-search.jpg"
      );

      // Direct Python Flask API
      const apiResponse = await fetch(
        pythonApiUrl.trim() || "http://127.0.0.1:5000/search",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await apiResponse.json();

      console.log("Python Face API Response:", data);

      if (!apiResponse.ok || !data.success) {
        throw new Error(
          data.error ||
          data.message ||
          "Face search failed"
        );
      }

      if (!data.matches || data.matches.length === 0) {
        setErrorMessage(
          language === "en"
            ? "No matching photos found."
            : "பொருந்தும் புகைப்படங்கள் கிடைக்கவில்லை."
        );

        setIsScanning(false);
        return;
      }

      // Python returns relative URLs.
      // Convert them to full Python API URLs.
      const apiBase = (
        pythonApiUrl.trim() ||
        "http://127.0.0.1:5000/search"
      ).replace(/\/search\/?$/, "");

      const matches = data.matches.map((match: any) => ({
        ...match,

        preview_url:
          match.preview_url?.startsWith("http")
            ? match.preview_url
            : `${apiBase}${match.preview_url}`,

        download_url:
          match.download_url?.startsWith("http")
            ? match.download_url
            : `${apiBase}${match.download_url}`
      }));

      onMatchesFound(
        matches,
        imagePreview,
        "python_api"
      );

      onClose();

    } catch (err: any) {

      console.error(
        "Face search error:",
        err
      );

      setErrorMessage(
        err.message ||
        (
          language === "en"
            ? "Could not connect to Face Search AI."
            : "Face Search AI-க்கு connect செய்ய முடியவில்லை."
        )
      );

    } finally {

      setIsScanning(false);

    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      id="face-search-modal-container"
    >
      <div
        className="fixed inset-0"
        onClick={() => {
          if (!isScanning) onClose();
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-xl bg-white rounded-3xl border border-amber-300/60 shadow-2xl overflow-hidden my-6 text-stone-900"
        id="face-search-dialog"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#5c0612] via-[#780a19] to-[#5c0612] px-6 py-5 text-white flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300">
              <ScanFace className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-200">
                {t("faceSearchTitle")}
              </h3>
              <p className="text-xs text-stone-200 font-sans">
                {language === "en"
                  ? "AI Face Recognition & Matching"
                  : "முக அறிதல் மற்றும் புகைப்படத் தேர்வு"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isScanning}
            className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 duration-200 cursor-pointer disabled:opacity-40"
            id="close-face-search-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-center max-w-md mx-auto">
            {t("faceSearchDesc")}
          </p>

          {/* Upload or Camera Capture Box */}
          <div className="space-y-4">
            {isCameraActive ? (
              /* Live Camera Viewfinder */
              <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-amber-500 shadow-inner flex flex-col items-center justify-center min-h-[280px]">
                <video
                  ref={(el) => {
                    videoRef.current = el;
                    if (el && streamRef.current && el.srcObject !== streamRef.current) {
                      el.srcObject = streamRef.current;
                      el.play().catch(() => {});
                    }
                  }}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover max-h-[300px]"
                />
                
                {/* Face Target Guide Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-56 rounded-[45%] border-2 border-dashed border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center">
                    <span className="text-[10px] uppercase font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded">
                      {language === "en" ? "Align Face" : "முகத்தை மையப்படுத்தவும்"}
                    </span>
                  </div>
                </div>

                {/* Camera Trigger Buttons */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 z-10">
                  <button
                    onClick={stopCamera}
                    className="px-3.5 py-1.5 rounded-full bg-stone-900/80 text-white text-xs font-mono border border-stone-700 hover:bg-stone-800"
                  >
                    {language === "en" ? "Cancel" : "ரத்து"}
                  </button>
                  <button
                    onClick={captureCameraPhoto}
                    className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-amber-500/40 cursor-pointer scale-105 transition-transform"
                    id="btn-snap-camera-photo"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{language === "en" ? "Take Snapshot" : "படம் எடு"}</span>
                  </button>
                </div>
              </div>
            ) : imagePreview ? (
              /* Selected Image Preview with Scanner Animation when active */
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400 bg-stone-900 flex flex-col items-center justify-center p-3">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={imagePreview}
                    alt="Query Face"
                    className="w-full h-full object-cover"
                  />

                  {/* Scanning Laser Animation Bar */}
                  {isScanning && (
                    <motion.div
                      initial={{ top: "0%" }}
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-amber-400 shadow-[0_0_12px_#fbbf24] z-20"
                    />
                  )}
                </div>

                {/* Action Buttons to Retake or Change */}
                {!isScanning && (
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setErrorMessage(null);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-200 text-xs font-mono hover:bg-stone-700 flex items-center gap-1.5 cursor-pointer"
                      id="btn-retake-face"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "Change Photo" : "மாற்றவும்"}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Drag & Drop Upload Zone */
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-3xl p-8 text-center bg-stone-50/80 hover:bg-amber-50/40 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center gap-3 group"
                id="face-upload-dropzone"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
                  <Upload className="w-7 h-7 text-[#5c0612]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
                    {t("dragDropFace")}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 font-sans">
                    Supports JPG, PNG, WEBP files
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#5c0612] hover:bg-[#780a19] text-white text-xs font-mono font-bold tracking-wide transition-colors cursor-pointer"
                  >
                    {t("uploadSelfie")}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera();
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 text-stone-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    id="btn-open-camera"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-700" />
                    <span>{t("takeSelfie")}</span>
                  </button>
                </div>

                {/* Standard File Upload Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Mobile Camera Direct Capture Input */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Camera Error Message with Direct Action */}
          {cameraError && (
            <div className="p-3.5 bg-amber-50 border border-amber-300 text-stone-800 rounded-2xl text-xs space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-sans">{cameraError}</span>
              </div>
              <div className="flex items-center gap-2 pl-6 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-[#5c0612] hover:bg-[#780a19] text-white rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors"
                >
                  {language === "en" ? "Upload Photo from Device" : "சாதனத்திலிருந்து படத்தைப் பதிவேற்றவும்"}
                </button>
              </div>
            </div>
          )}

          {/* General Search Error */}
          {errorMessage && (
            <div className="p-3.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Search Button */}
          <div className="pt-2">
            <button
              onClick={handlePerformFaceSearch}
              disabled={isScanning || !imagePreview}
              className="w-full py-3.5 rounded-2xl bg-[#5c0612] hover:bg-[#780a19] text-white font-serif font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              id="btn-execute-face-search"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
                  <span>{t("searchingFaces")}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>
                    {language === "en" ? "Search Album For My Face" : "என் முகத்துடன் உள்ள படங்களை தேடு"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
