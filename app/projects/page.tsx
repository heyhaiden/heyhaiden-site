"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { projects, allTags } from "@/lib/projects";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Projects</h1>
      <p className="text-gray-600 mb-10">
        A collection of AI products, agentic systems, and hardware builds.
      </p>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTag(null)}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer",
            activeTag === null
              ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
              : "border-[hsl(var(--border))] text-gray-600 hover:border-gray-400"
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer",
              activeTag === tag
                ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                : "border-[hsl(var(--border))] text-gray-600 hover:border-gray-400"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-lg border border-[hsl(var(--border))] bg-white hover:-translate-y-1 transition-transform duration-200 overflow-hidden flex flex-col"
          >
            {/* Color accent header */}
            <div className={`h-2 w-full ${project.accentColor.split(" ")[0]}`} />

            <div className="p-5 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${project.accentColor}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-[hsl(var(--primary))] transition-colors leading-snug">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                {project.shortDescription}
              </p>

              {/* Arrow */}
              <div className="mt-4 flex items-center justify-end">
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[hsl(var(--primary))] transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
