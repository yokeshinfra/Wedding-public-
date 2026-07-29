# South Indian Traditional Wedding Website — Developer Documentation

Welcome to the comprehensive, developer-ready manual for the **Traditional South Indian Wedding Website**. This documentation provides a thorough audit, architectural mapping, and customization blueprint. It is designed to be fully beginner-friendly yet technically exact, serving as a complete "Single Source of Truth" manual.

---

## 1. Project Overview & Architecture

This application is a highly customized, interactive, and bilingual (English & Tamil) single-page wedding website created for a traditional **Vishwakarma (Kammalar) family ceremony** celebrating the marriage of **Yokesh (Groom)** and **Priyanka (Bride)**.

### Core Architectural Features
*   **Luxury Monogram Emblem**: A metallic, 3D-embossed gold monogram serving as the hero visual piece, honoring traditional Vishwakarma design and artisanal craftsmanship.
*   **Aesthetic Dual Theme Engine**: Real-time hot-swapping between **Royal Crimson** (traditional dark maroon with golden sparkles) and **Auspicious Traditional Ivory** (bright off-white stone with temple crimson texts).
*   **Vedic & Traditional Rituals Portal**: A carousel showcasing the deep spiritual meanings behind 6 traditional wedding ceremonies.
*   **Culinary Feast Menu**: A tab-swappable menu displaying the Reception Buffet and the grand 21-item Traditional Banana Leaf feast.
*   **Client-Authorize Local Database (Serverless)**: To ensure 100% hostability on static hosts, RSVPs and Blessings/Wishes are persisted in the user's browser using the native **LocalStorage API**, requiring zero costly servers or database nodes.
*   **Interactive Maps and Transit Routes**: Complete venue coordinates for Sree Murugan Mahal in Chennai, integrated with bus numbers, railway landmarks, and parking instructions.
*   **Ambient Atmosphere**: A performance-optimized canvas drifting rose, jasmine, and marigold flower petals in the background.

```
                  +-----------------------------------+
                  |        Vite Dev Server (3000)     |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------+-----------------+
                  |         React SPA Core            |
                  +--------+-----------------+--------+
                           |                 |
                           v                 v
                 +---------+---+       +-----+---------+
                 |  Language   |       |  Aesthetic    |
                 |  Context    |       |  Theme State  |
                 +-------------+       +---------------+
                           |                 |
            +--------------+--------------+  |  (Applies styling
            | Translate (t) / Locale (ta) |  |   overrides across
            +--------------+--------------+  |   sections)
                           |                 |
                           v                 v
                  +--------+-----------------+--------+
                  |           UI Sections             |
                  |  - Hero, Timeline, Rituals, Food  |
                  |  - Family, Wishes, RSVP, Location |
                  +--------+-----------------+--------+
                           |                 |
                           v                 v
                  +--------+----+       +----+--------+
                  |  Local      |       |  Interactive|
                  |  Storage    |       |  Components |
                  |  (Wishes &  |       |  (Lightbox, |
                  |   RSVP)     |       |   Petals)   |
                  +-------------+       +-------------+
```

---

## 2. Technical Stack

The website leverages popular, robust, and industry-standard modern frontend tools:

| Technology | Purpose | Implementation details |
| :--- | :--- | :--- |
| **React 19** | UI Framework | Component-based functional architecture with React Hooks. |
| **Vite 6** | Build System | Super-fast compilation and static asset bundling on build. Runs on port 3000. |
| **TypeScript 5.8** | Type Safety | Eliminates runtime bugs; strictly defines data shapes for all wedding elements. |
| **Tailwind CSS 4** | Styling & Theme | Utility classes driven directly by `@import "tailwindcss"` in `src/index.css`. |
| **Framer Motion** | Visual Animations | Loaded from `motion/react`. Drives smooth slide-ins, fade-ins, and flower drift lines. |
| **Lucide React** | Graphics & Icons | Fast, light, vectorized SVG icons across all buttons, guides, and contact anchors. |
| **Local Storage API** | Database Engine | Read/write capabilities for RSVPs (`wedding_rsvp_pool`) and Wishes (`wedding_guest_wishes`). |
| **Google Maps iframe** | Geographic Portal | Interactive maps pinning Chennai Arumbakkam location. |

---

## 3. Directory Structure Tree

