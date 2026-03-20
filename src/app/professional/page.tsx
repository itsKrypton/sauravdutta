import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/professional/Hero";
import TechStackGrid from "@/components/professional/TechStackGrid";
import ExperienceTimeline from "@/components/professional/ExperienceTimeline";
import ProjectCard from "@/components/professional/ProjectCard";
import CodingAchievements from "@/components/professional/CodingAchievements";
import Education from "@/components/professional/Education";
import ContactCTA from "@/components/professional/ContactCTA";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { ROUTES, SITE_CONFIG, DOORWAY, NAV_LABELS, SECTIONS } from "@/lib/constants";
import type { NavConfig } from "@/types";
import {
  getExperience,
  getProjects,
  getSkills,
  getAchievements,
  getEducation,
  getSocials,
  getSiteSettings,
} from "@/sanity/fetch";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Professional Portfolio`,
  description: SITE_CONFIG.tagline,
};

const navConfig: NavConfig = {
  showSectionLinks: true,
  sectionLinks: [
    { label: NAV_LABELS.skills, href: "#skills" },
    { label: NAV_LABELS.experience, href: "#experience" },
    { label: NAV_LABELS.projects, href: "#projects" },
    { label: NAV_LABELS.achievements, href: "#achievements" },
    { label: NAV_LABELS.education, href: "#education" },
  ],
  otherSideLabel: DOORWAY.personal.title,
  otherSideHref: ROUTES.personal,
};

export default async function ProfessionalPage() {
  const [experience, projects, skills, achievements, education, socials, siteSettings] =
    await Promise.all([
      getExperience(),
      getProjects(),
      getSkills(),
      getAchievements(),
      getEducation(),
      getSocials(),
      getSiteSettings(),
    ]);

  return (
    <>
      <Navbar config={navConfig} />

      <main className="min-h-screen bg-bg-primary">
        <Hero socials={socials} siteSettings={siteSettings} />
        <TechStackGrid skills={skills} />
        <ExperienceTimeline experience={experience} />

        {/* Projects */}
        <AnimatedSection id="projects">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              title={SECTIONS.projects.title}
              subtitle={SECTIONS.projects.subtitle}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <CodingAchievements achievements={achievements} />
        <Education education={education} />
        <ContactCTA />
      </main>

      <Footer variant="professional" />
    </>
  );
}
