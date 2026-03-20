# Portfolio Website — sauravdutta.com

## Overview

A dynamic, performance-first portfolio website with a "doorway" concept. Visitors are presented with a vertical split screen — one side for recruiters ("The Professional"), one for everyone else ("The Person"). Hovering expands the chosen side; clicking zooms in and enters that section. The site supports dark mode (warm & bold: charcoal + amber/gold) and light mode (cool & clean: off-white + teal).

**Domain:** sauravdutta.com
**Hosting:** Vercel
**Owner:** Saurav Dutta — Frontend Engineer at Stage, previously Accenture

---

## Tech Stack

- **Next.js 15** (App Router) — TypeScript, SSG
- **Tailwind CSS v4** — utility-first styling with custom design tokens
- **Framer Motion** — all animations (doorway, zoom, scroll-triggered, page transitions)
- **next-themes** — dark/light mode, zero-flash
- **Vercel** — deployment, pointed to sauravdutta.com

---

## Routing

| Route | Purpose |
|---|---|
| `/` | Doorway landing — intro animation + vertical split |
| `/professional` | Recruiter section |
| `/personal` | Life mosaic hub |
| `/personal/[hobby]` | Future expandable hobby pages (music, travel, etc.) |

---

## Project Structure

```
src/
  app/
    page.tsx                    # Doorway landing
    layout.tsx                  # Root layout, ThemeProvider, fonts
    professional/
      page.tsx                  # Recruiter section
    personal/
      page.tsx                  # Life mosaic hub
      [hobby]/
        page.tsx                # Future expandable hobby pages
  components/
    doorway/
      EntrySequence.tsx         # Orchestrates 3-beat intro animation
      SplitDoor.tsx             # Two panels with hover expand/compress
      DoorPanel.tsx             # Individual panel (title, subtitle, cue)
    professional/
      Hero.tsx                  # Name, tagline, photo, quick links
      TechStackGrid.tsx         # Categorized skill cards
      ExperienceTimeline.tsx    # Vertical timeline with entries
      ProjectCard.tsx           # Case study card with tags, links
      CodingAchievements.tsx    # Stats/badges section
      ContactCTA.tsx            # Bold call-to-action footer
    personal/
      MosaicGrid.tsx            # Responsive asymmetric tile grid
      PortalTile.tsx            # Individual tile, hover + click behavior
    shared/
      Navbar.tsx                # Configurable sticky nav per section
      ThemeToggle.tsx           # Dark/light toggle, accessible
      BackToDoors.tsx           # Return to doorway action
      SectionHeading.tsx        # Consistent heading + optional subtitle
      Card.tsx                  # Base composable card
      AnimatedSection.tsx       # Scroll-triggered fade/slide-in wrapper
      IconLink.tsx              # Social/platform link with icon
      Footer.tsx                # Shared footer, content varies by section
  data/
    experience.ts               # Work experience entries
    projects.ts                 # Project case studies
    skills.ts                   # Tech stack, categorized
    achievements.ts             # Coding achievements
    education.ts                # Education entries
    personal-tiles.ts           # Personal mosaic tile data
    socials.ts                  # Social/platform links
  types/
    index.ts                    # TypeScript interfaces for all data shapes
  styles/
    tokens.css                  # CSS custom properties (colors, spacing, animation)
    globals.css                 # Global styles, Tailwind directives
  lib/
    constants.ts                # App-wide constants
    utils.ts                    # Shared utility functions
```

---

## Doorway Landing Page (`/`)

### Entry Sequence (3 beats)

1. **Beat 1 — Name reveal** (~1.5s): "Saurav Dutta" fades up. One-liner below: "Software Engineer. Musician. Explorer."
2. **Beat 2 — "Choose Your Side"** (~1s): Large text appears across screen, holds briefly, fades.
3. **Beat 3 — Split reveals**: Screen divides vertically into two panels.

### The Split

- **Left panel** — "The Professional": icon/visual cue + "Experience. Projects. Skills."
- **Right panel** — "The Person": icon/visual cue + "Music. Travel. Fitness. Life."
- Name anchored at top center, divider line between panels.

