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
    repoUrl: "https://github.com/itsKrypton/welth",
    liveUrl: "https://welth-theta.vercel.app/",
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
    repoUrl: "https://github.com/itsKrypton/CSMessagingApp",
  },
];
