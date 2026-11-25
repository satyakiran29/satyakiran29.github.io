import otisimg from "./imgs/Project/otis.webp";
import anisetweb from "./imgs/Project/aniset_web.webp";
import satyakiranimg from "./imgs/Project/satyakiran.webp";
import student from "./imgs/Project/student.webp";
import anify_bg from "./imgs/Project/anify_bg.webp";
import anisetAppImg from "./imgs/Project/aniset_app.webp";
import guardianaiimg from "./imgs/Project/guardianai.webp";
import skdevWebImg from "./imgs/Project/skdev_web.svg";
import anifyWebImg from "./imgs/Project/anify_web.svg";
import gmritEventsImg from "./imgs/Project/gmrit_events.svg";
import mernshopImg from "./imgs/Project/mernshop.svg";
import foodscapeImg from "./imgs/Project/foodscape.svg";

export const projects = [
    {
      title: "Anify - Ultimate Personalization",
      description:
        "Give your phone a complete makeover with Anify, the ultimate personalization app for Android. Get access to ready-to-use widgets, HD wallpapers, and trending ringtones—all in one app, with no KWGT required.",
      tags: ["Android App", "Widgets", "Wallpapers", "Ringtones", "Published on Play Store"],
      badge: "Google Play",
      playStore: true,
      actionLabel: "Get on Google Play",
      highlights: [
        "No KWGT required — native widgets out of the box",
        "Curated HD wallpapers and trending ringtones",
        "Production Android release on Google Play Store"
      ],
      caseStudy: {
        role: "Creator & Android Developer",
        problem: "Most Android home-screen widget packs require paid third-party apps like KWGT, creating friction for casual users.",
        architecture: "Native Android app with built-in widget providers, optimized image caching for HD wallpapers, and cloud-synced ringtone/preset assets.",
        outcome: "Published on Google Play Store with zero external dependencies required for end users."
      },
      image: anify_bg,
      projectLink: "https://play.google.com/store/apps/details?id=com.skdev.anify",
      category: "Mobile",
    },
    {
      title: "Aniset - Kwgt Widgets & Klwp",
      description:
        "Transform your Android Home Screen with Aniset - Anime KWGT Widgets & KLWP! Elevate your device customization to a whole new level with anime-inspired widgets and themes.",
      tags: ["Android App", "Kotlin", "JSON", "Firebase", "UI/UX", "Published on Play Store"],
      badge: "Google Play",
      playStore: true,
      actionLabel: "Get on Google Play",
      highlights: [
        "Kotlin client with Firebase cloud asset sync",
        "Anime-inspired KWGT widgets & KLWP setups",
        "Production Android release on Google Play Store"
      ],
      caseStudy: {
        role: "Creator & Android Developer",
        problem: "Anime customization fans lacked a unified, regularly updated pack of cohesive KWGT widgets and KLWP themes.",
        architecture: "Kotlin-based Android client backed by Firebase cloud storage & JSON manifests for over-the-air preset additions.",
        outcome: "Published on Google Play Store with 5-star user reviews and active long-term users."
      },
      image: anisetAppImg,
      projectLink: "https://play.google.com/store/apps/details?id=com.skdev.aniset",
      category: "Mobile",
    },
    {
      title: "SkDev App Showcase",
      description:
        "A modern, responsive web application serving as a centralized hub to showcase Android applications published on the Google Play Store. It also features news updates, FAQs, and a support/donation platform.",
      tags: ["React", "Vite", "React Router", "UI/UX"],
      badge: "App Hub",
      actionLabel: "Visit Showcase",
      githubRepo: "satyakiran29/skdev-web",
      highlights: [
        "Centralized showcase for published Google Play apps",
        "Release updates, FAQs, and community support links",
        "Responsive React + Vite single-page web app"
      ],
      caseStudy: {
        role: "Full-Stack Web Developer",
        problem: "Users across Anify and Aniset needed one central portal for app updates, FAQs, and support links.",
        architecture: "Modular React + Vite SPA with React Router navigation and responsive product showcase sections.",
        outcome: "Deployed live at skdev.psatyakiran.in as the official hub for SkDev Android apps."
      },
      image: skdevWebImg,
      projectLink: "https://skdev.psatyakiran.in/",
      githubLink: "https://github.com/satyakiran29/skdev-web",
      category: "Web",
    },
    {
      title: "GuardianAI",
      description:
        "A B.Tech Full Stack Internship (FSI) demo prototype (not intended for public release) demonstrating an emergency safety and incident command workflow—combining an Android client (Java & XML) with a Django & Supabase prototype dashboard for panic triggers, GPS telemetry, and safety chat.",
      tags: ["Demo Prototype", "FSI Project", "Android", "Java", "Django", "Supabase"],
      badge: "Demo Prototype • FSI",
      actionLabel: "View Demo",
      githubRepo: "satyakiran29/GuardianAI",
      highlights: [
        "Academic B.Tech FSI demo prototype (not a public release)",
        "Android prototype client (Java & XML) + Django & Supabase backend",
        "Demonstrates shake/voice triggers, GPS telemetry, and safety chat"
      ],
      caseStudy: {
        role: "Lead Architect (B.Tech FSI Demo Prototype)",
        problem: "Explore a unified prototype linking instant mobile SOS triggers with role-isolated guardian tracking and incident dispatch.",
        architecture: "Android client (Java + XML) streaming telemetry and panic events to a Django REST backend backed by Supabase Realtime.",
        outcome: "Built and verified end-to-end as a B.Tech Full Stack Internship (FSI) prototype (not for public release)."
      },
      image: guardianaiimg,
      projectLink: "https://gai.psatyakiran.in/",
      githubLink: "https://github.com/satyakiran29/GuardianAI",
      category: "Mobile",
    },
    {
      title: "Anify Website",
      description:
        "A sleek, premium, and dynamic landing page website for Anify Widgets showcasing beautifully crafted widget designs. Built with React and Vite, the website features a modern glassmorphic aesthetic, smooth animations, and a fully responsive layout.",
      tags: ["React.js", "Vite", "Web", "UI/UX"],
      image: anifyWebImg,
      projectLink: "https://anify.psatyakiran.in/",
      githubLink: "https://github.com/satyakiran29/Anify_web",
      category: "Web",
    },
    {
      title: "Aniset - WebSite",
      description:
        "To Showcase About Aniset Android App and it's widgets website",
      tags: ["Website", "ReactJs", "Css", "UI/UX"],
      image: anisetweb,
      projectLink: "https://aniset.vercel.app/",
      githubLink: "https://github.com/satyakiran29/Aniset_Web",
      category: "Web",
    },
    {
      title: "GMRIT Student Event Management System",
      description:
        "The GMRIT Student Event Management System is a lightweight, web-based platform tailored for tracking, managing, and registering for events across various student chapters. Built using PHP and MySQL, it provides a centralized portal for students to discover opportunities and for administrators to oversee chapter activities.",
      tags: ["PHP", "MySQL", "Web", "Hackathon 2025"],
      image: gmritEventsImg,
      projectLink: "#",
      githubLink: "https://github.com/satyakiran29/hackthon_2025_Web",
      category: "Web",
    },
    {
      title: "MernShop - Full Stack eCommerce Platform",
      description:
        "A modern, responsive, and feature-rich complete MERN-stack eCommerce platform. Built with React.js, Tailwind CSS, Vite for the frontend, and Node.js, Express.js, MongoDB for the backend. It offers an exceptionally fast, fluid, and premium shopping experience for both customers and administrators.",
      tags: ["React.js", "Tailwind CSS", "Vite", "Node.js", "Express.js", "MongoDB"],
      caseStudy: {
        role: "Full-Stack Developer",
        problem: "Build a fast end-to-end storefront and admin inventory system with clean separation between customer and admin workflows.",
        architecture: "React + Tailwind CSS + Vite frontend paired with Express.js REST APIs and MongoDB persistence.",
        outcome: "Deployed live at mernshop.psatyakiran.in with full product catalog, cart, and admin management."
      },
      image: mernshopImg,
      projectLink: "https://mernshop.psatyakiran.in/",
      githubLink: "https://github.com/satyakiran29/MernShop",
      category: "Web",
    },
    {
      title: "SatyaKiran Portfolio",
      description:
        "A personal portfolio website built using ReactJs and CSS. The website showcases my projects, skills, and contact information.",
      tags: ["Website", "ReactJs", "Css", "UI/UX"],
      image: satyakiranimg,      
      projectLink: "https://satyakiran.vercel.app/",
      githubLink: "https://github.com/satyakiran29/satyakiran29.github.io",
      category: "Web",
    },
    {
      title: "Student Results Management System",
      description:
        "A web application for managing student results, built using Php and Mysql. The application allows teachers to input and manage student results efficiently.",
      tags: ["Website", "CSS", "HTML", "PHP", "MySQL"],
      image: student,
      projectLink: "https://web.skdev.rf.gd/",
      githubLink: "https://github.com/satyakiran29/Student_mangement_system",
      category: "Web",
    },
    {
      title: "Online Temple Information System",
      description:
        "Built as a B.Tech 3rd Year (6th Semester) Mini Project — a comprehensive information portal featuring a dynamic landing page and developer profiles, with secure role-based login functionality to manage access controls across user tiers.",
      tags: ["Mini Project", "B.Tech 3rd Year • 6th Sem", "React.js", "Node.js", "Express.js"],
      caseStudy: {
        role: "Full-Stack Developer (B.Tech 6th Sem Mini Project)",
        problem: "Provide visitors and temple administrators with structured schedules, information pages, and tiered role-based portal access.",
        architecture: "React.js frontend integrated with a Node.js + Express.js backend handling authenticated role-based routes.",
        outcome: "Delivered as a B.Tech 3rd Year (6th Semester) Mini Project and hosted at otis.psatyakiran.in."
      },
      image: otisimg,
      githubLink: "https://github.com/satyakiran29/OTIS",
      projectLink: "https://otis.psatyakiran.in/",
      category: "Web",
    },
    {
      title: "Foodscape Web Application",
      description:
        "Developed a MERN stack web application featuring a highly engaging reels-style video feed integration. Built efficient RESTful APIs to manage content delivery and user interactions in projects.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
      image: foodscapeImg,
      githubLink: "#",
      category: "Web",
    }
];

export const testimonies = [
    {
      title: "선배야쿠자",
      description:
        "This widget is best in Play Store and it's a game-changer! It's sleek, customizable, and makes app discovery and management a breeze. The developer support for this widget is top-notch. Any questions or issues I had were quickly resolved, and he is very responsive and helpful. It's clear that he is dedicated to providing a great user experience. Great job!",
      tags: ["User Feedback", "5 Star", "Aniset User"],
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjWBZULZPa2XhPg5AoC28foZVYMFp3etyrbSyXyYM-uVwjJJtude=s32-rw",
    },
    {
      title: "Gaurav Kumar",
      description:
        "Using it since one year and really like it's widgets. And developer thank you for your efforts.",
      tags: ["User Feedback", "5 Star", "Aniset User"],
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjVsxs5270RailQPpjfZGkr57R_3HBL4ywgw0JT5Dd_hHyq2yuvd=s32-rw",
    },
];
