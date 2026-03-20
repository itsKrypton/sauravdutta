# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dynamic portfolio website at sauravdutta.com with a "doorway" split-screen concept, a recruiter-focused professional side, and a personal life mosaic side.

**Architecture:** Next.js 15 App Router with SSG, Tailwind CSS v4 for token-driven styling, Framer Motion for all animations. Content lives in typed data files, components are composable and reusable. Dark mode (warm/bold) and light mode (cool/clean) via next-themes.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, next-themes, Vercel

**Spec:** `docs/superpowers/specs/2026-03-20-portfolio-website-design.md`

---

## File Structure

```
src/
  app/
    page.tsx                        # Doorway landing page
    layout.tsx                      # Root layout: fonts, ThemeProvider, metadata
    professional/
      page.tsx                      # Recruiter section — long scroll
    personal/
      page.tsx                      # Life mosaic hub
  components/
    doorway/
      EntrySequence.tsx             # 3-beat intro animation orchestrator
      SplitDoor.tsx                 # Two-panel split with hover/click logic
      DoorPanel.tsx                 # Single door panel (title, subtitle, icon)
    professional/
      Hero.tsx                      # Name, title, tagline, photo, links
      TechStackGrid.tsx             # Categorized skill cards grid
      ExperienceTimeline.tsx        # Vertical timeline with job entries
      ProjectCard.tsx               # Case study card
      CodingAchievements.tsx        # LeetCode/CF stats section
      ContactCTA.tsx                # "Let's work together" CTA
    personal/
      MosaicGrid.tsx                # Asymmetric responsive tile grid
      PortalTile.tsx                # Individual hover/click tile
    shared/
      Navbar.tsx                    # Configurable sticky nav
      ThemeToggle.tsx               # Dark/light toggle button
      BackToDoors.tsx               # Return to doorway link
      SectionHeading.tsx            # Reusable heading + subtitle
      Card.tsx                      # Base composable card
      AnimatedSection.tsx           # Scroll-triggered animation wrapper
      IconLink.tsx                  # Icon + label link
      Footer.tsx                    # Shared footer
  data/
    experience.ts                   # Work history entries
    projects.ts                     # Project case studies
    skills.ts                       # Tech stack by category
    achievements.ts                 # Coding achievements
    education.ts                    # Education entries
    personal-tiles.ts               # Mosaic tile definitions
    socials.ts                      # Social/platform links
  types/
    index.ts                        # All TypeScript interfaces
  styles/
    tokens.css                      # CSS custom properties
    globals.css                     # Global styles + Tailwind directives
  lib/
    constants.ts                    # App-wide constants
    utils.ts                        # Shared utilities (cn helper, etc.)
```

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/styles/tokens.css`, `src/styles/globals.css`
- Create: `src/lib/utils.ts`, `src/lib/constants.ts`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/1sauravdutta/Desktop/sauravdutta
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

Accept defaults. This creates the base Next.js 15 project with Tailwind and TypeScript.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion next-themes
npm install -D @tailwindcss/typography
```

- [ ] **Step 3: Add .superpowers to .gitignore**

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 4: Create design tokens CSS**

Create `src/styles/tokens.css`:

```css
@layer base {
  :root {
    /* Light Mode — Cool & Clean */
    --bg-primary: #f8fafa;
    --bg-secondary: #eef2f3;
    --bg-card: #ffffff;
    --accent: #0d7377;
    --accent-hover: #0a5c5f;
    --text-primary: #1a1a2e;
    --text-secondary: #5a6672;
    --border: #d8dee3;

    /* Animation */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
    --easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .dark {
    /* Dark Mode — Warm & Bold */
    --bg-primary: #0a0a0a;
    --bg-secondary: #1a1a1a;
    --bg-card: #1e1e1e;
    --accent: #d4a843;
    --accent-hover: #e4bc5a;
    --text-primary: #f5f0e8;
    --text-secondary: #a89f91;
    --border: #2a2520;
  }
}
```

- [ ] **Step 5: Update globals.css**

Replace `src/styles/globals.css` (or `src/app/globals.css` — wherever create-next-app placed it) with:

```css
@import "tailwindcss";
@import "./tokens.css";

@layer base {
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color var(--duration-normal) var(--easing-default),
                color var(--duration-normal) var(--easing-default);
  }
}
```

- [ ] **Step 6: Configure Tailwind with custom tokens**

