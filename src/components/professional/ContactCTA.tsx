import AnimatedSection from "@/components/shared/AnimatedSection";
import { SITE_CONFIG, SECTIONS } from "@/lib/constants";

export default function ContactCTA() {
  return (
    <AnimatedSection className="bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          {SECTIONS.cta.heading}{" "}
          <span className="text-accent">{SECTIONS.cta.accent}</span>
        </h2>

        <p className="mx-auto mt-4 max-w-md text-text-secondary">
          {SECTIONS.cta.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity duration-fast hover:opacity-90"
          >
            {SECTIONS.cta.primaryButton}
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-primary transition-colors duration-fast hover:border-accent hover:text-accent"
          >
            {SECTIONS.cta.secondaryButton}
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
