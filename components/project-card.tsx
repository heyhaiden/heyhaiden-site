import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectTitleCardImage } from "@/components/project-title-card-image";
import { Card, Pill } from "@/components/ui";
import { cn } from "@/lib/utils";

const CARD_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group rounded-xl flex flex-col overflow-hidden",
        "transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      <Card className="flex flex-1 flex-col overflow-hidden transition-shadow duration-200 group-hover:shadow-md">
        {project.titleCard ? (
          <ProjectTitleCardImage
            project={project}
            sizes={CARD_IMAGE_SIZES}
            priority={priority}
            className="shrink-0"
          />
        ) : (
          <div
            className={`aspect-video shrink-0 flex items-center justify-center ${project.accentColor.split(" ")[0]}`}
          >
            <span className="text-xs font-medium uppercase tracking-wider opacity-40">
              {project.category}
            </span>
          </div>
        )}

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
            {project.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <Pill key={tag} className="rounded px-2">
                  {tag}
                </Pill>
              ))}
            </div>
            <ArrowRight
              aria-hidden
              className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
