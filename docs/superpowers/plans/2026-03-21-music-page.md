# Music Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/personal/music` page with a bento-grid gallery of music content (Instagram reels, videos, images) managed via Sanity CMS with tag-based filtering.

**Architecture:** Sanity schema for `musicPost` with type/media/tags/size fields. Server component page fetches data, passes to a client-side MusicBentoGrid that handles tag filtering and renders type-specific MusicCards. Instagram content uses thumbnails linking out (no embeds).

**Tech Stack:** Next.js 16 (App Router), Sanity CMS, Tailwind v4, Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-21-music-page-design.md`

---

## File Structure

```
src/
  sanity/
    schemas/
      musicPost.ts              # New Sanity schema
      index.ts                  # Modified — add musicPost
    queries.ts                  # Modified — add musicPostsQuery
    fetch.ts                    # Modified — add getMusicPosts()
  types/
    index.ts                    # Modified — add MusicPost interface
  app/
    personal/
      music/
        page.tsx                # New dedicated music page
  components/
    personal/
      music/
        MusicBentoGrid.tsx      # Client component — grid + filtering
        MusicCard.tsx           # Individual card (switches by type)
        TagFilter.tsx           # Tag filter pills
```

---

### Task 1: Sanity Schema & Data Layer

**Files:**
- Create: `src/sanity/schemas/musicPost.ts`
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/queries.ts`
- Modify: `src/sanity/fetch.ts`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Create MusicPost TypeScript interface**

Add to `src/types/index.ts`:

```ts
export interface MusicPost {
  _id: string;
  title?: string;
  caption?: string;
  type: "instagram" | "video" | "image";
  instagramUrl?: string;
  mediaUrl?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  tags?: string[];
  size: "small" | "medium" | "large";
  orderRank?: number;
}
```

- [ ] **Step 2: Create Sanity schema**

Create `src/sanity/schemas/musicPost.ts`:

```ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "musicPost",
  title: "Music Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "Video", value: "video" },
          { title: "Image", value: "image" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "instagram",
    }),
    defineField({
      name: "media",
      title: "Video File",
      type: "file",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type !== "image",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Preview image for videos and Instagram posts",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium (Tall)", value: "medium" },
          { title: "Large (Featured)", value: "large" },
        ],
      },
      validation: (rule) => rule.required(),
      initialValue: "small",
    }),
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderRank",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "type", media: "thumbnail" },
  },
});
```

- [ ] **Step 3: Register schema**

In `src/sanity/schemas/index.ts`, add:

```ts
import musicPost from "./musicPost";
```

And add `musicPost` to the `schemas` array.

- [ ] **Step 4: Add GROQ query**

Add to `src/sanity/queries.ts`:

```ts
export const musicPostsQuery = `*[_type == "musicPost"] | order(orderRank asc) {
  _id,
  title,
  caption,
  type,
  instagramUrl,
  "mediaUrl": media.asset->url,
  "imageUrl": image.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  tags,
  size,
  orderRank
}`;
```

- [ ] **Step 5: Add fetch function**

Add to `src/sanity/fetch.ts`:

```ts
import type { MusicPost } from "@/types";

export async function getMusicPosts(): Promise<MusicPost[]> {
  try {
    const data = await client.fetch(queries.musicPostsQuery);
    return data?.length ? data : [];
  } catch {
    return [];
  }
}
```

Import `MusicPost` in the existing type imports block at the top.

- [ ] **Step 6: Verify build**

```bash
npx next build
```

Expected: Build passes. Schema registered, query and fetch ready.

- [ ] **Step 7: Commit**

```bash
git add src/sanity/schemas/musicPost.ts src/sanity/schemas/index.ts src/sanity/queries.ts src/sanity/fetch.ts src/types/index.ts
git commit -m "feat: add musicPost Sanity schema, query, and fetch function"
```

---

### Task 2: TagFilter Component

**Files:**
- Create: `src/components/personal/music/TagFilter.tsx`

- [ ] **Step 1: Create TagFilter component**

Create `src/components/personal/music/TagFilter.tsx`:

```tsx
"use client";

interface TagFilterProps {
  tags: string[];
  activeTag: string;
  onFilterChange: (tag: string) => void;
}

export default function TagFilter({
  tags,
  activeTag,
  onFilterChange,
}: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onFilterChange("All")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-fast ${
          activeTag === "All"
            ? "bg-accent text-white"
            : "border border-accent/20 bg-accent/5 text-text-secondary hover:bg-accent/10 hover:text-accent"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onFilterChange(tag)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-fast ${
            activeTag === tag
              ? "bg-accent text-white"
              : "border border-accent/20 bg-accent/5 text-text-secondary hover:bg-accent/10 hover:text-accent"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/personal/music/TagFilter.tsx
git commit -m "feat: add TagFilter component for music page"
```

---

### Task 3: MusicCard Component

**Files:**
- Create: `src/components/personal/music/MusicCard.tsx`

- [ ] **Step 1: Create MusicCard component**

Create `src/components/personal/music/MusicCard.tsx`:

```tsx
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
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              )}

              {/* Play button for video */}
              {post.type === "video" && !playing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <svg className="ml-1 h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/personal/music/MusicCard.tsx
git commit -m "feat: add MusicCard component with instagram/video/image support"
```

---

### Task 4: MusicBentoGrid Component

**Files:**
- Create: `src/components/personal/music/MusicBentoGrid.tsx`

- [ ] **Step 1: Create MusicBentoGrid component**

Create `src/components/personal/music/MusicBentoGrid.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/personal/music/MusicBentoGrid.tsx
git commit -m "feat: add MusicBentoGrid with tag filtering and bento layout"
```

---

### Task 5: Music Page

**Files:**
- Create: `src/app/personal/music/page.tsx`

- [ ] **Step 1: Create the music page**

Create `src/app/personal/music/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npx next build
```

Expected: Build passes. `/personal/music` is now a dedicated route. The `[hobby]` catch-all still handles other hobbies.

- [ ] **Step 3: Run prettier**

```bash
npx prettier --write "src/**/*.{ts,tsx}"
```

- [ ] **Step 4: Commit**

```bash
git add src/app/personal/music
git commit -m "feat: add dedicated music page with bento grid gallery"
```

---

## Summary

| Task | What It Builds |
|------|---------------|
| 1 | Sanity schema, GROQ query, fetch function, TypeScript type |
| 2 | TagFilter component (filter pills) |
| 3 | MusicCard component (renders by type: instagram/video/image) |
| 4 | MusicBentoGrid (grid layout + filtering logic) |
| 5 | Music page (wires everything together) |