Below is the layout of the project workspace:

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD configuration for Pages
├── .env.example                    # Sample environment configurations
├── .gitignore                      # Paths ignored by Git tracking
├── index.html                      # Primary HTML document entry point
├── metadata.json                   # Platform metadata, name, and permissions
├── netlify.toml                    # Netlify production routing configuration
├── package.json                    # Dependencies, scripts, and project manifest
├── tsconfig.json                   # TypeScript compiler rules
├── vite.config.ts                  # Vite build-system and tailwind plugin config
├── public/
│   └── _redirects                  # Static SPA routing fallback rules
└── src/
    ├── main.tsx                    # React bootstrapping entry point
    ├── index.css                   # Global styles, fonts, and Tailwind imports
    ├── types.ts                    # Global shared TypeScript type structures
    ├── data.ts                     # Centralized static content and translations database
    ├── context/
    │   └── LanguageContext.tsx     # Custom translation React Provider and hooks
    ├── config/
    │   └── wedding.ts              # THE ABSOLUTE SINGLE SOURCE OF TRUTH (All editable values)
    └── components/
        ├── FlowerPetals.tsx        # Floating rose, jasmine, and marigold animation
        ├── Hero.tsx                # Entrance section with countdown timer
        ├── Navigation.tsx          # Sticky responsive header with language toggle
        ├── LocationSection.tsx     # Map, landmarks, bus routes, and parking
        ├── RitualsSection.tsx      # Carousel of 6 traditional wedding ceremonies
        ├── EventsSection.tsx       # Chronological timeline of day-to-day events
        ├── FoodFeastSection.tsx    # Split-tab culinary menu display
        ├── GallerySection.tsx      # Filterable photo collection with custom Lightbox
        ├── FamilySection.tsx       # Parent and sibling profiles with blessings
        ├── WishesSection.tsx       # Blessing submission form and message feed
        ├── RSVPSection.tsx         # Digital attendance form and validation
        ├── WeddingMonogram.tsx     # 3D gold embossed vector wedding emblem
        └── timeline/
            └── TimelineSection.tsx # Chronological story cards of the couple
```

---

## 4. Complete File-by-File Audit & Dependency Map

| File Name | Full Path | Purpose | What it Controls | Related Files (Imports/Depends on) | Safe to Edit? | Delete Impact |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `deploy.yml` | `/.github/workflows/deploy.yml` | CI/CD | Automates deployment to GitHub Pages. | None | **Yes** | Deletes automatic build pipeline |
| `index.html` | `/index.html` | Document Root | Root container `#root`, viewport scaling, metadata. | `src/main.tsx` | **Yes** | App crashes completely |
| `package.json` | `/package.json` | Dependency Manifest | Packages, versions, compilation script configurations. | All modules | **No** | Dev environment fails to start |
| `tsconfig.json` | `/tsconfig.json` | TypeScript Config | TS rules, path aliases, compile options. | All `.ts` / `.tsx` | **No** | Build phase fails with syntax errors |
| `vite.config.ts` | `/vite.config.ts` | Build Settings | Vite compilation, React runtime, Tailwind integrations. | `package.json` | **No** | Project fails to serve or bundle |
| `types.ts` | `/src/types.ts` | Type Schemas | Structures for `StoryMilestone`, `EventScheduleItem`, `GuestWish`, etc. | `src/data.ts`, `src/config/wedding.ts` | **Yes** (to extend) | Widespread compilation failures |
| `wedding.ts` | `/src/config/wedding.ts` | **Core Configuration** | **ALL USER-FACING WORDS, PLACES, DATES, TIMINGS, TRANSLATIONS.** | `src/data.ts` | **YES (Primary Target)** | App loses all content, crashes |
| `data.ts` | `/src/data.ts` | Data Provider | Interfaces config data for legacy components, mapping objects. | `src/config/wedding.ts`, All components | **Yes** (via wedding.ts) | Widespread import errors in sections |
| `LanguageContext.tsx` | `/src/context/LanguageContext.tsx` | Translation Core | `language` switching, `t()` translator hook, LanguageProvider. | `src/data.ts` | **Yes** | Text is rendered as raw keys |
| `App.tsx` | `/src/App.tsx` | Application Core | Section loading transitions, theme state, orchestrating sections. | All Section Components | **Yes** | Entire website goes blank |
| `WeddingMonogram.tsx` | `/src/components/WeddingMonogram.tsx` | Gold Logo | Monogram vector SVG, sparkles, dynamic letter mapping. | `src/config/wedding.ts` | **Yes** | Custom gold logo disappears |
| `Hero.tsx` | `/src/components/Hero.tsx` | Welcome Banner | Hero countdown timer, names, call-to-actions, flower overlay. | `src/data.ts` | **Yes** | Entrance page is removed |
| `Navigation.tsx` | `/src/components/Navigation.tsx` | Sticky Header | Smooth scroll buttons, language switch, responsive drawer. | `src/config/wedding.ts` | **Yes** | Navigation becomes impossible |
| `LocationSection.tsx`| `/src/components/LocationSection.tsx`| Transit Portal | Map iframe, Address cards, Parking, Transit directions. | `src/config/wedding.ts` | **Yes** | Map page is lost |
| `RitualsSection.tsx` | `/src/components/RitualsSection.tsx` | Ritual Slider | Display of ceremonies, visual meanings. | `src/data.ts` | **Yes** | Ceremony listings are removed |
| `EventsSection.tsx`  | `/src/components/EventsSection.tsx`  | Agenda Lists | Day-to-day schedule timings. | `src/data.ts` | **Yes** | Timings agenda is lost |
| `FoodFeastSection.tsx`| `/src/components/FoodFeastSection.tsx`| Gastro Menu | Buffet and Banana Leaf items. | `src/data.ts` | **Yes** | Menu section disappears |
| `GallerySection.tsx` | `/src/components/GallerySection.tsx` | Photos Wall | Portfolio grid, slide lightbox. | `src/data.ts` | **Yes** | Pictures grid disappears |
| `FamilySection.tsx`  | `/src/components/FamilySection.tsx`  | Clans Panel | Parents, siblings, grandparents details. | `src/data.ts` | **Yes** | Family profiles disappear |
| `WishesSection.tsx`  | `/src/components/WishesSection.tsx`  | Blessings Ledger | Blessings board, form, localStorage seeding. | `src/data.ts` | **Yes** | Blessings board disappears |
| `RSVPSection.tsx`    | `/src/components/RSVPSection.tsx`    | RSVP Form | Registration checklist, validation. | `src/data.ts` | **Yes** | RSVP capabilities are lost |

