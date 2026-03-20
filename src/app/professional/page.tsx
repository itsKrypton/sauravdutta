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
import { ROUTES } from "@/lib/constants";
import { projects } from "@/data/projects";
import type { NavConfig } from "@/types";

export const metadata: Metadata = {
  title: "Saurav Dutta | Professional Portfolio",
  description:
    "Frontend engineer building high-performance web applications with Next.js, React, and TypeScript.",
};

const navConfig: NavConfig = {
  showSectionLinks: true,
  sectionLinks: [
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Education", href: "#education" },
  ],
  otherSideLabel: "The Person",
  otherSideHref: ROUTES.personal,
};

export default function ProfessionalPage() {
  return (
    <>
      <Navbar config={navConfig} />

      <main className="min-h-screen bg-bg-primary">
        <Hero />
        <TechStackGrid />
        <ExperienceTimeline />

        {/* Projects */}
        <AnimatedSection id="projects">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              title="Selected Case Studies"
              subtitle="Projects that showcase engineering depth and product thinking."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <CodingAchievements />
        <Education />
        <ContactCTA />
      </main>

      <Footer variant="professional" />
    </>
  );
}
