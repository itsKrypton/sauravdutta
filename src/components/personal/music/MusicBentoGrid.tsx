"use client";

import { useState, useMemo } from "react";
import type { MusicPost } from "@/types";
import MusicCard from "./MusicCard";
import TagFilter from "./TagFilter";

interface MusicBentoGridProps {
  posts: MusicPost[];
}

export default function MusicBentoGrid({ posts }: MusicBentoGridProps) {
  const [activeTag, setActiveTag] = useState("All");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags?.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((post) => post.tags?.includes(activeTag));
  }, [posts, activeTag]);

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-text-secondary">
        <p>No music posts yet. Add some in Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="mb-10">
          <TagFilter
            tags={allTags}
            activeTag={activeTag}
            onFilterChange={setActiveTag}
          />
        </div>
      )}

      {/* Bento grid */}
      <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredPosts.map((post) => (
          <MusicCard key={post._id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && activeTag !== "All" && (
        <div className="py-12 text-center text-text-secondary">
          <p>No posts with tag &ldquo;{activeTag}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
