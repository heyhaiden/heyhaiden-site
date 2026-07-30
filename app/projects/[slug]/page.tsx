import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { ProjectTitleCardImage } from "@/components/project-title-card-image";
import { PageShell, Pill, SectionHeading, buttonClass } from "@/components/ui";
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
    <div>
      <PageShell className="pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-900 transition-colors"
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
          All projects
        </Link>
      </PageShell>

      <PageShell size="readable" className="pt-0">
        {project.titleCard && (
          <ProjectTitleCardImage
            project={project}
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="w-full rounded-xl mb-10 shadow-sm"
          />
        )}

        <div className="mb-10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <Pill
                key={tag}
                className={project.accentColor}
              >
                {tag}
              </Pill>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {(project.url || project.githubUrl || project.demoUrl) && (
          <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-border">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass()}
              >
                <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                View live
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("secondary")}
              >
                <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                Watch demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("secondary")}
              >
                <GitBranch aria-hidden className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>
        )}

        <section className="mb-10">
          <SectionHeading className="mb-4">
            Overview
          </SectionHeading>
          <p className="text-gray-700 leading-relaxed">{project.overview}</p>
        </section>

        <section className="mb-10">
          <SectionHeading className="mb-4">
            Challenge
          </SectionHeading>
          <p className="text-gray-700 leading-relaxed">{project.challenge}</p>
        </section>

        <section className="mb-12">
          <SectionHeading className="mb-4">
            Outcomes
          </SectionHeading>
          <ul className="space-y-2">
            {project.outcomes.map((outcome, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="text-primary font-medium mt-0.5 shrink-0" aria-hidden>
                  →
                </span>
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        {project.references.length > 0 && (
          <section className="pt-10 border-t border-border">
            <SectionHeading className="mb-4">
              Links
            </SectionHeading>
            <div className="flex flex-wrap gap-3">
              {project.references.map((ref) => (
                <a
                  key={ref.url}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  {ref.title}
                  <ExternalLink aria-hidden className="h-3 w-3" />
                </a>
              ))}
            </div>
          </section>
        )}
      </PageShell>
    </div>
  );
}
