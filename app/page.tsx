import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";

const featured = projects.slice(0, 3);

export default function Home() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="mb-20">
        <p className="text-sm font-medium text-[hsl(var(--primary))] mb-4 tracking-wide uppercase">
          AI Product Engineer · Builder PM
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.15]">
          Haiden McGill
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-2xl leading-relaxed">
          I build AI products from first principles — voice agents, agentic
          workflows, MCP tooling, and healthcare platforms.
        </p>
        <p className="text-gray-500 max-w-2xl leading-relaxed mb-8">
          Former founder. 7+ years in B2B product. I moved from managing
          products to building them when I realized the gap between what&apos;s
          possible with AI and what actually gets shipped is mostly a builder
          problem.
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View projects
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-[hsl(var(--border))] text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[hsl(var(--border))] mb-12" />

      {/* Featured work */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-gray-900">Featured work</h2>
          <Link
            href="/projects"
            className="text-sm text-[hsl(var(--primary))] hover:underline flex items-center gap-1"
          >
            All projects
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-lg border border-[hsl(var(--border))] bg-white hover:-translate-y-1 transition-transform duration-200 overflow-hidden"
            >
              {/* Color header */}
              <div className={`h-2 ${project.accentColor.split(" ")[0]}`} />
              <div className="p-5">
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
                <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-[hsl(var(--primary))] transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mt-16 pt-12 border-t border-[hsl(var(--border))]">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Stack
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Next.js · TypeScript · Claude API · VAPI · Vercel AI SDK · MCP ·
          OpenAI Whisper · ElevenLabs · ESP32 · Python
        </p>
      </section>
    </div>
  );
}
