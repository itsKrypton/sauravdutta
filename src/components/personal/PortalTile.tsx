"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PersonalTile } from "@/types";
import { cn } from "@/lib/utils";

interface PortalTileProps {
  tile: PersonalTile;
  index?: number;
}

const sizeClasses: Record<PersonalTile["size"], string> = {
  large: "col-span-2 row-span-2",
  medium: "col-span-1 row-span-2",
  small: "col-span-1 row-span-1",
};

export default function PortalTile({ tile, index = 0 }: PortalTileProps) {
  const padIndex = String(index + 1).padStart(2, "0");

  const content = (
    <div className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[3rem] border border-border/50 bg-bg-card shadow-2xl">
      {tile.bgImage && (
        <Image
          src={tile.bgImage}
          alt={tile.title}
          fill
          className="object-cover object-[center_25%] opacity-70 transition-transform duration-1000 group-hover:scale-110"
        />
      )}

      {/* Stronger gradient overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />

      {/* Content */}
      <div className="relative flex min-h-[200px] flex-col justify-end p-8">
        {/* Numbered category label */}
        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {padIndex}. {tile.title}
        </span>

        <h3 className="font-heading text-2xl font-black text-text-primary md:text-3xl">
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
