import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/lib/constants";
import type { SocialLink } from "@/types";
import type { SiteSettings } from "@/sanity/fetch";

interface HeroProps {
  socials?: SocialLink[];
  siteSettings?: SiteSettings;
}

export default function Hero({ socials, siteSettings }: HeroProps) {
  const name = siteSettings?.name ?? SITE_CONFIG.name;
  const tagline = siteSettings?.tagline ?? SITE_CONFIG.tagline;

  // Fall back to static import if no props provided
  const socialLinks = socials ?? require("@/data/socials").socials;

  return (
    <AnimatedSection id="hero" className="pt-24 md:pt-32">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 sm:px-6 md:flex-row md:justify-between">
        {/* Text */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            {SITE_CONFIG.currentRole}
          </span>

          <h1 className="mt-3 font-heading text-5xl font-bold tracking-tight text-text-primary md:text-7xl">
            {name}
          </h1>

          <p className="mt-4 max-w-lg text-lg text-text-secondary md:text-xl">
            {tagline}
          </p>

          {/* Status indicator */}
          <div className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Currently at {SITE_CONFIG.currentCompany}
          </div>

          {/* Social links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {socialLinks.map((social: SocialLink) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-text-secondary transition-colors duration-fast hover:border-accent hover:text-accent"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Headshot */}
        <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-border md:h-80 md:w-80">
          <Image
            src="/images/headshot.jpg"
            alt={SITE_CONFIG.name}
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
