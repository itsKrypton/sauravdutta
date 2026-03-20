import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import Card from "@/components/shared/Card";
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
        <SectionHeading
          title={SECTIONS.skills.title}
          label="TECHNICAL PROFICIENCY"
          accentWord="Proficiency"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category: SkillCategory) => (
            <Card key={category.id} accentBorder>
              <h3 className="mb-4 font-heading text-lg font-semibold text-accent">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item: string) => (
                  <span
                    key={item}
                    className="rounded-md bg-bg-secondary px-3 py-1 text-sm text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
