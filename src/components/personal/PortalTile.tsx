"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PersonalTile } from "@/types";
import { cn } from "@/lib/utils";

interface PortalTileProps {
  tile: PersonalTile;
}

const sizeClasses: Record<PersonalTile["size"], string> = {
  large: "col-span-2 row-span-2",
  medium: "col-span-1 row-span-2",
  small: "col-span-1 row-span-1",
};

export default function PortalTile({ tile }: PortalTileProps) {
  const content = (
    <div className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-border bg-bg-card">
      {tile.bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${tile.bgImage})` }}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/40 to-transparent" />

      {/* Content */}
      <div className="relative flex min-h-[200px] flex-col justify-end p-6">
        <h3 className="font-heading text-xl font-bold text-text-primary md:text-2xl">
          {tile.title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{tile.description}</p>
        {tile.href && (
          <span className="mt-2 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Explore &rarr;
          </span>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      className={cn(sizeClasses[tile.size])}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {tile.href ? (
        <Link href={tile.href} className="block h-full">
          {content}
        </Link>
      ) : (
        <div className="h-full">{content}</div>
      )}
    </motion.div>
  );
}
