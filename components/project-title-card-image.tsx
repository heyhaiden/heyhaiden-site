import Image from "next/image";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectTitleCardImageProps = {
  project: Pick<Project, "title" | "titleCard" | "titleCardPosition" | "titleCardScale">;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function ProjectTitleCardImage({
  project,
  sizes,
  priority = false,
  className,
}: ProjectTitleCardImageProps) {
  if (!project.titleCard) return null;

  const scale = project.titleCardScale ?? 1;

  return (
    <div className={cn("relative aspect-video overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={
          scale !== 1
            ? { transform: `scale(${scale})`, transformOrigin: "center center" }
            : undefined
        }
      >
        <Image
          src={project.titleCard}
          alt={project.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={
            project.titleCardPosition
              ? { objectPosition: project.titleCardPosition }
              : undefined
          }
        />
      </div>
    </div>
  );
}
