import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MosaicGrid from "@/components/personal/MosaicGrid";
import { ROUTES, SITE_CONFIG, DOORWAY, SECTIONS } from "@/lib/constants";
import type { NavConfig } from "@/types";
import { getPersonalTiles } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${DOORWAY.personal.title}`,
  description: SECTIONS.personal.subtitle,
};

const navConfig: NavConfig = {
  showSectionLinks: false,
  otherSideLabel: DOORWAY.professional.title,
  otherSideHref: ROUTES.professional,
};

export default async function PersonalPage() {
  const personalTiles = await getPersonalTiles();

  return (
    <>
      <Navbar config={navConfig} />

      <main className="min-h-screen bg-bg-primary">
        <MosaicGrid personalTiles={personalTiles} />
      </main>

      <Footer variant="personal" />
    </>
  );
}
