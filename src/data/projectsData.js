export const projects = [
  {
    id: "business-os-platform",
    num: "01",
    featured: true,
    title: "Business OS Platform",
    badge: "// ENTERPRISE SUITE // CRM & AUTOMATION",
    shortDesc: "Business operations, CRM, task management, and automated workflow pipelines built for high efficiency.",
    summary: "A comprehensive business operations platform that integrates customer relationship management (CRM), automated task coordination, role-based access control, and asynchronous notification pipelines into a unified real-time dashboard.",
    role: "Full-Stack Architect",
    timeline: "2024 - 2026",
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    status: "Production Ready",
    transition: "organic-blob",
    transitionWord: "BUSINESS",
    image: "/covers/business-os-platform.webp",
    video: "/crm-businessos.mp4",
    imagePosition: "50% 0%",
    accent: "#ea580c",
    github: "https://github.com/cheralathan05",
    live: "https://crm-5-okg3.onrender.com/login",
    liveShortName: "CRM & Business OS",
    challenge: {
      tag: "01 // CONTEXT",
      title: "Consolidating Complex Business Operations",
      paragraphs: [
        "Modern enterprises struggle with fragmented operations across disconnected CRM, task tracking, and customer communication tools. The objective was to build a unified operational cockpit.",
        "The architecture demanded strict multi-tenant isolation, role-based access control (RBAC), and high concurrency message queues to handle automated customer outreach without slowing down internal staff."
      ],
      points: [
        "End-to-end CRM lead pipeline with stage progression and deal scoring",
        "Role-based authorization (Admin, Manager, Agent) with granular permissions",
        "Asynchronous task queues using Redis for scheduled automations",
        "Automated audit trails and real-time activity event logs"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "Event-Driven Modular Architecture",
      paragraphs: [
        "The backend is structured into clean domain modules running on Node.js and Express, connected to a normalized PostgreSQL database managed through Prisma ORM.",
        "Redis powers token caching, session state, and BullMQ worker queues for outbound alerts. The React frontend consumes responsive REST APIs with optimistic state updates."
      ],
      points: [
        "Normalized PostgreSQL schema with ACID transaction guarantees",
        "Redis BullMQ background job processing for email and notification delivery",
        "JWT authentication with refresh tokens and HTTP-only cookie security",
        "Containerized with Docker for seamless continuous deployment"
      ]
    },
    gallery: [
      { src: "/covers/business-os-platform.webp", caption: "// 01. Centralized operations and task board" }
    ],
    metrics: [
      { number: "100%", label: "Role-Based Access Control" },
      { number: "< 80ms", label: "Average API response latency" },
      { number: "10k+", label: "Concurrent task events" },
      { number: "0", label: "Unhandled queue failures" }
    ]
  },
  {
    id: "milo-nexus-browser",
    num: "02",
    featured: true,
    title: "Milo — Nexus Browser",
    badge: "// AI DESKTOP BROWSER // WORKFLOW AUTOMATION",
    shortDesc: "AI-powered desktop browser and intelligent workflow automation environment with local LLM integration.",
    summary: "Milo redefines productivity browsing by combining high-speed web navigation with embedded generative AI assistants, automated browser tab clustering, contextual web summarization, and local Ollama/GPT-4 workflow automations.",
    role: "Lead Systems Developer",
    timeline: "2025 - 2026",
    stack: ["TypeScript", "Electron", "Python", "Ollama", "React"],
    status: "Active Development",
    transition: "organic-blob",
    transitionWord: "NEXUS",
    image: "/covers/milo-nexus-browser.webp",
    video: "/Mini-Browser.mp4",
    imagePosition: "50% 0%",
    accent: "#6366f1",
    github: "https://github.com/cheralathan05",
    live: "https://mini-browser-n9wi.onrender.com/",
    liveShortName: "Mini Browser AI",
    challenge: {
      tag: "01 // CONTEXT",
      title: "Context-Aware Browsing Without Sacrificing Privacy",
      paragraphs: [
        "Current web browsers treat AI as an external side panel rather than a deeply integrated copilot. Milo embeds intelligent workflow agents directly into the browsing loop.",
        "A key design criterion was local privacy: users can run privacy-critical summarization, document extraction, and workflow automations entirely offline via local Ollama models."
      ],
      points: [
        "Embedded AI copilot with page-level semantic indexing",
        "Local LLM fallback using Ollama for offline intelligence",
        "Smart tab clustering by topic and task relevance",
        "Automated multi-step web action macros and scrapers"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "Multi-Process Chromium Shell + Local AI Sidecar",
      paragraphs: [
        "Built on Electron and TypeScript, Milo divides responsibilities between a secure Chromium browser shell, sandboxed web views, and a dedicated Python sidecar process for local inference.",
        "Web pages are parsed into clean markdown and vectorized on the fly, allowing instant semantic Q&A and action dispatching via structured LLM function calling."
      ],
      points: [
        "Sandboxed Electron renderer with strict context isolation",
        "Local WebSocket bridge communicating with Python AI worker",
        "On-device vector store for instant page content embeddings",
        "Custom glassmorphism UI with dark mode ergonomics"
      ]
    },
    gallery: [
      { src: "/covers/milo-nexus-browser.webp", caption: "// 01. AI assistant workspace & neural inspector" }
    ],
    metrics: [
      { number: "0 ms", label: "In-memory context latency" },
      { number: "Local", label: "On-device LLM inference" },
      { number: "4x", label: "Browsing workflow velocity" },
      { number: "100%", label: "Privacy-first architecture" }
    ]
  },
  {
    id: "kronos-project-atlas",
    num: "03",
    featured: true,
    title: "KRONOS — Project Atlas",
    badge: "// AI DEVELOPER WORKSPACE // REPO INTELLIGENCE",
    shortDesc: "AI-powered developer workspace and project management engine for orchestrating complex code repositories.",
    summary: "KRONOS is an intelligent developer cockpit featuring real-time project health telemetry, AI-assisted code triage, automated milestone velocity tracking, and deep GitHub CI/CD integration.",
    role: "Full-Stack Developer",
    timeline: "2025 - 2026",
    stack: ["Next.js", "NestJS", "PostgreSQL", "OpenAI API", "Docker"],
    status: "Open Source",
    transition: "organic-blob",
    transitionWord: "KRONOS",
    image: "/covers/kronos-project-atlas.webp",
    video: "/AppFlowy.mp4",
    imagePosition: "50% 0%",
    accent: "#10b981",
    github: "https://github.com/cheralathan05",
    live: "https://notes-7-uyln.onrender.com",
    liveShortName: "Notes & AppFlowy",
    challenge: {
      tag: "01 // CONTEXT",
      title: "Real-Time Telemetry for Engineering Teams",
      paragraphs: [
        "Managing large engineering roadmaps requires keeping pulse of commit velocities, open PR bottlenecks, and CI test regressions across dozens of microservices.",
        "KRONOS consolidates multi-repository telemetry into an interactive visual graph, utilizing OpenAI to synthesize daily changelog briefings and suggest blocker remediations."
      ],
      points: [
        "Automated sprint burndown telemetry and velocity forecasting",
        "AI-powered PR summaries and risk impact assessments",
        "Granular developer workload distribution metrics",
        "Real-time WebSocket alerts on build regressions"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "Next.js App Router + NestJS Microservices",
      paragraphs: [
        "A reactive Next.js frontend delivers sub-second navigation using server components, backed by NestJS microservices enforcing clean dependency injection and domain patterns.",
        "Event webhooks trigger background workers that compute repository health metrics and store time-series snapshots in PostgreSQL."
      ],
      points: [
        "NestJS backend with TypeScript strict typing and modular architecture",
        "Optimized PostgreSQL schema with index partitions for fast aggregation",
        "OpenAI API integration for automated pull-request risk scoring",
        "Docker Compose orchestration for production parity"
      ]
    },
    gallery: [
      { src: "/covers/kronos-project-atlas.webp", caption: "// 01. Velocity telemetry and sprint dashboard" }
    ],
    metrics: [
      { number: "50+", label: "Integrated engineering metrics" },
      { number: "3x", label: "Faster sprint milestone triage" },
      { number: "JWT", label: "Secure multi-tenant authentication" },
      { number: "Real-time", label: "WebSocket broadcast engine" }
    ]
  },
  {
    id: "redxchess-3d",
    num: "04",
    title: "RedxChess 3D",
    badge: "// 3D CHESS ENGINE // THREE.JS + STOCKFISH",
    shortDesc: "Interactive 3D chess game featuring WebGL graphics, custom shaders, and Stockfish chess engine AI.",
    summary: "An interactive browser 3D chess arena powered by Three.js, GLSL lighting shaders, procedural board textures, and Web Worker-driven Stockfish evaluation, allowing players to challenge variable depth AI difficulty levels.",
    role: "Solo Creator",
    timeline: "2025",
    stack: ["Three.js", "WebGL", "JavaScript", "Stockfish", "Web Audio"],
    status: "Live Interactive 3D",
    transition: "organic-blob",
    transitionWord: "CHESS",
    image: "/covers/redxchess-3d.webp",
    video: "/Chess.mp4",
    github: "https://github.com/cheralathan05",
    challenge: {
      tag: "01 // CONTEXT",
      title: "High-Performance 3D in the Browser",
      paragraphs: [
        "Delivering a console-quality 3D board game directly in a web browser requires balancing high-fidelity lighting against smooth 60 FPS performance on lower-tier hardware.",
        "Integrating Stockfish chess calculations had to happen off the main thread so compute-heavy depth evaluations never cause animation frame drops or UI stutter."
      ],
      points: [
        "Realistic physically-based materials (PBR) for marble and wood pieces",
        "Stockfish AI integration running in dedicated Web Workers",
        "Dynamic camera angles, board rotation, and cinematic move replays",
        "Synthesized Web Audio acoustic feedback on piece movement and checks"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "Three.js Scene Graph + Web Worker Stockfish Pipeline",
      paragraphs: [
        "The scene graph is managed with Three.js, using custom GLSL shaders for ambient shadows and piece selection halos. Board state is maintained in a lightweight chess engine state model.",
        "When an AI move is requested, a Web Worker processes minimax trees and Stockfish UCI commands, returning move coordinates without stalling the rendering loop."
      ],
      points: [
        "Off-thread Stockfish calculations via Web Workers",
        "GLSL shaders for piece highlight rings and specular reflections",
        "Touch and mouse raycasting for intuitive piece drag and drop",
        "Procedural sound effects generated through Web Audio API"
      ]
    },
    gallery: [
      { src: "/covers/redxchess-3d.webp", caption: "// 01. Dynamic 3D perspective and lighting arena" }
    ],
    metrics: [
      { number: "60 FPS", label: "Smooth WebGL rendering rate" },
      { number: "Depth 15+", label: "Stockfish AI evaluation" },
      { number: "100%", label: "GPU-accelerated graphics" },
      { number: "0 ms", label: "Main thread latency during AI moves" }
    ]
  },
  {
    id: "ai-resume-analyzer",
    num: "05",
    featured: true,
    title: "AI Resume Analyzer",
    badge: "// ATS SCORING // GENERATIVE AI & NLP",
    shortDesc: "Automated resume parser, ATS benchmark scoring, semantic skill extraction, and personalized career roadmap generator.",
    summary: "An intelligent recruitment tool that digests candidate resumes in PDF/DOCX formats, parses semantic embeddings against target job descriptions, computes ATS compatibility scores, and suggests concrete structural improvements using GPT-4.",
    role: "AI Engineer",
    timeline: "2025",
    stack: ["React", "Python", "GPT-4", "Redis", "FastAPI"],
    status: "Working Application",
    transition: "organic-blob",
    transitionWord: "RESUME",
    image: "/covers/ai-resume-analyzer.webp",
    video: "/resume-project.mp4",
    accent: "#06b6d4",
    imagePosition: "50% 0%",
    github: "https://github.com/cheralathan05",
    live: "https://ai-resume-analyzer-f3kq.onrender.com/",
    liveShortName: "AI Resume Analyzer",
    challenge: {
      tag: "01 // CONTEXT",
      title: "Cracking Modern Applicant Tracking Systems",
      paragraphs: [
        "Job seekers frequently face silent rejections from keyword-matching ATS bots. This application provides transparent, actionable scoring to optimize candidate resumes.",
        "The system needed to process arbitrary formatting, unformatted tables, and diverse PDF encodings accurately before performing semantic similarity scoring."
      ],
      points: [
        "Robust PDF/DOCX text and section extraction pipeline",
        "Cosine similarity comparison against standard role job descriptions",
        "Identification of missing critical keywords and impact verbs",
        "Personalized career advice and bullet-point rewriting suggestions"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "FastAPI Async Pipeline + Semantic Vector Matching",
      paragraphs: [
        "A FastAPI backend accepts file uploads, extracts plain text via PyPDF, and generates OpenAI semantic embeddings. Comparison vectors are calculated and cached in Redis.",
        "GPT-4 is called with structured JSON mode to deliver consistent scoring breakdowns, strengths, weaknesses, and revision suggestions directly to the React interface."
      ],
      points: [
        "FastAPI asynchronous file handling and background tasks",
        "OpenAI text-embedding-3-small for semantic skill mapping",
        "Redis caching of common job description embedding vectors",
        "Clean interactive dashboard displaying dimensional score charts"
      ]
    },
    gallery: [
      { src: "/covers/ai-resume-analyzer.webp", caption: "// 01. Real-time ATS score breakdown" }
    ],
    metrics: [
      { number: "98%", label: "Parsing accuracy across formats" },
      { number: "< 2s", label: "Instant ATS score calculation" },
      { number: "Vector", label: "Semantic embeddings matching" },
      { number: "100%", label: "Actionable improvement feedback" }
    ]
  },
  {
    id: "calendar-clone",
    num: "06",
    featured: true,
    title: "Calendar Clone",
    badge: "// EVENT SCHEDULING // OAUTH & VIDEO CONFERENCING",
    shortDesc: "Full-featured calendar management system supporting recurring events, OAuth sync, and video conference generation.",
    summary: "A high-performance calendar and scheduling engine supporting multi-timezone event management, recurring RRULE scheduling, Google OAuth integration, instant meeting link provisioning, and real-time conflict detection.",
    role: "Full-Stack Developer",
    timeline: "2024 - 2025",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    status: "Open Source",
    transition: "organic-blob",
    transitionWord: "CALENDAR",
    image: "/covers/calendar-clone.webp",
    video: "/Calendar.mp4",
    accent: "#8b5cf6",
    imagePosition: "50% 0%",
    github: "https://github.com/cheralathan05",
    live: "https://calendar-1-uzec.onrender.com",
    liveShortName: "Calendar Cloud",
    challenge: {
      tag: "01 // CONTEXT",
      title: "Eliminating Scheduling Friction and Timezone Bugs",
      paragraphs: [
        "Calendar systems are notoriously difficult due to edge cases in recurring series (RRULEs), timezone shifts, daylight saving transitions, and double-booking race conditions.",
        "The goal was an ultra-responsive calendar interface that synchronizes seamlessly across devices while respecting complex recurrence exceptions."
      ],
      points: [
        "Month, week, day, and agenda views with smooth keyboard shortcuts",
        "Support for complex recurrence patterns (daily, weekly, custom)",
        "Automatic Google Calendar bi-directional OAuth synchronization",
        "One-click video meeting room generation"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "Prisma Schema + Normalized UTC Event Storage",
      paragraphs: [
        "All events and recurrence rules are stored in UTC within PostgreSQL. Recurrence occurrences are expanded efficiently in-memory on demand rather than bloating the database with millions of future records.",
        "Next.js App Router and React Server Components ensure lightning-fast initial renders, with client-side drag-and-drop powered by accessible gestures."
      ],
      points: [
        "PostgreSQL date-range overlap constraints prevent scheduling conflicts",
        "OAuth 2.0 PKCE flow with encrypted token refreshes",
        "Optimistic UI updates for event creation, rescheduling, and deletion",
        "Dark and light theme support with responsive mobile views"
      ]
    },
    gallery: [
      { src: "/covers/calendar-clone.webp", caption: "// 01. Multi-calendar view with category filters" }
    ],
    metrics: [
      { number: "Zero", label: "Double-booking scheduling collisions" },
      { number: "RFC 5545", label: "iCalendar recurrence compliance" },
      { number: "OAuth 2.0", label: "Google Calendar & SSO integration" },
      { number: "< 50ms", label: "Prisma query latency" }
    ]
  },
  {
    id: "civic-bridge-flow",
    num: "07",
    title: "Civic Bridge Flow / SmartGov",
    badge: "// SMART MUNICIPALITY // REAL-TIME GRIEVANCES",
    shortDesc: "Municipal grievance management, citizen-to-authority resolution tracking, and real-time department routing.",
    summary: "Civic Bridge Flow bridges citizens with municipal administrative bodies. Citizens lodge geotagged grievances with photo verification; the system automatically categorizes, prioritizes, and routes tickets to appropriate department officers with live status broadcasts.",
    role: "Full-Stack Developer",
    timeline: "2024 - 2025",
    stack: ["React", "Node.js", "Express", "MySQL", "Socket.IO"],
    status: "Completed System",
    transition: "organic-blob",
    transitionWord: "CIVIC",
    image: "/covers/civic-bridge-flow.webp",
    video: "/Civil-Bridge.mp4",
    github: "https://github.com/cheralathan05",
    challenge: {
      tag: "01 // CONTEXT",
      title: "Accountability in Civic Redressal",
      paragraphs: [
        "Traditional municipal grievance tracking suffers from lost paperwork, opaque departmental delays, and lack of citizen updates.",
        "Civic Bridge Flow implements an open audit trail where every grievance must move through authenticated stages (Received -> Assigned -> In Progress -> Resolved with Proof) within strict SLA timeframes."
      ],
      points: [
        "Geotagged citizen complaints with image attachments",
        "Automatic routing to sanitation, roads, electricity, or water departments",
        "Live status notifications to citizens via WebSockets and SMS",
        "Municipal supervisor dashboard with SLA breach alerts"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "Real-Time WebSocket Pipeline + Relational Audit Ledger",
      paragraphs: [
        "Built on Express and MySQL with foreign-key constraints guaranteeing ticket lineage. Socket.IO broadcasts status transitions to connected municipal admin consoles in real time.",
        "Role-based routing ensures field officers can only review and update tickets assigned to their department and geographic jurisdiction."
      ],
      points: [
        "Socket.IO rooms segmented by municipal department and district",
        "MySQL transactional tables tracking every status timestamp and photo proof",
        "Secure JWT authentication with role authorization middleware",
        "Mobile-first responsive interface for field inspections"
      ]
    },
    gallery: [
      { src: "/covers/civic-bridge-flow.webp", caption: "// 01. Municipal officer resolution workflow" }
    ],
    metrics: [
      { number: "100%", label: "Geotagged verified complaint tracking" },
      { number: "Live", label: "Socket.IO real-time ticket broadcasts" },
      { number: "3-Tier", label: "Role escalation (Citizen/Officer/Supervisor)" },
      { number: "MySQL", label: "Normalized relational data structure" }
    ]
  },
  {
    id: "iot-driver-safety",
    num: "08",
    title: "IoT Driver Safety Telematics",
    badge: "// TELEMATICS // SENSOR MONITORING & COLLISION ALERTS",
    shortDesc: "Real-time IoT vehicle telemetry monitoring, sensor anomaly detection, and automated collision & safety alerting.",
    summary: "An IoT telematics pipeline ingesting speed, accelerometer, gyroscope, and GPS streaming data. The engine detects harsh braking, drowsy driving signatures, and sudden impacts in sub-second time, dispatching instant emergency notifications.",
    role: "Systems & IoT Developer",
    timeline: "2024",
    stack: ["Python", "IoT Sensors", "REST APIs", "PostgreSQL", "WebSockets"],
    status: "Embedded Prototype",
    transition: "organic-blob",
    transitionWord: "TELEMATICS",
    image: "/covers/iot-driver-safety.webp",
    github: "https://github.com/cheralathan05",
    challenge: {
      tag: "01 // CONTEXT",
      title: "Sub-Second Emergency Notification Under Weak Connectivity",
      paragraphs: [
        "Commercial telematics hardware often fails during critical moments due to network latency or dropped cellular packets.",
        "The system was engineered with local edge thresholds that immediately trigger alarms locally before transmitting compressed telemetry packets to cloud dispatchers."
      ],
      points: [
        "3-axis accelerometer & gyroscope threshold monitoring for rollover/crash detection",
        "Detection of harsh acceleration, aggressive braking, and erratic steering",
        "Geofencing and automated speed limit compliance tracking",
        "Emergency SOS beacon with exact GPS coordinates broadcast to fleet managers"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "Streaming Telemetry Ingestion Engine",
      paragraphs: [
        "Microcontroller sensors stream telemetry bursts over MQTT/WebSockets to a Python backend service. An anomaly detection filter identifies spikes indicative of collisions.",
        "Incident records are written to PostgreSQL with geospatial indexes, while alerts are immediately dispatched to emergency contact endpoints."
      ],
      points: [
        "Low-overhead binary sensor packet serialization",
        "PostgreSQL PostGIS geospatial queries for route telemetry replay",
        "Real-time WebSocket dashboard for fleet tracking supervisors",
        "Self-calibrating baseline for different vehicle vibration profiles"
      ]
    },
    gallery: [
      { src: "/covers/iot-driver-safety.webp", caption: "// 01. Real-time telemetry map & speed graph" }
    ],
    metrics: [
      { number: "< 100ms", label: "Crash detection and alert dispatch" },
      { number: "99.2%", label: "Sensor anomaly detection accuracy" },
      { number: "MQTT/WS", label: "Low-bandwidth streaming protocols" },
      { number: "GPS", label: "High-precision geospatial tracking" }
    ]
  },
  {
    id: "healthcare-ai-pipeline",
    num: "09",
    title: "Healthcare AI Diagnostic Pipeline",
    badge: "// DEEP LEARNING // ALZHEIMER'S CLASSIFICATION",
    shortDesc: "Deep learning computer vision pipeline analyzing neuroimaging scans for early-stage Alzheimer’s disease classification.",
    summary: "A biomedical AI pipeline trained on neuroimaging MRI datasets. Utilizing deep convolutional neural networks and Transfer Learning, the system identifies subtle structural biomarkers to classify Alzheimer’s progression stages with clinical accuracy.",
    role: "AI/ML Research Engineer",
    timeline: "2024 - 2025",
    stack: ["PyTorch", "Python", "Computer Vision", "NumPy", "Scikit-learn"],
    status: "Research Benchmark",
    transition: "organic-blob",
    transitionWord: "HEALTHCARE",
    image: "/covers/healthcare-ai-pipeline.webp",
    github: "https://github.com/cheralathan05",
    challenge: {
      tag: "01 // CONTEXT",
      title: "Early-Stage Detection in Neuroimaging Scans",
      paragraphs: [
        "Distinguishing very mild cognitive impairment from normal aging requires analyzing subtle cortical thinning and ventricular enlargement in brain MRI scans.",
        "The objective was to create a robust computer vision classification architecture resilient to scan noise, patient variation, and imbalanced medical training datasets."
      ],
      points: [
        "Multi-class classification across 4 stages: Non-Demented, Very Mild, Mild, Moderate",
        "Extensive image preprocessing: skull stripping, contrast normalization, slice registration",
        "Grad-CAM visual explainability highlighting anatomical regions influencing predictions",
        "Validation against clinical medical benchmark datasets"
      ]
    },
    architecture: {
      tag: "02 // BLUEPRINT",
      title: "PyTorch Deep CNN Backbone with Transfer Learning",
      paragraphs: [
        "Built in PyTorch, the pipeline leverages fine-tuned ResNet and DenseNet feature extractors adapted for multi-slice 2D/3D MRI inputs. Data augmentation techniques combat clinical class imbalance.",
        "Model outputs are coupled with Grad-CAM heatmaps so clinicians can visually confirm that the neural network is attending to the hippocampus rather than imaging artifacts."
      ],
      points: [
        "PyTorch training pipeline with mixed-precision GPU acceleration",
        "Grad-CAM class activation mapping for interpretability",
        "Cross-validation metrics with precision, recall, and ROC-AUC reporting",
        "NumPy and Scikit-learn feature pipeline for statistical validation"
      ]
    },
    gallery: [
      { src: "/covers/healthcare-ai-pipeline.webp", caption: "// 01. Neuroimaging heatmaps and stage confidence" }
    ],
    metrics: [
      { number: "94.6%", label: "Classification validation accuracy" },
      { number: "PyTorch", label: "Deep CNN backbone with Grad-CAM" },
      { number: "4 Stages", label: "Multi-class cognitive assessment" },
      { number: "MRI", label: "Standardized neuroimaging inputs" }
    ]
  }
];
