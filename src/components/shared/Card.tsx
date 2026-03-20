import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-8 transition-all duration-normal",
        hover &&
          "hover:-translate-y-1 hover:shadow-[0_0_30px_var(--accent-glow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
