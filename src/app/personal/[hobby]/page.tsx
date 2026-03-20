import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ROUTES } from "@/lib/constants";
import type { NavConfig } from "@/types";
import Link from "next/link";

const navConfig: NavConfig = {
  showSectionLinks: false,
  otherSideLabel: "The Professional",
  otherSideHref: ROUTES.professional,
};

export default async function HobbyPage({ params }: { params: Promise<{ hobby: string }> }) {
  const { hobby } = await params;
  const title = hobby.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <Navbar config={navConfig} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary pt-16">
        <h1 className="font-heading text-4xl font-bold text-text-primary">{title}</h1>
        <p className="mt-4 text-text-secondary">Coming soon.</p>
        <Link
          href={ROUTES.personal}
          className="mt-8 text-accent transition-colors duration-fast hover:text-accent-hover"
        >
          &larr; Back to The Person
        </Link>
      </main>
      <Footer variant="personal" />
    </>
  );
}
