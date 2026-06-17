"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { projects, allTags } from "@/lib/projects";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered =
    activeTags.length === 0
      ? projects
      : projects.filter((p) => activeTags.some((tag) => p.tags.includes(tag)));

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 pt-20 pb-16">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-muted-foreground mb-10">
        A collection of AI products, agentic systems, and hardware builds.
      </p>

      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by tag">
        <button
          type="button"
          onClick={() => setActiveTags([])}
          aria-pressed={activeTags.length === 0}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer",
            activeTags.length === 0
              ? "bg-primary text-white border-primary"
              : "border-border text-gray-600 hover:border-gray-400"
          )}
        >
          All
        </button>
        {allTags.map((tag) => {
          const selected = activeTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              aria-pressed={selected}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer",
                selected
                  ? "bg-primary text-white border-primary"
                  : "border-border text-gray-600 hover:border-gray-400"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No projects match the selected tags.{" "}
          <button
            type="button"
            onClick={() => setActiveTags([])}
            className="text-primary hover:underline"
          >
            Clear filters
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