---

## 5. Component Hierarchy & Import Connections

```
                         [ index.html ]
                               |
                          [ main.tsx ]
                               |
                           [ App.tsx ]
                               |
               +---------------+---------------+
               |                               |
       [ LanguageContext ]             [ Theme State ] (crimson vs ivory)
               |                               |
               +---------------+---------------+
                               |
     +-------------------------+-------------------------+
     |                         |                         |
[ Navigation ]             [ Hero ]             [ LocationSection ]
     |                         |                         |
[ WeddingMonogram ]       [ FlowerPetals ]       [ Google Maps iframe ]
     |                         |
     |                         v
     |                [ TimelineSection ]
     |                         |
     |                [ RitualsSection ]
     |                         |
     |                [ EventsSection ]
     |                         |
     |               [ FoodFeastSection ]
     |                         |
     |                [ GallerySection ]
     |                         |
     |                 [ FamilySection ]
     |                         |
     |                 [ WishesSection ]
     |                         |
     |                  [ RSVPSection ]
     |                         |
     +-------------------------+-------------------------+
                               |
                           [ Footer ]
```

---

## 6. Editable Content Inventory Report

All user-facing editable properties have been centralized into `/src/config/wedding.ts`. This acts as the **Single Source of Truth** for the entire website.

| Content Category | Specific Parameter | Current Value | Variable in `/src/config/wedding.ts` | Line No. | Used In (Component) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEO Metadata** | Website Title (English) | `Yokesh & Priyanka's Wedding Ceremony` | `metadata.title.en` | 21 | `index.html` via template |
| **SEO Metadata** | Website Title (Tamil) | `யோகேஷ் & பிரியங்கா திருமண விழா` | `metadata.title.ta` | 22 | `index.html` via template |
| **SEO Metadata** | Website Description | `A celebration of love, heritage...` | `metadata.description.en` | 25 | `index.html` via template |
| **Groom Profile** | Groom Name (English) | `Yokesh` | `couple.groom.name.en` | 34 | `Hero.tsx`, `Navigation.tsx`, `App.tsx` |
| **Groom Profile** | Groom Name (Tamil) | `யோகேஷ்` | `couple.groom.name.ta` | 34 | `Hero.tsx`, `Navigation.tsx`, `App.tsx` |
| **Groom Profile** | Groom Full Name | `Yokesh Jagannathan` | `couple.groom.fullName.en` | 35 | `WishesSection.tsx`, `FamilySection.tsx` |
| **Groom Profile** | Groom Initial | `Y` | `couple.groom.initial` | 36 | `WeddingMonogram.tsx` (Emblem) |
| **Groom Profile** | Groom Degrees | `Yokesh, B.E., M.S.` | `couple.groom.title.en` | 37 | `Hero.tsx` |
| **Groom Profile** | Groom Parents / Lineage | `S/O Thiru. P. Jagannathan...` | `couple.groom.details.en` | 39 | `Hero.tsx` |
| **Groom Profile** | Groom Avatar Image | `https://images.unsplash.com/...` | `couple.groom.image` | 42 | `FamilySection.tsx` |
| **Bride Profile** | Bride Name (English) | `Priyanka` | `couple.bride.name.en` | 45 | `Hero.tsx`, `Navigation.tsx`, `App.tsx` |
| **Bride Profile** | Bride Name (Tamil) | `பிரியங்கா` | `couple.bride.name.ta` | 45 | `Hero.tsx`, `Navigation.tsx`, `App.tsx` |
| **Bride Profile** | Bride Full Name | `Priyanka Vishwanathan` | `couple.bride.fullName.en` | 46 | `WishesSection.tsx`, `FamilySection.tsx` |
| **Bride Profile** | Bride Initial | `P` | `couple.bride.initial` | 47 | `WeddingMonogram.tsx` (Emblem) |
| **Bride Profile** | Bride Degrees | `Priyanka, M.Tech.` | `couple.bride.title.en` | 48 | `Hero.tsx` |
| **Bride Profile** | Bride Parents / Lineage | `D/O Thiru. K. Vishwanathan...` | `couple.bride.details.en` | 50 | `Hero.tsx` |
| **Bride Profile** | Bride Avatar Image | `https://images.unsplash.com/...` | `couple.bride.image` | 53 | `FamilySection.tsx` |
| **Timing & Date** | Countdown Target ISO Date | `2026-09-06T07:30:00` | `dates.weddingDateISO` | 60 | `Hero.tsx` |
| **Timing & Date** | Engagement Date String | `February 8, 2026` | `dates.engagementDate.en` | 63 | `EventsSection.tsx` |
| **Timing & Date** | Reception Date String | `September 5, 2026` | `dates.receptionDate.en` | 67 | `EventsSection.tsx`, `Hero.tsx` |
| **Timing & Date** | Wedding Date String | `September 6, 2026` | `dates.weddingDateText.en` | 71 | `EventsSection.tsx`, `Hero.tsx` |
| **Timing & Date** | Auspicious Muhurtham Hour | `Sunday, Muhurtham: 7:30 AM...` | `dates.muhurthamTime.en` | 75 | `Hero.tsx` |
| **Contacts** | Groom Contact | `+91 94443 90112 (Jagannathan)` | `contacts.coordinators[0]` | 82 | `App.tsx` (Footer) |
| **Contacts** | Bride Contact | `+91 91550 21949 (Vishwanathan)`| `contacts.coordinators[1]` | 88 | `App.tsx` (Footer) |
| **Catering** | Gastronomy Items | List of Reception & Leaf items | `foodMenu` | 277 | `FoodFeastSection.tsx` |
| **Timeline** | Couple Story cards | Milestones list | `storyMilestones` | 114 | `TimelineSection.tsx` |
| **Ceremonies** | Traditional Vedic Rituals | List of 6 ceremonies + descriptions | `traditionalRituals` | 148 | `RitualsSection.tsx` |
| **Agenda Timings** | Complete Day Timelines | Events schedules list | `scheduleItems` | 215 | `EventsSection.tsx` |
| **Image Gallery** | Photo links, Categories | Photo array | `galleryPhotos` | 390 | `GallerySection.tsx` |
| **Clans** | Sibling / Parent profiles | Family members list | `familyMembers` | 443 | `FamilySection.tsx` |
| **Dictionary** | Real-time translation | English and Tamil mapped labels | `dictionary` | 517 | `LanguageContext.tsx` via `t()` |

