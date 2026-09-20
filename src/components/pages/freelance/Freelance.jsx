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
  FaStar
} from "react-icons/fa";

const SERVICES_DATA = [
  {
    icon: <FaCode />,
    title: "Full-Stack Web Development",
    desc: "Custom, ultra-fast, and responsive web applications built with modern frontend frameworks and robust backend architectures.",
    deliverables: [
      "Single Page Apps (SPA) & SaaS Dashboards",
      "RESTful API & GraphQL integrations",
      "Database design (MongoDB, SQLite, MySQL)",
      "Vite & React performance optimization",
      "Vercel, Cloudflare, and custom deployment"
    ],
    tags: ["React.js", "Vite", "Node.js", "Express", "Django", "MongoDB", "CSS3 / Tailwind"]
  },
  {
    icon: <FaAndroid />,
    title: "Android App Development",
    desc: "Fluid, high-performance native Android applications with custom UI widgets, background services, and modern system integrations.",
    deliverables: [
      "Native Android app architecture (Java / Kotlin)",
      "Home screen widgets & system UI personalization",
      "Firebase backend & push notifications",
      "Offline caching & local data storage",
      "Proven published apps: Anify & Aniset on Google Play Store",
      "Google Play Store release & compliance guidance"
    ],
    tags: ["Android SDK", "Kotlin", "Java", "Firebase", "REST APIs", "Play Console"]
  },
  {
    icon: <FaPalette />,
    title: "UI/UX & Product Design",
    desc: "Modern, aesthetic, and user-centric interfaces crafted with meticulous attention to detail, typography, and micro-interactions.",
    deliverables: [
      "High-fidelity Figma wireframes & mockups",
      "Interactive, clickable prototypes",
      "Component design systems & tokens",
      "Mobile-first responsive layouts",
      "Dark mode & glassmorphism aesthetics"
    ],
    tags: ["Figma", "UI/UX Design", "Wireframing", "Design Systems", "Prototyping"]
  },
  {
    icon: <FaCogs />,
    title: "Backend, APIs & Automation",
    desc: "Reliable server-side logic, data pipelines, third-party service integrations, and workflow automations that scale.",
    deliverables: [
      "Custom RESTful API endpoints & webhooks",
      "Automated workflows with n8n & Python",
      "User authentication (JWT, OAuth, Sessions)",
      "Rate limiting, security & input sanitization",
      "Server deployment & environment setup"
    ],
    tags: ["Node.js", "Express", "Python / Django", "n8n", "REST APIs", "JWT"]
  }
];

const PROVEN_APPS_DATA = [
  {
    title: "Anify - Ultimate Personalization",
    platform: "Android App (Google Play Store)",
    badge: "Published on Play Store",
    desc: "A feature-packed Android personalization app published on Google Play. Offers ready-to-use home screen widgets, curated HD wallpapers, and trending ringtones—all natively built without requiring third-party tools like KWGT.",
    highlights: [
      "Native Android Architecture & Performance",
      "Custom Widget Engine & Live Wallpapers",
      "Published on Google Play Store with Active Users",
      "Seamless Firebase Integration & Offline Support"
    ],
    tags: ["Android", "Kotlin", "Java", "Google Play", "Widgets", "Firebase"],
    link: "https://play.google.com/store/apps/details?id=com.skdev.anify",
    linkText: "View on Google Play"
  },
  {
    title: "Aniset - Anime KWGT & KLWP",
    platform: "Android App (Google Play Store)",
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
    title: "MernShop - Full-Stack eCommerce",
    platform: "Full-Stack Web App",
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
    title: "SkDev Android Apps Showcase",
    platform: "Web Application & Hub",
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
    desc: "We discuss your project goals, technical requirements, target audience, and set clear milestones and budget."
  },
  {
    step: "02",
    title: "Design & Prototype",
    desc: "Creating wireframes, user journeys, and high-fidelity Figma mockups to align on the visual direction."
  },
  {
    step: "03",
    title: "Agile Development",
    desc: "Writing modular, performant code with regular staging previews so you can test features as they are built."
  },
  {
    step: "04",
    title: "Launch & Support",
    desc: "Full deployment to production, SEO setup, performance testing, and post-launch maintenance warranty."
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
    q: "How does the freelance engagement work?",
    a: "We start with a discovery chat (via Telegram, Email, or Google Meet) to understand your requirements, timeline, and scope. Once agreed, I provide a clear milestone roadmap. You receive regular live staging links to review progress before final handover."
  },
  {
    q: "How are payments structured?",
    a: "For fixed-price projects, payments are typically split into milestones (e.g., 40% upfront deposit to begin work, 30% after mid-point design & core feature demo, and 30% upon final delivery and deployment). For ongoing retainers, payments are invoiced bi-weekly or monthly."
  },
  {
    q: "Do I get full ownership of the source code and design assets?",
    a: "Yes! 100% of the intellectual property, source code, Figma design files, and deployment assets belong entirely to you once the final payment is cleared."
  },
  {
    q: "Can you help publish my Android app to the Google Play Store?",
    a: "Absolutely. I have published multiple apps to the Google Play Store (e.g., Anify, Aniset) and can guide you through Google Play Console setup, app bundle creation, signing, asset creation, and store listing optimization."
  },
  {
    q: "What if I already have an existing codebase or Figma design?",
    a: "I can work with your existing setup! Whether you need to convert a Figma design into clean React code, build a backend API for your frontend, or refactor and modernize an existing app, I can step in at any stage."
  }
];