Update `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        border: {
          DEFAULT: "var(--border)",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        default: "var(--easing-default)",
        spring: "var(--easing-spring)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Create utility helpers**

Create `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install peer deps:
```bash
npm install clsx tailwind-merge
```

- [ ] **Step 8: Create constants**

Create `src/lib/constants.ts`:

```ts
export const SITE_CONFIG = {
  name: "Saurav Dutta",
  title: "Software Engineer — Frontend",
  tagline: "Building high-performance frontend architectures with Next.js & React. Bridging the gap between complex engineering and fluid user experiences.",
  email: "sauravdutta99@gmail.com",
  domain: "sauravdutta.com",
} as const;

export const ROUTES = {
  home: "/",
  professional: "/professional",
  personal: "/personal",
} as const;
```

- [ ] **Step 9: Set up root layout with fonts and ThemeProvider**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 10: Create placeholder home page**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-primary">
      <h1 className="font-heading text-4xl font-bold text-text-primary">
        Saurav Dutta
      </h1>
    </main>
  );
}
```

- [ ] **Step 11: Verify dev server runs**

```bash
npm run dev
```

Expected: Server starts on localhost:3000, page shows "Saurav Dutta" with correct font and dark mode colors.

- [ ] **Step 12: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with Tailwind, tokens, and theme setup"
```

---

### Task 2: TypeScript Types & Data Layer

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`
- Create: `src/data/achievements.ts`, `src/data/education.ts`
- Create: `src/data/personal-tiles.ts`, `src/data/socials.ts`

- [ ] **Step 1: Define TypeScript interfaces**

Create `src/types/index.ts`:

```ts
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  techStack: string[];
  highlights: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: string[];
}

export interface Achievement {
  id: string;
  text: string;
  metric?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  gpa: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface PersonalTile {
  id: string;
  title: string;
  description: string;
  size: "large" | "medium" | "small";
  href?: string;
  bgImage?: string;
  icon?: string;
}

export interface NavConfig {
  showSectionLinks: boolean;
  sectionLinks?: { label: string; href: string }[];
  otherSideLabel: string;
  otherSideHref: string;
}
```

- [ ] **Step 2: Create experience data**

Create `src/data/experience.ts`:

```ts
import { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "stage",
    role: "Software Engineer — Frontend",
    company: "Stage",
    location: "Noida, Uttar Pradesh",
    startDate: "Oct 2025",
    endDate: "Present",
    highlights: [
      "Refactored OTT TV Hub UI (headers, navigation chips, FAQ layouts, scoped tab logic) using Next.js + Tailwind, driving 18% higher interaction depth.",
      "Launched Statsig experiment to conditionally hide the paywall close icon for 80% users, enforcing controlled exit behavior via cookies + routing, resulting in 5.4% increase in trial retention.",
      "Upgraded paywall experience by replacing static trial image with autoplay video and passing experiment values into events, increasing trial-to-initiation conversion by 4.8%.",
    ],
  },
  {
    id: "accenture",
    role: "Associate Software Engineer",
    company: "Accenture",
    location: "Gurugram, Haryana",
    startDate: "Oct 2023",
    endDate: "Oct 2025",
    highlights: [
      "Developed Reusable Web Components using the Lit framework, increasing software development efficiency by 35% across AngularJS, React, and Next.js projects.",
      "Coordinated with the Accessibility team and implemented ARIA attributes within web components based on WCAG guidelines, achieving a 9/10 accessibility audit score.",
      "Integrated components into existing applications by collaborating with cross-functional teams, reducing development time by 20%.",
    ],
  },
];
```

- [ ] **Step 3: Create projects data**

Create `src/data/projects.ts`:

```ts
import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "welth",
    name: "Welth",
    subtitle: "Finance Management Application",
    date: "Mar 2025",
    techStack: ["Next.js", "Supabase", "Tailwind", "Prisma", "Inngest"],
    highlights: [
      "Engineered an AI-powered financial analytics platform enabling users to track, analyze, and optimize spending with real-time insights, resulting in a 35% improvement in insight generation speed.",
      "Implemented AI-driven receipt scanning using Google's Gemini API, achieving 97%+ accuracy in extracting structured data from uploaded images.",
      "Automated monthly financial reporting by generating personalized insights from user transactions, contributing to a 65% increase in user engagement.",
    ],
    repoUrl: "#",
    liveUrl: "#",
  },
  {
    id: "customer-support",
    name: "Customer Support Messaging Web App",
    subtitle: "Full-Stack Support Platform",
    date: "Dec 2022",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript"],
    highlights: [
      "Pioneered a Full-Stack Customer Support Web Application with Node.js, Express.js, and MongoDB, with an internal user rating of 4.9/5.",
      "Produced a keyboard-accessible React.js frontend with full CRUD functionality utilizing REST API endpoints, having a 9.5/10 accessibility score.",
      "Structured the application into distinct user and employee portals, enabling streamlined ticket creation and efficient tracking.",
    ],
    repoUrl: "#",
  },
];
```

- [ ] **Step 4: Create skills data**

Create `src/data/skills.ts`:

```ts
import { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    items: ["Java", "C", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    id: "frameworks",
    name: "Frameworks",
    items: ["React.js", "Next.js", "AngularJS", "Express.js", "Node.js", "Tailwind"],
  },
  {
    id: "tools",
    name: "Developer Tools",
    items: ["Git", "VS Code"],
  },
  {
    id: "libraries",
    name: "Libraries",
    items: ["MongoDB", "MySQL", "Supabase", "FloatingUI", "Lit"],
  },
];
```

- [ ] **Step 5: Create achievements, education, socials, and personal tiles data**

Create `src/data/achievements.ts`:

```ts
import { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "leetcode",
    text: "Enhanced coding proficiency by solving 500+ algorithm challenges on LeetCode and CodeForces.",
    metric: "500+",
  },
  {
    id: "hackercup",
    text: "Aced Round 1 of Meta HackerCup 2022 and 2023.",
    metric: "2x",
  },
];
```

Create `src/data/education.ts`:

```ts
import { EducationEntry } from "@/types";