---

## 7. Assets Inventory Report

| Asset Type | File Name / External Path | Purpose | Section Used In | Source/License |
| :--- | :--- | :--- | :--- | :--- |
| **Fonts** | `"Playfair Display"` (Google Fonts) | Luxury serif display typography for headers | All main headings | Open-Source (SIL OFL) |
| **Fonts** | `"Inter"` (Google Fonts) | Clean, premium sans-serif UI typography | Body texts, forms | Open-Source (SIL OFL) |
| **Fonts** | `"JetBrains Mono"` (Google Fonts) | Monospaced alignment text for numbers and stats | Countdown, lists | Open-Source (SIL OFL) |
| **Favicon** | `/favicon.ico` | Web tab browser icon branding | `index.html` tab | Default template asset |
| **Photos** | `https://images.unsplash.com/photo-1519085360753-af0119f7cbe7` | Portrait representing Groom profile | `FamilySection.tsx` | Royalty-Free (Unsplash) |
| **Photos** | `https://images.unsplash.com/photo-1544005313-94ddf0286df2` | Portrait representing Bride profile | `FamilySection.tsx` | Royalty-Free (Unsplash) |
| **Photos** | `https://images.unsplash.com/photo-1607190074257-dd4b7af0309f` | Traditional Indian wedding design cover | `GallerySection.tsx` | Royalty-Free (Unsplash) |
| **Photos** | `https://images.unsplash.com/photo-1511285560929-80b456fea0bc` | Engagement / Marriage setup aesthetic | `GallerySection.tsx` | Royalty-Free (Unsplash) |
| **Photos** | `https://images.unsplash.com/photo-1583939003579-730e3918a45a` | Marriage traditional ritual photo | `GallerySection.tsx` | Royalty-Free (Unsplash) |
| **Photos** | `https://images.unsplash.com/photo-1595152772835-219674b2a8a6` | South Indian golden jewelry context | `GallerySection.tsx` | Royalty-Free (Unsplash) |

