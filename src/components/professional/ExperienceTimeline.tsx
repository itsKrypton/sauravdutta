import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
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
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* Left column — section title */}
          <div className="lg:w-1/3">
            <h2 className="font-heading text-5xl font-black tracking-tighter text-text-primary">
              Career <br />
              <span className="text-gradient">Evolution.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-text-secondary">
              {SECTIONS.experience.subtitle}
            </p>
          </div>

          {/* Right column — timeline */}
          <div className="flex-1 space-y-12">
            {entries.map((entry: ExperienceEntry, idx: number) => (
              <div
                key={entry.id}
                className="group relative border-l border-border/50 pb-12 pl-10 last:pb-0"
              >
                {/* Timeline dot */}
                {idx === 0 ? (
                  <div className="absolute -left-[6px] top-0 h-3 w-3 rounded-full bg-accent shadow-[0_0_15px_var(--accent-glow-strong)]" />
                ) : (
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full border-2 border-border bg-bg-primary" />
                )}

                {/* Date */}
                <span className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-accent">
                  {entry.startDate} &mdash; {entry.endDate}
                </span>

                {/* Role */}
                <h3 className="text-2xl font-bold text-text-primary transition-colors group-hover:text-accent">
                  {entry.role}
                </h3>

                {/* Company & location */}
                <div className="mt-1 flex items-center gap-2">
                  {(entry as any).companyLogoUrl && (
                    <Image
                      src={(entry as any).companyLogoUrl}
                      alt={entry.company}
                      width={24}
                      height={24}
                      className="rounded object-contain"
                    />
                  )}
                  <p className="text-sm font-medium text-text-secondary">
                    {entry.company} &middot; {entry.location}
                  </p>
                </div>

                {/* Highlights with accent arrow prefix */}
                <ul className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-text-secondary">
                  {entry.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1 text-accent">&#9657;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
