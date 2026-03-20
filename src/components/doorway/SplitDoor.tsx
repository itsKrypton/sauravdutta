"use client";

import { useState } from "react";
import DoorPanel from "./DoorPanel";

interface SplitDoorProps {
  onChoose: (side: "professional" | "personal") => void;
  chosenSide?: "professional" | "personal" | null;
}

export default function SplitDoor({ onChoose, chosenSide }: SplitDoorProps) {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(
    null
  );

  // When chosenSide is set, override hover state to expand the chosen panel
  const effectiveHovered = chosenSide
    ? chosenSide === "professional"
      ? "left"
      : "right"
    : hoveredSide;

  return (
    <div className="flex h-screen w-full">
      <DoorPanel
        title="The Professional"
        subtitle="Experience. Projects. Skills."
        side="left"
        isHovered={effectiveHovered === "left"}
        isOtherHovered={effectiveHovered === "right"}
        onClick={() => onChoose("professional")}
        onHoverStart={() => setHoveredSide("left")}
        onHoverEnd={() => setHoveredSide(null)}
      />
      <DoorPanel
        title="The Person"
        subtitle="Music. Travel. Fitness. Life."
        side="right"
        isHovered={effectiveHovered === "right"}
        isOtherHovered={effectiveHovered === "left"}
        onClick={() => onChoose("personal")}
        onHoverStart={() => setHoveredSide("right")}
        onHoverEnd={() => setHoveredSide(null)}
      />
    </div>
  );
}
