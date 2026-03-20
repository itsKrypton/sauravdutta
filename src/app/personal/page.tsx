import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MosaicGrid from "@/components/personal/MosaicGrid";
import { ROUTES } from "@/lib/constants";
import type { NavConfig } from "@/types";
import { getPersonalTiles } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Saurav Dutta | The Person",
  description:
    "Beyond the code — music, travel, fitness, and the stories that shape who I am.",
};

const navConfig: NavConfig = {
  showSectionLinks: false,
  otherSideLabel: "The Professional",
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
