import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import Card from "@/components/shared/Card";
import { achievements } from "@/data/achievements";

export default function CodingAchievements() {
  return (
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
  );
}
