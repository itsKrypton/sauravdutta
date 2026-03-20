import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accentBorder?: boolean;
}

export default function Card({ children, className, hover = true, accentBorder = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-card p-6 transition-all duration-normal",
        hover && "hover:-translate-y-1 hover:shadow-[--accent-glow] hover:border-accent/30",
        accentBorder && "border-t-2 border-t-accent/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
