import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaHome,
  FaGraduationCap,
  FaThLarge,
  FaPalette,
  FaEnvelope,
  FaBriefcase,
  FaIdBadge,
  FaFilePdf,
  FaDownload,
  FaCopy,
  FaCheck,
  FaGithub,
  FaGooglePlay,
  FaExternalLinkAlt,
  FaTimes,
  FaSun,
  FaMoon
} from "react-icons/fa";
import { projects } from "../../../data/projectsData";
import { useTheme } from "../../../context/ThemeContext";
import "./CommandPalette.css";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleOpenEvent = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (sectionId) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) window.scrollTo({ top: el.offsetTop - 75, behavior: "smooth" });
      }, 120);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) window.scrollTo({ top: el.offsetTop - 75, behavior: "smooth" });
  };

  const commands = useMemo(() => {
    const navItems = [
      {
        id: "nav-home",
        group: "Navigation",
        label: "Home",
        hint: "#home",
        icon: <FaHome />,
        action: () => scrollToSection("home"),
      },
      {
        id: "nav-about",
        group: "Navigation",
        label: "Experience & Education",
        hint: "#about",
        icon: <FaGraduationCap />,
        action: () => scrollToSection("about"),
      },
      {
        id: "nav-projects",
        group: "Navigation",
        label: "Featured Projects",
        hint: "#projects",
        icon: <FaThLarge />,
        action: () => scrollToSection("projects"),
      },
      {
        id: "nav-designs",
        group: "Navigation",
        label: "UI/UX Designs",
        hint: "#designs",
        icon: <FaPalette />,
        action: () => scrollToSection("designs"),
      },
      {
        id: "nav-contact",
        group: "Navigation",
        label: "Contact",
        hint: "#contact",
        icon: <FaEnvelope />,
        action: () => scrollToSection("contact"),
      },
      {
        id: "nav-freelance",
        group: "Navigation",
        label: "Freelance Services",
        hint: "/freelance",
        icon: <FaBriefcase />,
        action: () => {
          setOpen(false);
          navigate("/freelance");
        },
      },
      {
        id: "nav-bio",
        group: "Navigation",
        label: "Bio & Links Card",
        hint: "/bio",
        icon: <FaIdBadge />,
        action: () => {
          setOpen(false);
          navigate("/bio");
        },
      },
    ];

    const quickActions = [
      {
        id: "act-theme",
        group: "Actions",
        label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        hint: "Theme",
        icon: theme === "dark" ? <FaSun /> : <FaMoon />,
        action: () => {
          toggleTheme();
          setOpen(false);
        },
      },
      {
        id: "act-resume-view",
        group: "Actions",
        label: "View Resume PDF",
        hint: "New Tab",
        icon: <FaFilePdf />,
        action: () => {
          setOpen(false);
          window.open("/resume.pdf", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "act-resume-dl",
        group: "Actions",
        label: "Download Resume",
        hint: "PDF",
        icon: <FaDownload />,
        action: () => {
          setOpen(false);
          const a = document.createElement("a");
          a.href = "/resume.pdf";
          a.download = "satyakiran_resume.pdf";
          a.click();
        },
      },
      {
        id: "act-copy-email",
        group: "Actions",
        label: copiedEmail ? "Copied satyakiran296@gmail.com" : "Copy Email Address",
        hint: "satyakiran296@gmail.com",
        icon: copiedEmail ? <FaCheck /> : <FaCopy />,
        action: () => {
          navigator.clipboard?.writeText("satyakiran296@gmail.com");
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 1800);
        },
      },
      {
        id: "act-github",
        group: "Actions",
        label: "Open GitHub Profile",
        hint: "@satyakiran29",
        icon: <FaGithub />,
        action: () => {
          setOpen(false);
          window.open("https://github.com/satyakiran29", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "act-play",
        group: "Actions",
        label: "Open Google Play Console",
        hint: "Published Apps",
        icon: <FaGooglePlay />,
        action: () => {
          setOpen(false);
          window.open("https://play.google.com/store/apps/dev?id=9166037782169864125", "_blank", "noopener,noreferrer");
        },
      },
    ];

    const projectItems = projects.map((p, idx) => ({
      id: `proj-${idx}`,
      group: "Projects",
      label: p.title,
      hint: p.category,
      icon: <FaExternalLinkAlt />,
      action: () => {
        setOpen(false);
        const targetUrl =
          p.projectLink && p.projectLink !== "#"
            ? p.projectLink
            : p.githubLink && p.githubLink !== "#"
              ? p.githubLink
              : null;
        if (targetUrl) {
          window.open(targetUrl, "_blank", "noopener,noreferrer");
        } else {
          scrollToSection("projects");
        }
      },
    }));

    return [...navItems, ...quickActions, ...projectItems];
  }, [copiedEmail, location.pathname, theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      filtered[activeIndex].action();
    }
  };

  if (!open) return null;

  return (
    <div
      className="cmd-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-row">
          <FaSearch className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Jump to page, project, or action..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <button
            type="button"
            className="cmd-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close command palette"
          >
            <FaTimes />
          </button>
        </div>

        <div className="cmd-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No matching commands found.</div>
          ) : (
            filtered.map((item, idx) => {
              const showGroupHeader =
                idx === 0 || filtered[idx - 1].group !== item.group;
              return (
                <React.Fragment key={item.id}>
                  {showGroupHeader && (
                    <div className="cmd-group-label">{item.group}</div>
                  )}
                  <button
                    type="button"
                    className={`cmd-item${idx === activeIndex ? " active" : ""}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={item.action}
                  >
                    <span className="cmd-item-left">
                      <span className="cmd-item-icon">{item.icon}</span>
                      <span className="cmd-item-label">{item.label}</span>
                    </span>
                    <span className="cmd-item-hint">{item.hint}</span>
                  </button>
                </React.Fragment>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>Enter</kbd> select
          </span>
          <span>
            <kbd>Esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
