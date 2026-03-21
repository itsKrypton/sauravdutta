export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  techStack: string[];
  highlights: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: string[];
}

export interface Achievement {
  id: string;
  text: string;
  metric?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  gpa: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface PersonalTile {
  id: string;
  title: string;
  description: string;
  size: "large" | "medium" | "small";
  href?: string;
  bgImage?: string;
  icon?: string;
}

export interface NavConfig {
  showSectionLinks: boolean;
  sectionLinks?: { label: string; href: string }[];
  otherSideLabel: string;
  otherSideHref: string;
}

export interface MusicPost {
  _id: string;
  title?: string;
  caption?: string;
  type: "instagram" | "video" | "image";
  instagramUrl?: string;
  mediaUrl?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  tags?: string[];
  size: "small" | "medium" | "large";
  orderRank?: number;
}