const Freelance = () => {
  // Form state
  const [serviceType, setServiceType] = useState("Full-Stack Web App");
  const [budget, setBudget] = useState("$500 - $1,500");
  const [timeline, setTimeline] = useState("2 - 4 Weeks");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Accordion state
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePackageSelect = (pkgName) => {
    setServiceType(pkgName);
    const element = document.getElementById("inquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Freelance Project Inquiry: ${serviceType} - ${name || "New Client"}`);
    const body = encodeURIComponent(
      `Hi Satyakiran,\n\nI would like to discuss a freelance project with you:\n\n` +
      `• Name: ${name || "N/A"}\n` +
      `• Email: ${email || "N/A"}\n` +
      `• Service: ${serviceType}\n` +
      `• Budget: ${budget}\n` +
      `• Timeline: ${timeline}\n\n` +
      `Project Details:\n${message || "No additional details provided."}\n\n` +
      `Looking forward to hearing from you!`
    );

    window.location.href = `mailto:satyakiran296@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="freelance-page">
      <Helmet>
        <title>Hire Satyakiran | Freelance Full-Stack & Android Developer</title>
        <meta
          name="description"
          content="Hire Satyakiran for high-performance full-stack web applications, native Android development, and modern UI/UX design. Available for freelance projects, MVP launches, and contracts."
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
            Full-stack developer and creator of published Google Play Store Android apps (<b>Anify</b>, <b>Aniset</b>).
            I engineer scalable, fast, and visually stunning digital products—from high-performance React web applications to native Android experiences.
          </p>

          <div className="freelance-hero-actions">
            <a href="#inquiry" className="btn-primary-glow">
              <FaPaperPlane /> Start a Project
            </a>
            <a href="#proven-apps" className="btn-secondary-glass">
              <FaGooglePlay /> Real-World Apps
            </a>
            <a href="#services" className="btn-secondary-glass">
              Explore Services <FaArrowRight />
            </a>
          </div>

          <div className="hero-highlights-strip">
            <div className="highlight-badge">
              <FaCheckCircle /> Fast Turnaround & Sprints
            </div>
            <div className="highlight-badge">
              <FaCheckCircle /> 100% Direct Communication
            </div>
            <div className="highlight-badge">
              <FaCheckCircle /> Full Lifecycle (Design to Launch)
            </div>
          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section id="services" className="freelance-services-section">
          <div className="section-header">
            <span className="section-tag">Capabilities</span>
            <h2 className="section-title">What I Can Build For You</h2>
            <p className="section-subtitle">
              Comprehensive end-to-end engineering and design services tailored to your project's unique requirements.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES_DATA.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon-box">{service.icon}</div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>

                <div className="service-deliverables-title">Key Deliverables:</div>
                <ul className="service-deliverables-list">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx}>
                      <FaCheck />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-tags">
                  {service.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROVEN PRODUCTION APPS SECTION ================= */}
        <section id="proven-apps" className="freelance-apps-section">
          <div className="section-header">
            <span className="section-tag">Proven Track Record</span>
            <h2 className="section-title">Real-World Apps on Google Play & Web</h2>
            <p className="section-subtitle">
              Not just concepts or toy projects. I design, build, deploy, and maintain production applications with active users on the Google Play Store and web.
            </p>
          </div>

          <div className="apps-grid">
            {PROVEN_APPS_DATA.map((app, index) => (
              <div key={index} className="app-card">
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
                  Explore all published Android applications, updates, and releases directly on the Google Play Store.
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

        {/* ================= PROCESS SECTION ================= */}
        <section className="freelance-process-section">
          <div className="section-header">
            <span className="section-tag">Workflow</span>
            <h2 className="section-title">How We'll Work Together</h2>
            <p className="section-subtitle">
              A structured, transparent 4-step process designed to keep you in control and informed every step of the way.
            </p>
          </div>

          <div className="process-steps-grid">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="process-step-card">
                <div className="step-number">{step.step}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PRICING / PACKAGES ================= */}
        <section id="packages" className="freelance-pricing-section">
          <div className="section-header">
            <span className="section-tag">Engagements</span>
            <h2 className="section-title">Flexible Engagement Models</h2>
            <p className="section-subtitle">
              Choose the package that aligns with your product goals, whether you are launching an MVP or scaling an existing app.
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

        {/* ================= INQUIRY / CONTACT FORM ================= */}
        <section id="inquiry" className="freelance-inquiry-section">
          <div className="section-header">
            <span className="section-tag">Let's Connect</span>
            <h2 className="section-title">Start Your Project</h2>
            <p className="section-subtitle">
              Tell me about your idea, timeline, and budget. I'll review your details and respond within 24 hours.
            </p>
          </div>

          <div className="inquiry-wrapper">
            <form onSubmit={handleSubmit}>
              {/* Project Type */}
              <div className="form-group-block">
                <label className="form-label">1. What type of project are you looking for?</label>
                <div className="chip-options-grid">
                  {[
                    "Full-Stack Web App",
                    "Android Mobile App",
                    "UI/UX Design in Figma",
                    "MVP Launchpad",
                    "Custom Backend / API",
                    "Retainer / Maintenance"
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`chip-btn ${serviceType === option ? "selected" : ""}`}
                      onClick={() => setServiceType(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="form-group-block">
                <label className="form-label">2. Estimated Budget Range</label>
                <div className="chip-options-grid">
                  {[
                    "< $500 (₹40k)",
                    "$500 - $1,500 (₹40k - ₹1.2L)",
                    "$1,500 - $3,000 (₹1.2L - ₹2.5L)",
                    "$3,000+ (₹2.5L+)",
                    "Flexible / Discussion"
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

              {/* Timeline */}
              <div className="form-group-block">
                <label className="form-label">3. Desired Timeline</label>
                <div className="chip-options-grid">
                  {[
                    "Urgent (< 2 Weeks)",
                    "2 - 4 Weeks",
                    "1 - 2 Months",
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

              {/* Contact Info */}
              <div className="input-row">
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="form-group-block">
                <label className="form-label">Project Overview & Requirements</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell me about your product, what problems it solves, features you need, and any reference links..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                ></textarea>
              </div>

              {/* Submit & Direct Channels */}
              <div className="inquiry-actions">
                <div className="direct-connect-pills">
                  <span className="direct-connect-label">Or reach out directly:</span>
                  <a
                    href="https://t.me/skdev1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="connect-icon-link"
                    title="Chat on Telegram"
                  >
                    <FaTelegramPlane />
                  </a>
                  <a
                    href="mailto:satyakiran296@gmail.com"
                    className="connect-icon-link"
                    title="Send an Email"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href="https://in.linkedin.com/in/satyakiran29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="connect-icon-link"
                    title="Connect on LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                </div>

                <button type="submit" className="submit-inquiry-btn">
                  <FaRocket /> Send Project Inquiry
                </button>
              </div>

              {submitted && (
                <p style={{ marginTop: "18px", color: "#2cb67d", fontSize: "0.95rem", textAlign: "center" }}>
                  ✓ Your email draft has been generated. If your client didn't open, email me directly at{" "}
                  <b>satyakiran296@gmail.com</b>!
                </p>
              )}
            </form>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="freelance-faq-section">
          <div className="section-header">
            <span className="section-tag">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Common questions about working together, intellectual property, payments, and project timelines.
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
                href="https://t.me/skdev1"
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
