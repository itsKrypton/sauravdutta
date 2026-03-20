import { SITE_CONFIG } from "@/lib/constants";

interface FooterProps {
  variant?: "professional" | "personal";
}

export default function Footer({ variant = "professional" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-text-secondary sm:px-6">
        <p>
          &copy; {year} {SITE_CONFIG.name}. {variant === "professional" ? "All rights reserved." : "Made with curiosity."}
        </p>
      </div>
    </footer>
  );
}
