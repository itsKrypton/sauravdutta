import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { resolve } from "path";

const client = createClient({
  projectId: "ipcra9ha",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// ── Static data (copied from src/data/) ──

const experience = [
  {
    _type: "experience",
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
    _type: "experience",
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

const projects = [
  {
    _type: "project",
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
  },
  {
    _type: "project",
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
  },
];

const skills = [
  { _type: "skillCategory", id: "languages", name: "Languages", items: ["Java", "C", "JavaScript", "TypeScript", "HTML/CSS"], orderRank: 1 },
  { _type: "skillCategory", id: "frameworks", name: "Frameworks", items: ["React.js", "Next.js", "Express.js", "Node.js", "Tailwind"], orderRank: 2 },
  { _type: "skillCategory", id: "ai", name: "AI & LLMs", items: ["Gemini API", "Claude Code", "Codex", "MCPs", "Prompt Engineering", "AI-Native Development"], orderRank: 3 },
  { _type: "skillCategory", id: "tools", name: "Developer Tools", items: ["Git", "VS Code"], orderRank: 4 },
  { _type: "skillCategory", id: "libraries", name: "Libraries", items: ["MongoDB", "MySQL", "Supabase", "FloatingUI", "Lit"], orderRank: 5 },
];

const achievements = [
  { _type: "achievement", id: "leetcode", text: "Enhanced coding proficiency by solving 500+ algorithm challenges on LeetCode and CodeForces.", metric: "500+" },
  { _type: "achievement", id: "hackercup", text: "Aced Round 1 of Meta HackerCup 2022 and 2023.", metric: "2x" },
];

const education = [
  {
    _type: "education",
    id: "gtu",
    institution: "Dr. Jivraj Mehta Institute of Technology (GTU)",
    degree: "Bachelor's in Computer Engineering",
    gpa: "CGPA: 9.20",
    location: "Anand, Gujarat, India",
    startDate: "Jul 2019",
    endDate: "Jul 2023",
  },
];

const personalTiles = [
  { _type: "personalTile", id: "music", title: "Music & Guitar", description: "Strings, melodies, and everything in between.", size: "large", href: "/personal/music", orderRank: 1 },
  { _type: "personalTile", id: "travel", title: "Travel", description: "Places explored, memories collected.", size: "large", href: "/personal/travel", orderRank: 2 },
  { _type: "personalTile", id: "fitness", title: "Fitness", description: "Discipline. Consistency. Growth.", size: "medium", href: "/personal/fitness", orderRank: 3 },
  { _type: "personalTile", id: "code-life", title: "Code Life", description: "The culture behind the code — setups, hackathons, stories.", size: "medium", orderRank: 4 },
  { _type: "personalTile", id: "tech-geek", title: "Tech Geek", description: "Gadgets, setups, and hot takes.", size: "medium", orderRank: 5 },
  { _type: "personalTile", id: "about", title: "About Me", description: "The human behind the screen.", size: "small", orderRank: 6 },
  { _type: "personalTile", id: "socials", title: "Socials", description: "Find me everywhere.", size: "small", orderRank: 7 },
];

const socials = [
  { _type: "socialLink", name: "LinkedIn", url: "#", icon: "linkedin", orderRank: 1 },
  { _type: "socialLink", name: "GitHub", url: "#", icon: "github", orderRank: 2 },
  { _type: "socialLink", name: "LeetCode", url: "#", icon: "leetcode", orderRank: 3 },
  { _type: "socialLink", name: "CodeForces", url: "#", icon: "codeforces", orderRank: 4 },
  { _type: "socialLink", name: "Email", url: "mailto:sauravdutta99@gmail.com", icon: "mail", orderRank: 5 },
];

const siteSettings = {
  _type: "siteSettings",
  _id: "siteSettings",
  name: "Saurav Dutta",
  title: "Software Engineer — Frontend",
  tagline: "Building high-performance frontend architectures with Next.js & React. Bridging the gap between complex engineering and fluid user experiences.",
  email: "sauravdutta99@gmail.com",
  domain: "sauravdutta.com",
};

// ── Upload images ──

async function uploadImage(filePath) {
  const stream = createReadStream(filePath);
  return client.assets.upload("image", stream, {
    filename: filePath.split("/").pop(),
  });
}

// ── Seed ──

async function seed() {
  console.log("Seeding Sanity...\n");

  const transaction = client.transaction();

  // Site settings (with images)
  console.log("Uploading headshot...");
  const headshot = await uploadImage(resolve("public/images/headshot.jpg"));
  console.log("Uploading casual photo...");
  const casualPhoto = await uploadImage(resolve("public/images/casual.jpg"));

  transaction.createOrReplace({
    ...siteSettings,
    headshot: { _type: "image", asset: { _type: "reference", _ref: headshot._id } },
    casualPhoto: { _type: "image", asset: { _type: "reference", _ref: casualPhoto._id } },
  });
  console.log("✓ Site Settings (with images)");

  // Experience
  for (const entry of experience) {
    transaction.createOrReplace({ ...entry, _id: `experience-${entry.id}` });
  }
  console.log(`✓ Experience (${experience.length} entries)`);

  // Projects
  for (const entry of projects) {
    transaction.createOrReplace({ ...entry, _id: `project-${entry.id}` });
  }
  console.log(`✓ Projects (${projects.length} entries)`);

  // Skills
  for (const entry of skills) {
    transaction.createOrReplace({ ...entry, _id: `skill-${entry.id}` });
  }
  console.log(`✓ Skills (${skills.length} categories)`);

  // Achievements
  for (const entry of achievements) {
    transaction.createOrReplace({ ...entry, _id: `achievement-${entry.id}` });
  }
  console.log(`✓ Achievements (${achievements.length} entries)`);

  // Education
  for (const entry of education) {
    transaction.createOrReplace({ ...entry, _id: `education-${entry.id}` });
  }
  console.log(`✓ Education (${education.length} entries)`);

  // Personal tiles
  for (const entry of personalTiles) {
    transaction.createOrReplace({ ...entry, _id: `tile-${entry.id}` });
  }
  console.log(`✓ Personal Tiles (${personalTiles.length} tiles)`);

  // Socials
  for (const entry of socials) {
    transaction.createOrReplace({ ...entry, _id: `social-${entry.name.toLowerCase()}` });
  }
  console.log(`✓ Social Links (${socials.length} links)`);

  console.log("\nCommitting transaction...");
  await transaction.commit();
  console.log("\n✅ Done! All data seeded to Sanity.");
  console.log("Refresh your Studio at localhost:3000/studio to see the content.");
}

seed().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
