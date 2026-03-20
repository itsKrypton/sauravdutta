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
