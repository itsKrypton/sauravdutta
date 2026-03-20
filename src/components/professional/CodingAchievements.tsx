import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import Card from "@/components/shared/Card";
import { SECTIONS } from "@/lib/constants";
import type { Achievement } from "@/types";

interface CodingAchievementsProps {
  achievements?: Achievement[];
}

export default function CodingAchievements({
  achievements,
}: CodingAchievementsProps) {
  const items = achievements ?? [];

  return (
    <AnimatedSection id="achievements">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={SECTIONS.achievements.title}
          subtitle={SECTIONS.achievements.subtitle}
          label="Benchmarks"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((a: Achievement) => (
            <Card key={a.id}>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg text-accent">&#10003;</span>
                <div>
                  {a.metric && (
                    <p className="text-3xl font-bold text-accent">{a.metric}</p>
                  )}
                  <p className="mt-2 text-text-secondary">{a.text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
