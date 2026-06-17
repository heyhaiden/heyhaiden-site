export type Project = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  tags: string[];
  category: string;
  url?: string;
  githubUrl?: string;
  demoUrl?: string;
  accentColor: string;
  titleCard?: string;
  titleCardPosition?: string;
  titleCardScale?: number;
  overview: string;
  challenge: string;
  outcomes: string[];
  references: { title: string; url: string }[];
};

export const projects: Project[] = [
  // ── Row 1: Platform × DevTools × Voice AI ──────────────────────────────
  {
    id: 7,
    slug: "embodied-labs",
    title: "Embodied Labs: HealthTech Training Platform",
    shortDescription: "B2B web platform for immersive healthcare professional training. Led product from 0→1 through scale.",
    tags: ["Healthcare", "B2B", "Platform"],
    category: "Product",
    url: "https://www.embodiedlabs.com",
    accentColor: "bg-teal-100 text-teal-800",
    titleCard: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/embodied-labs-blur.jpg-lhWODtqb8dQJxSatWFOsqp5CAiSf8n.jpeg",
    overview:
      "Embodied Labs is a B2B SaaS platform providing immersive training experiences for healthcare professionals — improving clinical empathy and skills by putting learners inside the perspective of patients experiencing aging, vision loss, and cognitive decline. As a core product contributor, I led the development of key training modules and platform features that expanded the catalog and drove adoption across hospital systems and care networks.",
    challenge:
      "Healthcare training often fails to build empathy because learners study conditions abstractly. The challenge was building a platform that could deliver experiential, scenario-based learning at scale — accessible via standard web browsers without requiring specialized VR hardware in every facility.",
    outcomes: [
      "Platform adopted by major healthcare organizations for clinical staff training",
      "Expanded training catalog across aging, vision loss, and dementia modules",
      "Web-first delivery enabling broad adoption without hardware dependencies",
      "Measurable improvement in empathy and clinical skill outcomes across customer cohorts",
    ],
    references: [
      { title: "Embodied Labs Website", url: "https://www.embodiedlabs.com" },
    ],
  },
  {
    id: 5,
    slug: "mcp-ag-grid",
    title: "AG Grid MCP Server",
    shortDescription: "MCP server giving Claude Desktop headless access to AG Grid — sort, filter, analyze, and export enterprise data tables via natural language.",
    tags: ["MCP", "Developer Tools", "AI Infrastructure"],
    category: "Developer Tools",
    githubUrl: "https://github.com/heyhaiden/mcp-ag-grid",
    accentColor: "bg-orange-100 text-orange-800",
    titleCard: "https://raw.githubusercontent.com/heyhaiden/mcp-ag-grid/main/public/assets/mcp-ag-grid-min.png",
    overview:
      "Built in early 2025 before official support, when the MCP protocol was brand new, this open-source server acts as a bridge between Claude Desktop and AG Grid using headless browser automation. It lets users create and manipulate data grids, run natural language queries, filter and sort data, generate summaries, and export tables—all directly from a Claude conversation. The project pioneered persistent, multi-grid sessions and exposed grid state as native MCP resources.",
    challenge:
      "At the time, enterprise AI data tools either required bespoke solutions for each dataset or had to dump large tables into the context window. The main challenge was implementing a persistent, queryable data layer that Claude could interact with incrementally—sidestepping context limits—while building on the newly released, sparsely documented MCP protocol.",
    outcomes: [
      "Full AG Grid lifecycle: create, update, filter, sort, and export via MCP tools",
      "Headless Puppeteer rendering for reliable grid state management",
      "Multi-grid session support for parallel dataset operations",
      "MCP resource exposure for grid data and metadata",
      "Realistic sample datasets (sales, employee, financial) for testing",
      "Published as installable npm package",
    ],
    references: [
      { title: "GitHub Repository", url: "https://github.com/heyhaiden/mcp-ag-grid" },
    ],
  },
  {
    id: 1,
    slug: "synthia-voice-ai",
    title: "Synthia: Voice AI for Dementia Care",
    shortDescription: "Real-time voice AI assistant for memory care. Whisper STT, ElevenLabs TTS, GPT-4 context engine.",
    tags: ["AI/Voice", "Healthcare"],
    category: "AI / Voice",
    githubUrl: "https://github.com/heyhaiden/synthia-dementia-voice-ai",
    demoUrl: "https://www.loom.com/share/b0935f9d8f7b40518a36d53fe47cc6b8",
    accentColor: "bg-violet-100 text-violet-800",
    titleCard: "https://raw.githubusercontent.com/heyhaiden/synthia-dementia-voice-ai/main/public/lovable-uploads/synthia_hero_screenshot.png",
    overview:
      "Synthia is a real-time voice AI healthcare assistant purpose-built for dementia care support. The system chains OpenAI Whisper for speech recognition, GPT-4o for contextual understanding, and ElevenLabs for natural voice synthesis into a seamless conversation pipeline. Healthcare-specific prompt engineering ensures responses are empathetic, clear, and clinically appropriate — avoiding the ambiguity that can distress dementia patients.",
    challenge:
      "Voice AI in regulated healthcare requires more than accuracy: latency, affect, and failure-mode design all become patient safety issues. The challenge was to build a reliable real-time pipeline that could handle audio processing, model inference, and voice synthesis end-to-end with low enough latency to feel conversational.",
    outcomes: [
      "End-to-end voice pipeline: Whisper → GPT-4o → ElevenLabs under 2s latency",
      "Healthcare-specific system prompt with dementia care conversational protocols",
      "Web Audio API integration for real-time audio capture and playback",
      "Modular service architecture separating STT, LLM, and TTS concerns",
      "Loom video walkthrough demonstrating live conversation flows",
    ],
    references: [
      { title: "GitHub Repository", url: "https://github.com/heyhaiden/synthia-dementia-voice-ai" },
      { title: "Demo Video (Loom)", url: "https://www.loom.com/share/b0935f9d8f7b40518a36d53fe47cc6b8" },
    ],
  },
  // ── Row 2: Agentic/Visual × Creator Economy × Voice Hackathon ──────────
  {
    id: 3,
    slug: "ai-claims-agent",
    title: "ClaimsIQ: Car Insurance AI Agent",
    titleCard: "/titlecard-claims-iq.jpg",
    titleCardScale: 1.08,
    shortDescription: "Car insurance claims agent using Claude Vision to classify vehicle damage from photos. Agentic pipeline from photo upload to structured coverage assessment.",
    tags: ["Agentic", "InsurTech", "AI/ML"],
    category: "Agentic / B2B",
    demoUrl: "https://v0-ai-claims-agent-prototype.vercel.app",
    githubUrl: "https://github.com/heyhaiden/v0-ai-claims-agent",
    accentColor: "bg-blue-100 text-blue-800",
    overview:
      "An agentic prototype for automated car insurance claims processing. Claimants upload vehicle damage photos which Claude Vision classifies — detecting damage type, severity, and affected components — then an LLM-orchestrated pipeline applies coverage rules and produces a structured assessment with confidence scores. Built to explore where multimodal AI holds up in regulated claims workflows, and where confidence thresholds break down.",
    challenge:
      "Car insurance damage assessment requires combining visual reasoning over photos with policy language and regulatory constraints — a genuinely multimodal problem. The challenge was evaluating where Claude Vision reliably substitutes for adjuster judgment, and surfacing the cases where it diverges, without building on a live production system.",
    outcomes: [
      "Claude Vision damage classification from claimant-uploaded photos — type, severity, affected components",
      "Agentic pipeline: photo intake → damage classification → coverage determination → structured report",
      "Confidence scoring at each step with interpretable audit trail",
      "Pre-loaded demo claims with full AI assessments for rapid prototype evaluation",
      "In-memory store with production-ready interface for straightforward persistence swap",
    ],
    references: [
      { title: "Live Prototype", url: "https://v0-ai-claims-agent-prototype.vercel.app" },
      { title: "GitHub Repository", url: "https://github.com/heyhaiden/v0-ai-claims-agent" },
    ],
  },
  {
    id: 8,
    slug: "koji-creator-platform",
    title: "Koji: Creator Economy Platform",
    shortDescription: "No-code mini-app platform for content creators. Acquired by Linktree in December 2023.",
    tags: ["Creator Economy", "B2C", "SaaS"],
    category: "Product",
    url: "https://linktr.ee/blog/linktree-acquires-link-in-bio-platform-koji",
    accentColor: "bg-pink-100 text-pink-800",
    titleCard: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Article-1500x1000-QMlbwGueF0y5as8funXfNuu6QU2Zld.png",
    titleCardPosition: "center 18%",
    overview:
      "Koji was a creator economy platform enabling content creators to build and deploy interactive mini-apps — games, tip jars, storefronts, personalized shoutouts — directly within their link-in-bio profiles. As a product team member, I worked across the mini-app template ecosystem and monetization features that drove creator revenue. Koji was acquired by Linktree in December 2023, underscoring its significance in the creator tooling space.",
    challenge:
      "Creators need monetization tools that work inside the platforms where their audiences already live — not external checkout flows. The challenge was building a no-code app system flexible enough for diverse creator types while keeping the creation experience approachable for non-technical users.",
    outcomes: [
      "Built and shipped mini-app templates across e-commerce, gaming, and fan engagement verticals",
      "Drove creator monetization through interactive, platform-native experiences",
      "Supported a creator ecosystem spanning hundreds of thousands of users",
      "Platform acquired by Linktree in December 2023",
    ],
    references: [
      { title: "Linktree: Acquires Koji", url: "https://linktr.ee/blog/linktree-acquires-link-in-bio-platform-koji" },
    ],
  },
  {
    id: 4,
    slug: "voice-valet",
    title: "Voice Valet: AI Call Screening",
    shortDescription: "VAPI-powered AI voice agent for executive call screening. Built for the VAPI Hackathon.",
    tags: ["AI/Voice", "Agentic", "Hackathon"],
    category: "AI / Voice",
    url: "https://ghosted-ai.vercel.app",
    accentColor: "bg-sky-100 text-sky-800",
    titleCard: "/titlecard-voice-valet.png",
    overview:
      "Voice Valet is an AI-powered call screening and triage system for executive assistants, built on VAPI's voice AI infrastructure. Inbound calls are intercepted by a voice agent that qualifies the caller, extracts intent, and routes based on priority rules — presenting the EA with a structured summary and recommended action rather than raw call logs. Built for the VAPI Hackathon to explore voice-first agentic workflows.",
    challenge:
      "EA call management is high-friction: screening every call manually is time-consuming, but automated phone trees feel robotic and damage relationships. The challenge was building a voice agent that could handle real conversational variance while still extracting structured data the EA can act on.",
    outcomes: [
      "VAPI voice agent handling inbound call intake and qualification",
      "Caller intent extraction and priority scoring",
      "EA dashboard with structured call summaries and routing recommendations",
      "Contact management with allowlist/blocklist prioritization",
      "Dark mode dashboard with real-time call activity feed",
    ],
    references: [
      { title: "Live App", url: "https://ghosted-ai.vercel.app" },
    ],
  },
  // ── Row 3: InsurTech B2B × IoT Climate × Conversational AI ─────────────
  {
    id: 2,
    slug: "decision-studio",
    title: "Decision Studio: AI Claims Pipeline Manager",
    shortDescription: "Consulting prototype for Sprout.ai. No-code UI for configuring and validating AI decision pipelines in insurance claims.",
    tags: ["Agentic", "InsurTech", "B2B", "Consulting"],
    category: "Agentic / B2B",
    url: "https://v0-decision-studio-app.vercel.app",
    accentColor: "bg-emerald-100 text-emerald-800",
    overview:
      "Decision Studio is an enterprise-grade interface for configuring, testing, and deploying AI decision pipelines in insurance claims workflows — built as a consulting engagement for Sprout.ai, a leading claims automation platform. The tool gives non-technical claims teams control over AI logic without engineering involvement: define pipeline rules, run test suites against historical claims, monitor accuracy, and push to production with an audit trail.",
    challenge:
      "Insurance carriers need AI-assisted claims decisions but can't hand configuration to engineers every time a policy rule changes. The challenge was designing a UI that abstracts agentic pipeline complexity into a workflow non-engineers can own — while surfacing the accuracy metrics underwriters actually care about.",
    outcomes: [
      "Pipeline manager supporting 6 live claim types across multiple carriers",
      "93.1% average accuracy across live production pipelines",
      "4,981 claims processed through the system",
      "Test suite runner for validating pipeline changes before production push",
      "Audit log with full lineage of pipeline modifications",
      "Role-based access for adjusters, team leads, and system admins",
    ],
    references: [
      { title: "Live Demo", url: "https://v0-decision-studio-app.vercel.app" },
    ],
  },
  {
    id: 9,
    slug: "firewall-scout",
    title: "Firewall Scout: IoT Environmental Defense",
    shortDescription: "IoT sensor network for wildfire microclimate monitoring and early hazard detection. Dissertation project.",
    tags: ["IoT", "Climate", "Environmental Sensing"],
    category: "IoT / Hardware",
    githubUrl: "https://github.com/heyhaiden/firewall-scout-iot-system",
    accentColor: "bg-red-100 text-red-800",
    titleCard: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_125978574_mediaitem125978572.jpg-KHoVrlfpx5V2onNip7pD0xNrqOvuXw.jpeg",
    overview:
      "Firewall Scout is an IoT-based system creating a 'digital defensible space' around land assets in wildfire-prone regions. A distributed sensor network monitors microclimate variables — temperature, humidity, wind, air quality — and feeds a threat detection model that alerts land managers before conditions reach critical thresholds. Designed for low-cost, long-term outdoor deployment, the system integrates with existing emergency response infrastructure.",
    challenge:
      "Traditional wildfire detection is reactive and spatially sparse. The challenge was designing a sensor system that could be deployed at scale on limited budgets, tolerate outdoor conditions, and provide meaningful signal before a fire event — not just during one.",
    outcomes: [
      "30% improvement in threat detection accuracy vs. sparse monitoring baselines",
      "50% reduction in alert response times through proactive detection",
      "Low-cost hardware architecture suitable for large-scale land deployment",
      "MQTT-based telemetry pipeline with remote monitoring dashboard",
    ],
    references: [
      { title: "GitHub Repository", url: "https://github.com/heyhaiden/firewall-scout-iot-system" },
    ],
  },
  {
    id: 6,
    slug: "watchguard-advisor",
    title: "WatchGuard Advisor",
    shortDescription: "Conversational AI helping luxury watch collectors decide whether insurance makes financial sense. AI SDK + Vercel AI Gateway + Neon.",
    tags: ["Agentic", "InsurTech", "AI/ML"],
    category: "Agentic / B2B",
    demoUrl: "https://nextjs-ai-chatbot-phi-fawn-50.vercel.app/",
    githubUrl: "https://github.com/heyhaiden/watch-guard-agent",
    accentColor: "bg-amber-100 text-amber-800",
    titleCard: "/titlecard-watchguard-advisor.png",
    overview:
      "WatchGuard Advisor is a conversational AI that replaces vague insurance advice with a structured, data-driven recommendation. Through a 4–5 question conversational flow — watch value, financial picture, quoted premium, usage patterns — the advisor produces a clear verdict: insure, don't insure, or optional. Built on the Vercel AI SDK with xAI (Grok) via Vercel AI Gateway, Neon Postgres for conversation persistence, and Auth.js for user management.",
    challenge:
      "Watch insurance decisions require balancing premium cost, replacement risk, and opportunity cost in a way that most collectors don't have the financial modeling background for. The challenge was making the math feel conversational — building an advisor that feels like a knowledgeable friend rather than a spreadsheet.",
    outcomes: [
      "Conversational AI collecting structured data through natural dialogue",
      "Decision logic across three outcomes: insure / don't insure / optional",
      "Two conversation modes: MVP (efficient) and Refined (warmer, exploratory)",
      "AI Gateway integration enabling model switching between xAI Grok and OpenAI",
      "Full chat history persistence in Neon Postgres",
      "Guest access and authenticated flows via Auth.js",
    ],
    references: [
      { title: "Live Demo", url: "https://nextjs-ai-chatbot-phi-fawn-50.vercel.app/" },
      { title: "GitHub Repository", url: "https://github.com/heyhaiden/watch-guard-agent" },
    ],
  },
  // ── Row 4: Creative IoT ─────────────────────────────────────────────────
  {
    id: 10,
    slug: "dreamfreq",
    title: "DreamFREQ: Brainwave Synthesizer",
    shortDescription: "Live EEG brainwave-to-audio synthesizer. Muse headband → Mind Monitor → TouchDesigner. Premiered at On Air Fest, Brooklyn.",
    tags: ["IoT", "Wearable Tech", "Creative"],
    category: "IoT / Hardware",
    url: "https://medium.com/noctvrnal/the-process-behind-dreamfreq-90af7ae45725",
    accentColor: "bg-purple-100 text-purple-800",
    titleCard: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DreamFREQ%20(1).jpg-OTgbT4axZOMYlJJiBUCvrUbTuVVcco.jpeg",
    overview:
      "DreamFREQ translates live EEG brainwave data into real-time auditory soundscapes, creating a direct feedback loop between mental state and generated music. Developed during a residency with On Air Fest, the system uses a Muse EEG headband to capture delta wave activity, processes it through Mind Monitor, and synthesizes sound in TouchDesigner based on brainwave frequency and amplitude. Premiered live at the Wythe Hotel in Brooklyn, producing a 15-minute composition representing the waking-sleeping-dreaming cycle.",
    challenge:
      "Translating noisy, continuous EEG signals into aesthetically coherent sound in real-time required careful signal processing to separate meaningful neural activity from artifact. The creative challenge was mapping brainwave data to musical parameters in a way that felt intuitive to audiences unfamiliar with neuroscience.",
    outcomes: [
      "Live premiere at On Air Fest at the Wythe Hotel, Brooklyn",
      "15-minute generative composition mapping the waking-to-dreaming cycle",
      "Real-time synthesis pipeline: EEG → Mind Monitor → TouchDesigner → audio output",
      "Engaged dozens of live participants in interactive brainwave demonstrations",
    ],
    references: [
      { title: "Medium: The Process Behind DreamFREQ", url: "https://medium.com/noctvrnal/the-process-behind-dreamfreq-90af7ae45725" },
      { title: "On Air Fest", url: "https://www.onairfest.com/" },
    ],
  },
  {
    id: 11,
    slug: "smart-helmet",
    title: "Smart Helmet: Voice-to-Turn-Signal",
    shortDescription: "Cycling helmet converting voice commands to LED turn signals. ESP32, TensorFlow Lite voice model, hands-free safety.",
    tags: ["IoT", "Wearable Tech", "AI/ML"],
    category: "IoT / Hardware",
    githubUrl: "https://github.com/heyhaiden/smart-helmet-iot",
    accentColor: "bg-lime-100 text-lime-800",
    titleCard: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartHelmet_cover.jpg-Wm5pDhzGkIuGiBmR4zTZDO1MlDQu0i.jpeg",
    overview:
      "The Smart Helmet integrates a TensorFlow Lite voice recognition model into an ESP32-based wearable to convert spoken commands — 'left,' 'right,' 'stop' — into LED turn signals in real time. The system addresses the danger of hand-signal communication in high-traffic environments, providing cyclists with a hands-free, voice-activated alternative that keeps both hands on the handlebars.",
    challenge:
      "Running a voice recognition model on a microcontroller with limited compute and battery requires aggressive model optimization. The challenge was achieving sufficient accuracy on a TensorFlow Lite model small enough to run on ESP32 hardware while handling variable ambient noise from wind and traffic.",
    outcomes: [
      "On-device voice recognition via TensorFlow Lite on ESP32",
      "Sub-200ms command recognition-to-LED activation latency",
      "Three-command vocabulary: left, right, stop — with directional LED array",
      "Hands-free operation validated in live cycling conditions",
    ],
    references: [
      { title: "GitHub Repository", url: "https://github.com/heyhaiden/smart-helmet-iot" },
    ],
  },
];

export const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
).sort();

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
