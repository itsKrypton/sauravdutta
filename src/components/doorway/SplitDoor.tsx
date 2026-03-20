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

  const isLeftChosen = chosenSide === "professional";
  const isRightChosen = chosenSide === "personal";

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <DoorPanel
        title={DOORWAY.professional.title}
        subtitle={DOORWAY.professional.subtitle}
        side="left"
        isHovered={!chosenSide && hoveredSide === "left"}
        isOtherHovered={!chosenSide && hoveredSide === "right"}
        isChosen={isLeftChosen}
        isOtherChosen={isRightChosen}
        onClick={() => onChoose("professional")}
        onHoverStart={() => setHoveredSide("left")}
        onHoverEnd={() => setHoveredSide(null)}
      />
      <DoorPanel
        title={DOORWAY.personal.title}
        subtitle={DOORWAY.personal.subtitle}
        side="right"
        isHovered={!chosenSide && hoveredSide === "right"}
        isOtherHovered={!chosenSide && hoveredSide === "left"}
        isChosen={isRightChosen}
        isOtherChosen={isLeftChosen}
        onClick={() => onChoose("personal")}
        onHoverStart={() => setHoveredSide("right")}
        onHoverEnd={() => setHoveredSide(null)}
      />
    </div>
  );
}
