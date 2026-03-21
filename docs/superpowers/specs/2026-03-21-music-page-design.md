# Music & Guitar Page — `/personal/music`

## Overview

A dedicated hobby page for the personal side of the portfolio. Displays music-related content (Instagram reels, uploaded videos, photos) in a Pinterest/bento-style masonry grid. All content managed via Sanity CMS. Cards are tagged and manually sized for layout control.

---

## Page Layout

### Hero Area
- Heading: "Music & Guitar"
- Subtitle: one-liner description
- Tag filter pills: "All", plus dynamic tags from content (e.g., "Guitar Cover", "Original", "Jam Session", "Acoustic"). Clicking a tag filters the grid. "All" shows everything.
- Uses existing Navbar (personal config) and Footer

### Bento Grid
- Pinterest-style masonry layout below the hero
- Cards in varying sizes (small, medium, large) controlled per-card in Sanity
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` with `auto-rows-[200px]`
- Responsive: collapses to 2 columns on mobile, 3 on tablet, 4 on desktop

---

## Card Types

| Type | Render | Source |
|------|--------|--------|
| `instagram` | Instagram embed iframe (`instagram.com/reel/{ID}/embed/`) or thumbnail that links out | Paste reel URL in Sanity |
| `video` | Uploaded video with play button overlay, plays inline on click | Upload to Sanity |
| `image` | Photo with gradient overlay | Upload to Sanity |

### Card Anatomy
- Thumbnail/preview fills the card
- Gradient overlay at bottom for text readability
- Title (optional, at bottom over gradient)
- Caption (short text below title)
- Tags as small accent-colored pills
- Hover: lift + accent glow (matching existing glass-card pattern)
- Click behavior:
  - Instagram: opens reel in new tab
  - Video: plays inline
  - Image: no action (future: lightbox)

### Card Sizes (Sanity-controlled)

| Size | Grid span |
|------|-----------|
| `small` | `col-span-1 row-span-1` |
| `medium` | `col-span-1 row-span-2` (tall) |
| `large` | `col-span-2 row-span-2` (featured) |

---

## Sanity Schema: `musicPost`

```
name: "musicPost"
title: "Music Post"
type: "document"
fields:
  - title (string, optional)
  - caption (text, optional)
  - type (string, required): "instagram" | "video" | "image"
  - instagramUrl (string, visible when type=instagram)
  - media (file, visible when type=video)
  - image (image with hotspot, visible when type=image)
  - thumbnail (image with hotspot, optional — poster frame for videos, preview for instagram)
  - tags (array of strings)
  - size (string, required): "small" | "medium" | "large"
  - orderRank (number, for manual ordering)

preview:
  select: title, subtitle: caption

orderings:
  - orderRank asc
```

---

## Data Flow

1. User creates music posts in Sanity Studio (paste Instagram URL, upload video/image, set tags and size)
2. Next.js page fetches all music posts from Sanity ordered by `orderRank`
3. TagFilter component extracts unique tags from all posts
4. MusicBentoGrid renders cards based on type and size
5. Tag filtering is client-side (filter the fetched array, no re-fetch)

---

## GROQ Query

```groq
*[_type == "musicPost"] | order(orderRank asc) {
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
}
```

---

## Components

### `src/app/personal/music/page.tsx`
- Server component
- Fetches music posts from Sanity
- Renders Navbar (personal config), hero section, MusicBentoGrid, Footer
- Metadata: "Saurav Dutta | Music & Guitar"

### `src/components/personal/music/MusicBentoGrid.tsx`
- Client component (needs state for tag filtering)
- Receives posts as prop
- Renders TagFilter + grid of MusicCards
- Grid: bento masonry layout with glass-card styling

### `src/components/personal/music/MusicCard.tsx`
- Renders a single card based on `type`
- Instagram: shows thumbnail with Instagram icon overlay, links to reel URL
- Video: shows thumbnail with play button, plays inline via `<video>` on click
- Image: shows image with gradient overlay
- All types: title, caption, tag pills at bottom

### `src/components/personal/music/TagFilter.tsx`
- Client component
- Horizontal scrollable row of tag pills
- "All" pill is always first and selected by default
- Active tag has accent background, others have border-only style
- Calls `onFilterChange(tag)` prop

---

## Instagram Embed Strategy

For Instagram content, we do NOT use the oEmbed API or iframe embeds (they're heavy and break the bento aesthetic). Instead:

1. User uploads a **thumbnail** image in Sanity for each Instagram post
2. The card shows the thumbnail with an Instagram icon overlay
3. Clicking opens the Instagram reel URL in a new tab

This keeps the grid fast, visually consistent, and avoids Instagram API complexity.

---

## Styling

- Follows existing glass-card pattern from the site
- Cards: `glass-card rounded-2xl overflow-hidden` with hover glow
- Tags: `rounded-full border border-accent/20 bg-accent/10 text-accent text-[10px] uppercase tracking-wider`
- Filter pills: same tag style but larger, with active state `bg-accent text-white`
- Hero: centered, uses existing SectionHeading component pattern
- Back link to `/personal` in the hero area

---

## Route

`/personal/music` — this is a dedicated page file (`src/app/personal/music/page.tsx`), NOT the dynamic `[hobby]` catch-all. The catch-all still handles other hobbies with the "Coming soon" placeholder.

---

## Future Enhancements (NOT in scope now)
- Lightbox for images
- Inline Instagram embed toggle
- Audio player for music clips
- Spotify integration
