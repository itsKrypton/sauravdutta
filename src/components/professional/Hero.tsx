import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/lib/constants";
import { socials } from "@/data/socials";

export default function Hero() {
  return (
    <AnimatedSection id="hero" className="pt-24 md:pt-32">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 sm:px-6 md:flex-row md:justify-between">
        {/* Text */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Frontend Engineer
          </span>

          <h1 className="mt-3 font-heading text-5xl font-bold tracking-tight text-text-primary md:text-7xl">
            {SITE_CONFIG.name}
          </h1>

          <p className="mt-4 max-w-lg text-lg text-text-secondary md:text-xl">
            {SITE_CONFIG.tagline}
          </p>

          {/* Status indicator */}
          <div className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Currently at Stage
          </div>

          {/* Social links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {socials.map((social) => (
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
            alt="Saurav Dutta"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