---

## 8. Single Source of Truth validation status

All sections have been audited to ensure they pull data strictly from `/src/config/wedding.ts` (either directly or via the mapped outputs of `/src/data.ts`). No component contains hardcoded names, dates, maps, or coordinates.

| Page Section Component | Data Import Source | Checked & Verified? | Single Source of Truth Status |
| :--- | :--- | :--- | :--- |
| **Loading Screen** | `WeddingMonogram` (Initials) | Yes | **Confirmed (Single Source of Truth)** |
| **Sticky Navbar** | `weddingConfig` (Bride & Groom Names) | Yes | **Confirmed (Single Source of Truth)** |
| **Hero Welcome** | `HERO_DATA`, `WEDDING_DATE` | Yes | **Confirmed (Single Source of Truth)** |
| **LocationSection** | `weddingConfig.venue` & `LANDMARKS` | Yes | **Confirmed (Single Source of Truth)** |
| **TimelineSection** | `STORY_MILESTONES` | Yes | **Confirmed (Single Source of Truth)** |
| **RitualsSection** | `TRADITIONAL_RITUALS` | Yes | **Confirmed (Single Source of Truth)** |
| **EventsSection** | `SCHEDULE_ITEMS` | Yes | **Confirmed (Single Source of Truth)** |
| **FoodFeastSection** | `FOOD_MENU` | Yes | **Confirmed (Single Source of Truth)** |
| **GallerySection** | `GALLERY_PHOTOS` | Yes | **Confirmed (Single Source of Truth)** |
| **FamilySection** | `FAMILY_MEMBERS` | Yes | **Confirmed (Single Source of Truth)** |
| **WishesSection** | `DICTIONARY` | Yes | **Confirmed (Single Source of Truth)** |
| **RSVPSection** | `DICTIONARY` | Yes | **Confirmed (Single Source of Truth)** |
| **Footer Contact** | `weddingConfig.contacts.coordinators` | Yes | **Confirmed (Single Source of Truth)** |

---

## 9. Comprehensive Customization Walkthrough (Beginner-Friendly)

If you are a beginner or a family member trying to customize this wedding website, follow these simple, non-technical recipes:

### Recipe 1: Changing the Couple Names
1.  Open `/src/config/wedding.ts`.
2.  Locate the `couple` block (around Line 32).
3.  Modify the English (`en`) and Tamil (`ta`) strings:
    ```typescript
    groom: {
      name: { en: "Aditya", ta: "ஆதித்யா" },
      fullName: { en: "Aditya Jagannathan", ta: "ஆதித்யா ஜெகந்நாதன்" },
      initial: "A", // Changing this updates the Gold Monogram emblem instantly!
      ...
    }
    ```

