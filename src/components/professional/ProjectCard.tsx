import Card from "@/components/shared/Card";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-xl font-bold text-text-primary">
              {project.name}
            </h3>
            <p className="text-sm text-text-secondary">{project.subtitle}</p>
          </div>
          <span className="shrink-0 text-sm text-text-secondary">
            {project.date}
          </span>
        </div>
      </div>

      {/* Tech stack */}
      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <ul className="mb-6 flex-1 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
        {project.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      {/* Links */}
      <div className="flex items-center gap-4 border-t border-border pt-4">
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
    </Card>
  );
}
