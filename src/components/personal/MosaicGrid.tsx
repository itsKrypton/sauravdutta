"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { personalTiles } from "@/data/personal-tiles";
import PortalTile from "./PortalTile";

export default function MosaicGrid() {
  return (
    <AnimatedSection className="pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="The Person."
          subtitle="Beyond the code — a peek into my world."
        />

        <div className="grid auto-rows-[140px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {personalTiles.map((tile) => (
            <PortalTile key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