### Hover Behavior

- Hovering a side: expands from 50/50 to ~65/35 via CSS `flex-basis` transition
- Hovered side intensifies in color, other side dims slightly
- Spring-like easing via Framer Motion
- GPU-accelerated: `transform` and `opacity` only, no layout thrashing

### Click Behavior

- Chosen side zooms in (scale + opacity), unchosen side fades out
- ~400-500ms transition
- Destination page preloaded on hover via Next.js `<Link prefetch>`
- Router navigates to `/professional` or `/personal`

### Theme

- Respects current dark/light mode
- Theme toggle available in corner from the start

---

## Professional Side (`/professional`)

### Navigation

- Sticky top nav: name/logo (left), section links (center), "The Person" link + theme toggle (right)
- Smooth scroll to sections
- "Back to Doors" link in nav

### Sections (scroll order)

#### 1. Hero

- Large bold name + title: "Software Engineer — Frontend"
- Tagline about bridging complex engineering and fluid UX
- Professional headshot
- Quick links: GitHub, LinkedIn, LeetCode, CodeForces, email
- "Currently at Stage" indicator

#### 2. Tech Stack

Grid of categorized cards:
- **Languages:** Java, C, JavaScript, TypeScript, HTML/CSS
- **Frameworks:** React.js, Next.js, AngularJS, Express.js, Node.js, Tailwind
- **Developer Tools:** Git, VS Code
- **Libraries:** MongoDB, MySQL, Supabase, FloatingUI, Lit

#### 3. Experience Timeline

Vertical timeline layout:

**Stage — Software Engineer, Frontend** (Oct 2025 – Present, Noida)
- Refactored OTT TV Hub UI (Next.js + Tailwind), 18% higher interaction depth
- Launched Statsig experiment for paywall, 5.4% retention increase
- Upgraded paywall experience with autoplay video, 4.8% conversion increase

**Accenture — Associate Software Engineer** (Oct 2023 – Oct 2025, Gurugram)
- Reusable Web Components with Lit framework, 35% efficiency increase
- WCAG accessibility, 9/10 audit score
- Cross-functional integration, 20% dev time reduction

#### 4. Selected Projects (Case Studies)

**Welth — Finance Management Application** (Mar 2025)
- Tech: Next.js, Supabase, Tailwind, Prisma, Inngest
- AI-powered financial analytics, Gemini API (97%+ accuracy)
- 35% improvement in insight generation, 65% increase in engagement
- Links: Repository, Website

**Customer Support Messaging Web App** (Dec 2022)
- Tech: MongoDB, Express.js, React.js, Node.js, JavaScript
- Full-stack CRUD with REST API, 4.9/5 user rating
- 9.5/10 accessibility score, dual portal system
- Links: Repository

#### 5. Coding Achievements

- 500+ algorithm challenges on LeetCode and CodeForces
- Meta HackerCup Round 1 — 2022 & 2023

#### 6. Education

- Dr. Jivraj Mehta Institute of Technology (GTU), Anand, Gujarat
- B.E. Computer Engineering, CGPA 9.20 (Jul 2019 – Jul 2023)

#### 7. CTA / Footer

- Bold "Let's work together" section
- Email (sauravdutta99@gmail.com), LinkedIn, download resume
- Copyright, links

---

## Personal Side (`/personal`)

### Navigation

- Sticky nav: name (left), "The Professional" link + theme toggle (right)
- "Back to Doors" link present

### Layout: Mosaic Hub

Asymmetric responsive grid of portal tiles. Each tile represents a facet of life and can eventually link to its own deep page.

### Tiles

| Tile | Size | Content | Future Page |
|---|---|---|---|
| Music / Guitar | Large | Guitar imagery, waveform visual, Spotify embed potential | `/personal/music` |
| Travel | Large | Photo collage or featured travel shot | `/personal/travel` |
| Fitness | Medium | Gym aesthetic, philosophy quote | `/personal/fitness` |
| Code Life | Medium | Culture side — setup, hackathons, memes, personal coding stories | `/personal/code-life` |
| Tech Geek | Medium | Gadgets, desk setup, tools, tech opinions | `/personal/tech` |
| About Me | Small-Medium | Casual photo, human summary, personality, values | Inline expand |
| Socials | Small | Instagram, Twitter/X, YouTube — quick links grid | Inline expand |

