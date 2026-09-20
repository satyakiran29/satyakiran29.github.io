import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./freelance.css";
import {
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
  FaPaperPlane,
  FaTelegramPlane,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaCopy,
  FaChevronDown,
  FaCode,
  FaAndroid,
  FaPalette,
  FaCogs,
  FaClock,
  FaShieldAlt,
  FaLaptopCode,
  FaUserCheck,
  FaCheck,
  FaGooglePlay,
  FaExternalLinkAlt,
  FaStar,
  FaCalendarAlt,
  FaBoxOpen,
  FaFilter,
  FaQuestionCircle
} from "react-icons/fa";

// ==========================================
// DATA DEFINITIONS
// ==========================================

const SERVICES_DATA = [
  {
    id: "android",
    shortLabel: "Native Android App",
    formOption: "Native Android App",
    badge: "Published on Google Play",
    icon: <FaAndroid />,
    title: "Native Android App Development",
    desc: "Fluid, high-performance native Android applications with custom UI widgets, background services, and Google Play Store compliance. Built from the ground up for maximum speed and zero battery drain.",
    timeline: "3 - 6 Weeks",
    recommendedPackage: "Full-Stack Custom App",
    scopeBreakdown: [
      {
        title: "Native Architecture (Kotlin / Java)",
        desc: "Clean MVVM architecture, modular code, Room local DB, and background service optimization."
      },
      {
        title: "Widgets & System UI",
        desc: "Specialized home screen widgets, live wallpapers, and dynamic Material You personalization."
      },
      {
        title: "Play Store Release & Compliance",
        desc: "End-to-end guidance through Google Play Console setup, app bundles (.aab), privacy policies, and store approval."
      }
    ],
    deliverables: [
      "Native Android app architecture (Java / Kotlin)",
      "Home screen widgets & system UI personalization",
      "Firebase backend & push notifications",
      "Offline caching & Room local data storage",
      "Proven published apps: Anify & Aniset on Google Play Store",
      "Google Play Store release & compliance guidance",
      "30 days post-launch maintenance & bug warranty"
    ],
    tags: ["Android SDK", "Kotlin", "Java", "Firebase", "REST APIs", "Play Console", "KWGT / KLWP"],
    proofAppIds: ["anify", "aniset"]
  },
  {
    id: "web",
    shortLabel: "Full-Stack Web App",
    formOption: "Full-Stack Web App",
    badge: "Fast, Scalable & Modern",
    icon: <FaCode />,
    title: "Full-Stack Web Application Development",
    desc: "Custom, ultra-fast, and responsive web applications built with modern frontend frameworks (React, Vite) and robust backend architectures (Node.js, Express, Django, MongoDB).",
    timeline: "2 - 5 Weeks",
    recommendedPackage: "Full-Stack Custom App",
    scopeBreakdown: [
      {
        title: "Frontend Experience",
        desc: "Component-driven React SPA with lightning-fast Vite bundling, responsive layouts, and smooth animations."
      },
      {
        title: "Robust Backend & APIs",
        desc: "RESTful endpoints, JWT authentication, role-based access, and database architecture (MongoDB / SQL)."
      },
      {
        title: "Production Deployment",
        desc: "Continuous deployment to Vercel/Cloudflare, SSL configuration, custom domain setup, and SEO optimization."
      }
    ],
    deliverables: [
      "Single Page Apps (SPA) & SaaS Dashboards",
      "RESTful API & GraphQL integrations",
      "Database design (MongoDB, SQLite, MySQL)",
      "Vite & React performance optimization",
      "JWT Authentication & secure sessions",
      "Vercel, Cloudflare, and custom deployment",
      "Comprehensive cross-device & browser testing"
    ],
    tags: ["React.js", "Vite", "Node.js", "Express", "Django", "MongoDB", "CSS3 / Tailwind"],
    proofAppIds: ["mernshop", "skdev"]
  },
  {
    id: "uiux",
    shortLabel: "UI/UX & Figma Design",
    formOption: "UI/UX & Figma Design",
    badge: "Figma to Code",
    icon: <FaPalette />,
    title: "UI/UX & Product Interface Design",
    desc: "Modern, aesthetic, and user-centric interfaces crafted with meticulous attention to detail, typography, and micro-interactions. Designed in Figma and ready for seamless code handoff.",
    timeline: "1 - 2 Weeks",
    recommendedPackage: "MVP Launchpad",
    scopeBreakdown: [
      {
        title: "Wireframes & User Journeys",
        desc: "Mapping out user flows, information architecture, and screen hierarchies for maximum conversion."
      },
      {
        title: "High-Fidelity Figma Mockups",
        desc: "Sleek dark mode, glassmorphism, tailored typography, and modern color palettes."
      },
      {
        title: "Component Design System",
        desc: "Reusable design tokens, UI components, button states, and interactive prototypes."
      }
    ],
    deliverables: [
      "High-fidelity Figma wireframes & mockups",
      "Interactive, clickable prototypes",
      "Component design systems & design tokens",
      "Mobile-first responsive layouts",
      "Dark mode & glassmorphism aesthetics",
      "Developer-ready asset export & design spec"
    ],
    tags: ["Figma", "UI/UX Design", "Wireframing", "Design Systems", "Prototyping", "Glassmorphism"],
    proofAppIds: ["skdev", "mernshop"]
  },
  {
    id: "widgets",
    shortLabel: "Widgets & Tools",
    formOption: "Home Screen Widgets / Tools",
    badge: "Android Customization",
    icon: <FaRocket />,
    title: "Home Screen Widgets & Customization Tools",
    desc: "Custom Android home screen widget architectures, KWGT/KLWP presets, live wallpaper engines, and system personalization tools.",
    timeline: "1 - 3 Weeks",
    recommendedPackage: "MVP Launchpad",
    scopeBreakdown: [
      {
        title: "Custom Widget Engine",
        desc: "Lightweight, zero-battery-drain widgets displaying weather, clocks, battery, and system metrics."
      },
      {
        title: "KWGT & KLWP Themes",
        desc: "Expert-crafted Kustom widgets and live wallpapers tailored for Android customization enthusiasts."
      },
      {
        title: "Cloud Content Sync",
        desc: "Firebase backend synchronization to push new widget presets and wallpapers dynamically."
      }
    ],
    deliverables: [
      "Native Android widget provider & RemoteViews architecture",
      "Custom KWGT / KLWP skin packages",
      "Firebase cloud asset pipeline & instant updates",
      "Battery-efficient background update alarms",
      "Play Store release assets & store listing"
    ],
    tags: ["Android", "KWGT", "KLWP", "Widgets", "Firebase", "Live Wallpapers"],
    proofAppIds: ["anify", "aniset"]
  },
  {
    id: "backend",
    shortLabel: "Backend & Automation",
    formOption: "Consultation / Other",
    badge: "Scalable & Reliable",
    icon: <FaCogs />,
    title: "Backend, APIs & Workflow Automation",
    desc: "Reliable server-side logic, data pipelines, third-party service integrations, and workflow automations that scale. Free your team from repetitive manual tasks.",
    timeline: "1 - 3 Weeks",
    recommendedPackage: "Full-Stack Custom App",
    scopeBreakdown: [
      {
        title: "Custom REST APIs",
        desc: "Clean, documented endpoints built with Express or Django, with rate limiting and input sanitization."
      },
      {
        title: "n8n & Python Automations",
        desc: "Automated webhook handlers, data synchronization, email triggers, and CRM connections."
      },
      {
        title: "Auth & Security",
        desc: "JWT authentication, OAuth login (Google/GitHub), password hashing, and CORS protection."
      }
    ],
    deliverables: [
      "Custom RESTful API endpoints & webhooks",
      "Automated workflows with n8n & Python",
      "User authentication (JWT, OAuth, Sessions)",
      "Rate limiting, security & input sanitization",
      "Database schemas, indexes & migration scripts",
      "Server deployment & environment configuration"
    ],
    tags: ["Node.js", "Express", "Python / Django", "n8n", "REST APIs", "JWT", "MongoDB"],
    proofAppIds: ["mernshop"]
  }
];

