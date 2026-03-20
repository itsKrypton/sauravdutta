import AnimatedSection from "@/components/shared/AnimatedSection";
import { SITE_CONFIG, SECTIONS } from "@/lib/constants";

export default function ContactCTA() {
  return (
    <AnimatedSection>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="aurora-bg relative overflow-hidden rounded-[2.5rem] border border-border/30 p-16 text-center md:p-32">
          {/* Blurred gradient orbs */}
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent-hover/20 blur-[120px]" />

          <div className="relative z-10">
            <h2 className="font-heading text-5xl font-black tracking-tighter text-text-primary md:text-7xl md:leading-[0.9]">
              {SECTIONS.cta.heading}{" "}
              <span className="text-gradient">{SECTIONS.cta.accent}</span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {SECTIONS.cta.subtitle}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center rounded-full bg-accent px-12 py-5 text-lg font-bold text-white transition-all duration-normal hover:shadow-[0_0_30px_var(--accent-glow-strong)] active:scale-95"
              >
                {SECTIONS.cta.primaryButton}
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border/50 px-12 py-5 text-lg font-bold text-text-primary transition-all duration-normal hover:bg-bg-card/30"
              >
                {SECTIONS.cta.secondaryButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
