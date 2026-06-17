import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { SocialIconButtons } from "@/components/social-icon-buttons";
import { projects } from "@/lib/projects";

const featuredSlugs = ["embodied-labs", "ai-claims-agent", "mcp-ag-grid"];
const featured = featuredSlugs.map((slug) => projects.find((p) => p.slug === slug)!);

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="min-h-[80svh] flex flex-col justify-center container max-w-6xl mx-auto px-4">
        <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-5">
          AI Product Engineer · Builder PM
        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-7 leading-tight">
          Haiden McGill
        </h1>

        <p className="text-xl text-gray-800 leading-relaxed mb-4 max-w-2xl">
          I build AI products from first principles — voice agents, agentic workflows,
          MCP tooling, and healthcare platforms.
        </p>

        <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
          Former founder. 7+ years in B2B product. I moved from managing products to building them
          when I realized the gap between what&apos;s possible with AI and what actually gets shipped is
          mostly a builder problem.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View projects <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <SocialIconButtons />
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            Featured Work
          </h2>
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
