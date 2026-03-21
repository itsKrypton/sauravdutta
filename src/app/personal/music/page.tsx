import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MusicBentoGrid from "@/components/personal/music/MusicBentoGrid";
import { ROUTES, SITE_CONFIG, DOORWAY } from "@/lib/constants";
import type { NavConfig } from "@/types";
import { getMusicPosts } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Music & Guitar`,
  description: "Strings, melodies, and everything in between.",
};

const navConfig: NavConfig = {
  showSectionLinks: false,
  otherSideLabel: DOORWAY.professional.title,
  otherSideHref: ROUTES.professional,
};

export default async function MusicPage() {
  const posts = await getMusicPosts();

  return (
    <>
      <Navbar config={navConfig} />
      <main className="min-h-screen bg-bg-primary pt-24 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            href={ROUTES.personal}
            className="mb-8 inline-flex items-center text-sm text-text-secondary transition-colors hover:text-accent"
          >
            &larr; Back to {DOORWAY.personal.title}
          </Link>

          {/* Hero */}
          <div className="mb-12">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Music & Guitar
            </h1>
            <p className="mt-3 text-lg text-text-secondary">
              Strings, melodies, and everything in between.
            </p>
          </div>

          {/* Grid */}
          <MusicBentoGrid posts={posts} />
        </div>
      </main>
      <Footer variant="personal" />
    </>
  );
}