### Tile Behavior

- Hover: subtle lift + shadow + slight zoom on background image
- Click: navigates to deep page (when built) or shows expanded overlay with more content
- Responsive: grid rearranges on mobile

### Vibe

- More playful typography and spacing than professional side
- Casual photo instead of headshot
- Warmer, more expressive

---

## Design Tokens

### Colors — Dark Mode (Warm & Bold)

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0a0a0a` → `#141414` | Page background |
| `--bg-secondary` | `#1a1a1a` | Section backgrounds |
| `--bg-card` | `#1e1e1e` | Card surfaces |
| `--accent` | `#d4a843` | Links, highlights, CTAs |
| `--accent-hover` | `#e4bc5a` | Hover states |
| `--text-primary` | `#f5f0e8` | Headings, body text |
| `--text-secondary` | `#a89f91` | Muted/secondary text |
| `--border` | `#2a2520` | Borders, dividers |

### Colors — Light Mode (Cool & Clean)

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#f8fafa` | Page background |
| `--bg-secondary` | `#eef2f3` | Section backgrounds |
| `--bg-card` | `#ffffff` | Card surfaces |
| `--accent` | `#0d7377` | Links, highlights, CTAs |
| `--accent-hover` | `#0a5c5f` | Hover states |
| `--text-primary` | `#1a1a2e` | Headings, body text |
| `--text-secondary` | `#5a6672` | Muted/secondary text |
| `--border` | `#d8dee3` | Borders, dividers |

### Spacing

4px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 — mapped to Tailwind spacing config.

### Typography

- **Headings:** Bold modern sans-serif (Space Grotesk or Outfit)
- **Body:** Clean sans-serif (Inter or system stack)
- **Monospace:** For code/tech elements
- Type scale via Tailwind `fontSize` config

### Animation

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Hover states |
| `--duration-normal` | `300ms` | Transitions |
| `--duration-slow` | `500ms` | Page transitions, zoom |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |
| `--easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy/spring effects |

### Breakpoints

Tailwind defaults: sm (640px), md (768px), lg (1024px), xl (1280px)

---

## Navigation & Side-Switching

- Both sections have a nav link to the other side
- "Back to Doors" returns to the `/` doorway split screen
- Floating/nav toggle always accessible
- Side-switching uses same zoom/transition animation as initial entry

---

## Code Principles

- **SRP:** Each component has one responsibility
- **DRY:** Shared Card/Section/Heading components, not duplicated per page
- **KISS:** React state + context only, no state management library
- **YAGNI:** No CMS, no database, no auth — static data files until needed
- **Open/Closed:** Components accept config/props, extensible without modification
- **Data separation:** All content in typed `src/data/` files, not hardcoded in JSX
- **Type safety:** TypeScript interfaces for all data shapes in `src/types/`
- **Token-driven:** All colors, spacing, animation values from design tokens

---

## Performance Strategy

- Static generation (SSG) for all pages
- CSS transforms only for animations (GPU-accelerated)
- Lazy load images and heavy sections
- Preload destination page on hover
- Framer Motion `layout` animations for smooth transitions
- No unnecessary re-renders — memoize where appropriate

---

## Future Expansion

The architecture supports growth:
- New hobby pages: add to `/personal/[hobby]` dynamic route
- New professional sections: add component + data file
- Blog: add `/blog` route
- Any new top-level section: add route under `src/app/`
- Content updates: edit data files only, no component changes needed

---

## Photos & Assets

- **Professional side:** Professional headshot
- **Personal side:** Casual/fun photo
- **Project cards:** Screenshots or preview images
- **Personal tiles:** Relevant imagery per hobby/interest
- All images optimized via Next.js `<Image>` component
