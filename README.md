# Satyakiran's Portfolio

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://semver.org)
[![React](https://img.shields.io/badge/react-19.2.4-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/vite-7.3.1-blue.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

This repository contains the source code for my personal portfolio website, designed to showcase my skills, projects, and professional background. The live version is deployed on Vercel at [satyakiran.vercel.app](https://satyakiran.vercel.app/).

## Table of Contents
- [What the project does](#what-the-project-does)
- [Why the project is useful](#why-the-project-is-useful)
- [How users can get started](#how-users-can-get-started)
- [Usage Examples](#usage-examples)
- [Where users can get help](#where-users-can-get-help)
- [Who maintains and contributes](#who-maintains-and-contributes)

## What the project does

This project is a modern, responsive single-page application (SPA) acting as my interactive digital portfolio. It features a home page with dynamic overviews, a searchable project gallery, UI/UX design showcases, and a consolidated bio page. It is built using the Vite build tool and the React library to ensure fast loading times and a seamless user experience.

## Why the project is useful

This project serves as an interactive resume that provides a clear overview of my professional experience and design skills. It benefits other developers looking for a modern, sleek portfolio template to build with Vite and React. 

**Key Features:**
- **Modern UI/UX:** A clean, responsive, and mobile-first design featuring glassmorphism effects and smooth animations.
- **Interactive Sections:** Dynamic hero section, filterable projects gallery, UI/UX design showcase, education/internship timeline, and a bio link tree.
- **Custom Loading Animation:** An SVG-based custom initial loading screen.
- **Fast and Seamless Navigation:** Built as a Single-Page Application (SPA) with React Router, making user navigation incredibly fast.

## How users can get started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm or a compatible package manager (Yarn, pnpm)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/satyakiran29/satyakiran29.github.io.git
   ```
2. Navigate to the project directory:
   ```bash
   cd satyakiran29.github.io
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Usage Examples

To run the application in a local development environment, start the Vite dev server:

```bash
npm run dev
```

Open `http://localhost:5173` (or the port specified in your terminal) to view the application in your browser.

To create an optimized production build:
```bash
npm run build
```

The compiled output will be generated in the `dist/` directory, which can be previewed locally using:
```bash
npm run preview
```

If you wish to use this repository as a template for your own portfolio, you can easily modify the portfolio details by updating the data files in the `src/data/` directory and replacing the assets in the `public/` directory with your own.

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
```

## Where users can get help

If you encounter any issues or have questions about the project setup or structure:
- Check the [issues page](https://github.com/satyakiran29/satyakiran29.github.io/issues) for existing discussions.
- Feel free to reach out via the contact information on my [live portfolio](https://satyakiran.vercel.app/).
- Review the generic React documentation at [react.dev](https://react.dev).

## Who maintains and contributes

**Maintainer:**
- [Satyakiran](https://github.com/satyakiran29)

**Contributions:**
Contributions, issues, and feature requests are always welcome! If you're interested in contributing to this project, please read our contribution guidelines.

For detailed instructions on how to contribute, please refer to the [CONTRIBUTING.md](docs/CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. For more details, please see the [LICENSE](LICENSE) file.
