import { client } from "./client";
import * as queries from "./queries";

// Static fallbacks
import { experience as staticExperience } from "@/data/experience";
import { projects as staticProjects } from "@/data/projects";
import { skills as staticSkills } from "@/data/skills";
import { achievements as staticAchievements } from "@/data/achievements";
import { education as staticEducation } from "@/data/education";
import { personalTiles as staticPersonalTiles } from "@/data/personal-tiles";
import { socials as staticSocials } from "@/data/socials";
import { SITE_CONFIG } from "@/lib/constants";

import type {
  ExperienceEntry,
  Project,
  SkillCategory,
  Achievement,
  EducationEntry,
  PersonalTile,
  SocialLink,
} from "@/types";

export async function getExperience(): Promise<ExperienceEntry[]> {
  try {
    const data = await client.fetch(queries.experienceQuery);
    return data?.length ? data : staticExperience;
  } catch {
    return staticExperience;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch(queries.projectsQuery);
    return data?.length ? data : staticProjects;
  } catch {
    return staticProjects;
  }
}

export async function getSkills(): Promise<SkillCategory[]> {
  try {
    const data = await client.fetch(queries.skillsQuery);
    return data?.length ? data : staticSkills;
  } catch {
    return staticSkills;
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const data = await client.fetch(queries.achievementsQuery);
    return data?.length ? data : staticAchievements;
  } catch {
    return staticAchievements;
  }
}

export async function getEducation(): Promise<EducationEntry[]> {
  try {
    const data = await client.fetch(queries.educationQuery);
    return data?.length ? data : staticEducation;
  } catch {
    return staticEducation;
  }
}

export async function getPersonalTiles(): Promise<PersonalTile[]> {
  try {
    const data = await client.fetch(queries.personalTilesQuery);
    return data?.length ? data : staticPersonalTiles;
  } catch {
    return staticPersonalTiles;
  }
}

export async function getSocials(): Promise<SocialLink[]> {
  try {
    const data = await client.fetch(queries.socialsQuery);
    return data?.length ? data : staticSocials;
  } catch {
    return staticSocials;
  }
}

export interface SiteSettings {
  name: string;
  title: string;
  tagline: string;
  email: string;
  domain: string;
  headshot?: any;
  casualPhoto?: any;
}

const staticSiteSettings: SiteSettings = {
  name: SITE_CONFIG.name,
  title: SITE_CONFIG.title,
  tagline: SITE_CONFIG.tagline,
  email: SITE_CONFIG.email,
  domain: SITE_CONFIG.domain,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await client.fetch(queries.siteSettingsQuery);
    return data ?? staticSiteSettings;
  } catch {
    return staticSiteSettings;
  }
}
