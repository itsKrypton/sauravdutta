"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DoorPanelProps {
  title: string;
  subtitle: string;
  side: "left" | "right";
  isHovered: boolean;
  isOtherHovered: boolean;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function DoorPanel({
  title,
  subtitle,
  side,
  isHovered,
  isOtherHovered,
  onClick,
  onHoverStart,
  onHoverEnd,
}: DoorPanelProps) {
  const flex = isHovered ? 1.6 : isOtherHovered ? 0.4 : 1;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={title}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center overflow-hidden",
        side === "left" ? "border-r border-border" : "border-l border-border"
      )}
      animate={{
        flex,
        opacity: isOtherHovered ? 0.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      layout={false}
      style={{ willChange: "flex-grow" }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {/* Accent overlay on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-accent/5"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.h2
        className="font-heading text-3xl font-bold text-text-primary md:text-5xl"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="mt-3 text-lg text-text-secondary md:text-xl"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
