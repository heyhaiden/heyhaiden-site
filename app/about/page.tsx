import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Haiden McGill",
  description:
    "Senior PM and AI builder. 7+ years across enterprise SaaS, healthcare, and voice AI. Former founder. MSc Computer Science, UCL.",
};

const experience = [
  {
    role: "Senior Product Manager",
    org: "Optimove",
    period: "Jul 2025–Present",
    badge: "Current",
    description:
      "Enterprise AI Marketing Orchestration ($100M+ ARR). Defining GenAI tooling standards, skill architectures, and agentic system design for engineering teams at scale.",
  },
  {
    role: "AI Solutions Architect",
    org: "Independent / Contractor",
    period: "Jan–Jul 2025",
    description:
      "Voice AI platforms (ElevenLabs, Deepgram, Vapi), conversational AI products, and workflow automation for healthcare and enterprise clients.",
  },
  {
    role: "Senior Technical PM → PM",
    org: "Embodied Labs",
    period: "Oct 2020–Jan 2025",
    description:
      "Led 0→1 VR-to-web transition — 850% YoY growth, $1.5M+ ARR. Prototyped GPT-4o voice AI with RAG. Secured $1.2M Fortune 500 contract via HIPAA-compliant LMS integration.",
  },
  {
    role: "Product Manager",
    org: "Koji (acq. Linktree)",
    period: "2022–2023",
    description:
      "Creator economy platform — mini-app ecosystem and monetization tooling. Platform acquired by Linktree, December 2023.",
  },
  {
    role: "Co-Founder & Head of Product",
    org: "NOCTVRNAL XR",
    period: "2016–2020",
    description:
      "Founded and scaled an AI/AR/VR studio from zero. 150% YoY revenue growth. Directed product, client relations, and a team of 4 engineers.",
  },
];

const skills = [
  {
    label: "Voice & Speech AI",
    items: ["Vapi", "Deepgram", "Whisper", "ElevenLabs", "Conversational design"],
  },
  {
    label: "AI / ML",
    items: ["LLMs", "RAG", "Multi-agent", "MCP", "GPT-4o", "Pinecone", "Vercel AI SDK"],
  },
  {
    label: "Frontend / Infra",
    items: ["Next.js", "TypeScript", "React", "AWS", "GCP", "n8n"],
  },
  {
    label: "Hardware / IoT",
    items: ["ESP32", "TensorFlow Lite", "Edge ML", "LoRaWAN"],
  },
];

const education = [
  {
    degree: "MSc Applied Computer Science (Distinction)",
    institution: "University College London",
    period: "2023–2024",
    note: "IoT Systems, Embedded AI, Edge ML",
  },
  {
    degree: "BA Film Production & Audio Engineering (Magna Cum Laude)",
    institution: "Chapman University",
    period: "2013–2016",
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-16">
      {/* Bio */}
      <section className="mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-5">About</h1>

        {/* Current role badge */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Currently at Optimove · Senior PM, Enterprise AI
          </span>
        </div>

        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Technical PM and former founder who ships AI products end-to-end — voice AI, agentic systems, and regulated industry platforms.
            7+ years in B2B product across enterprise SaaS, healthcare, and creator economy.
          </p>
          <p>
            I&apos;m particularly focused on the gap between AI prototype and production — especially in voice AI and healthcare, where that gap
            is a design problem as much as an engineering one. Outside work: IoT hardware, EEG headbands, and large stretches of the Pacific Crest Trail.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Experience
        </h2>
        <div className="space-y-5">
          {experience.map((item) => (
            <div
              key={item.role + item.org}
              className="rounded-xl border border-[hsl(var(--border))] bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900 text-sm">{item.role}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400 shrink-0">{item.period}</span>
              </div>
              <div className="text-xs font-medium text-[hsl(var(--primary))] mb-2">
                {item.org}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Skills &amp; Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skills.map((group) => (
            <div key={group.label}>
              <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 bg-[hsl(var(--secondary))] text-gray-600 rounded text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((item) => (
            <div key={item.institution} className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="text-sm font-medium text-gray-900">{item.degree}</div>
                <div className="text-xs text-[hsl(var(--primary))] font-medium mt-0.5">{item.institution}</div>
                {item.note && (
                  <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>
                )}
              </div>
              <span className="text-xs text-gray-400 shrink-0">{item.period}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pt-8 border-t border-[hsl(var(--border))]">
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
          <a
            href="mailto:hello@heyhaiden.com"
            className="inline-flex items-center gap-2 border border-[hsl(var(--border))] text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            hello@heyhaiden.com
          </a>
        </div>
      </section>
    </div>
  );
}