const PROVEN_APPS_DATA = [
  {
    id: "anify",
    title: "Anify - Ultimate Personalization",
    platform: "Android App (Google Play Store)",
    category: "android",
    badge: "Published on Play Store",
    desc: "A feature-packed Android personalization app published on Google Play. Offers ready-to-use home screen widgets, curated HD wallpapers, and trending ringtones—all natively built without requiring third-party tools like KWGT.",
    highlights: [
      "Native Android Architecture & 60fps Performance",
      "Custom Widget Engine & Live Wallpapers",
      "Published on Google Play Store with Active Users",
      "Seamless Firebase Integration & Offline Support"
    ],
    tags: ["Android", "Kotlin", "Java", "Google Play", "Widgets", "Firebase"],
    link: "https://play.google.com/store/apps/details?id=com.skdev.anify",
    linkText: "View on Google Play"
  },
  {
    id: "aniset",
    title: "Aniset - Anime KWGT & KLWP",
    platform: "Android App (Google Play Store)",
    category: "android",
    badge: "Published on Play Store",
    desc: "A popular Android home screen customization app on Google Play with anime-inspired widgets, custom KLWP themes, and regular cloud asset updates.",
    highlights: [
      "KWGT & KLWP Widget Architecture",
      "Firebase Cloud Integration for Real-time Content",
      "High Ratings & Loyal Community of Users",
      "Fast, Fluid Material UI Design"
    ],
    tags: ["Android", "Kotlin", "Firebase", "KWGT", "Google Play"],
    link: "https://play.google.com/store/apps/details?id=com.skdev.aniset",
    linkText: "View on Google Play"
  },
  {
    id: "mernshop",
    title: "MernShop - Full-Stack eCommerce",
    platform: "Full-Stack Web App",
    category: "web",
    badge: "Live Production App",
    desc: "A complete MERN-stack eCommerce platform featuring a responsive React + Tailwind frontend, Node.js & Express REST API, MongoDB database, cart/checkout flows, and admin dashboard.",
    highlights: [
      "Full MERN Stack Architecture",
      "JWT Authentication & Role-Based Access",
      "Real-time Inventory & Order Management",
      "Blazing Fast Vite & Tailwind Performance"
    ],
    tags: ["React.js", "Vite", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    link: "https://mernshop.psatyakiran.in/",
    linkText: "Live Demo"
  },
  {
    id: "skdev",
    title: "SkDev Android Apps Showcase",
    platform: "Web Application & Hub",
    category: "web",
    badge: "Live Web Hub",
    desc: "Centralized web application serving as the official hub for Android apps published on Google Play, providing release notes, FAQs, direct downloads, and developer support.",
    highlights: [
      "Modern Glassmorphism & Responsive Layout",
      "Dynamic App Listings & Direct Store Links",
      "High SEO Score & Fast Page Load Times",
      "Integrated Support & FAQ Platform"
    ],
    tags: ["React", "Vite", "Google Play Integration", "UI/UX"],
    link: "https://skdev.psatyakiran.in/",
    linkText: "Live Web Hub"
  }
];

const WHY_CHOOSE_ME = [
  {
    icon: <FaUserCheck />,
    title: "Direct Communication",
    desc: "Work 1-on-1 directly with the engineer building your product. Fast iterations, no account managers, and no red tape."
  },
  {
    icon: <FaLaptopCode />,
    title: "Clean, Scalable Code",
    desc: "Maintainable, well-structured code adhering to industry standards so your app can easily grow and scale."
  },
  {
    icon: <FaShieldAlt />,
    title: "End-to-End Delivery",
    desc: "From initial design sketches and API development to live production deployment and app store submission."
  },
  {
    icon: <FaClock />,
    title: "Reliable & On-Time",
    desc: "Clear milestone deadlines, regular progress demos, and transparent communication throughout the project."
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Scope",
    tagline: "Aligning on goals & roadmap",
    desc: "We discuss your project vision, target audience, technical requirements, and core features. We define a clear milestone roadmap, timeline, and deliverables so there are no surprises.",
    clientReceives: [
      "Project Scope Document & Milestone Roadmap",
      "Technical Architecture Recommendation",
      "Transparent Fixed-Price or Milestone Estimate"
    ]
  },
  {
    step: "02",
    title: "Design & Prototype",
    tagline: "Visualizing before building",
    desc: "Creating wireframes, interactive user flows, and high-fidelity Figma mockups. We refine the visual identity and user experience until you're completely thrilled with the direction.",
    clientReceives: [
      "Clickable Figma Prototype",
      "Component Design System & Style Guide",
      "Approved Screen Layouts & Responsive Specs"
    ]
  },
  {
    step: "03",
    title: "Agile Development",
    tagline: "Iterative sprints with live demos",
    desc: "Writing clean, modular, and performant code. You receive regular staging preview links to test features firsthand as they are built, ensuring constant transparency.",
    clientReceives: [
      "Private Git Repository Access",
      "Live Staging Environment for Continuous Testing",
      "Weekly Video Demos & Milestone Progress Reports"
    ]
  },
  {
    step: "04",
    title: "Launch & Support",
    tagline: "Production deployment & warranty",
    desc: "Full deployment to production hosting or Google Play Store submission. Complete handover of source code, deployment credentials, and post-launch bug warranty.",
    clientReceives: [
      "100% IP & Source Code Ownership Handover",
      "Production Deployment (Vercel/Cloudflare) or Play Store Release",
      "14 to 30 Days Post-Launch Bug Warranty"
    ]
  }
];

const PACKAGES = [
  {
    name: "MVP Launchpad",
    badge: "Popular for Startups",
    desc: "Ideal for founders, creators, and small businesses needing a fast, polished MVP or high-converting landing page.",
    scope: "Typically 1 - 3 Weeks",
    features: [
      "Custom responsive web application",
      "Up to 5 core pages / features",
      "Clean UI/UX design & animations",
      "Contact form & analytics integration",
      "Vercel / Cloud deployment setup",
      "14 days post-launch support"
    ],
    buttonText: "Choose MVP Plan"
  },
  {
    name: "Full-Stack Custom App",
    badge: "Most Comprehensive",
    featured: true,
    desc: "Complete end-to-end web or Android application with custom backend, authentication, and database integration.",
    scope: "Typically 3 - 6 Weeks",
    features: [
      "Full-stack React web app OR Android app",
      "Custom REST API & database architecture",
      "Secure authentication & user roles",
      "Third-party API & payment integrations",
      "Comprehensive mobile & cross-browser QA",
      "Play Store release OR production hosting",
      "30 days post-launch bug warranty"
    ],
    buttonText: "Choose Custom App"
  },
  {
    name: "Retainer & Support",
    badge: "Ongoing Partnership",
    desc: "Dedicated ongoing development, feature rollouts, UI refactoring, and maintenance for existing apps.",
    scope: "Flexible Hours / Monthly",
    features: [
      "Priority response & turnaround",
      "Regular feature additions & updates",
      "Performance optimization & audits",
      "Bug fixes & dependency maintenance",
      "Codebase refactoring & modernizing",
      "Direct Telegram / Slack access"
    ],
    buttonText: "Choose Retainer"
  }
];

const FAQ_ITEMS = [
  {
    q: "How does the payment and milestone structure work?",
    a: "For fixed-price projects, payments are typically split into milestones (e.g., 40% upfront deposit to begin work, 30% after mid-point design & core feature demo, and 30% upon final delivery and deployment). For ongoing retainers, payments are invoiced bi-weekly or monthly."
  },
  {
    q: "Who owns the intellectual property and code?",
    a: "You do! 100% of the intellectual property, source code, Figma design files, and deployment assets belong entirely to you once the final payment is cleared."
  },
  {
    q: "Can you help publish my app to the Google Play Store?",
    a: "Absolutely. I have published multiple apps to the Google Play Store (e.g., Anify, Aniset) and can guide you through Google Play Console setup, app bundle creation, signing, asset creation, and store listing optimization."
  },
  {
    q: "How does the freelance engagement work?",
    a: "We start with a discovery chat (via Telegram, Email, or Google Meet) to understand your requirements, timeline, and scope. Once agreed, I provide a clear milestone roadmap. You receive regular live staging links to review progress before final handover."
  },
  {
    q: "What if I already have an existing codebase or Figma design?",
    a: "I can work with your existing setup! Whether you need to convert a Figma design into clean React code, build a backend API for your frontend, or refactor and modernize an existing app, I can step in at any stage."
  }
];

// ==========================================
// COMPONENT
// ==========================================

const Freelance = () => {
  // Interactive Service Selector State
  const [selectedServiceId, setSelectedServiceId] = useState("android");

  // Filter state for apps showcase
  const [appFilter, setAppFilter] = useState("all");

  // Interactive Process Step State
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Form state - exactly mirroring https://skdev.psatyakiran.in/freelance
  const [projectType, setProjectType] = useState("Native Android App");
  const [budget, setBudget] = useState("$500 - $1,500 (₹40K - ₹1.25L)");
  const [timeline, setTimeline] = useState("1 Month");
  const [name, setName] = useState("");
  const [contactHandle, setContactHandle] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Accordion state
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Get active service data
  const currentService =
    SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  // Filter proven apps based on active filter
  const filteredApps =
    appFilter === "all"
      ? PROVEN_APPS_DATA
      : PROVEN_APPS_DATA.filter((app) => app.category === appFilter);

  // Action: Select service and update inquiry form
  const handleSelectService = (service) => {
    setSelectedServiceId(service.id);
    if (service.formOption) {
      setProjectType(service.formOption);
    }
  };

  // Action: Start inquiry with current service
  const handleStartInquiryForService = (service) => {
    if (service.formOption) {
      setProjectType(service.formOption);
    }
    const element = document.getElementById("inquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePackageSelect = (pkgName) => {
    if (pkgName === "MVP Launchpad") {
      setProjectType("Full-Stack Web App");
      setTimeline("Urgent (< 2 weeks)");
    } else if (pkgName === "Full-Stack Custom App") {
      setProjectType("Native Android App");
      setTimeline("1 Month");
    } else {
      setProjectType("Consultation / Other");
      setTimeline("Flexible");
    }
    const element = document.getElementById("inquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Construct inquiry message text
  const getFormattedInquiryText = () => {
    return (
      `Hi Satyakiran,\n\n` +
      `I would like to discuss a freelance project with you:\n\n` +
      `• Project Type: ${projectType}\n` +
      `• Estimated Budget: ${budget}\n` +
      `• Expected Timeline: ${timeline}\n` +
      `• Name: ${name || "N/A"}\n` +
      `• Contact: ${contactHandle || "N/A"}\n\n` +
      `Project Details:\n${message || "No additional details provided."}\n\n` +
      `Looking forward to hearing from you!`
    );
  };

  // 1. Send via Telegram (inspiration from skdev.psatyakiran.in)
  const handleSendTelegram = (e) => {
    e?.preventDefault();
    const text = encodeURIComponent(getFormattedInquiryText());
    window.open(`https://t.me/skdev29?text=${text}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  // 2. Send via Email
  const handleSendEmail = (e) => {
    e?.preventDefault();
    const subject = encodeURIComponent(`Freelance Project Inquiry: ${projectType} - ${name || "New Client"}`);
    const body = encodeURIComponent(getFormattedInquiryText());
    window.location.href = `mailto:satyakiran296@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  // 3. Copy Inquiry Text
  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(getFormattedInquiryText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="freelance-page">
      <Helmet>
        <title>Hire Satyakiran | Freelance Full-Stack & Android Developer</title>
        <meta
          name="description"
          content="Hire Satyakiran for high-performance full-stack web applications, native Android development, and modern UI/UX design. Interactive service explorer, proven Google Play apps, and quick project estimates."
        />
        <meta
          name="keywords"
          content="Hire Web Developer, Freelance Full-Stack Developer, Freelance React Developer, Android App Developer for Hire, UI/UX Designer, Satyakiran Freelance"
        />
        <link rel="canonical" href="https://satyakiran.vercel.app/freelance" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://satyakiran.vercel.app/freelance" />
        <meta property="og:title" content="Hire Satyakiran | Freelance Full-Stack & Android Developer" />
        <meta
          property="og:description"
          content="Transform your ideas into high-performance web and mobile applications with Satyakiran."
        />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/87798342?v=4" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hire Satyakiran | Freelance Full-Stack & Android Developer" />
        <meta
          name="twitter:description"
          content="Transform your ideas into high-performance web and mobile applications with Satyakiran."
        />
        <meta name="twitter:image" content="https://avatars.githubusercontent.com/u/87798342?v=4" />
      </Helmet>

      <div className="freelance-container">
        {/* ================= HERO SECTION ================= */}
        <section className="freelance-hero">
          <div className="status-pill">
            <span className="pulse-dot"></span>
            Available for New Projects & Contracts
          </div>

          <h1 className="freelance-hero-title">
            Transforming Ideas into <span className="gradient-text">High-Performance</span> Web & Mobile Apps
          </h1>

          <p className="freelance-hero-subtitle">
            Full-stack engineer and creator of published Google Play Store Android apps (<b>Anify</b>, <b>Aniset</b>).
            Select a service below to explore full details, real-world proof, deliverables, and estimated timelines.
          </p>

          <div className="freelance-hero-actions">
            <a href="#interactive-hub" className="btn-primary-glow">
              <FaRocket /> Explore Services
            </a>
            <a href="#inquiry" className="btn-secondary-glass">
              <FaPaperPlane /> Request a Quote
            </a>
            <a href="#proven-apps" className="btn-secondary-glass">
              <FaGooglePlay /> Real-World Apps
            </a>
          </div>

          <div className="hero-highlights-strip">
            <div className="highlight-badge">
              <FaCheckCircle /> Published Play Store Developer
            </div>
            <div className="highlight-badge">
              <FaCheckCircle /> 100% Direct 1-on-1 Communication
            </div>
            <div className="highlight-badge">
              <FaCheckCircle /> Full Lifecycle (Design to Launch)
            </div>
          </div>
        </section>

        {/* ================= INTERACTIVE SERVICE SELECTION HUB ================= */}
        <section id="interactive-hub" className="freelance-services-section">
          <div className="section-header">
            <span className="section-tag">Interactive Solution Explorer</span>
            <h2 className="section-title">What Do You Need Built?</h2>
            <p className="section-subtitle">
              Click any service category below to view in-depth deliverables, architecture breakdown, live proof of work, and project scope.
            </p>
          </div>

          {/* Interactive Service Selector Tabs */}
          <div className="service-tabs-nav" role="tablist" aria-label="Freelance Services">
            {SERVICES_DATA.map((service) => {
              const isActive = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`service-tab-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleSelectService(service)}
                >
                  <span className="tab-icon">{service.icon}</span>
                  <span className="tab-text">{service.shortLabel}</span>
                  {isActive && <span className="tab-active-indicator"></span>}
                </button>
              );
            })}
          </div>

          {/* Interactive Dynamic Detail Panel */}
          <div className="interactive-detail-panel" key={currentService.id}>
            <div className="panel-header">
              <div className="panel-title-area">
                <span className="panel-badge">{currentService.badge}</span>
                <h3 className="panel-title">{currentService.title}</h3>
                <p className="panel-desc">{currentService.desc}</p>
              </div>
              <div className="panel-quick-meta">
                <div className="meta-card">
                  <span className="meta-label">
                    <FaCalendarAlt /> Turnaround Time
                  </span>
                  <span className="meta-value">{currentService.timeline}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">
                    <FaBoxOpen /> Recommended Plan
                  </span>
                  <span className="meta-value">{currentService.recommendedPackage}</span>
                </div>
              </div>
            </div>

            {/* Scope Breakdown Grid */}
            <div className="panel-scope-section">
              <h4 className="panel-subheading">How I Approach This</h4>
              <div className="scope-cards-grid">
                {currentService.scopeBreakdown.map((item, idx) => (
                  <div key={idx} className="scope-card">
                    <div className="scope-card-num">0{idx + 1}</div>
                    <h5 className="scope-card-title">{item.title}</h5>
                    <p className="scope-card-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist & Tech Stack */}
            <div className="panel-content-grid">
              <div className="panel-deliverables-col">
                <h4 className="panel-subheading">Included Deliverables:</h4>
                <ul className="interactive-deliverables-list">
                  {currentService.deliverables.map((item, idx) => (
                    <li key={idx}>
                      <FaCheck className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="panel-subheading" style={{ marginTop: "24px" }}>
                  Technologies & Tools:
                </h4>
                <div className="service-tags">
                  {currentService.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matching Real-World Proof Card */}
              <div className="panel-proof-col">
                <h4 className="panel-subheading">Relevant Real-World Work:</h4>
                <div className="proof-cards-container">
                  {PROVEN_APPS_DATA.filter((app) =>
                    currentService.proofAppIds.includes(app.id)
                  ).map((app) => (
                    <div key={app.id} className="proof-mini-card">
                      <div className="proof-card-top">
                        <div>
                          <span className="proof-platform">{app.platform}</span>
                          <h5 className="proof-title">{app.title}</h5>
                        </div>
                        <span className="proof-badge">{app.badge}</span>
                      </div>
                      <p className="proof-desc">{app.desc}</p>
                      <div className="proof-card-bottom">
                        <div className="proof-tags">
                          {app.tags.slice(0, 4).map((t, idx) => (
                            <span key={idx} className="mini-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                        <a
                          href={app.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proof-link-btn"
                        >
                          {app.linkText} <FaExternalLinkAlt style={{ fontSize: "0.7rem" }} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call To Action Box for this specific service */}
                <div className="panel-cta-box">
                  <div className="cta-box-text">
                    <strong>Need a {currentService.shortLabel}?</strong>
                    <span>Lock in your sprint slot and get a tailored milestone quote.</span>
                  </div>
                  <button
                    type="button"
                    className="btn-primary-glow"
                    onClick={() => handleStartInquiryForService(currentService)}
                  >
                    <FaPaperPlane /> Inquire for this Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROVEN PRODUCTION APPS (FILTERABLE) ================= */}
        <section id="proven-apps" className="freelance-apps-section">
          <div className="section-header">
            <span className="section-tag">Proven Track Record</span>
            <h2 className="section-title">Production Apps on Google Play & Web</h2>
            <p className="section-subtitle">
              Real-world, battle-tested applications actively serving users. Filter to explore mobile or web architectures.
            </p>
          </div>

          {/* Apps Filter Tabs */}
          <div className="apps-filter-bar">
            <button
              type="button"
              className={`filter-btn ${appFilter === "all" ? "active" : ""}`}
              onClick={() => setAppFilter("all")}
            >
              <FaFilter /> All Projects ({PROVEN_APPS_DATA.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${appFilter === "android" ? "active" : ""}`}
              onClick={() => setAppFilter("android")}
            >
              <FaAndroid /> Android Apps (Play Store)
            </button>
            <button
              type="button"
              className={`filter-btn ${appFilter === "web" ? "active" : ""}`}
              onClick={() => setAppFilter("web")}
            >
              <FaCode /> Web Applications
            </button>
          </div>

          <div className="apps-grid">
            {filteredApps.map((app) => (
              <div key={app.id} className="app-card">
                <div className="app-card-header">
                  <div>
                    <span className="app-platform-tag">{app.platform}</span>
                    <h3 className="app-card-title">{app.title}</h3>
                  </div>
                  <span className="app-badge-status">{app.badge}</span>
                </div>

                <p className="app-card-desc">{app.desc}</p>

                <div className="service-deliverables-title">Key Highlights:</div>
                <ul className="app-highlights-list">
                  {app.highlights.map((h, idx) => (
                    <li key={idx}>
                      <FaCheck />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="app-card-footer">
                  <div className="service-tags" style={{ margin: 0, padding: 0, border: "none" }}>
                    {app.tags.map((tag, idx) => (
                      <span key={idx} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app-link-btn"
                  >
                    {app.linkText} <FaExternalLinkAlt style={{ fontSize: "0.75rem" }} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Google Play Console Developer Banner */}
          <div className="developer-console-banner">
            <div className="dev-banner-text">
              <FaGooglePlay className="dev-banner-icon" />
              <div>
                <h4 className="dev-banner-heading">Official Google Play Developer Account</h4>
                <p className="dev-banner-sub">
                  Explore all published Android applications, release notes, and updates directly on the Google Play Store.
                </p>
              </div>
            </div>
            <a
              href="https://play.google.com/store/apps/dev?id=9166037782169864125"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-glow"
              style={{ fontSize: "0.95rem", padding: "10px 22px" }}
            >
              <FaGooglePlay /> Open Play Console Profile
            </a>
          </div>

          {/* Real-World Production Experience Spotlight */}
          <div className="experience-spotlight-card">
            <div className="spotlight-header">
              <img
                src="https://avatars.githubusercontent.com/u/87798342?v=4"
                alt="Satyakiran"
                className="spotlight-avatar"
              />
              <div className="spotlight-title-group">
                <h4>From My Own Journey Building & Publishing Apps</h4>
                <p>Real-World Play Store Track Record</p>
              </div>
            </div>
            <p className="spotlight-content">
              Building and publishing <b>Anify</b> and <b>Aniset</b> on the Google Play Store taught me what real-world product engineering demands. It's not just about writing code that runs locally—it's about handling target SDK requirements, background battery optimization for widgets, Firebase cloud asset synchronization, in-app purchases, and maintaining high user satisfaction with thousands of active installs. When you work with me, you get the benefit of those battle-tested learnings applied directly to your product.
            </p>
            <div className="spotlight-takeaways-grid">
              <div className="takeaway-item">
                <div className="takeaway-title">
                  <FaCheckCircle /> Play Store Compliance
                </div>
                <p className="takeaway-desc">
                  First-hand experience with Google's strict app review guidelines, privacy policies, target API levels, and signing pipelines.
                </p>
              </div>
              <div className="takeaway-item">
                <div className="takeaway-title">
                  <FaCheckCircle /> Performance & Battery
                </div>
                <p className="takeaway-desc">
                  Optimized background widget services and asset rendering routines to ensure zero battery drain and silky smooth UI.
                </p>
              </div>
              <div className="takeaway-item">
                <div className="takeaway-title">
                  <FaCheckCircle /> Monetization & Scale
                </div>
                <p className="takeaway-desc">
                  Successfully generated revenue and built active user engagement through in-app purchases, ads, and frequent feature updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY WORK WITH ME ================= */}
        <section className="freelance-why-section">
          <div className="section-header">
            <span className="section-tag">Value Proposition</span>
            <h2 className="section-title">Why Work With Me?</h2>
            <p className="section-subtitle">
              Get agency-quality results with the agility, transparency, and dedication of a solo specialist.
            </p>
          </div>

          <div className="why-grid">
            {WHY_CHOOSE_ME.map((item, index) => (
              <div key={index} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE WORKFLOW / PROCESS ================= */}
        <section className="freelance-process-section">
          <div className="section-header">
            <span className="section-tag">Interactive Workflow</span>
            <h2 className="section-title">How We'll Work Together</h2>
            <p className="section-subtitle">
              A structured, transparent 4-step process designed to keep you in control and informed. Click each stage to see deliverables.
            </p>
          </div>

          {/* Interactive Stepper Navigation */}
          <div className="stepper-nav-bar">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`step-nav-btn ${isActive ? "active" : ""}`}
                  onClick={() => setActiveStepIndex(idx)}
                >
                  <span className="step-btn-num">{step.step}</span>
                  <span className="step-btn-text">{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          <div className="active-step-card" key={activeStepIndex}>
            <div className="active-step-header">
              <div className="step-large-num">{PROCESS_STEPS[activeStepIndex].step}</div>
              <div>
                <span className="step-tagline">{PROCESS_STEPS[activeStepIndex].tagline}</span>
                <h3 className="step-heading">{PROCESS_STEPS[activeStepIndex].title}</h3>
              </div>
            </div>

            <p className="step-paragraph">{PROCESS_STEPS[activeStepIndex].desc}</p>

            <div className="step-deliverables-box">
              <div className="step-deliverables-heading">What You Receive at this Stage:</div>
              <div className="step-deliverables-grid">
                {PROCESS_STEPS[activeStepIndex].clientReceives.map((item, i) => (
                  <div key={i} className="step-deliverable-item">
                    <FaCheckCircle className="step-check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRICING / PACKAGES ================= */}
        <section id="packages" className="freelance-pricing-section">
          <div className="section-header">
            <span className="section-tag">Engagements</span>
            <h2 className="section-title">Flexible Engagement Models</h2>
            <p className="section-subtitle">
              Choose the package that aligns with your product goals, whether launching an MVP or scaling an existing app.
            </p>
          </div>

          <div className="pricing-grid">
            {PACKAGES.map((pkg, index) => (
              <div key={index} className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
                {pkg.badge && <div className="featured-badge">{pkg.badge}</div>}
                <h3 className="plan-name">{pkg.name}</h3>
                <p className="plan-desc">{pkg.desc}</p>
                <div className="plan-scope">{pkg.scope}</div>

                <ul className="plan-features-list">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx}>
                      <FaCheckCircle />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`plan-btn ${pkg.featured ? "primary" : "outline"}`}
                  onClick={() => handlePackageSelect(pkg.name)}
                >
                  {pkg.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INQUIRY FORM (INSPIRED BY SKDEV) ================= */}
        <section id="inquiry" className="freelance-inquiry-section">
          <div className="section-header">
            <span className="section-tag">
              <FaPaperPlane style={{ marginRight: "6px", fontSize: "0.75rem" }} /> Let's Connect
            </span>
            <h2 className="section-title">
              Start Your <span className="gradient-text">Project</span>
            </h2>
            <p className="section-subtitle">
              Tell me about your idea, timeline, and budget. I'll review your details and respond within 24 hours.
            </p>
          </div>

          <div className="inquiry-wrapper">
            <form onSubmit={handleSendEmail}>
              {/* Question 1: Project Type */}
              <div className="form-group-block">
                <label className="form-label">1. What type of project are you looking for?</label>
                <div className="chip-options-grid">
                  {[
                    "Native Android App",
                    "Full-Stack Web App",
                    "UI/UX & Figma Design",
                    "Home Screen Widgets / Tools",
                    "Bug Fix & Optimization",
                    "Consultation / Other"
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`chip-btn ${projectType === option ? "selected" : ""}`}
                      onClick={() => setProjectType(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Estimated Budget */}
              <div className="form-group-block">
                <label className="form-label">2. What is your estimated budget?</label>
                <div className="chip-options-grid">
                  {[
                    "< $500 (₹40K)",
                    "$500 - $1,500 (₹40K - ₹1.25L)",
                    "$1,500 - $3,000 (₹1.25L - ₹2.5L)",
                    "$3,000+ (₹2.5L+)",
                    "Flexible / Hourly"
                  ].map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`chip-btn ${budget === b ? "selected" : ""}`}
                      onClick={() => setBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Expected Timeline */}
              <div className="form-group-block">
                <label className="form-label">3. Expected timeline or deadline?</label>
                <div className="chip-options-grid">
                  {[
                    "Urgent (< 2 weeks)",
                    "1 Month",
                    "2 - 3 Months",
                    "Flexible"
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`chip-btn ${timeline === t ? "selected" : ""}`}
                      onClick={() => setTimeline(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="input-row">
                <div className="input-col">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="input-col">
                  <label className="form-label">Email or Telegram Handle</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. alex@company.com or @alex_tg"
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Project Overview */}
              <div className="form-group-block">
                <label className="form-label">Project Overview & Requirements</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your project, goals, key features, or link to references/designs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                ></textarea>
              </div>

              {/* Three Main Actions (Telegram, Email, Copy) - Exactly like SKDev */}
              <div className="inquiry-actions-row">
                <button
                  type="button"
                  className="btn-action-telegram"
                  onClick={handleSendTelegram}
                >
                  <FaTelegramPlane /> Send via Telegram
                </button>

                <button
                  type="submit"
                  className="btn-action-email"
                >
                  <FaEnvelope /> Send via Email
                </button>

                <button
                  type="button"
                  className="btn-action-copy"
                  onClick={handleCopyInquiry}
                >
                  <FaCopy /> {copied ? "Copied to Clipboard!" : "Copy Inquiry Text"}
                </button>
              </div>

              {/* Direct Channels Bar */}
              <div className="form-direct-footer">
                <a
                  href="https://t.me/skdev29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-pill"
                >
                  <FaTelegramPlane /> Telegram: @skdev29
                </a>
                <a
                  href="mailto:satyakiran296@gmail.com"
                  className="direct-pill"
                >
                  <FaEnvelope /> satyakiran296@gmail.com
                </a>
                <a
                  href="https://in.linkedin.com/in/satyakiran29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-pill"
                >
                  <FaLinkedin /> LinkedIn
                </a>
                <a
                  href="https://github.com/satyakiran29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-pill"
                >
                  <FaGithub /> GitHub
                </a>
              </div>

              {submitted && (
                <div className="form-success-banner">
                  <FaCheckCircle /> Your inquiry draft was generated! If your client didn't open automatically, reach out directly at <b>satyakiran296@gmail.com</b> or Telegram <b>@skdev29</b>.
                </div>
              )}
            </form>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="freelance-faq-section">
          <div className="section-header">
            <span className="section-tag">
              <FaQuestionCircle style={{ marginRight: "6px", fontSize: "0.8rem" }} /> Clarifications
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Have questions before starting? Tap any question below to inspect the details.
            </p>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{item.q}</span>
                  <FaChevronDown className="faq-chevron" />
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="freelance-cta-section">
          <div className="cta-banner">
            <h2 className="cta-banner-title">
              Ready to bring your vision to life?
            </h2>
            <p className="cta-banner-desc">
              Whether you need an MVP built from scratch, an Android app ready for the Play Store, or a complete design overhaul, let's make it happen.
            </p>
            <div className="cta-banner-actions">
              <a href="#inquiry" className="btn-primary-glow">
                <FaPaperPlane /> Request a Quote
              </a>
              <a
                href="https://t.me/skdev29"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-glass"
              >
                <FaTelegramPlane /> Quick Chat on Telegram
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Freelance;
