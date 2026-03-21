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
  // Split name into first and last for accent styling
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  // Fall back to static import if no props provided
  const socialLinks = socials ?? [];

  return (
    <AnimatedSection id="hero" className="pt-24 md:pt-32">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 sm:px-6 md:flex-row md:justify-between">
        {/* Text */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {/* Badge-style role indicator */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
              {SITE_CONFIG.currentRole}
            </span>
          </div>

          <h1 className="mt-6 font-heading text-6xl font-black tracking-tighter text-text-primary md:text-8xl md:leading-[0.85]">
            {firstName}
            <br />
            <span className="text-gradient">{lastName}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
            Building high-performance frontend architectures with{" "}
            <span className="font-medium text-text-primary">
              Next.js &amp; React
            </span>
            . Bridging the gap between complex engineering and fluid user
            experiences.
          </p>

          {/* Status indicator */}
          <div className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Currently at {SITE_CONFIG.currentCompany}
          </div>

          {/* Social links — glass pill style */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {socialLinks.map((social: SocialLink) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card inline-flex items-center rounded-full px-6 py-2.5 text-sm font-bold text-text-primary transition-all duration-normal hover:-translate-y-0.5 hover:bg-accent/10"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Headshot */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-2xl transition-all duration-slow group-hover:blur-3xl" />
          <div className="glass-card relative h-72 w-72 overflow-hidden rounded-3xl p-2 md:h-96 md:w-96">
            <Image
              src="/images/headshot.jpg"
              alt={SITE_CONFIG.name}
              fill
              className="rounded-2xl object-cover object-[center_20%]"
              priority
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
