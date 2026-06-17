"use client";

import Image from "next/image";
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
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
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
              ? "bg-primary text-white border-primary"
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
                ? "bg-primary text-white border-primary"
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
            className="group rounded-lg overflow-hidden border bg-white hover:-translate-y-1 transition-transform duration-200"
          >
            {/* Hero image or accent fallback */}
            {project.titleCard ? (
              <div className="relative h-48">
                <Image
                  src={project.titleCard}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className={`h-48 flex items-center justify-center ${project.accentColor.split(" ")[0]}`}
              >
                <span className="text-xs font-medium uppercase tracking-wider opacity-40">
                  {project.category}
                </span>
              </div>
            )}

            {/* Card content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.shortDescription}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
