import {
  StoryMilestone,
  EventScheduleItem,
  TraditionalRitual,
  FoodCategory,
  FamilyMember,
  GuestWish
} from "./types";
import { weddingConfig } from "./config/wedding";

export const WEDDING_DATE = new Date(weddingConfig.dates.weddingDateISO);

export const HERO_DATA = {
  groom: {
    name: weddingConfig.couple.groom.name,
    title: weddingConfig.couple.groom.title,
    details: weddingConfig.couple.groom.details
  },
  bride: {
    name: weddingConfig.couple.bride.name,
    title: weddingConfig.couple.bride.title,
    details: weddingConfig.couple.bride.details
  },
  dateStr: weddingConfig.dates.weddingDateText,
  muhurthamTime: weddingConfig.dates.muhurthamTime,
  venue: weddingConfig.venue.name
};

export const STORY_MILESTONES: StoryMilestone[] = weddingConfig.storyMilestones;
export const TRADITIONAL_RITUALS: TraditionalRitual[] = weddingConfig.traditionalRituals;
export const SCHEDULE_ITEMS: EventScheduleItem[] = weddingConfig.scheduleItems;
export const FOOD_MENU: FoodCategory[] = weddingConfig.foodMenu;
export const GALLERY_PHOTOS = weddingConfig.galleryPhotos;
export const FAMILY_DATA: FamilyMember[] = weddingConfig.familyMembers;
export const FAMILY_MEMBERS: FamilyMember[] = weddingConfig.familyMembers;
export const LANDMARKS = weddingConfig.venue.landmarks;
export const DICTIONARY = weddingConfig.dictionary;
