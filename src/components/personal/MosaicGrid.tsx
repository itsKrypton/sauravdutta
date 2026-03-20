"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import PortalTile from "./PortalTile";
import { SECTIONS } from "@/lib/constants";
import type { PersonalTile } from "@/types";

interface MosaicGridProps {
  personalTiles?: PersonalTile[];
}

export default function MosaicGrid({ personalTiles }: MosaicGridProps) {
  const tiles = personalTiles ?? [];

  return (
    <AnimatedSection className="pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={SECTIONS.personal.title}
          subtitle={SECTIONS.personal.subtitle}
          accentWords="Person."
        />

        <div className="grid auto-rows-[180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile: PersonalTile, idx: number) => (
            <PortalTile key={tile.id} tile={tile} index={idx} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
