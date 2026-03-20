import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function BackToDoors() {
  return (
    <Link
      href={ROUTES.home}
      className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
    >
      Back to Doors
    </Link>
  );
}
