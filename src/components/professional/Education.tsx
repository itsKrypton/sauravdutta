import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import Card from "@/components/shared/Card";
import { SECTIONS } from "@/lib/constants";
import type { EducationEntry } from "@/types";

interface EducationProps {
  education?: EducationEntry[];
}

export default function Education({ education }: EducationProps) {
  const entries = education ?? require("@/data/education").education;

  return (
    <AnimatedSection id="education">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title={SECTIONS.education.title} />

        <div className="mx-auto max-w-2xl">
          {entries.map((edu: EducationEntry) => (
            <Card key={edu.id} hover={false}>
              <h3 className="font-heading text-xl font-bold text-text-primary">
                {edu.degree}
              </h3>
              <p className="mt-1 text-accent">{edu.institution}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
                <span>{edu.gpa}</span>
                <span>&middot;</span>
                <span>{edu.location}</span>
                <span>&middot;</span>
                <span>
                  {edu.startDate} &mdash; {edu.endDate}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
