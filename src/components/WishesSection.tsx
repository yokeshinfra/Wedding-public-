import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { GuestWish } from "../types";
import { MessageSquare, Heart, Send, Sparkles, UserCheck, HeartHandshake } from "lucide-react";
import { weddingConfig } from "../config/wedding";

interface RelationOption {
  id: string;
  labelEn: string;
  labelTa: string;
  icon: string;
}

const RELATION_OPTIONS: RelationOption[] = [
  { id: "friend", labelEn: "Friend", labelTa: "நண்பன் / தோழி", icon: "🤝" },
  { id: "work", labelEn: "Workmate", labelTa: "பணித் தோழர்", icon: "💼" },
  { id: "college", labelEn: "College Mate", labelTa: "கல்லூரி தோழர்", icon: "🎓" },
  { id: "school", labelEn: "School Mate", labelTa: "பள்ளி தோழர்", icon: "🏫" },
  { id: "sibling", labelEn: "Brother / Sister", labelTa: "சகோதரன் / சகோதரி", icon: "💖" },
  { id: "relative", labelEn: "Relative", labelTa: "உறவினர்", icon: "👨‍👩‍👧‍👦" },
  { id: "other", labelEn: "Other", labelTa: "மற்றவை", icon: "✨" }
];

export const WishesSection: React.FC = () => {
  const { language, t } = useLanguage();

  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [name, setName] = useState("");
  const [weddingSide, setWeddingSide] = useState<"groom" | "bride">("groom");
  const [selectedCategory, setSelectedCategory] = useState<string>("friend");
  const [relationDetail, setRelationDetail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load and listen for real-time updates from localStorage
  useEffect(() => {
    const loadWishes = () => {
      const saved = localStorage.getItem("wedding_guest_wishes");
      if (saved) {
        try {
          const parsed: GuestWish[] = JSON.parse(saved);
          // Filter out any default mock/seed items if present
          const cleaned = parsed.filter(
            (item) =>
              item.id !== "1" &&
              item.id !== "2" &&
              !item.id.startsWith("wish-seed-") &&
              item.name !== "Senthil & Family" &&
              item.name !== "Sathish Kumar Achari" &&
              item.name !== "Anjali Viswanathan" &&
              item.name !== "Dr. Gopalan Sthapathy"
          );
          setWishes(cleaned);
          if (cleaned.length !== parsed.length) {
            localStorage.setItem("wedding_guest_wishes", JSON.stringify(cleaned));
          }
        } catch (e) {
          console.error("Failed to parse wishes", e);
          setWishes([]);
        }
      } else {
        // Absolutely NO default initial wishes as requested
        setWishes([]);
      }
    };

    loadWishes();

    // Real-time synchronization across browser tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "wedding_guest_wishes") {
        loadWishes();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save wishes helper
  const saveWishesToStorage = (updatedWishes: GuestWish[]) => {
    setWishes(updatedWishes);
    localStorage.setItem("wedding_guest_wishes", JSON.stringify(updatedWishes));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Find category metadata
    const categoryObj = RELATION_OPTIONS.find((opt) => opt.id === selectedCategory) || RELATION_OPTIONS[0];
    const categoryLabel = language === "en" ? categoryObj.labelEn : categoryObj.labelTa;
    const sideLabel =
      weddingSide === "groom"
        ? language === "en" ? "Groom's Side" : "மணமகன் பக்கம்"
        : language === "en" ? "Bride's Side" : "மணமகள் பக்கம்";

    // Format full relationship description
    let fullRelation = `${sideLabel} • ${categoryObj.icon} ${categoryLabel}`;
    if (relationDetail.trim()) {
      fullRelation += ` (${relationDetail.trim()})`;
    }

    const newWish: GuestWish = {
      id: Date.now().toString(),
      name: name.trim(),
      side: weddingSide,
      relation: fullRelation,
      relationCategory: selectedCategory,
      relationDetail: relationDetail.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString(language === "en" ? "en-US" : "ta-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      likes: 0
    };

    const updated = [newWish, ...wishes];
    saveWishesToStorage(updated);

    // Reset form
    setName("");
    setWeddingSide("groom");
    setSelectedCategory("friend");
    setRelationDetail("");
    setMessage("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleLike = (id: string) => {
    const updated = wishes.map((w) => {
      if (w.id === id) {
        return { ...w, likes: (w.likes || 0) + 1 };
      }
      return w;
    });
    saveWishesToStorage(updated);
  };

  const groomName = weddingConfig.couple.groom.name[language];
  const brideName = weddingConfig.couple.bride.name[language];

  return (
    <section id="wishes-section" className="py-20 px-4 bg-stone-900 border-b border-amber-900/30">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase bg-amber-950/60 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === "en" ? "Real-time Blessings" : "நேரடி வாழ்த்துச் சுவரொட்டி"}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-amber-200">
            {t("wishesHeader")}
          </h2>

          <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto">
            {t("wishesSubhead")}
          </p>

          <div className="pt-2">
            <span className="inline-block bg-stone-950 border border-amber-800/40 text-amber-300/90 text-xs px-3.5 py-1 rounded-full font-mono">
              ✨ {wishes.length} {wishes.length === 1 ? "Blessing Received" : "Blessings Received"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Wish Form (5 cols on lg) */}
          <form
            id="wishes-submit-form"
            onSubmit={handleSubmit}
            className="lg:col-span-5 bg-stone-950 border border-amber-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="border-b border-amber-900/40 pb-3">
              <h3 className="font-serif font-bold text-lg text-amber-200 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{language === "en" ? "Leave Your Blessing" : "வாழ்த்துக்களைப் பதிவு செய்க"}</span>
              </h3>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                {t("nameLabel")} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === "en" ? "e.g., Ramesh & Family" : "எ.கா., ரமேஷ் & குடும்பத்தினர்"}
                className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-stone-100 outline-none transition-colors"
              />
            </div>

            {/* Groom or Bride side Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                {language === "en" ? "Wedding Side" : "யார் பக்கம்?"} *
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setWeddingSide("groom")}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                    weddingSide === "groom"
                      ? "bg-amber-600 text-stone-950 border-amber-400 shadow-md"
                      : "bg-stone-900 border-stone-800 text-stone-300 hover:border-amber-500/40"
                  }`}
                >
                  <span className="text-base">🤵</span>
                  <span>
                    {language === "en" ? `Groom (${groomName})` : `மணமகன் (${groomName})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setWeddingSide("bride")}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                    weddingSide === "bride"
                      ? "bg-amber-600 text-stone-950 border-amber-400 shadow-md"
                      : "bg-stone-900 border-stone-800 text-stone-300 hover:border-amber-500/40"
                  }`}
                >
                  <span className="text-base">👰</span>
                  <span>
                    {language === "en" ? `Bride (${brideName})` : `மணமகள் (${brideName})`}
                  </span>
                </button>
              </div>
            </div>

            {/* Relationship Category Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                {language === "en" ? "Relationship Type" : "உறவு வகை"} *
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {RELATION_OPTIONS.map((option) => {
                  const isSelected = selectedCategory === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedCategory(option.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center space-x-2 ${
                        isSelected
                          ? "bg-amber-600 text-stone-950 font-bold border-amber-400 shadow-md scale-[1.02]"
                          : "bg-stone-900 border-stone-800 text-stone-300 hover:border-amber-500/40 hover:text-amber-200"
                      }`}
                    >
                      <span className="text-sm">{option.icon}</span>
                      <span className="truncate">
                        {language === "en" ? option.labelEn : option.labelTa}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specify Details / Custom Relative input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                {selectedCategory === "other"
                  ? language === "en" ? "Write Relationship Details *" : "உறவை விவரிக்கவும் *"
                  : language === "en" ? "Specific Relationship Details (Optional)" : "விவரக் குறிப்பு (விருப்பினால்)"}
              </label>
              <input
                type="text"
                required={selectedCategory === "other"}
                value={relationDetail}
                onChange={(e) => setRelationDetail(e.target.value)}
                placeholder={
                  selectedCategory === "work"
                    ? "e.g., Colleague at TCS / Team Lead"
                    : selectedCategory === "college"
                    ? "e.g., Anna University Classmate"
                    : selectedCategory === "school"
                    ? "e.g., High School Friend"
                    : selectedCategory === "sibling"
                    ? "e.g., Groom's Cousin Sister"
                    : selectedCategory === "relative"
                    ? "e.g., Uncle's Family"
                    : "e.g., Family Friend, Neighbor, Cousin"
                }
                className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-stone-100 outline-none transition-colors"
              />
            </div>

            {/* Blessing Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                {t("messageLabel")} *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  language === "en"
                    ? "Write your hearty wedding blessings and prayers for the couple..."
                    : "யோகேஷ் & பிரியங்கா தம்பதியருக்கு உங்களின் மனமார்ந்த நல்வாழ்த்துக்களை எழுதுங்கள்..."
                }
                className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-stone-100 outline-none resize-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t("submitWish")}</span>
            </button>

            {submitted && (
              <div className="text-center text-xs text-amber-300 font-semibold bg-amber-950/80 p-3 rounded-xl border border-amber-500/40 animate-fade-in flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>
                  {language === "en"
                    ? "✨ Thank you! Your blessings have been published in real-time!"
                    : "✨ மிக்க நன்றி! உங்களின் வாழ்த்துச் செய்தி பதிவிடப்பட்டது!"}
                </span>
              </div>
            )}
          </form>

          {/* Real-time Wish Board (7 cols on lg) */}
          <div id="wishes-display-feed-list" className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-serif font-bold text-lg text-amber-200 flex items-center space-x-2">
                <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{language === "en" ? "Blessings Board" : "வாழ்த்துச் பலகை"}</span>
              </h3>
              <span className="text-xs text-stone-400 font-mono">
                {wishes.length} {wishes.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            {wishes.length === 0 ? (
              /* Clean Empty State - No default mock messages */
              <div className="bg-stone-950/60 border border-dashed border-amber-800/40 rounded-3xl p-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-950/60 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-amber-300">
                    {language === "en" ? "No Blessings Posted Yet" : "வாழ்த்துச் செய்திகள் எதுவும் இல்லை"}
                  </h4>
                  <p className="text-stone-400 text-xs sm:text-sm max-w-sm mx-auto">
                    {language === "en"
                      ? `Be the first guest to post a sacred blessing for ${groomName} & ${brideName}!`
                      : "தம்பதியருக்கு முதன்முதலாக உங்களின் நல்வாழ்த்துகளைப் பதிவு செய்யுங்கள்!"}
                  </p>
                </div>
              </div>
            ) : (
              /* Live List of Guest Wishes */
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-800">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-3 transition-all duration-300 shadow-lg relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-serif font-bold text-amber-200 text-base">
                          {wish.name}
                        </h4>
                        <span className="inline-block mt-1 text-xs text-amber-400/90 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-medium">
                          {wish.relation}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-stone-500 shrink-0">
                        {wish.timestamp}
                      </span>
                    </div>

                    <p className="text-stone-200 text-sm leading-relaxed italic bg-stone-900/60 p-3 rounded-xl border border-stone-800/60">
                      "{wish.message}"
                    </p>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => handleLike(wish.id)}
                        className="flex items-center space-x-1.5 text-stone-400 hover:text-amber-400 transition-colors bg-stone-900 px-3 py-1 rounded-full border border-stone-800"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            (wish.likes || 0) > 0 ? "text-rose-500 fill-rose-500" : ""
                          }`}
                        />
                        <span>{wish.likes || 0}</span>
                      </button>

                      <span className="text-[10px] text-stone-500 font-mono">
                        #Blessing
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
