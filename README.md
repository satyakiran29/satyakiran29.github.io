# Satyakiran's Portfolio


This repository contains the source code for my personal portfolio website, designed to showcase my skills, projects, and professional background. The live version is deployed on Vercel.

**Live Website:** [https://satyakiran.vercel.app/](https://satyakiran.vercel.app/)

## Features

-   **Modern UI/UX:** A clean, responsive, and mobile-first design featuring glassmorphism effects and smooth animations.
-   **Interactive Sections:**
    -   **Home:** A dynamic hero section with a typewriter effect and an overview of my skills.
    -   **Projects:** A filterable and searchable gallery of my development work, complete with links to live demos and source code.
    -   **Designs:** A visual showcase of my UI/UX design work for the Aniset application.
    -   **About:** A timeline detailing my education, internships, and certifications.
    -   **Bio:** A consolidated "link-in-bio" page with all my social and professional profiles.
-   **Single-Page Application (SPA):** Built with React and React Router for fast and seamless navigation.
-   **Custom Loading Animation:** An SVG-based animation provides a polished initial loading experience.

## Technology Stack

-   **Frontend:** React, Vite
-   **Routing:** React Router
-   **Styling:** CSS with Custom Properties, Styled Components
-   **Icons:** React Icons
-   **Deployment:** Vercel

## Getting Started

To run this project locally, follow these steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm (or a compatible package manager like Yarn or pnpm)

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/satyakiran29/satyakiran29.github.io.git
    ```

2.  Navigate into the project directory:
    ```bash
    cd satyakiran29.github.io
    ```

3.  Install the required dependencies:
    ```bash
    npm install
    ```

### Running the Application

-   To start the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the port specified in the terminal) to view it in your browser.

-   To create a production-ready build:
    ```bash
    npm run build
    ```
    The build artifacts will be stored in the `dist/` directory.

-   To preview the production build locally:
    ```bash
    npm run preview
    ```

## Project Structure

The repository is organized as follows:

```
satyakiran29.github.io/
├── public/                # Static assets, favicons, and manifest.json
├── src/
│   ├── components/
│   │   ├── icons/         # SVG icons as React components
│   │   ├── loader/        # Custom loading screen component
│   │   ├── pages/         # Components for each site section (Home, About, etc.)
│   │   └── src/           # Reusable components like Navbar and Footer
│   ├── data/              # Static data including images and certificate PDFs
│   ├── App.jsx            # Main application component with routing logic
│   └── index.jsx          # Application entry point
├── vite.config.js         # Vite build tool configuration
└── package.json           # Project dependencies and scripts
