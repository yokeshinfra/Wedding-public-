export type Language = "en" | "ta";

export interface MultilingualText {
  en: string;
  ta: string;
}

export interface StoryMilestone {
  id: string;
  title: MultilingualText;
  date: MultilingualText;
  description: MultilingualText;
  image: string;
}

export interface EventScheduleItem {
  id: string;
  time: MultilingualText;
  title: MultilingualText;
  description: MultilingualText;
  iconName: string; // lucide icon identifier
}

export interface TraditionalRitual {
  id: string;
  title: MultilingualText;
  tamilName?: string; // e.g. "கணபதி பூஜை"
  description: MultilingualText;
  meaning: MultilingualText;
  image: string;
}

export interface FoodItem {
  id: string;
  name: MultilingualText;
  description: MultilingualText;
  isVeg: boolean;
  tag?: MultilingualText; // e.g., "Special", "Traditional"
}

export interface FoodCategory {
  id: string;
  title: MultilingualText;
  items: FoodItem[];
}

export interface FamilyMember {
  id: string;
  name: MultilingualText;
  relation: MultilingualText;
  role: "bride" | "groom" | "grandparent" | "parent" | "sibling";
  image?: string;
  blessing?: MultilingualText;
}

export interface GuestWish {
  id: string;
  name: string;
  mobile: string;
  message: string;
  timestamp: string;
}

export interface RSVPData {
  name: string;
  guestsCount: number;
  phone: string;
  attendingReception: boolean;
  attendingWedding: boolean;
  mealPreference: "veg" | "non-veg" | "both";
}
