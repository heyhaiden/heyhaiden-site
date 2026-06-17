import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Haiden McGill",
  description:
    "AI Product Engineer and Builder PM with 7+ years in B2B product. Former founder, hackathon competitor, and the person who reads the AI SDK docs.",
};

const experience = [
  {
    role: "AI Product Engineer",
    org: "Independent / Consulting",
    period: "2024–present",
    description:
      "Building AI products across voice, agentic workflows, and regulated industries. Consulting engagements include insurance claim pipeline tooling for enterprise InsurTech.",
  },
  {
    role: "Product Manager",
    org: "Koji (acq. Linktree)",
    period: "2022–2024",
    description:
      "Led product for a creator economy platform enabling no-code mini-apps and monetization experiences. Platform acquired by Linktree in December 2023.",
  },
  {
    role: "Product Manager",
    org: "Embodied Labs",
    period: "2020–2022",
    description:
      "Core product contributor on a B2B HealthTech platform delivering immersive training for healthcare professionals across aging, dementia, and vision loss modules.",
  },
];

const skills = [
  { label: "AI / Voice", items: ["VAPI", "OpenAI Whisper", "ElevenLabs", "Claude API", "GPT-4"] },
  { label: "Agentic", items: ["MCP", "Vercel AI SDK", "Tool use", "Multi-step reasoning"] },
  { label: "Frontend", items: ["Next.js", "TypeScript", "React", "Tailwind CSS"] },
  { label: "Hardware / IoT", items: ["ESP32", "TensorFlow Lite", "MQTT", "EEG sensors"] },
  { label: "Data / Infra", items: ["Neon Postgres", "Vercel", "Supabase", "Python"] },
];

export default function AboutPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-16">
      {/* Bio */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About</h1>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            I&apos;m a Builder PM and AI Product Engineer working at the
            intersection of voice AI, agentic systems, and regulated industries.
            I build the products I wish product teams had — and occasionally the
            ones nobody asked for.
          </p>
          <p>
            My background is in B2B product: 7+ years across HealthTech,
            creator economy, and early-stage startups, including time as a
            founder. In 2024 I made the shift from managing products to building
            them, which mostly means I now read the AI SDK docs before opening
            Notion.
          </p>
          <p>
            I&apos;m particularly focused on voice AI in healthcare and agentic
            workflows in regulated industries — spaces where the gap between
            prototype and production is a design problem as much as an
            engineering one.
          </p>
          <p>
            Outside work I build IoT hardware, have hiked large stretches of
            the Pacific Crest Trail, and make things with EEG headbands.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((item) => (
            <div key={item.role} className="border-l-2 border-[hsl(var(--border))] pl-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <span className="font-semibold text-gray-900">{item.role}</span>
                <span className="text-xs text-gray-400">{item.period}</span>
              </div>
              <div className="text-sm text-[hsl(var(--primary))] font-medium mb-2">
                {item.org}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
          Skills &amp; Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 bg-[hsl(var(--secondary))] text-gray-700 rounded-md text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pt-10 border-t border-[hsl(var(--border))]">
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View my work
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://www.linkedin.com/in/haidenmcgill/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[hsl(var(--border))] text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
