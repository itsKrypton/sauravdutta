"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { MusicPost } from "@/types";
import { cn } from "@/lib/utils";

interface MusicCardProps {
  post: MusicPost;
}

const sizeClasses: Record<MusicPost["size"], string> = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 row-span-2",
  large: "col-span-2 row-span-2",
};

export default function MusicCard({ post }: MusicCardProps) {
  const [playing, setPlaying] = useState(false);

  const thumbnailSrc = post.thumbnailUrl || post.imageUrl;

  const handleClick = () => {
    if (post.type === "instagram" && post.instagramUrl) {
      window.open(post.instagramUrl, "_blank", "noopener,noreferrer");
    } else if (post.type === "video") {
      setPlaying(true);
    }
  };

  return (
    <motion.div
      className={cn(sizeClasses[post.size])}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className="glass-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-normal hover:shadow-[0_0_30px_var(--accent-glow)]"
        onClick={handleClick}
      >
        {/* Media area */}
        <div className="relative flex-1 overflow-hidden">
          {/* Video playing inline */}
          {post.type === "video" && playing && post.mediaUrl ? (
            <video
              src={post.mediaUrl}
              autoPlay
              controls
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              {/* Thumbnail */}
              {thumbnailSrc && (
                <Image
                  src={thumbnailSrc}
                  alt={post.title || "Music post"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Fallback gradient when no thumbnail */}
              {!thumbnailSrc && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-hover/10" />
              )}

              {/* Type icon overlay */}
              {post.type === "instagram" && (
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                  <svg
                    className="h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              )}

              {/* Play button for video */}
              {post.type === "video" && !playing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <svg
                      className="ml-1 h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Content overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          {post.title && (
            <h3 className="font-heading text-sm font-bold text-white md:text-base">
              {post.title}
            </h3>
          )}
          {post.caption && (
            <p className="mt-0.5 line-clamp-2 text-xs text-white/70">
              {post.caption}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