export const education: EducationEntry[] = [
  {
    id: "gtu",
    institution: "Dr. Jivraj Mehta Institute of Technology (GTU)",
    degree: "Bachelor's in Computer Engineering",
    gpa: "CGPA: 9.20",
    location: "Anand, Gujarat, India",
    startDate: "Jul 2019",
    endDate: "Jul 2023",
  },
];
```

Create `src/data/socials.ts`:

```ts
import { SocialLink } from "@/types";

export const socials: SocialLink[] = [
  { name: "LinkedIn", url: "#", icon: "linkedin" },
  { name: "GitHub", url: "#", icon: "github" },
  { name: "LeetCode", url: "#", icon: "leetcode" },
  { name: "CodeForces", url: "#", icon: "codeforces" },
  { name: "Email", url: "mailto:sauravdutta99@gmail.com", icon: "mail" },
];
```

Create `src/data/personal-tiles.ts`:

```ts
import { PersonalTile } from "@/types";

export const personalTiles: PersonalTile[] = [
  {
    id: "music",
    title: "Music & Guitar",
    description: "Strings, melodies, and everything in between.",
    size: "large",
    href: "/personal/music",
  },
  {
    id: "travel",
    title: "Travel",
    description: "Places explored, memories collected.",
    size: "large",
    href: "/personal/travel",
  },
  {
    id: "fitness",
    title: "Fitness",
    description: "Discipline. Consistency. Growth.",
    size: "medium",
    href: "/personal/fitness",
  },
  {
    id: "code-life",
    title: "Code Life",
    description: "The culture behind the code — setups, hackathons, stories.",
    size: "medium",
  },
  {
    id: "tech-geek",
    title: "Tech Geek",
    description: "Gadgets, setups, and hot takes.",
    size: "medium",
  },
  {
    id: "about",
    title: "About Me",
    description: "The human behind the screen.",
    size: "small",
  },
  {
    id: "socials",
    title: "Socials",
    description: "Find me everywhere.",
    size: "small",
  },
];
```

- [ ] **Step 6: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add src/types src/data
git commit -m "feat: add TypeScript types and data layer for all content"
```

---

### Task 3: Shared Components

**Files:**
- Create: `src/components/shared/Navbar.tsx`
- Create: `src/components/shared/ThemeToggle.tsx`
- Create: `src/components/shared/BackToDoors.tsx`
- Create: `src/components/shared/SectionHeading.tsx`
- Create: `src/components/shared/Card.tsx`
- Create: `src/components/shared/AnimatedSection.tsx`
- Create: `src/components/shared/IconLink.tsx`
- Create: `src/components/shared/Footer.tsx`

- [ ] **Step 1: Create ThemeToggle component**