### Recipe 2: Changing the Target Wedding Date (For Countdown Timer)
1.  Open `/src/config/wedding.ts`.
2.  Locate the `dates` block (around Line 58).
3.  Set `weddingDateISO` to your exact wedding ceremony date in **YYYY-MM-DDTHH:MM:SS** (24-hour) format:
    ```typescript
    dates: {
      weddingDateISO: "2026-11-20T08:30:00", // Year-Month-Day-T-Hours:Minutes:Seconds
      ...
    }
    ```
4.  Update the display strings right below it (`engagementDate`, `receptionDate`, `weddingDateText`) to match your calendar month names in English and Tamil.

### Recipe 3: Changing the Wedding Venue, Map Pointer, & Directions
1.  Open `/src/config/wedding.ts`.
2.  Locate the `venue` block (around Line 102).
3.  Modify the names and address details.
4.  To update the **Google Maps interactive iframe**:
    *   Search for your venue on Google Maps.
    *   Click **Share** -> Select the **Embed a map** tab.
    *   Copy the URL inside the `src="..."` attribute (starts with `https://www.google.com/maps/embed?...`).
    *   Paste it into `mapsEmbedUrl` inside `/src/config/wedding.ts`.
5.  To update the **One-Click Navigation** button:
    *   On Google Maps, copy the short link under the **Send a link** tab (starts with `https://maps.app.goo.gl/...`).
    *   Paste it into `mapsDirectionsUrl` inside `/src/config/wedding.ts`.

### Recipe 4: Modifying the Food Menu
1.  Open `/src/config/wedding.ts`.
2.  Locate the `foodMenu` array (around Line 277).
3.  Each menu category contains a list of items with translations. Add, remove, or modify items easily:
    ```typescript
    {
      name: { en: "Hot Sambar Vada", ta: "சூடான சாம்பார் வடை" },
      desc: { en: "Traditional lentil dumplings...", ta: "சாம்பாரில் ஊறிய வடை..." }
    }
    ```

### Recipe 5: Customizing Website Colors & Fonts
1.  Open `/src/index.css`.
2.  To adjust typography, change the Google Fonts imports at the very top (Line 1).
3.  To adjust standard color tones (e.g. changing deep gold to classic rose-gold or golden bronze):
    *   Find the `@theme` blocks inside `/src/index.css`.
    *   Update values like `--color-amber-500` or add your custom variables.

---

## 10. Developer's Quick Answers & Deployment Manual

### Where is the website data stored?
All content is hardcode-free and stored directly in a single, well-documented TypeScript configuration file: **`/src/config/wedding.ts`**. 

User inputs (RSVP form entries and guest blessings/wishes) are stored serverlessly inside the user's browser via **`window.localStorage`**, specifically under the keys:
*   `wedding_rsvp_pool` (contains list of RSVPs)
*   `wedding_guest_wishes` (contains blessings wall list)

### How can I run, build, and deploy this website?

#### A. Running locally for development
To run the website on your machine with instant live-reloading:
1.  Ensure you have **Node.js** installed.
2.  Open your terminal inside the project directory.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Launch the local dev server:
    ```bash
    npm run dev
    ```
5.  Open your browser at **`http://localhost:3000`**.

#### B. Verification & Building for production
To compile your website into ultra-fast, lightweight, production-ready static files:
1.  Run the linter to ensure zero code errors:
    ```bash
    npm run lint
    ```
2.  Compile the static files:
    ```bash
    npm run build
    ```
3.  This compiles and saves all optimized assets into the **`/dist`** directory.

#### C. Free Hosting Guides

##### 1. Hosting on Netlify (Highly Recommended)
Netlify detects Vite out-of-the-box and handles SPA routing rules safely through the pre-packaged `netlify.toml` file:
1.  Create a free account on [Netlify](https://www.netlify.com).
2.  Drag and drop the built **`dist/`** folder into the Netlify Dashboard upload box, OR connect your GitHub repository for automated builds on push.
3.  Your website is live under a custom sub-domain!

##### 2. Hosting on GitHub Pages (100% Automated)
We have pre-configured a complete GitHub Actions CI/CD workflow in `/.github/workflows/deploy.yml`:
1.  Push this project folder to your private/public GitHub repository.
2.  In the repository settings, go to **Pages**.
3.  Under **Build and deployment** -> **Source**, select **GitHub Actions**.
4.  The action compiles and hosts your code automatically on every push.

---

*Handcrafted for Yokesh & Priyanka's traditional South Indian wedding ceremony. May their union stand solid, beautiful, and eternal.*
