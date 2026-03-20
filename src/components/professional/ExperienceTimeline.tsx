import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { SECTIONS } from "@/lib/constants";
import type { ExperienceEntry } from "@/types";

interface ExperienceTimelineProps {
  experience?: ExperienceEntry[];
}

export default function ExperienceTimeline({
  experience,
}: ExperienceTimelineProps) {
  const entries = experience ?? [];

  return (
    <AnimatedSection id="experience">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={SECTIONS.experience.title}
          subtitle={SECTIONS.experience.subtitle}
          accentWord="Evolution"
        />

        <div className="relative ml-4 border-l-2 border-border pl-8 md:ml-8">
          {entries.map((entry: ExperienceEntry) => (
            <div key={entry.id} className="relative mb-12 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute -left-[calc(2rem+7px)] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg-primary" />

              {/* Date */}
              <p className="text-sm text-text-secondary">
                {entry.startDate} &mdash; {entry.endDate}
              </p>

              {/* Role */}
              <h3 className="mt-1 font-heading text-xl font-bold text-text-primary">
                {entry.role}
              </h3>

              {/* Company & location */}
              <div className="mt-0.5 flex items-center gap-2">
                {(entry as any).companyLogoUrl && (
                  <Image
                    src={(entry as any).companyLogoUrl}
                    alt={entry.company}
                    width={24}
                    height={24}
                    className="rounded object-contain"
                  />
                )}
                <p>
                  <span className="text-accent">{entry.company}</span>
                  <span className="text-text-secondary">
                    {" "}
                    &middot; {entry.location}
                  </span>
                </p>
              </div>

              {/* Highlights */}
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
                {entry.highlights.map((h: string, i: number) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
