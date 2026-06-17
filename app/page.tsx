import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleUser } from "lucide-react";
import { projects } from "@/lib/projects";

const featured = projects.slice(0, 3);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero — centered with profile photo, matching old layout */}
      <div className="container mx-auto px-4 flex items-start justify-center pt-40">
        <div className="max-w-3xl w-full mx-auto text-center">
          <div className="space-y-6">
            {/* Profile photo */}
            <div className="mx-auto rounded-full shadow-md inline-block w-32 h-32 overflow-hidden border border-black">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20at%2015.08.35-47gF50xzhdS99oZdVM8POFiZukT9X2.png"
                alt="Haiden McGill"
                width={150}
                height={150}
                className="object-cover object-center"
                style={{ width: "100%", height: "100%", objectPosition: "50% 30%" }}
                priority
              />
            </div>

            {/* Name + title */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">Haiden McGill</h1>
              <h2 className="text-xl text-gray-600">AI Product Engineer · Builder PM</h2>
            </div>

            {/* Bio */}
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              I build AI products from first principles — voice agents, agentic workflows, MCP tooling, and healthcare platforms. Former founder with 7+ years in B2B product. I moved from managing products to building them when I realized the gap between what&apos;s possible with AI and what actually gets shipped is mostly a builder problem.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 transition-colors"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-colors"
              >
                Learn More <CircleUser className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured projects */}
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Work</h2>
          <Link
            href="/projects"
            className="text-primary text-sm flex items-center gap-1 hover:underline"
          >
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <Link
              key={project.id}
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
                <p className="text-gray-600 mb-4">{project.shortDescription}</p>
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
    </div>
  );
}
