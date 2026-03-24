import { client } from "./client";
import * as queries from "./queries";
import { SITE_CONFIG } from "@/lib/constants";

import type {
  ExperienceEntry,
  Project,
  SkillCategory,
  Achievement,
  EducationEntry,
  PersonalTile,
  SocialLink,
  MusicPost,
} from "@/types";

const revalidateOpts = { next: { revalidate: 60 } };

export async function getExperience(): Promise<ExperienceEntry[]> {
  try {
    const data = await client.fetch(queries.experienceQuery, {}, revalidateOpts);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch(queries.projectsQuery, {}, revalidateOpts);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}

export async function getSkills(): Promise<SkillCategory[]> {
  try {
    const data = await client.fetch(queries.skillsQuery, {}, revalidateOpts);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const data = await client.fetch(queries.achievementsQuery, {}, revalidateOpts);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}

export async function getEducation(): Promise<EducationEntry[]> {
  try {
    const data = await client.fetch(queries.educationQuery, {}, revalidateOpts);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}

export async function getPersonalTiles(): Promise<PersonalTile[]> {
  try {
    const data = await client.fetch(queries.personalTilesQuery, {}, revalidateOpts);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}

export async function getSocials(): Promise<SocialLink[]> {
  try {
    const data = await client.fetch(queries.socialsQuery, {}, revalidateOpts);
    return data?.length ? data : [];
  } catch {
    return [];
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
    const data = await client.fetch(queries.siteSettingsQuery, {}, revalidateOpts);
    return data ?? staticSiteSettings;
  } catch {
    return staticSiteSettings;
  }
}

export async function getMusicPosts(): Promise<MusicPost[]> {
  try {
    const data = await client.fetch(queries.musicPostsQuery, {}, revalidateOpts);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}
