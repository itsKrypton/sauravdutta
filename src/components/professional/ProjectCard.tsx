import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass-card group relative overflow-hidden rounded-3xl transition-all duration-slow hover:shadow-[0_0_40px_var(--accent-glow)]">
      {/* Gradient image placeholder */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-tr from-accent/20 to-accent-hover/20">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-bg-primary/80 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-20 p-10">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="font-heading text-2xl font-bold text-text-primary transition-colors group-hover:text-accent">
              {project.name}
            </h3>
            {project.subtitle && (
              <p className="mt-1 text-sm text-text-secondary">
                {project.subtitle}
              </p>
            )}
          </div>
          {/* Arrow icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/50 bg-bg-card/30 transition-all group-hover:bg-accent group-hover:text-bg-primary">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>

        {/* Highlights */}
        <ul className="mb-8 space-y-2 text-sm leading-relaxed text-text-secondary">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 text-accent">&#9657;</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Tech tags with accent borders */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.repoUrl || project.liveUrl) && (
          <div className="mt-6 flex items-center gap-4 border-t border-border/30 pt-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
              >
                Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary transition-colors duration-fast hover:text-accent"
              >
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
