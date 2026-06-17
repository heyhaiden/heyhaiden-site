import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { projects, getProject } from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Haiden McGill`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-16">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All projects
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.accentColor}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {project.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Links */}
      {(project.url || project.githubUrl || project.demoUrl) && (
        <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-[hsl(var(--border))]">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View live
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[hsl(var(--border))] text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Watch demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[hsl(var(--border))] text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <GitBranch className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      )}

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Overview
        </h2>
        <p className="text-gray-700 leading-relaxed">{project.overview}</p>
      </section>

      {/* Challenge */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Challenge
        </h2>
        <p className="text-gray-700 leading-relaxed">{project.challenge}</p>
      </section>

      {/* Outcomes */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Outcomes
        </h2>
        <ul className="space-y-2">
          {project.outcomes.map((outcome, i) => (
            <li key={i} className="flex gap-3 text-gray-700">
              <span className="text-[hsl(var(--primary))] font-medium mt-0.5 shrink-0">
                →
              </span>
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      {/* References */}
      {project.references.length > 0 && (
        <section className="pt-10 border-t border-[hsl(var(--border))]">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Links
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.references.map((ref) => (
              <a
                key={ref.url}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--primary))] hover:underline"
              >
                {ref.title}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
