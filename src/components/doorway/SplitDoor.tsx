"use client";

import { useState } from "react";
import DoorPanel from "./DoorPanel";
import { DOORWAY } from "@/lib/constants";

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
        title={DOORWAY.professional.title}
        subtitle={DOORWAY.professional.subtitle}
        side="left"
        isHovered={effectiveHovered === "left"}
        isOtherHovered={effectiveHovered === "right"}
        onClick={() => onChoose("professional")}
        onHoverStart={() => setHoveredSide("left")}
        onHoverEnd={() => setHoveredSide(null)}
      />
      <DoorPanel
        title={DOORWAY.personal.title}
        subtitle={DOORWAY.personal.subtitle}
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
