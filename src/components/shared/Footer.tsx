import { SITE_CONFIG } from "@/lib/constants";

interface FooterProps {
  variant?: "professional" | "personal";
}

export default function Footer({ variant = "professional" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg-secondary">
      {/* Accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        {/* Left — Name */}
        <div className="text-sm">
          <span className="font-heading font-semibold text-text-primary">
            {SITE_CONFIG.name}
          </span>
          <span className="ml-2 text-text-secondary">
            &copy; {year}.{" "}
            {variant === "professional"
              ? "All rights reserved."
              : "Made with curiosity."}
          </span>
        </div>

        {/* Right — Social links */}
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
          >
            Email
          </a>
          <a
            href="https://github.com/sauravdutta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/sauravdutta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
