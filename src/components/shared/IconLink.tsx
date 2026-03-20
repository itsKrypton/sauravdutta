import { cn } from "@/lib/utils";

interface IconLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export default function IconLink({ href, label, icon, className }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 text-text-secondary transition-colors duration-fast hover:text-accent",
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
