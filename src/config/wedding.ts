import {
  StoryMilestone,
  EventScheduleItem,
  TraditionalRitual,
  FoodCategory,
  FamilyMember,
  MultilingualText
} from "../types";

/**
 * WEDDING APPLICATION CONFIGURATION
 * 
 * This is the SINGLE SOURCE OF TRUTH for all editable content on the wedding website.
 * Editing any value in this file will automatically update all pages, components,
 * countdown timers, forms, maps, and translation dictionaries.
 */
export const weddingConfig = {
  // General Page Info & SEO Metadata
  metadata: {
    title: {
      en: "Ramesh & Ramya's Wedding Ceremony",
      ta: "ரமேஷ் & ரம்யா திருமண விழா"
    },
    description: {
      en: "A celebration of love, heritage, and family traditions.",
      ta: "அன்பு, பாரம்பரியம் மற்றும் குடும்ப மரபுகளின் உன்னதத் திருவிழா."
    },
    favicon: "/Image/favicon.ico"
  },

  // Bride and Groom Details
  couple: {
    groom: {
      name: { en: "Ramesh", ta: "ரமேஷ்" },
      fullName: { en: "Ramesh Jagannathan", ta: "ரமேஷ் ஜெகந்நாதன்" },
      initial: "R",
      title: { en: "Ramesh, B.E., M.S.", ta: "ரமேஷ், B.E., M.S." },
      details: { 
        en: "S/O Thiru. P. Jagannathan (Master Craftsman) & Smt. J. Rajeshwari", 
        ta: "அருமை மகன்: திரு. P. ஜெகந்நாதன் (சிற்பக் கலைஞர்) & திருமதி. J. ராஜேஸ்வரி" 
      },
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600"
    },
    bride: {
      name: { en: "Ramya", ta: "ரம்யா" },
      fullName: { en: "Ramya Vishwanathan", ta: "ரம்யா விஸ்வநாதன்" },
      initial: "R",
      title: { en: "Ramya, M.Tech.", ta: "ரம்யா, M.Tech." },
      details: { 
        en: "D/O Thiru. K. Vishwanathan (Traditional Gold Designer) & Smt. V. Lakshmi", 
        ta: "அருமை மகள்: திரு. K. விஸ்வநாதன் (பாரம்பரிய ஆபரண வடிவமைப்பாளர்) & திருமதி. V. லட்சுமி" 
      },
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
    }
  },

  // Event Dates & Schedule Target Time
  dates: {
    // Crucial Wedding date for countdown timer calculations
    weddingDateISO: "2026-06-27T07:30:00",
    
    engagementDate: {
      en: "February 8, 2026",
      ta: "பிப்ரவரி 8, 2026"
    },
    receptionDate: {
      en: "September 5, 2026",
      ta: "செப்டம்பர் 5, 2026"
    },
    weddingDateText: {
      en: "September 6, 2026",
      ta: "செப்டம்பர் 6, 2026"
    },
    muhurthamTime: {
      en: "Sunday, Muhurtham: 7:30 AM - 9:00 AM",
      ta: "ஞாயிற்றுக்கிழமை, சுப முகூர்த்தம்: காலை 7:30 - 9:00 மணி"
    }
  },

  // Contact & Coordinator Details
  contacts: {
    coordinators: [
      {
        name: { en: "Jagannathan (Groom's Father)", ta: "ஜெகந்நாதன் (மணமகன் தந்தை)" },
        phone: "+91 94443 90112",
        whatsapp: "https://wa.me/919444390112"
      },
      {
        name: { en: "Vishwanathan (Bride's Father)", ta: "விஸ்வநாதன் (மணமகள் தந்தை)" },
        phone: "+91 91550 21949",
        whatsapp: "https://wa.me/919155021949"
      }
    ],
    generalEmail: "Rameshyokee1@gmail.com",
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com"
    }
  },

  // Venue & Google Maps Links
  venue: {
    name: { en: "Vallakottai murugan temple", ta: "வல்லக்கோட்டை முருகன் கோயில்" },
    address: {
      en: "VWMM+5CF, Vallakkottai, Vallam, Tamil Nadu 602118",
      ta: "VWMM+5CF, வல்லக்கோட்டை, வல்லம், தமிழ்நாடு 602118"
    },
    // Interactive Google Maps Embed URL
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.706710597458!2d79.93062977505028!3d12.882935016816054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f1f69715d0a9%3A0xd93e27f47766ccd2!2sVallakottai%20Murugan%20Temple!5e1!3m2!1sen!2sin!4v1785146865051!5m2!1sen!2sin",
    // Open in Google Maps Direction URL
    mapsDirectionsUrl: "https://maps.app.goo.gl/rtb4fWh6UEkdqjsK8",
    
    landmarks: {
  temple: {
    en: "Vallakottai Murugan Temple",
    ta: "வல்லக்கோட்டை முருகன் கோவில்"
  },
  metro: {
    en: "Nearest Metro: Airport Metro Station (Approx. 22 km away)",
    ta: "அருகிலுள்ள மெட்ரோ: விமானநிலையம் மெட்ரோ நிலையம் (சுமார் 22 கி.மீ)"
  },
  railway: {
    en: "Tambaram Railway Station (Approx. 20 km away) & Chengalpattu Railway Station (Approx. 24 km away)",
    ta: "தாம்பரம் இரயில் நிலையம் (சுமார் 20 கி.மீ) & செங்கல்பட்டு இரயில் நிலையம் (சுமார் 24 கி.மீ)"
  },
  busStand: {
    en: "Sriperumbudur Bus Stand (Approx. 13 km away)",
    ta: "ஸ்ரீபெரும்புதூர் பேருந்து நிலையம் (சுமார் 13 கி.மீ)"
  },
  parking: {
    en: "Parking facilities are available near the temple for Cars and Two-wheelers.",
    ta: "கோவில் அருகில் கார்கள் மற்றும் இருசக்கர வாகனங்களுக்கு பார்க்கிங் வசதி உள்ளது."
  },
  busNumbers: {
  en: "582 (T. Nagar ↔ Vallakottai), 583 / S583 (Tambaram ↔ Sriperumbudur via Vallakottai), 82C (Chengalpattu ↔ Tiruvallur via Vallakottai). Get down at Vallakottai Bus Stop.",
  ta: "582 (டி.நகர் ↔ வல்லக்கோட்டை), 583 / S583 (தாம்பரம் ↔ ஸ்ரீபெரும்புதூர்), 82C (செங்கல்பட்டு ↔ திருவள்ளூர்). வல்லக்கோட்டை பேருந்து நிறுத்தத்தில் இறங்கவும்."
}
}
  },

  // Aesthetic Customizations
  aesthetics: {
    themes: {
      royal: {
        id: "royal",
        name: "Royal Crimson",
        backgroundColor: "#110103",
        textColor: "#fdf8f2"
      },
      ivory: {
        id: "ivory",
        name: "Traditional Ivory",
        backgroundColor: "#fafaf9",
        textColor: "#1c1917"
      }
    },
    fonts: {
      sans: "Inter, sans-serif",
      display: "Playfair Display, serif",
      mono: "JetBrains Mono, monospace"
    },
    // Background music or video links (if needed, otherwise placeholder)
    music: {
      bgMusicUrl: "",
      instrumentalNadaswaram: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder audio stream
    }
  },

  // Visual Assets
  images: {
    heroBg: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=1600",
    monogramFallback: "/monogram.png",
    storyMeeting: "/Image/SM.png",
    storyEngagement: "/Image/SM2.png",
    storyPoojai: "Image/SM3.png",
    storyPreparations: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800",
    qrCodeRSVP: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ais-dev-ahwsgdgxmkowlcjvbpwhoy-89564297253.asia-east1.run.app"
  },

  // Chronological Story milestones
  storyMilestones: [
    {
      id: "story-1",
      title: { en: "Ponnu Paarthal (Traditional Meet)", ta: "பெண் பார்த்தல்" },
      date: { en: "December 14, 2025", ta: "டிசம்பர் 14, 2025" },
      description: {
        en: "The auspicious first meeting of both families. With deep traditional values matching, Ramesh and Ramya exchanged gentle smiles, and a lifetime bond of gold was instantly forged under the blessings of family elders.",
        ta: "இரு குடும்பங்களின் மங்களகரமான முதல் சந்திப்பு. பாரம்பரிய முறைப்படி ரமேஷ் மற்றும் ரம்யா தங்களை ஒருவருக்கொருவர் புரிந்து கொண்டனர். பெரியோர்களின் ஆசீர்வாதத்துடன் பொன்னான பந்தத்திற்கு அடித்தளம் இடப்பட்டது."
      },
      image: "Image/SM.png"
    },
    {
      id: "story-2",
      title: { en: "Nichayathartham (Engagement)", ta: "நிச்சயதார்த்தம்" },
      date: { en: "February 8, 2026", ta: "பிப்ரவரி 8, 2026" },
      description: {
        en: "A grand celebration of commitment. Traditional ring exchange, writing of the Lagnapatrika (wedding decree), and presentation of the auspicious silk sari and gold jewellery specially handcrafted by family elders for the bride-to-be.",
        ta: "மங்கள இசை முழங்க நடைபெற்ற நிச்சயதார்த்த விழா. திருமண பத்திரிக்கை வாசித்தல், மோதிரம் மாற்றுதல் மற்றும் மணமகள் ரம்யாவுக்கு நம் குடும்ப கைவினைஞர்களால் பிரத்யேகமாக வடிவமைக்கப்பட்ட பாரம்பரிய பொன் நகைகள், பட்டுச்சேலை வழங்கி நிச்சயம் செய்யப்பட்டது."
      },
      image: "Image/SM2.png"
    },
    {
      id: "story-3",
      title: { en: "Family Blessings & Ancestor Poojai", ta: "குடும்ப ஆசீர்வாதம் & வழிபாடுகள்" },
      date: { en: "April 12, 2026", ta: "ஏப்ரல் 12, 2026" },
      description: {
        en: "Seeking blessings from clan ancestors (Kula Deivam) and elder artisans. We offered traditional prayers to Lord Vishwakarma, creator of the cosmos, thanking him for weaving our designs and destinies into a beautiful pattern.",
        ta: "குலதெய்வ வழிபாடு மற்றும் முன்னோர்களின் ஆசீர்வாதம் பெறுதல். பிரபஞ்சத்தை படைத்த விஸ்வகர்மாவை வணங்கி, எங்களது வாழ்வை பொன்னான ஒளியுடன் வழிநடத்த குடும்பத்துடனும் உறவுகளுடனும் ஒன்றிணைந்து பிரார்த்தனை செய்தோம்."
      },
      image: "Image/SM3.png"
    },
    {
      id: "story-4",
      title: { en: "Wedding Preparations", ta: "திருமண ஏற்பாடுகள்" },
      date: { en: "May 2026 Onwards", ta: "மே 2026 முதல்" },
      description: {
        en: "From selecting the finest Kanchipuram silk drapes to designing custom-sculpted temple-style jewellery, both families are buzzing with traditional joy, handcrafting every little detail to make this union a masterwork of love.",
        ta: "நேர்த்தியான காஞ்சிபுரம் பட்டுப்புடவைகளைத் தேர்ந்தெடுப்பதில் இருந்து, கைவினைத் தொழில்நுட்பத்தில் கோயில் கலைநயமிக்க பாரம்பரிய நகைகளை ஆக்குவது வரை, திருமணத்தின் ஒவ்வொரு பகுதியையும் அன்பால் வடிவமைத்து வருகிறோம்."
      },
      image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800"
    }
  ] as StoryMilestone[],

  // Wedding Marriage Rituals details
  traditionalRituals: [
    {
      id: "rit-1",
      title: { en: "Ganapathi Poojai", ta: "கணபதி பூஜை" },
      description: {
        en: "The ceremony begins with the worship of Lord Ganesha, the remover of all obstacles.",
        ta: "எந்தவொரு நற்செயலும் தடையின்றி சிறப்பாக நடைபெற, முதல் முழுமுதற் கடவுளான விக்னேஸ்வரரை முறைப்படி வழிபடுதல்."
      },
      meaning: {
        en: "Invoking peace, prosperity, and obstacle-free wedding rituals.",
        ta: "மங்களகரமாக காரியம் கைகூடவும், திருமண சடங்குகள் இனிதே நிறைவேறவும் கணபதியை எழுந்தருளச் செய்தல்."
      },
      image: "/Image/Ganapathi.png"
    },
    {
      id: "rit-2",
      title: { en: "Maappillai Azhaippu", ta: "மாப்பிள்ளை அழைப்பு" },
      description: {
        en: "Grand welcoming of the Groom and his family with drums, traditional music, and lamps.",
        ta: "மணமகனையும் அவர்தம் குடும்பத்தாரையும் மங்கள இசை, பூரண கும்ப மரியாதையுடன் வரவேற்று அழைத்து வருதல்."
      },
      meaning: {
        en: "Respectful and joyful union of the family clans at the venue threshold.",
        ta: "மணமகன் குடும்பத்தினரை கௌரவிக்கும் விதமாகவும், திருமணத்திற்கு மகிழ்ச்சியுடன் வரவழைக்கும் முகமாகவும் அமையும் சடங்கு."
      },
      image: "/Image/Maappillai Azhaippu.png"
    },
    {
      id: "rit-3",
      title: { en: "Kashi Yatra", ta: "காசி யாத்திரை" },
      description: {
        en: "A playful ritual where the groom pretends to leave for Kashi (holy pilgrimage) to seek spiritual knowledge, but is stopped by the bride's father who offers his daughter's hand in marriage.",
        ta: "மணமகன் ஞானம் தேடி காசிக்குச் செல்ல முற்படுவதும், மணமகளின் தந்தை அவரைத் தடுத்து இல்வாழ்க்கையின் பெருமையை கூறி தன் மகளை மணமுடித்துக் தருவதாகக் கூறி அழைத்து வரும் சுவாரசியமான சடங்கு."
      },
      meaning: {
        en: "Signifies the shift from bachelorhood (Brahmacharya) to the noble householder life (Grihastha).",
        ta: "பிரம்மச்சரிய நிலையிலிருந்து அறநெறி சார்ந்த இல்லற வாழ்க்கைக்குள் நுழையும் உன்னத தருணம்."
      },
      image: "Image/Kashi Yatra.png"
    },
    {
      id: "rit-4",
      title: { en: "Oonjal Ceremony (The Swing)", ta: "ஊஞ்சல் சடங்கு" },
      description: {
        en: "The couple is seated on a decorated heavy wooden swing. Women offer blessed milk, step-balls of rice (to ward off the evil eye), and sing traditional chain classics.",
        ta: "அலங்கரிக்கப்பட்ட ஊஞ்சலில் மணமக்கள் அமர, சுமங்கலிப் பெண்கள் பால், பழம் கொடுத்து நலுங்கு செய்து, திருஷ்டி கழித்து, ஊஞ்சல் பாடல்கள் பாடும் நெகிழ்ச்சியான நிகழ்வு."
      },
      meaning: {
        en: "Representing the ups and downs of life that the couple will face together with balance and poise.",
        ta: "வாழ்வில் வரும் இன்ப துன்பங்களை ஊஞ்சல் ஆட்டம் போல சமநிலையுடன் இருவரும் இணைந்து எதிர்கொள்வோம் என்பதன் குறியீடு."
      },
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "rit-5",
      title: { en: "Kanyadhanam", ta: "கன்னியாதானம்" },
      description: {
        en: "The emotional peak of the ceremony where the bride's father places her hand in the groom's, pouring holy water and holding sacred grass.",
        ta: "மணமகளின் தந்தை தாரை வார்த்து, தன் அன்பு மகளை மணமகனின் கைகளில் ஒப்படைக்கும் அதியுன்னதமான உணர்வுப்பூர்வமான சடங்கு."
      },
      meaning: {
        en: "Giving away the daughter to the groom who is treated as a form of Lord Vishnu.",
        ta: "மகளை தர்மநெறி தவறாமல் காப்பார் என்ற நம்பிக்கையில் மணமகனிடம் அர்ப்பணிக்கும் புண்ணிய சடங்கு."
      },
      image: "Image/Kanyadhanam.png"
    },
    {
      id: "rit-6",
      title: { en: "Mangalya Dharanam (Tying the Sacred Gold)", ta: "மாங்கல்ய தாரணம் (தாலி கட்டுதல்)" },
      description: {
        en: "The sacred moment. To the thunderous beats of the Mangala Nadaswaram, the groom ties the golden Mangalyasutra around the bride's neck with three knots under a cascade of flower petals.",
        ta: "கெட்டிமேளம் அதிர்ந்து முழங்க, பெரியோர்களின் ஆசியோடு மணமகள் கழுத்தில் மணமகன் மூன்று முடிச்சுகள் இட்டு மங்கள நாண் பூட்டும் தெய்வீகத் தருணம்."
      },
      meaning: {
        en: "The eternal seal of marriage. In Vishwakarma heritage, the gold Mangalyasutra is designed under special stars to bring divine cosmic balance and long life.",
        ta: "விஸ்வகர்ம பாரம்பரியத்தில், தத்துவரீதியிலும் கலைநயத்திலும் செதுக்கப்பட்ட மாங்கல்யம் தம்பதியரின் ஆன்மாவை இணைத்து தீர்க்க சுமங்கலி பாக்கியம் நல்கும்."
      },
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "rit-7",
      title: { en: "Sapthapadi (Seven Steps)", ta: "சப்தபதி" },
      description: {
        en: "The groom holds the bride's hand and walks seven steps together around the sacrificial holy agni fire, reciting sacred Sanskrit/Tamil verses for a blissful journey.",
        ta: "மணமகள் கையைப் பிடித்துக் கொண்டு, அக்னி பகவானை சாட்சியாக வைத்து ஏழு நன்னெறிப் படிகளை இணைந்து எடுத்து வைக்கும் சடங்கு."
      },
      meaning: {
        en: "The seven steps represent vows of food, strength, wealth, happiness, progeny, seasons, and lifelong friendship.",
        ta: "உனவு, ஆரோக்கியம், வளம், மகிழ்ச்சி, நற்பண்புகள், இல்லற கடமை, மற்றும் மாறாத நட்பு ஆகிய ஏழினையும் உறுதிசெய்யும் ஏழு வாக்குகள்."
      },
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "rit-8",
      title: { en: "Ammi Mithithal", ta: "அம்மி மிதித்தல்" },
      description: {
        en: "The groom leads the bride to tread on a local grinding stone ('Ammi') placed near the sacred fire, pointing to her steadfastness.",
        ta: "மணமகன், மணமகளின் பாதத்தைத் தொட்டு மங்கள அம்மிக்கல்லின் மீது கால் வைக்கும்படி செய்யும் சடங்கு."
      },
      meaning: {
        en: "May the bride's virtue and character be as firm, unshakable, and unbreakable as the granite stone.",
        ta: "குடும்ப வாழ்வில் வரும் இடர்களை எதிர்கொண்டு, அம்மிக்கல்லைப் போல என்றும் உறுதியுடனும் பொறுமையுடனும் நிலைத்திருக்க வேண்டும் என்பதன் தத்துவம்."
      },
      image: "/Image/Ammi.png"
    },
    {
      id: "rit-9",
      title: { en: "Arundhathi Paarthal", ta: "அருந்ததி பார்த்தல்" },
      description: {
        en: "The priest guides the couple outdoors to gaze into the sky and spot the eternal binary stars 'Arundhathi' and 'Vashistha'.",
        ta: "விண்ணில் ஒளிரும் விண்மீன்களான அருந்ததி மற்றும் வசிஷ்டரை வானில் பார்த்து வணங்கி நற்பலன் பெறுதல்."
      },
      meaning: {
        en: "Reflecting on Arundhathi's eternal devotion and mutual cosmic orbit where stars rotate around each other evenly.",
        ta: "தம்பதியினர் ஒருவர் மேல் ஒருவர் கொண்ட மதிப்பு மற்றும் ஒருவருக்குள் ஒருவர் சுழலும் இல்லற சமத்துவத்தின் வானியல் குறியீடு."
      },
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "rit-10",
      title: { en: "Nagavalli Ceremony", ta: "நாகவல்லி சடங்கு" },
      description: {
        en: "An exclusive, intimate Vishwakarma wedding event honoring deities, layout elements, and traditional metallurgy elements.",
        ta: "விஸ்வகர்ம சமூகத்தின் பாரம்பரிய மங்கல சடங்கு. பஞ்சலோக உலோகங்கள் மற்றும் வம்ச வளர்ச்சிக்குரிய தெய்வங்களை வைத்து வழிபாடு செய்தல்."
      },
      meaning: {
        en: "Seeking family design expansion, metal purification, and divine lineage engineering protection.",
        ta: "மண்ணும் பொன்னும் செழித்து வம்சாவளி நீடித்து வாழவும், ஐந்து தொழிலாளர்களின் குடும்பம் மேன்மை பெறவும் செய்யப்படும் சடங்கு."
      },
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "rit-11",
      title: { en: "Second Mangalya Ritual (Nagavalli Tradition)", ta: "இரண்டாம் மாங்கல்ய சடங்கு (நாகவல்லி முறை)" },
      description: {
        en: "Following the traditional Nagavalli poojai, a historic custom of cementing family ties with an additional sacred coin-thread is carried out.",
        ta: "நாகவல்லி பூஜையின் நிறைவாக, பாரம்பரிய வழக்கப்படி முதியவர்களின் ஆசியுடன் மணமகளுக்கு மற்றுமொரு பொற்காசு மங்கள மாண்பு நாண் சூட்டும் கலைநயம் சடங்கு."
      },
      meaning: {
        en: "Worn to invite additional prosperity. Symbolizes a masterfully forged shield of marital peace.",
        ta: "வாழ்வில் மேலதிகமான செல்வ வளங்களை ஈர்க்கவும், தீயவற்றிலிருந்து இல்லறத்தை காக்கும் பொற்கவசமாகவும் திகழ்கிறது."
      },
      image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "rit-12",
      title: { en: "Ashirvadham (Blessings)", ta: "ஆசிர்வாதம்" },
      description: {
        en: "Elders shower the newly wedded couple with yellow holy turmeric rice (Akshadhai), flowers, and cash rewards while bowing down to touch ancestors' feet.",
        ta: "மணமக்கள் பெரியோர்களின் கால்களில் விழுந்து ஆசி பெற, அவர்கள் மீது மஞ்சள் அட்சதை தூவி மலர்தூவி வாழ்த்தும் விழா."
      },
      meaning: {
        en: "To lead a full life with peace, health, progeny, long love, and structural legacy.",
        ta: "பதினாறும் பெற்று பெருவாழ்வு வாழவும் உற்றார் உறவினர் மற்றும் சான்றோர்களின் ஆசியைப் பூரணமாகப் பெறுவதற்கும் உரிய தருணம்."
      },
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
    }
  ] as TraditionalRitual[],

  // Detailed wedding event timelines
  scheduleItems: [
    {
      id: "sch-1",
      time: { en: "5:30 PM - 6:30 PM", ta: "மாலை 5:30 - 6:30" },
      title: { en: "Welcome Ceremony", ta: "வரவேற்பு நிகழ்ச்சி துவக்கம்" },
      description: {
        en: "Welcoming guests with rosewater, elegant sandalwood paste (Santhanam), traditional kalkandu sugar, and panneer mist.",
        ta: "வருகை தரும் விருந்தினர்களை பன்னீர் தெளித்து, சந்தனம், கல்கண்டு வழங்கி பாரம்பரிய முறைப்படி வரவேற்றல்."
      },
      iconName: "Sparkles"
    },
    {
      id: "sch-2",
      time: { en: "6:45 PM Onwards", ta: "மாலை 6:45 மணி முதல்" },
      title: { en: "Couple's Grand Entry", ta: "மணமக்கள் ஜோடியின் கம்பீர வருகை" },
      description: {
        en: "Behold our gorgeous couple making an spectacular entry under royal flower umbrellas and light fixtures.",
        ta: "மங்கள நாதஸ்வர இசை, வண்ண மயமான ஒளிவிளக்குகள் மற்றும் மலர்க்குடை சூழ மணமக்கள் மேடைக்கு எழுந்தருளுதல்."
      },
      iconName: "Heart"
    },
    {
      id: "sch-3",
      time: { en: "7:15 PM - 8:30 PM", ta: "இரவு 7:15 - 8:30" },
      title: { en: "Live Fusion Music & Dj Set", ta: "நேரடி இசை கச்சேரி & டி.ஜே கொண்டாட்டம்" },
      description: {
        en: "A beautiful acoustic live music performance of traditional wedding classics combined with soft modern instruments.",
        ta: "பாரம்பரிய ராகங்களுடன் மெல்லிசையும் கலந்த அருமையான நேரடி சங்கீத இசைவிருந்து மற்றும் கலை நிகழ்ச்சி."
      },
      iconName: "Music"
    },
    {
      id: "sch-4",
      time: { en: "7:00 PM Onwards", ta: "இரவு 7:00 மணி முதல்" },
      title: { en: "Traditional Food Festival (Dinner)", ta: "மங்கள வரவேற்பு விருந்து (இரவு)" },
      description: {
        en: "An ultimate culinary feast featuring fine North Indian delicacies and traditional deep-fried South Indian wedding favorites.",
        ta: "சுவையான வட இந்திய உணவு வகைகளும் உடனுக்குடன் பரிமாறப்படும் மங்களகரமான தென் இந்திய உணவு விருந்து."
      },
      iconName: "Utensils"
    },
    {
      id: "sch-5",
      time: { en: "8:30 PM - 9:30 PM", ta: "இரவு 8:30 - 9:30" },
      title: { en: "Photo Sessions & Blessings", ta: "புகைப்படத்தொகுப்பு & வாழ்த்து மழை" },
      description: {
        en: "Meet the bride and groom, bless them on stage, and capture a beautiful lifetime picture at our luxury flower backdrop.",
        ta: "மணமக்களை மேடையில் சந்தித்து வாழ்த்தி, பிரத்யேக புஷ்ப அலங்கார பின்னணியில் வரலாற்று நினைவுகளை புகைப்படமாக்குதல்."
      },
      iconName: "Camera"
    },
    {
      id: "sch-6",
      time: { en: "Sep 6th, 6:00 AM", ta: "செப் 6, காலை 6:00 மணி" },
      title: { en: "Muhurtham Day Ceremonies", ta: "சுப முகூர்த்த நாள் சடங்குகள் ஆரம்பம்" },
      description: {
        en: "Holy Mangala Vaadhiyam commences along with execution of Ganapathi Homam, Kashi Yatra and Oonjal rituals.",
        ta: "மங்கள இசை ஒலிக்க, கணபதி ஹோமம், காசி யாத்திரை மற்றும் ஊஞ்சல் சடங்குகள் முறைப்படி தொடங்குதல்."
      },
      iconName: "Flame"
    },
    {
      id: "sch-7",
      time: { en: "Sep 6th, 7:30 AM - 9:00 AM", ta: "செப் 6, காலை 7:30 - 9:00" },
      title: { en: "Sacred Muhurtham (Tying the knot)", ta: "சுப முகூர்த்தம் (மாங்கல்ய தாரணம்)" },
      description: {
        en: "The sacred golden thread is tied around the bride's neck under the solar zenith and shower of family blessings.",
        ta: "சூரிய உதய சுபவேளையில் பெரியோர்களின் ஆசீர்வாதத்துடன் கெட்டிமேளம் முழங்க திருமாங்கல்யம் கட்டும் உன்னத நேரம்."
      },
      iconName: "Award"
    },
    {
      id: "sch-8",
      time: { en: "Sep 6th, 11:30 AM", ta: "செப் 6, பகல் 11:30 மணி" },
      title: { en: "Banana Leaf Grand Feast (Lunch)", ta: "பாரம்பரிய வாழை இலை அறுசுவை விருந்து (மதியம்)" },
      description: {
        en: "Devour the grand traditional visual and savory feast with 21 exquisite pure-vegetarian wedding delicacies served on fresh banana leaves.",
        ta: "புதிதாக அறுவடை செய்த பச்சையிலை பழுத்த வாழை இலையில் 21 வகையான சுவையான பாரம்பரிய சைவ கல்யாண சாப்பாடு."
      },
      iconName: "Leaf"
    }
  ] as EventScheduleItem[],

  // Food Festival Menu Lists
  foodMenu: [
    {
      id: "menu-reception",
      title: { en: "Reception Grand Buffet Menu", ta: "வரவேற்பு சிறப்பு பஃபே மெனு" },
      items: [
        {
          id: "rep-1",
          name: { en: "Rose Petal Almond Sherbet", ta: "ரோஸ் இதழ் பாதாம் செர்பத்" },
          description: { en: "Cool organic rose water infused with premium crushed almond slivers and chilled organic milk.", ta: "நல்மண ரோஜா இதழ்கள் பன்னீர் மற்றும் பொடித்த பாதாம் பருப்புகள் கலந்த குளுமையான பாதாம் பால்." },
          isVeg: true,
          tag: { en: "Welcome Drink", ta: "வரவேற்பு பானம்" }
        },
        {
          id: "rep-2",
          name: { en: "Golden Gobi Kempu", ta: "கோல்デン கோபி கெம்பு" },
          description: { en: "Crispy cauliflower florets stir-fried in a rich blend of traditional South Indian street spices and curry leaves.", ta: "கலப்படமில்லாத மசாலாக்கள் மற்றும் கறிவேப்பிலை கொண்டு மொறுமொறுப்பாக வறுத்த காலிபிளவர்." },
          isVeg: true,
          tag: { en: "Starter", ta: "மொறுமொறுப்பானவை" }
        },
        {
          id: "rep-3",
          name: { en: "Artisan Paneer Tikka Malai", ta: "மலாய் பன்னீர் டிக்கா" },
          description: { en: "Succulent cottage cheese cubes marinated in mild yogurt cashew paste and slow grilled in a clay oven.", ta: "முந்திரிப் பருப்பு மற்றும் தயிர் மசாலாவில் ஊற வைத்து தணலில் சுடப்பட்ட மென்மையான பன்னீர்." },
          isVeg: true,
          tag: { en: "Special", ta: "சிறப்பானது" }
        },
        {
          id: "rep-4",
          name: { en: "Mughlai Veg Dum Biryani", ta: "முகலாய் வெஜ் தம் பிரியாணி" },
          description: { en: "Fragrant premium Basmati rice slow cooked in iron handis with farm vegetables and saffron milk.", ta: "தரமான பாசுமதி அரிசி, குங்குமப்பூ வாசனை மற்றும் காய்கறிகள் சேர்த்து பக்குவமாக சமைக்கப்பட்ட பிரியாணி." },
          isVeg: true,
          tag: { en: "Main Course", ta: "பிரதான உணவு" }
        },
        {
          id: "rep-5",
          name: { en: "Chettinad Idiyappam with Coconut Milk", ta: "செட்டிநாடு இடியாப்பம் தேங்காய்ப்பால்" },
          description: { en: "Freshly steamed soft rice string-hoppers served with thick, sweet cardamom-infused coconut milk.", ta: "ஆவியில் வெந்த பஞ்சு போன்ற இடியாப்பம் மற்றும் ஏலக்காய் மணம் வீசும் கெட்டியான தேங்காய்ப்பால்." },
          isVeg: true
        },
        {
          id: "rep-6",
          name: { en: "Live Butter Naan & Kadai Paneer", ta: "வெண்ணெய் நான் & கடாய் பன்னீர்" },
          description: { en: "Warm, hand-stretched clay oven flatbread layered with premium churned butter. Served with slow pepper-bell curry.", ta: "சந்தர்ப்பத்தில் சுடச்சுட தயாரிக்கப்படும் வெண்ணெய் தடவிய நான் மற்றும் குடைமிளகாய் பன்னீர் மசாலா." },
          isVeg: true
        },
        {
          id: "rep-7",
          name: { en: "Warm Elaneer Payasam", ta: "சூடான இளநீர் பாயசம்" },
          description: { en: "A luscious, smooth dessert made of tender coconut meat, fresh coconut milk, and organic palm jaggery.", ta: "செறிவூட்டப்பட்ட தடித்த இளநீர் துண்டுகள், தேங்காய்ப்பால் மற்றும் பனங்கற்கண்டு கொண்டு தயாரிக்கப்படும் தெய்வீகப் பாயசம்." },
          isVeg: true,
          tag: { en: "Dessert", ta: "இனிப்புகள்" }
        },
        {
          id: "rep-8",
          name: { en: "Artisanal Mango Kulfi Sundae", ta: "மாம்பழ குல்ஃபி சண்டே" },
          description: { en: "Creamy hand-churned traditional frozen milk lolly with natural Alphonso mango pulp and saffron strings.", ta: "அல்போன்சா மாம்பழக் கூழ் மற்றும் குங்குமப்பூ சேர்த்து கைமுறையாகத் தயாரிக்கப்பட்ட சுவையான குல்ஃபி ஐஸ்கிரீம்." },
          isVeg: true,
          tag: { en: "Ice Cream", ta: "ஐஸ்கிரீம்" }
        }
      ]
    },
    {
      id: "menu-wedding",
      title: { en: "Traditional 21-Item Banana Leaf Feast", ta: "பாரம்பரிய 21-வகை வாழை இலை கல்யாண விருந்து" },
      items: [
        {
          id: "wed-1",
          name: { en: "Kalyana Sakkarai Pongal", ta: "நெய் சொட்டும் சர்க்கரைப் பொங்கல்" },
          description: { en: "Auspicous sweet rice cooked with fresh harvest rice, cow ghee, golden cashews, and organic Vellore jaggery.", ta: "புது நெல், பச நெய், முந்திரி மற்றும் வெள்ளூர் நாட்டு வெல்லம் சேர்த்து மங்களகரமாக சமைக்கப்பட்ட சர்க்கரைப் பொங்கல்." },
          isVeg: true,
          tag: { en: "Auspicious Start", ta: "மங்கள துவக்கம்" }
        },
        {
          id: "wed-2",
          name: { en: "Madurai Aviyal", ta: "மதுரை அவியல்" },
          description: { en: "A classic rich medley of 9 hand-cut native vegetables steamed and dressed in fresh ground coconut paste, curd, and organic cold-pressed coconut oil.", ta: "நாட்டு காய்கறிகள், தேங்காய் விழுது, தயிர் மற்றும் சுத்தமான தேங்காய் எண்ணெய் கொண்டு தயாரிக்கப்படும் மதுரை அவியல்." },
          isVeg: true
        },
        {
          id: "wed-3",
          name: { en: "Thanjavur Kadamba Sambar", ta: "தஞ்சாவூர் கதம்ப சாம்பார்" },
          description: { en: "Tangy tamarind broth simmered with native drumsticks, yellow lentils, and a custom-roasted artisanal spice blend.", ta: "முருங்கைக்காய், சின்ன வெங்காயம் மற்றும் கைவண்ண மசாலா கொண்டு தயாரிக்கப்படும் தஞ்சாவூர் கதம்ப சாம்பார்." },
          isVeg: true,
          tag: { en: "Signature Main", ta: "முக்கிய உணவு" }
        },
        {
          id: "wed-4",
          name: { en: "Traditional Wedding Rasam", ta: "கல்யாண ரசம்" },
          description: { en: "A digestion-soothing soup of fresh country tomatoes, crushed black pepper, garlic, and fresh hand-plucked coriander.", ta: "நாட்டு தக்காளி, மிளகு, சீரகம், மற்றும் கொத்தமல்லி தழை தூவி தயாரிக்கப்படும் பாரம்பரிய கல்யாண ரசம்." },
          isVeg: true
        },
        {
          id: "wed-5",
          name: { en: "Golden Potato Podimas", ta: "உருளைக்கிழங்கு பொடிமாஸ்" },
          description: { en: "Slow-roasted baby potato cubes spiced with mustard seeds, urad dal, curry leaves, and premium hing.", ta: "கடுகு, உளுத்தம் பருப்பு மற்றும் பெருங்காய மணத்துடன் சுவையாக வறுக்கப்பட்ட உருளைக்கிழங்கு பொரியல்." },
          isVeg: true
        },
        {
          id: "wed-6",
          name: { en: "Chidambaram Kathirikai Gotsu", ta: "சிதம்பரம் கத்திரிக்காய் கொத்சு" },
          description: { en: "Smoked, mashed eggplants cooked in a rich, spicy and tangy tamarind gravy with freshly ground spices.", ta: "நெருப்பில் சுட்டு மசிக்கப்பட்ட கத்திரிக்காய் மற்றும் புளித்தண்ணீர் கொண்டு பக்குவமாகத் தயாரிக்கப்படும் கத்திரிக்காய் கொத்சு." },
          isVeg: true
        },
        {
          id: "wed-7",
          name: { en: "Appalam & Mango Pickle", ta: "அப்பளம் & மாங்காய் ஊறுகாய்" },
          description: { en: "Crispy fried lentil flatbread served alongside instant spicy raw mango pickle prepared on the wedding morning.", ta: "நெய் அப்பளம் மற்றும் கல்யாணத்தன்று காலையில் தயாரிக்கப்படும் காரசாரமான மாங்காய் ஊறுகாய்." },
          isVeg: true
        },
        {
          id: "wed-8",
          name: { en: "Ginger Elixir (Inji Puli)", ta: "இஞ்சி புலி" },
          description: { en: "A medicinal digestive sweet and sour jam of fresh minced ginger, tamarind pulp, and organic jaggery.", ta: "செரிமானத்தை தூண்டும் நற்பதமான இஞ்சி, புளி மற்றும் வெல்லம் சேர்ந்த சுவையான இஞ்சிப்புளி ஜாம்." },
          isVeg: true,
          tag: { en: "Traditional Digest", ta: "பாரம்பரிய செரிமானம்" }
        }
      ]
    }
  ] as FoodCategory[],

  // Gallery Photo Details
  galleryPhotos: [
    {
      id: "gal-1",
      src: "Image/Eng1.png",
      category: "engagement",
      title: { en: "Nichayathartham Ring Exchange", ta: "நிச்சயதார்த்த மோதிரம்" }
    },
    {
      id: "gal-2",
      src: "Image/PreWed.png",
      category: "pre-wedding",
      title: { en: "Pre-Wedding Traditional Shoot", ta: "பாரம்பரிய புகைப்படக் கலை" }
    },
    {
      id: "gal-3",
      src: "Image/Wed.png",
      category: "wedding",
      title: { en: "Kanchipuram Silk Bridal Selection", ta: "காஞ்சிப்பட்டு புடவை தேர்வு" }
    },
    {
      id: "gal-4",
      src: "Image/Eng2.png",
      category: "engagement",
      title: { en: "Elegant Oonjal Setup", ta: "சமர்ப்பிக்கப்பட்ட அலங்கார ஊஞ்சல்" }
    },
    {
      id: "gal-5",
      src: "Image/Wed1.png",
      category: "wedding",
      title: { en: "Temple Jewellery Handcrafting", ta: "பாரம்பரிய ஆபரண வேலைப்பாடு" }
    },
    {
      id: "gal-6",
      src: "Image/PreWed1.png",
      category: "pre-wedding",
      title: { en: "Glow of Sacred Brass Lamps", ta: "மங்கள குத்துவிளக்கின் ஒளி" }
    },
    {
      id: "gal-7",
      src: "/Image/Eng3.png",
      category: "engagement",
      title: { en: "Glow of Sacred Brass Lamps", ta: "மங்கள குத்துவிளக்கின் ஒளி" }
    }
  ],

  // Family tree and details
  familyMembers: [
    {
      id: "fam-1",
      name: { en: "Thiru. P. Jagannathan", ta: "திரு. P. ஜெகந்நாதன்" },
      relation: { en: "Groom's Father | Renowned Temple Sculptor", ta: "மணமகனின் தந்தை | புகழ்மிக்க சிற்பக் கலைஞர்" },
      role: "father",
      image: "Image/Groom dad.png",
      blessing: { en: "Every metal piece has a destiny. Today, I see my son's life perfectly forged into a divine temple shape with Ramya.", ta: "ஒவ்வொரு சிலையும் ஒரு வடிவத்தை தேடும். இன்று என் மகனின் வாழ்க்கை ரம்யாவுடன் இணைந்து ஒரு முழுமையான மங்களக் கோவிலாக வடிவமைந்ததை கண்டு மகிழ்கிறேன்." }
    },
    {
      id: "fam-2",
      name: { en: "Smt. J. Rajeshwari", ta: "திருமதி. J. ராஜேஸ்வரி" },
      relation: { en: "Groom's Mother | Home Maker & Designer", ta: "மணமகனின் தாய் | இல்லத்தரசி & ஆபரண ஆலோசகர்" },
      role: "mother",
      image: "Image/Groom mom.png",
      blessing: { en: "My heart overflows with gold. Welcoming my lovely daughter-in-law Ramya to bless our creative household.", ta: "என் இல்லம் தேடி வரும் லட்சுமிகரமான மருமகள் ரம்யாவை அன்போடு வரவேற்கிறேன். எங்கள் குடும்பம் என்றும் மங்களமாக விளங்கட்டும்." }
    },
    {
      id: "fam-3",
      name: { en: "Thiru. K. Vishwanathan", ta: "திரு. K. விஸ்வநாதன்" },
      relation: { en: "Bride's Father | Veteran Gold Ornament Architect", ta: "மணமகளின் தந்தை | மூத்த தங்க ஆபரண வடிவமைப்பாளர்" },
      role: "father",
      image: "Image/Bride Dad.png",
      blessing: { en: "I have spent my lifetime carving pure gold. Today, I hand over my most precious jewel, my daughter Ramya, to Ramesh.", ta: "வாழ்நாள் முழுவதும் தூய தங்கத்தை செதுக்கிய எனக்கு, என் அன்பு மகள் ரம்யா தான் நான் செய்த பெரும் தவம். அவளை யோகேஷிடம் ஒப்படைப்பதில் பெருமகிழ்ச்சி அடைகிறேன்." }
    },
    {
      id: "fam-4",
      name: { en: "Smt. V. Lakshmi", ta: "திருமதி. V. லட்சுமி" },
      relation: { en: "Bride's Mother | Devotional Singer", ta: "மணமகளின் தாய் | பக்திப் பாடகர்" },
      role: "mother",
      image: "Image/Bride mom.png",
      blessing: { en: "Like a sacred wedding hymn, may your union with Ramesh be melodious, peaceful, and filled with divine warmth.", ta: "மங்களகரமாக ஒலிக்கும் வேத கீதத்தைப் போல, உங்கள் இருவரது வாழ்வும் இன்பத்துடனும் நிம்மதியுடனும் என்றென்றும் ஒலிக்கப் பிரார்த்திக்கிறேன்." }
    },
    {
      id: "fam-5",
      name: { en: "Sivabalan Vishwanathan", ta: "சிவபாலன் விஸ்வநாதன்" },
      relation: { en: "Bride's Brother | Software Architect", ta: "மணமகளின் தம்பி | மென்பொருள் பொறியாளர்" },
      role: "sibling",
      image: "/Image/Bride Bro.png",
      blessing: { en: "Super excited to welcome Ramesh into our family! Best wishes sis and brother-in-law!", ta: "அக்காவுக்கு துணையாக வரும் அத்தானை மகிழ்ச்சியுடன் வரவேற்கிறேன்! இல்லற பயணம் இனிதாகட்டும்!" }
    },
    {
      id: "fam-6",
      name: { en: "Karthikeyan Jagannathan", ta: "கார்திகேயன் ஜெகந்நாதன்" },
      relation: { en: "Groom's Sister | Graphic Designer", ta: "மணமகனின் தம்பி | கிராஃபிக்ஸ் கலைஞர்" },
      role: "sibling",
      image: "/Image/Groom Sis.png",
      blessing: { en: "Bro, you found your perfect jewel! Wishing you and Ramya a gorgeous, colorful canvas of life.", ta: "அண்ணனுக்கு கிடைத்த பொக்கிஷம் அண்ணி! வாழ்வில் என்றும் புதுப் பொலிவுடனும் காதலுடனும் வாழ வாழ்த்துக்கள்!" }
    },
    
  ] as FamilyMember[],

  // Translation Dictionary
  dictionary: {
    en: {
      weddingWebsite: "South Indian Wedding Website",
      weddingPortal: "Ramesh & Ramya's Wedding Ceremony",
      saveTheDate: "Save The Date",
      viewEvents: "View Events",
      rsvpBtn: "RSVP Now",
      locationBtn: "Get Venue Location",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      weddingTitle: "KALYANA MANGALYAM",
      ourStory: "Our Sacred Journey",
      storyDesc: "With local traditions dating back generations, see how our paths crossed and stories intertwined beautifully.",
      traditionalRituals: "Vedic & Vishwakarma Marriage Rituals",
      ritualsDesc: "Each of these symbolic ceremonies is designed under celestial nodes, representing heavy commitment and visual purity.",
      traditionalId: "Tamil Heritage",
      meaningLabel: "Philosophical Meaning",
      eventSchedule: "Wedding Event Schedule",
      scheduleDesc: "Join us in each auspicious hour to toast, dine, and shower blessings upon our newly forged path.",
      foodFestival: "Kalyana Food Festival",
      foodDesc: "Celebrate our union with absolute vegetarian culinary excellence, traditional banana leaf feasts, and rich desert sundaes.",
      receptionTab: "Reception Festivities",
      weddingTab: "Traditional Banana Leaf",
      vegLabel: "Pure Vegetarian",
      gallery: "Precious Moments Gallery",
      galleryDesc: "Glimpses of smiles, custom temple designs, family gatherings, and beautiful pre-wedding frames.",
      all: "All Photos",
      engagement: "Engagement",
      wedding: "Wedding Day",
      prewedding: "Pre-Wedding",
      familySecTitle: "The Loving Families",
      familySecDesc: "Meet our primary anchors: the parents, siblings, and venerated grandparents who forged this beautiful union.",
      brideFamily: "Bride's Family",
      groomFamily: "Groom's Family",
      wishesTitle: "Wishes & Holy Blessings",
      wishesDesc: "Can't join in person or want to leave a beautiful digital note of love? Write your blessings below for the new couple.",
      guestNamePlaceholder: "Your full name",
      guestMobilePlaceholder: "Your mobile number",
      guestMessagePlaceholder: "Write your heartfelt blessing...",
      submitWish: "Send Sacred Blessings",
      successWish: "Vanakkaam! Your beautiful blessing has been saved and displayed successfully.",
      recentWishes: "Recent Blessings & Wishes",
      rsvpTitle: "Register Your RSVP",
      rsvpDesc: "Let us prepare the perfect royal plate and seats. Kindly let us know if you can join our auspicious days.",
      attendReception: "Will you attend the Reception? (Sep 5th Evenings)",
      attendWedding: "Will you attend the Muhurtham & Feast? (Sep 6th Mornings)",
      guestCount: "Number of Guests Joining",
      mealPref: "Meal Preference",
      mealVeg: "Traditional Banana Leaf (Strict Pure Veg)",
      mealNonVeg: "Standard Veg & Non-Veg Multi-Cuisine Mix",
      mealBoth: "Open to Try Both Offerings",
      successRSVP: "RSVP Received! Your attendance count has been logged. We eagerly wait to welcome you with rosewater!",
      venueAndTravel: "Venue Gate & Travel Guide",
      venueAddressLabel: "Mahal Address",
      transitTitle: "Transit & Landmark Connections",
      nearbyLandmarksTitle: "Immediate Landmarks",
      busRoutesTitle: "Bus Travel Options",
      busNumbersLabel: "Available Bus Numbers",
      railStationLabel: "Nearest Major Train Terminals",
      busStandLabel: "Nearest Koyambedu CMBT Stand",
      parkingTitle: "Mahal Parking & Valet Space",
      oneClickNav: "Open in Google Maps",
      footerThankYou: "With the divine blessings of Lord Shiva and family elders. Vanakkam!",
      contactUs: "Coordinator Contacts",
      rightsReserved: "All designs, traditions, and rituals preserved.",
      byLabel: "Yokesh",
      copyrightBy: "Copyright © Yokesh",
      website: "yokeshcv.netlify.app",
      languageSelect: "Language",
      relationBrother: "Brother",
      relationSister: "Sister",
      relationFather: "Father",
      relationMother: "Mother",
      relationGrandpa: "Grandfather",
      relationGrandma: "Grandmother"
    },
    ta: {
      weddingWebsite: "தென்னிந்திய திருமண இணையதளம்",
      weddingPortal: "ரமேஷ் & ரம்யா திருமண விழா",
      saveTheDate: "மங்கள அழைப்பு",
      viewEvents: "நிகழ்ச்சி விபரங்கள்",
      rsvpBtn: "RSVP பதிவு செய்க",
      locationBtn: "விலாசம் & வழித்தடம்",
      days: "நாட்கள்",
      hours: "மணிகள்",
      minutes: "நிமிடங்கள்",
      seconds: "நொடிகள்",
      weddingTitle: "கல்யாண மாங்கல்யம்",
      ourStory: "எங்கள் பொன்னான பயணம் (வரலாறு)",
      storyDesc: "தலைமுறைகள் போற்றும் பாரம்பரியத்துடன், இரு மனங்கள் இணைந்து இல்வாழ்வை நோக்கி அடி எடுத்து வைக்கும் இனிமையான வரலாறு.",
      traditionalRituals: "வேத & விஸ்வகர்ம திருமண சடங்குகள்",
      ritualsDesc: "ஒவ்வொரு இந்து சடங்கின் பின்னாலும் ஆழமான தத்துவங்களும், இல்லற வாழ்க்கையை வழிநடத்தும் அழகிய வழிகாட்டுதல்களும் உள்ளன.",
      traditionalId: "தமிழ் மரபு",
      meaningLabel: "தத்துவ விளக்கம்",
      eventSchedule: "சுப சுபகாரிய அட்டவணை",
      scheduleDesc: "மங்கள நாண் பூட்டி, மங்களகரமாக நடைபெறும் எங்களது ஒவ்வொரு சுப நிகழ்விலும் பங்குபெற்று ஆசிர்வதியுங்கள்.",
      foodFestival: "அறுசுவை கல்யாண விருந்து",
      foodDesc: "நெய் சொட்டும் கல்யாண சர்க்கரைப் பொங்கல் முதல் வாழை இலை அறுசுவை விருந்து வரை, அன்போடு பரிமாறும் உணவுக் கலைக் கொண்டாட்டம்.",
      receptionTab: "வரவேற்பு பஃபே வகைகள்",
      weddingTab: "கல்யாண வாழை இலை விருந்து",
      vegLabel: "சுத்த சைவ உணவு",
      gallery: "மகிழ்ச்சியான புகைப்படங்கள்",
      galleryDesc: "எங்கள் நிச்சயதார்த்தம், குடும்ப விழாக்கள் மற்றும் இனிமையான தருணங்களின் அழகிய புகைப்படக் குவியல்கள்.",
      all: "அனைத்து படங்கள்",
      engagement: "நிச்சயதார்த்தம்",
      wedding: "திருமண நாள்",
      prewedding: "திருமணத்திற்கு முன்",
      familySecTitle: "அன்புக் குடும்பங்கள்",
      familySecDesc: "எங்கள் குடும்பத்தின் தூண்களும், வழிகாட்டிகளுமான அருமைத் பெற்றோர்கள், உடன்பிறப்புகள் மற்றும் ஆசீர்வாதம் வழங்கும் தாத்தா பாட்டி.",
      brideFamily: "மணமகள் குடும்பத்தினர்",
      groomFamily: "மணமகன் குடும்பத்தினர்",
      wishesTitle: "இணைய வழி வாழ்த்துகள் & ஆசிகள்",
      wishesDesc: "திருமணத்திற்கு நேரில் வர இயலாதவர்கள் மற்றும் அன்பை வெளிப்படுத்த விரும்புவோர், தங்கள் இனிய வாழ்த்துகளை இங்கு பதிவு செய்யவும்.",
      guestNamePlaceholder: "தங்கள் முழு பெயர்",
      guestMobilePlaceholder: "தங்கள் கைபேசி எண்",
      guestMessagePlaceholder: "தங்கள் அன்பான வாழ்த்துக்கள்...",
      submitWish: "மங்கள வாழ்த்துகளை சமர்ப்பிக்கவும்",
      successWish: "வணக்கம்! தங்களது அன்பு வாழ்த்துக்கள் வெற்றிகரமாக பதிவு செய்யப்பட்டு இங்கு காட்சிப்படுத்தப்பட்டுள்ளது.",
      recentWishes: "சமீபத்திய வாழ்த்துப் பதிவுகள்",
      rsvpTitle: "விருந்தினர் வருகை பதிவு (RSVP)",
      rsvpDesc: "மங்களகரமாக நடைபெறும் எங்கள் திருமண விழாவிற்கு வருகை தரும் விருந்தினர்களுக்கு உரிய வசதிகளை மேம்படுத்த தங்களின் வருகையை உறுதி செய்யவும்.",
      attendReception: "வரவேற்பு விழாவில் கலந்து கொள்வீர்களா? (செப் 5, மாலை)",
      attendWedding: "முகூர்த்தம் மற்றும் வாழை இலை விருந்தில் கலந்து கொள்வீர்களா? (செப் 6, காலை)",
      guestCount: "வருகை தரும் விருந்தினர்களின் எண்ணிக்கை",
      mealPref: "உணவு விருப்பம்",
      mealVeg: "பாரம்பரிய வாழை இலை கல்யாண சாப்பாடு (சுத்த சைவம்)",
      mealNonVeg: "மல்டி குசின் சைவ மற்றும் அசைவ உணவு வகைகள் (பஃபே)",
      mealBoth: "இரு வகையான உணவுகளையும் விரும்புகிறேன்",
      successRSVP: "வருகை பதிவு செய்யப்பட்டது! உங்களை பன்னீர் தெளித்து, மலர்தூவி அன்புடன் வரவேற்க காத்திருக்கிறோம்!",
      venueAndTravel: "திருமண மண்டப விலாசம் & வழித்தடம்",
      venueAddressLabel: "மஹால் முகவரி",
      transitTitle: "போக்குவரத்து & முக்கிய நிறுத்தங்கள்",
      nearbyLandmarksTitle: "முக்கிய அடையாளங்கள்",
      busRoutesTitle: "பேருந்து வழித்தடம்",
      busNumbersLabel: "பேருந்து எண்கள்",
      railStationLabel: "அருகிலுள்ள முக்கிய இரயில் நிலையங்கள்",
      busStandLabel: "அருகிலுள்ள கோயம்பேடு பேருந்து நிலையம்",
      parkingTitle: "மஹால் வாகன பார்க்கிங் வசதி",
      oneClickNav: "கூகுள் மேப்பில் பார்க்க",
      footerThankYou: "பிரபஞ்ச சிற்பி ஸ்ரீவிஸ்வகர்மாவின் திருவருளுடனும், முன்னோர்களின் ஆசியுடனும். நன்றி! வணக்கம்!",
      contactUs: "தொடர்பு கொள்ள வேண்டிய எண்கள்",
      rightsReserved: "அனைத்து பாரம்பரிய கலை உரிமைகளும் காக்கப்பட்டுள்ளன.",
      byLabel: "பாரம்பரிய கம்மாளர் (விஸ்வகர்மா) குடும்ப கூட்டணி",
      languageSelect: "மொழியைத் தேர்ந்தெடுக்கவும்",
      relationBrother: "தம்பி / சகோதரர்",
      relationSister: "தங்கை / சகோதரி",
      relationFather: "தந்தை",
      relationMother: "தாய்",
      relationGrandpa: "தாத்தா",
      relationGrandma: "பாட்டி"
    }
  }
};
