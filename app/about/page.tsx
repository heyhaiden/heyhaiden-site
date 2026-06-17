import type { Metadata } from "next";

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
    role: "Senior Technical Product Manager",
    org: "Embodied Labs",
    period: "2023–Jan 2025",
    description:
      "Prototyped GPT-4o voice AI with RAG and secured $1.2M Fortune 500 contract via HIPAA-compliant LMS integration.",
  },
  {
    role: "Product Manager",
    org: "Embodied Labs",
    period: "Oct 2020–2023",
    description:
      "Joined as first product hire and led 0→1 VR-to-web transition — 850% YoY growth, $1.5M+ ARR. Built the foundations for roadmap, discovery, and delivery across immersive healthcare training products.",
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

const education = [
  {
    degree: "MSc Applied Computer Science",
    distinction: "Distinction",
    institution: "University College London",
    period: "2023–2024",
    note: "IoT Systems, Embedded AI, Edge ML",
  },
  {
    degree: "BFA Film/Audio Engineering",
    distinction: "Magna Cum Laude",
    institution: "Chapman University",
    period: "2013–2016",
  },
];

const teaching: { role: string; institution: string; period: string; note?: string }[] = [];

const skills = [
  {
    label: "Agentic",
    items: ["Multi-agent", "MCP", "RAG", "Tool use", "Claude SDK", "Vercel AI SDK", "n8n"],
  },
  {
    label: "Voice & Speech AI",
    items: ["Vapi", "Deepgram", "Whisper", "ElevenLabs", "Conversational design"],
  },
  {
    label: "AI / ML",
    items: ["LLMs", "GPT-4o", "Pinecone", "Edge Impulse", "TensorFlow Lite"],
  },
  {
    label: "Full Stack Building",
    items: ["v0", "Vercel", "Supabase", "Next.js", "TypeScript", "React", "Figma Make"],
  },
  {
    label: "Hardware / IoT",
    items: ["ESP32", "Edge ML", "LoRaWAN", "EEG sensors"],
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 pt-20 pb-16 lg:pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)] gap-x-12 gap-y-10 items-start lg:h-[calc(100svh-6rem)] lg:overflow-hidden">
        <div className="space-y-6 lg:pr-4">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">About</h1>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Hi, I&apos;m Haiden. I&apos;m a product leader, audio engineer, and former founder
              who works where emerging technology has to become useful.
            </p>
            <p>
              I&apos;ve spent 7+ years across health tech, spatial computing, enterprise SaaS,
              and creator tools, usually at the 0-to-1 stage where the path is still being made.
            </p>
            <p>
              My mantra is &quot;always be building&quot;: prototype quickly, challenge assumptions,
              and learn from real users. After years managing products, I moved closer to the
              code so I could test ideas faster and shape the systems behind them.
            </p>
            <p className="text-sm text-muted-foreground">
              Outside work, I&apos;m drawn to the same edges: backpacking remote glaciers, building
              IoT hardware, experimenting with EEG sensors, and exploring where software meets
              the physical world.
            </p>
          </div>
        </div>

        <div className="space-y-12 min-w-0 lg:h-full lg:overflow-y-auto lg:pr-3 lg:pb-16">
          <section>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((item) => (
                <div
                  key={item.role + item.org}
                  className="rounded-xl border border-border bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{item.role}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{item.period}</span>
                  </div>
                  <div className="text-xs font-medium text-primary mb-1.5">{item.org}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.institution}
                  className="flex flex-wrap items-start justify-between gap-2 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{item.degree}</div>
                    <div className="text-xs font-medium text-primary mt-0.5">{item.institution}</div>
                    {item.distinction && (
                      <span className="inline-block mt-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                        {item.distinction}
                      </span>
                    )}
                    {item.note && (
                      <div className="text-xs text-muted-foreground mt-0.5">{item.note}</div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{item.period}</span>
                </div>
              ))}
            </div>
          </section>

          {teaching.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
                Teaching
              </h2>
              <div className="space-y-4">
                {teaching.map((item) => (
                  <div
                    key={item.role + item.institution}
                    className="flex flex-wrap items-start justify-between gap-2"
                  >
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{item.role}</div>
                      <div className="text-xs font-medium text-primary mt-0.5">{item.institution}</div>
                      {item.note && (
                        <div className="text-xs text-muted-foreground mt-0.5">{item.note}</div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{item.period}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
              Skills &amp; Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skills.map((group) => (
                <div key={group.label}>
                  <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 bg-secondary text-muted-foreground rounded text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
