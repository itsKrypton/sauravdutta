"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DoorPanelProps {
  title: string;
  subtitle: string;
  side: "left" | "right";
  isHovered: boolean;
  isOtherHovered: boolean;
  isChosen: boolean;
  isOtherChosen: boolean;
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
  isChosen,
  isOtherChosen,
  onClick,
  onHoverStart,
  onHoverEnd,
}: DoorPanelProps) {
  // Chosen = dramatic expand. Hover = subtle nudge.
  const flex = isChosen
    ? 4
    : isOtherChosen
      ? 0.1
      : isHovered
        ? 1.15
        : isOtherHovered
          ? 0.85
          : 1;

  const opacity = isOtherChosen ? 0 : isOtherHovered ? 0.7 : 1;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={title}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center overflow-hidden px-4",
        side === "left"
          ? "border-b border-border md:border-b-0 md:border-r"
          : "border-t border-border md:border-t-0 md:border-l",
      )}
      animate={{ flex, opacity }}
      transition={
        isChosen || isOtherChosen
          ? { type: "spring", stiffness: 150, damping: 25 }
          : { type: "spring", stiffness: 400, damping: 35 }
      }
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
        animate={{ opacity: isHovered && !isChosen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className="flex flex-col items-center md:whitespace-nowrap"
        animate={{
          opacity: isOtherChosen ? 0 : 1,
          scale: isHovered && !isChosen ? 1.03 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: "spring", stiffness: 400, damping: 35 },
        }}
      >
        <h2 className="text-center font-heading text-2xl font-bold text-text-primary sm:text-3xl md:text-5xl">
          {title}
        </h2>
        <p
          className="mt-2 text-center text-sm text-text-secondary sm:text-base md:mt-3 md:text-xl"
          style={{ opacity: isHovered ? 1 : 0.6 }}
        >
          {subtitle}
        </p>
      </motion.div>
    </motion.div>
  );
}
