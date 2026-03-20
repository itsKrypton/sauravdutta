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
