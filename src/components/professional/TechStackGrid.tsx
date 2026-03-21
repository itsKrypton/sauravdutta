import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { SECTIONS } from "@/lib/constants";
import type { SkillCategory } from "@/types";

interface TechStackGridProps {
  skills?: SkillCategory[];
}

export default function TechStackGrid({ skills }: TechStackGridProps) {
  const categories = skills ?? [];

  return (
    <AnimatedSection id="skills">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title={SECTIONS.skills.title} label="Tech Stack" />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-5">
          {categories.map((category: SkillCategory) => (
            <div
              key={category.id}
              className="glass-card group rounded-2xl p-8 transition-all duration-normal hover:shadow-[0_0_30px_var(--accent-glow)]"
            >
              {/* Icon square */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <span className="text-lg font-bold text-accent">
                  {category.name.charAt(0)}
                </span>
              </div>
              <h3 className="mb-3 font-heading text-base font-bold text-text-primary">
                {category.name}
              </h3>
              <p className="text-[11px] leading-relaxed text-text-secondary">
                {category.items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
