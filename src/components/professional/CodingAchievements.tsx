import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import Card from "@/components/shared/Card";
import { achievements } from "@/data/achievements";
import { education } from "@/data/education";

export default function CodingAchievements() {
  return (
    <>
      {/* Achievements */}
      <AnimatedSection id="achievements">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            title="Achievements"
            subtitle="Competitive programming milestones and recognitions."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {achievements.map((a) => (
              <Card key={a.id}>
                {a.metric && (
                  <p className="text-3xl font-bold text-accent">{a.metric}</p>
                )}
                <p className="mt-2 text-text-secondary">{a.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Education */}
      <AnimatedSection id="education">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading title="Education" />

          <div className="mx-auto max-w-2xl">
            {education.map((edu) => (
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
    </>
  );
}
