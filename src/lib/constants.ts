export const SITE_CONFIG = {
  name: "Saurav Dutta",
  title: "Software Engineer — Frontend",
  tagline:
    "Building high-performance frontend architectures with Next.js & React. Bridging the gap between complex engineering and fluid user experiences.",
  subtitle: "Software Engineer. Guitarist. Fitness Enthusiast. Explorer.",
  email: "sauravdutta99@gmail.com",
  domain: "sauravdutta.com",
  currentRole: "Frontend Engineer",
  currentCompany: "STAGE",
} as const;

export const ROUTES = {
  home: "/",
  professional: "/professional",
  personal: "/personal",
} as const;

export const DOORWAY = {
  chooseText: "Choose your side.",
  professional: {
    title: "The Professional",
    subtitle: "Experience. Projects. Skills.",
  },
  personal: {
    title: "The Person",
    subtitle: "Music. Travel. Fitness. Life.",
  },
} as const;

export const SECTIONS = {
  skills: { title: "Technical Proficiency" },
  experience: {
    title: "Career Evolution",
    subtitle: "A timeline of roles, impact, and growth.",
  },
  projects: {
    title: "Selected Case Studies",
    subtitle: "Projects that showcase engineering depth and product thinking.",
  },
  achievements: {
    title: "Coding Achievements",
    subtitle: "Competitive programming milestones and recognitions.",
  },
  education: { title: "Education" },
  personal: {
    title: "The Person.",
    subtitle: "Beyond the code — a peek into my world.",
  },
  cta: {
    heading: "Let's ship something",
    accent: "epic.",
    subtitle:
      "I'm always open to discussing new opportunities, interesting projects, and ways to create impact together.",
    primaryButton: "Send a Message",
    secondaryButton: "Download Resume",
  },
} as const;

export const NAV_LABELS = {
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  achievements: "Achievements",
  education: "Education",
  backToDoors: "Back to Doors",
} as const;
