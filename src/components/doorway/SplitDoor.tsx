"use client";

import { useState } from "react";
import DoorPanel from "./DoorPanel";

interface SplitDoorProps {
  onChoose: (side: "professional" | "personal") => void;
}

export default function SplitDoor({ onChoose }: SplitDoorProps) {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(
    null
  );

  return (
    <div className="flex h-screen w-full">
      <DoorPanel
        title="The Professional"
        subtitle="Experience. Projects. Skills."
        side="left"
        isHovered={hoveredSide === "left"}
        isOtherHovered={hoveredSide === "right"}
        onClick={() => onChoose("professional")}
        onHoverStart={() => setHoveredSide("left")}
        onHoverEnd={() => setHoveredSide(null)}
      />
      <DoorPanel
        title="The Person"
        subtitle="Music. Travel. Fitness. Life."
        side="right"
        isHovered={hoveredSide === "right"}
        isOtherHovered={hoveredSide === "left"}
        onClick={() => onChoose("personal")}
        onHoverStart={() => setHoveredSide("right")}
        onHoverEnd={() => setHoveredSide(null)}
      />
    </div>
  );
}
