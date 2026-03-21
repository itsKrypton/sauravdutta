"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { MusicPost } from "@/types";
import { cn } from "@/lib/utils";
import {
  InstagramIcon,
  PlayIcon,
  PinIcon,
  CloseIcon,
  VolumeMuteIcon,
  VolumeUpIcon,
} from "@/components/shared/Icons";

interface MusicCardProps {
  post: MusicPost;
}

const sizeClasses: Record<MusicPost["size"], string> = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 row-span-2",
  large: "col-span-2 row-span-2",
};

export default function MusicCard({ post }: MusicCardProps) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const thumbnailSrc = post.thumbnailUrl || post.imageUrl;
  const isVideo = post.type === "video" && post.mediaUrl;
  const showVideo = isVideo && (hovered || pinned);

  const handleMouseEnter = () => {
    setHovered(true);
    if (isVideo && videoRef.current) {
      hoverTimeout.current = setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    if (pinned) return;
    setHovered(false);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setMuted(true);
      videoRef.current.muted = true;
    }
  };

  const togglePin = () => {
    if (pinned) {
      setPinned(false);
      setHovered(false);
      setMuted(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }
    } else {
      setPinned(true);
      videoRef.current?.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  // Only instagram-only cards (no video) are clickable as a whole
  const isCardClickable =
    post.type === "instagram" && !post.mediaUrl && post.instagramUrl;

  return (
    <motion.div
      className={cn(sizeClasses[post.size], "relative")}
      style={{ zIndex: hovered || pinned ? 20 : 1 }}
    >
      <motion.div
        className={cn(
          "glass-card group relative flex h-full flex-col overflow-hidden rounded-2xl",
          isCardClickable ? "cursor-pointer" : "cursor-default",
        )}
        animate={{
          scale: showVideo ? 1.15 : 1,
          boxShadow: showVideo
            ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px var(--accent-glow)"
            : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={
          isCardClickable
            ? () =>
                window.open(post.instagramUrl!, "_blank", "noopener,noreferrer")
            : undefined
        }
      >
        {/* Media area */}
        <div className="relative flex-1 overflow-hidden">
          {/* Preloaded video */}
          {isVideo && (
            <video
              ref={videoRef}
              src={post.mediaUrl}
              muted={muted}
              loop
              playsInline
              preload="metadata"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                showVideo ? "opacity-100" : "opacity-0",
              )}
            />
          )}

          {/* Thumbnail */}
          {thumbnailSrc && (
            <Image
              src={thumbnailSrc}
              alt={post.title || "Music post"}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                showVideo
                  ? "scale-105 opacity-0"
                  : "opacity-100 group-hover:scale-105",
              )}
            />
          )}

          {/* Fallback gradient */}
          {!thumbnailSrc && !isVideo && (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-hover/10" />
          )}

          {/* Instagram link icon — always clickable independently */}
          {post.instagramUrl && (
            <a
              href={post.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute right-3 top-3 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="View on Instagram"
            >
              <InstagramIcon className="h-4 w-4 text-white" />
            </a>
          )}

          {/* Play icon — fades out when playing */}
          {isVideo && (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                showVideo ? "opacity-0" : "opacity-100",
              )}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                <PlayIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}

          {/* Video controls — pin + mute */}
          {isVideo && showVideo && (
            <div className="absolute left-3 top-3 z-30 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin();
                }}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label={pinned ? "Unpin video" : "Pin video"}
              >
                {pinned ? <CloseIcon className="h-3.5 w-3.5" /> : <PinIcon />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
              </button>
            </div>
          )}

          {/* Bottom gradient overlay */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300",
              showVideo ? "opacity-40" : "opacity-100",
            )}
          />
        </div>

        {/* Content overlay at bottom */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 p-4 transition-opacity duration-300",
            showVideo ? "opacity-0" : "opacity-100",
          )}
        >
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
      </motion.div>
    </motion.div>
  );
}
