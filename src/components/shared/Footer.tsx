import { SITE_CONFIG } from "@/lib/constants";

interface FooterProps {
  variant?: "professional" | "personal";
  socials?: { name: string; url: string }[];
}

export default function Footer({
  variant = "professional",
  socials,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-bg-secondary/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-8 py-16 md:flex-row">
        {/* Logo / Name */}
        <div className="font-heading text-xl font-bold tracking-tight text-text-primary">
          {SITE_CONFIG.name.split(" ")[0].toUpperCase()}
          <span className="text-accent">.</span>
        </div>

        {/* Social links */}
        {socials && socials.length > 0 && (
          <div className="flex flex-wrap justify-center gap-10">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-accent"
              >
                {s.name}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-secondary">
          &copy; {year} {SITE_CONFIG.name.toUpperCase()}.{" "}
          {variant === "professional"
            ? "All rights reserved."
            : "Made with curiosity."}
        </div>
      </div>
    </footer>
  );
}
