import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { SignalFieldLazy } from "@/components/signal-field-lazy";
import { SocialIconButtons } from "@/components/social-icon-buttons";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { projects } from "@/lib/projects";

const featuredSlugs = ["embodied-labs", "ai-claims-agent", "mcp-ag-grid"];
const featured = featuredSlugs.map((slug) => projects.find((p) => p.slug === slug)!);

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="min-h-[calc(100svh-8rem)] flex flex-col justify-center container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-12 items-center">
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-5">
              Product Leader · Applied AI
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-7 leading-tight">
              Haiden McGill
            </h1>

            <p className="text-xl text-gray-800 leading-relaxed mb-4 max-w-2xl">
              Product leader who builds — I pull new tech apart to understand how it
              works, then ship something real with it.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              7+ years of 0-to-1 product in health tech and enterprise. Now focused on
              applied AI: agentic systems, voice, and embedded hardware that hold up
              outside the demo.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <ButtonLink
                href="/projects"
                className="px-7 py-3"
              >
                View projects <ArrowRight aria-hidden className="h-4 w-4" />
              </ButtonLink>
              <SocialIconButtons />
            </div>
          </div>

          <SignalFieldLazy className="relative h-[320px] sm:h-[400px] lg:h-[540px] w-full" />
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-6">
          <SectionHeading className="text-sm">
            Featured Work
          </SectionHeading>
          <Link
            href="/projects"
            className="text-primary text-sm flex items-center gap-1 hover:underline"
          >
            All projects <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} priority={i < 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