Create `src/components/shared/ThemeToggle.tsx`:

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-card text-text-primary transition-colors duration-fast hover:bg-accent hover:text-bg-primary"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      )}
    </button>
  );
}
```

- [ ] **Step 2: Create BackToDoors component**

Create `src/components/shared/BackToDoors.tsx`:

```tsx
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export function BackToDoors() {
  return (
    <Link
      href={ROUTES.home}
      className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
    >
      Back to Doors
    </Link>
  );
}
```

- [ ] **Step 3: Create Navbar component**

Create `src/components/shared/Navbar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { BackToDoors } from "./BackToDoors";
import type { NavConfig } from "@/types";

interface NavbarProps {
  config: NavConfig;
}

export function Navbar({ config }: NavbarProps) {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-heading text-lg font-bold text-text-primary">
          {SITE_CONFIG.name}
        </Link>

        {config.showSectionLinks && config.sectionLinks && (
          <div className="hidden items-center gap-6 md:flex">
            {config.sectionLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <BackToDoors />
          <Link
            href={config.otherSideHref}
            className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
          >
            {config.otherSideLabel}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Create SectionHeading component**

Create `src/components/shared/SectionHeading.tsx`:

```tsx
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-lg text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Create Card component**

Create `src/components/shared/Card.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-card p-6",
        hover && "transition-all duration-normal hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Create AnimatedSection component**

Create `src/components/shared/AnimatedSection.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function AnimatedSection({ children, className, id, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn("py-16 md:py-24", className)}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 7: Create IconLink component**

Create `src/components/shared/IconLink.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface IconLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export function IconLink({ href, label, icon, className }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 text-text-secondary transition-colors duration-fast hover:text-accent",
        className
      )}
      aria-label={label}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </a>
  );
}
```

- [ ] **Step 8: Create Footer component**

Create `src/components/shared/Footer.tsx`:

```tsx
import { SITE_CONFIG } from "@/lib/constants";

interface FooterProps {
  variant?: "professional" | "personal";
}

export function Footer({ variant = "professional" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary py-8">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-text-secondary">
        <p>&copy; {year} {SITE_CONFIG.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 9: Verify dev server still runs with all components**

```bash
npm run dev
```

Expected: No errors. Page still renders.

- [ ] **Step 10: Commit**

```bash
git add src/components/shared
git commit -m "feat: add shared components — Navbar, ThemeToggle, Card, AnimatedSection, Footer"
```

---

### Task 4: Doorway Landing Page

**Files:**
- Create: `src/components/doorway/EntrySequence.tsx`
- Create: `src/components/doorway/SplitDoor.tsx`
- Create: `src/components/doorway/DoorPanel.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create DoorPanel component**

Create `src/components/doorway/DoorPanel.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DoorPanelProps {
  title: string;
  subtitle: string;
  side: "left" | "right";
  isHovered: boolean;
  isOtherHovered: boolean;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function DoorPanel({
  title,
  subtitle,
  side,
  isHovered,
  isOtherHovered,
  onClick,
  onHoverStart,
  onHoverEnd,
}: DoorPanelProps) {
  return (
    <motion.div
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center overflow-hidden",
        side === "left" ? "border-r border-border" : "border-l border-border"
      )}
      animate={{
        flex: isHovered ? 1.6 : isOtherHovered ? 0.4 : 1,
        opacity: isOtherHovered ? 0.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.h2
        className="font-heading text-3xl font-bold text-text-primary md:text-5xl"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="mt-4 text-center text-text-secondary md:text-lg"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        {subtitle}
      </motion.p>

      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-accent/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create SplitDoor component**

Create `src/components/doorway/SplitDoor.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DoorPanel } from "./DoorPanel";
import { ROUTES } from "@/lib/constants";

interface SplitDoorProps {
  onChoose: (side: "professional" | "personal") => void;
}

export function SplitDoor({ onChoose }: SplitDoorProps) {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  return (
    <div className="flex h-screen w-full">
      <DoorPanel
        title="The Professional"
        subtitle="Experience. Projects. Skills."
        side="left"
        isHovered={hoveredSide === "left"}
        isOtherHovered={hoveredSide === "right"}
        onClick={() => onChoose("professional")}
        onHoverStart={() => setHoveredSide("left")}
        onHoverEnd={() => setHoveredSide(null)}
      />
      <DoorPanel
        title="The Person"
        subtitle="Music. Travel. Fitness. Life."
        side="right"
        isHovered={hoveredSide === "right"}
        isOtherHovered={hoveredSide === "left"}
        onClick={() => onChoose("personal")}
        onHoverStart={() => setHoveredSide("right")}
        onHoverEnd={() => setHoveredSide(null)}
      />
    </div>
  );
}
```

- [ ] **Step 3: Create EntrySequence component**

Create `src/components/doorway/EntrySequence.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SplitDoor } from "./SplitDoor";
import { SITE_CONFIG, ROUTES } from "@/lib/constants";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

type Phase = "name" | "choose" | "split" | "zooming";

export function EntrySequence() {
  const [phase, setPhase] = useState<Phase>("name");
  const [chosenSide, setChosenSide] = useState<"professional" | "personal" | null>(null);
  const router = useRouter();

  const handleChoose = (side: "professional" | "personal") => {
    setChosenSide(side);
    setPhase("zooming");
    setTimeout(() => {
      router.push(side === "professional" ? ROUTES.professional : ROUTES.personal);
    }, 500);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-bg-primary">
      <div className="absolute right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {phase === "name" && (
          <motion.div
            key="name"
            className="flex h-full flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1
              className="font-heading text-5xl font-bold text-text-primary md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {SITE_CONFIG.name}
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-text-secondary md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onAnimationComplete={() => {
                setTimeout(() => setPhase("choose"), 800);
              }}
            >
              Software Engineer. Musician. Explorer.
            </motion.p>
          </motion.div>
        )}

        {phase === "choose" && (
          <motion.div
            key="choose"
            className="flex h-full items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="font-heading text-4xl font-bold text-text-primary md:text-6xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              onAnimationComplete={() => {
                setTimeout(() => setPhase("split"), 1000);
              }}
            >
              Choose your side.
            </motion.h2>
          </motion.div>
        )}

        {(phase === "split" || phase === "zooming") && (
          <motion.div
            key="split"
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === "zooming" ? 0 : 1,
              scale: phase === "zooming" ? 1.2 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <SplitDoor onChoose={handleChoose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 4: Wire up the doorway page**

Replace `src/app/page.tsx`:

```tsx
import { EntrySequence } from "@/components/doorway/EntrySequence";

export default function Home() {
  return <EntrySequence />;
}
```

- [ ] **Step 5: Test in browser**

```bash
npm run dev
```

Expected: Name fades in → "Choose your side." appears → split doors reveal → hovering expands sides → clicking triggers zoom and navigates (to 404 for now, which is fine).

- [ ] **Step 6: Commit**

```bash
git add src/components/doorway src/app/page.tsx
git commit -m "feat: add doorway landing page with 3-beat entry sequence and split door interaction"
```

---

### Task 5: Professional Side — Page & Hero

**Files:**
- Create: `src/app/professional/page.tsx`
- Create: `src/components/professional/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/professional/Hero.tsx`:

```tsx
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { socials } from "@/data/socials";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function Hero() {
  return (
    <AnimatedSection id="hero" className="pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Frontend Engineer
            </p>
            <h1 className="mt-4 font-heading text-5xl font-bold leading-tight text-text-primary md:text-7xl">
              {SITE_CONFIG.name}.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
              {SITE_CONFIG.tagline}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-accent">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              Currently at Stage
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border px-4 py-2 text-sm text-text-secondary transition-colors duration-fast hover:border-accent hover:text-accent"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-2 border-border md:h-80 md:w-80">
            <div className="flex h-full w-full items-center justify-center bg-bg-secondary text-text-secondary">
              Photo
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 2: Create professional page**

Create `src/app/professional/page.tsx`:

```tsx
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/professional/Hero";
import { ROUTES } from "@/lib/constants";
import type { NavConfig } from "@/types";

const navConfig: NavConfig = {
  showSectionLinks: true,
  sectionLinks: [
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Education", href: "#education" },
  ],
  otherSideLabel: "The Person",
  otherSideHref: ROUTES.personal,
};

export default function ProfessionalPage() {
  return (
    <>
      <Navbar config={navConfig} />
      <main className="bg-bg-primary">
        <Hero />
        {/* Remaining sections added in subsequent tasks */}
      </main>
      <Footer variant="professional" />
    </>
  );
}
```

- [ ] **Step 3: Test navigation from doorway to professional page**

```bash
npm run dev
```

Expected: Clicking "The Professional" door navigates to `/professional` with Navbar, Hero, and Footer visible.

- [ ] **Step 4: Commit**

```bash
git add src/app/professional src/components/professional/Hero.tsx
git commit -m "feat: add professional page with Hero section and nav"
```

---

### Task 6: Professional Side — Tech Stack & Experience Timeline

**Files:**
- Create: `src/components/professional/TechStackGrid.tsx`
- Create: `src/components/professional/ExperienceTimeline.tsx`
- Modify: `src/app/professional/page.tsx`

- [ ] **Step 1: Create TechStackGrid component**

Create `src/components/professional/TechStackGrid.tsx`:

```tsx
import { skills } from "@/data/skills";
import { Card } from "@/components/shared/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function TechStackGrid() {
  return (
    <AnimatedSection id="skills">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="Technical Proficiency" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((category) => (
            <Card key={category.id}>
              <h3 className="mb-4 font-heading text-lg font-semibold text-accent">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-bg-secondary px-3 py-1 text-sm text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 2: Create ExperienceTimeline component**

Create `src/components/professional/ExperienceTimeline.tsx`:

```tsx
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function ExperienceTimeline() {
  return (
    <AnimatedSection id="experience">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="Career Evolution" subtitle="Dedicated to building seamless digital experiences." />
        <div className="relative ml-4 border-l-2 border-border pl-8 md:ml-8">
          {experience.map((entry, index) => (
            <div key={entry.id} className="relative mb-12 last:mb-0">
              <div className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full border-2 border-accent bg-bg-primary" />
              <div className="mb-1 text-sm text-text-secondary">
                {entry.startDate} — {entry.endDate}
              </div>
              <h3 className="font-heading text-xl font-bold text-text-primary">
                {entry.role}
              </h3>
              <p className="text-accent">
                {entry.company} <span className="text-text-secondary">· {entry.location}</span>
              </p>
              <ul className="mt-4 space-y-2">
                {entry.highlights.map((highlight, i) => (
                  <li key={i} className="text-text-secondary before:mr-2 before:text-accent before:content-['•']">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 3: Add sections to professional page**

In `src/app/professional/page.tsx`, add imports and place after `<Hero />`:

```tsx
import { TechStackGrid } from "@/components/professional/TechStackGrid";
import { ExperienceTimeline } from "@/components/professional/ExperienceTimeline";
```

```tsx
<Hero />
<TechStackGrid />
<ExperienceTimeline />
```

- [ ] **Step 4: Test scroll and animations**

```bash
npm run dev
```

Expected: Skills grid and timeline visible with scroll-triggered fade-in animations.

- [ ] **Step 5: Commit**

```bash
git add src/components/professional/TechStackGrid.tsx src/components/professional/ExperienceTimeline.tsx src/app/professional/page.tsx
git commit -m "feat: add TechStackGrid and ExperienceTimeline to professional page"
```

---

### Task 7: Professional Side — Projects, Achievements, Education, CTA

**Files:**
- Create: `src/components/professional/ProjectCard.tsx`
- Create: `src/components/professional/CodingAchievements.tsx`
- Create: `src/components/professional/ContactCTA.tsx`
- Modify: `src/app/professional/page.tsx`

- [ ] **Step 1: Create ProjectCard component**

Create `src/components/professional/ProjectCard.tsx`:

```tsx
import { Card } from "@/components/shared/Card";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold text-text-primary">
            {project.name}
          </h3>
          <p className="text-sm text-text-secondary">{project.subtitle}</p>
        </div>
        <span className="whitespace-nowrap text-sm text-text-secondary">{project.date}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="mb-6 flex-1 space-y-2">
        {project.highlights.map((highlight, i) => (
          <li key={i} className="text-sm text-text-secondary before:mr-2 before:text-accent before:content-['•']">
            {highlight}
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent transition-colors duration-fast hover:text-accent-hover"
          >
            Repository
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent transition-colors duration-fast hover:text-accent-hover"
          >
            Live Site
          </a>
        )}
      </div>
    </Card>
  );
}
```

- [ ] **Step 2: Create CodingAchievements component**

Create `src/components/professional/CodingAchievements.tsx`:

```tsx
import { achievements } from "@/data/achievements";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card } from "@/components/shared/Card";

export function CodingAchievements() {
  return (
    <>
      <AnimatedSection id="achievements">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Coding Achievements" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {achievements.map((item) => (
              <Card key={item.id} className="flex items-center gap-6">
                {item.metric && (
                  <span className="font-heading text-3xl font-bold text-accent">
                    {item.metric}
                  </span>
                )}
                <p className="text-text-secondary">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="education">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Education" />
          {education.map((entry) => (
            <Card key={entry.id} hover={false}>
              <h3 className="font-heading text-xl font-bold text-text-primary">
                {entry.degree}
              </h3>
              <p className="mt-1 text-accent">{entry.institution}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-text-secondary">
                <span>{entry.gpa}</span>
                <span>{entry.location}</span>
                <span>{entry.startDate} — {entry.endDate}</span>
              </div>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </>
  );
}
```

- [ ] **Step 3: Create ContactCTA component**

Create `src/components/professional/ContactCTA.tsx`:

```tsx
import { SITE_CONFIG } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function ContactCTA() {
  return (
    <AnimatedSection className="bg-bg-secondary">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-heading text-4xl font-bold text-text-primary md:text-5xl">
          Let&apos;s ship something{" "}
          <span className="text-accent">epic.</span>
        </h2>
        <p className="mt-4 text-lg text-text-secondary">
          Currently open for frontend engineering opportunities and collaborative ventures.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="rounded-full bg-accent px-8 py-3 font-medium text-bg-primary transition-colors duration-fast hover:bg-accent-hover"
          >
            Send a Message
          </a>
          <a
            href="#"
            className="rounded-full border border-border px-8 py-3 font-medium text-text-primary transition-colors duration-fast hover:border-accent hover:text-accent"
          >
            My Portfolio
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 4: Wire up all remaining sections in professional page**

Update `src/app/professional/page.tsx` — add imports and components:

```tsx
import { ProjectCard } from "@/components/professional/ProjectCard";
import { CodingAchievements } from "@/components/professional/CodingAchievements";
import { ContactCTA } from "@/components/professional/ContactCTA";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
```

After `<ExperienceTimeline />`:

```tsx
<AnimatedSection id="projects">
  <div className="mx-auto max-w-7xl px-6">
    <SectionHeading title="Selected Case Studies" />
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
</AnimatedSection>
<CodingAchievements />
<ContactCTA />
```

- [ ] **Step 5: Test complete professional page**

```bash
npm run dev
```

Expected: Full professional page with Hero → Tech Stack → Experience → Projects → Achievements → Education → CTA → Footer, all with scroll animations.

- [ ] **Step 6: Commit**

```bash
git add src/components/professional src/app/professional/page.tsx
git commit -m "feat: complete professional page with projects, achievements, education, and CTA"
```

---

### Task 8: Personal Side — Mosaic Hub

**Files:**
- Create: `src/components/personal/PortalTile.tsx`
- Create: `src/components/personal/MosaicGrid.tsx`
- Create: `src/app/personal/page.tsx`

- [ ] **Step 1: Create PortalTile component**

Create `src/components/personal/PortalTile.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PersonalTile } from "@/types";

interface PortalTileProps {
  tile: PersonalTile;
}

const sizeClasses: Record<PersonalTile["size"], string> = {
  large: "col-span-2 row-span-2",
  medium: "col-span-1 row-span-2",
  small: "col-span-1 row-span-1",
};

export function PortalTile({ tile }: PortalTileProps) {
  const Wrapper = tile.href ? Link : "div";
  const wrapperProps = tile.href ? { href: tile.href } : {};

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-bg-card",
        sizeClasses[tile.size]
      )}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Wrapper
        {...wrapperProps}
        className="flex h-full min-h-[200px] flex-col justify-end p-6"
      >
        {tile.bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-normal group-hover:scale-105"
            style={{ backgroundImage: `url(${tile.bgImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/40 to-transparent" />
        <div className="relative z-10">
          <h3 className="font-heading text-xl font-bold text-text-primary md:text-2xl">
            {tile.title}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{tile.description}</p>
        </div>
        {tile.href && (
          <div className="relative z-10 mt-3 text-xs font-medium text-accent opacity-0 transition-opacity duration-fast group-hover:opacity-100">
            Explore &rarr;
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create MosaicGrid component**

Create `src/components/personal/MosaicGrid.tsx`:

```tsx
import { personalTiles } from "@/data/personal-tiles";
import { PortalTile } from "./PortalTile";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function MosaicGrid() {
  return (
    <AnimatedSection className="pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="The Person."
          subtitle="Beyond the code — a peek into my world."
        />
        <div className="grid auto-rows-[140px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {personalTiles.map((tile) => (
            <PortalTile key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 3: Create personal page**

Create `src/app/personal/page.tsx`:

```tsx
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MosaicGrid } from "@/components/personal/MosaicGrid";
import { ROUTES } from "@/lib/constants";
import type { NavConfig } from "@/types";

const navConfig: NavConfig = {
  showSectionLinks: false,
  otherSideLabel: "The Professional",
  otherSideHref: ROUTES.professional,
};

export default function PersonalPage() {
  return (
    <>
      <Navbar config={navConfig} />
      <main className="bg-bg-primary">
        <MosaicGrid />
      </main>
      <Footer variant="personal" />
    </>
  );
}
```

- [ ] **Step 4: Test full flow: doorway → personal side**

```bash
npm run dev
```

Expected: Clicking "The Person" door navigates to `/personal` with mosaic grid of tiles, hover effects work, tiles with `href` show "Explore →" on hover.

- [ ] **Step 5: Commit**

```bash
git add src/components/personal src/app/personal
git commit -m "feat: add personal page with mosaic grid and portal tiles"
```

---

### Task 9: Polish, Responsiveness & Final Touches

**Files:**
- Modify: `src/components/doorway/EntrySequence.tsx` (mobile adjustments)
- Modify: `src/components/shared/Navbar.tsx` (mobile menu)
- Modify: Various components for responsive tweaks

- [ ] **Step 1: Add mobile hamburger menu to Navbar**

Update `src/components/shared/Navbar.tsx` — add a mobile toggle state and slide-down menu:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { BackToDoors } from "./BackToDoors";
import type { NavConfig } from "@/types";

interface NavbarProps {
  config: NavConfig;
}

export function Navbar({ config }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-heading text-lg font-bold text-text-primary">
          {SITE_CONFIG.name}
        </Link>

        {config.showSectionLinks && config.sectionLinks && (
          <div className="hidden items-center gap-6 md:flex">
            {config.sectionLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        <div className="hidden items-center gap-4 md:flex">
          <BackToDoors />
          <Link
            href={config.otherSideHref}
            className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
          >
            {config.otherSideLabel}
          </Link>
          <ThemeToggle />
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center text-text-primary md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-bg-primary md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {config.showSectionLinks &&
                config.sectionLinks?.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-sm text-text-secondary hover:text-accent"
                  >
                    {link.label}
                  </button>
                ))}
              <BackToDoors />
              <Link
                href={config.otherSideHref}
                className="text-sm text-text-secondary hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {config.otherSideLabel}
              </Link>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Add metadata for SEO**

Update `src/app/professional/page.tsx` — add metadata export:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saurav Dutta | Professional Portfolio",
  description: "Frontend Engineer with experience at Stage and Accenture. Next.js, React, TypeScript.",
};
```

Update `src/app/personal/page.tsx` — add metadata export:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saurav Dutta | The Person",
  description: "Music, travel, fitness, and the human behind the code.",
};
```

- [ ] **Step 3: Test responsiveness across breakpoints**

```bash
npm run dev
```

Test at: 375px (mobile), 768px (tablet), 1280px (desktop).

Expected: Mobile menu works, grid collapses to single column on mobile, doorway panels stack or remain side-by-side with adjusted text sizes, all animations still smooth.

- [ ] **Step 4: Run build to verify SSG**

```bash
npm run build
```

Expected: All pages statically generated, no errors.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add mobile nav, SEO metadata, and responsive polish"
```

---

### Task 10: Vercel Deployment Setup

**Files:**
- Verify: `next.config.ts` has correct settings
- Verify: Build passes

- [ ] **Step 1: Verify next.config.ts is production-ready**

Ensure `next.config.ts` has:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

Note: If using Next.js Image optimization, remove `output: "export"` and let Vercel handle it natively. For static export with placeholder images, `output: "export"` works. Decide based on whether real images are ready.

- [ ] **Step 2: Run final build**

```bash
npm run build
```

Expected: Successful build with all pages generated.

- [ ] **Step 3: Test production build locally**

```bash
npx serve out
```

(If using static export) or:

```bash
npm run start
```

Expected: Site works identically to dev mode.

- [ ] **Step 4: Commit final state**

```bash
git add .
git commit -m "chore: finalize build config for Vercel deployment"
```

- [ ] **Step 5: Deploy to Vercel**

```bash
npx vercel --prod
```

Or connect the GitHub repo to Vercel dashboard and push. Point sauravdutta.com domain in Vercel settings.

---

## Summary

| Task | What It Builds |
|------|---------------|
| 1 | Project scaffolding, tokens, theme, fonts |
| 2 | TypeScript types + all data files |
| 3 | Shared reusable components |
| 4 | Doorway landing page with 3-beat animation |
| 5 | Professional page + Hero section |
| 6 | Tech Stack grid + Experience timeline |
| 7 | Projects, Achievements, Education, CTA |
| 8 | Personal mosaic hub with portal tiles |
| 9 | Mobile nav, responsiveness, SEO |
| 10 | Build verification + Vercel deployment |
