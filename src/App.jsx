import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Project from "./components/pages/project/Project";
import Designs from "./components/pages/designs/Designs";
import Contact from "./components/pages/contact/Contact";
import Footer from "./components/src/footer/Footer";
import Nav from "./components/src/nav/nav";
import CommandPalette from "./components/src/command/CommandPalette";
import LoaderComponent from "./components/loader/Loader";
import ExternalRedirect from './components/pages/ExternalRedirect';
import NotFound from "./components/pages/notfound/NotFound";
import { ThemeProvider } from "./context/ThemeContext";

const Bio = lazy(() => import("./components/pages/bio/Bio"));
const Freelance = lazy(() => import("./components/pages/freelance/Freelance"));

function App() {
  const [Loading, SetLoading] = useState(true);

  useEffect(() => {
    SetLoading(true);
    const t = setTimeout(() => {
      SetLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider>
      {Loading ? (
        <LoaderComponent />
      ) : (
        <Router>
          <AppContent />
        </Router>
      )}
    </ThemeProvider>
  );
}

// Separate component to handle route-specific logic
// routes where the Nav and Footer should NOT be displayed
function AppContent() {
  const location = useLocation();

  const hideNavRoutes = ["/bio", "/Bio"];
  const hideFooterRoutes = ["/bio", "/Bio"];
  // Check if the current route is in the hideNavRoutes array
  const shouldShowNav = !hideNavRoutes.includes(location.pathname);
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNav && <Nav />} {/* Conditionally render Nav */}
      <CommandPalette />
      <Suspense fallback={<LoaderComponent />}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="one-page-container">
                <section id="home"><Home /></section>
                <section id="about"><About /></section>
                <section id="projects"><Project /></section>
                <section id="designs"><Designs /></section>
                <section id="contact"><Contact /></section>
              </div>
            }
          />
          <Route path="/Bio" element={<Bio />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/freelance" element={<Freelance />} />
          <Route path="/Freelance" element={<Freelance />} />
          <Route
            path="/Blog"
            element={<ExternalRedirect to="https://satyakiran-blog.vercel.app/" />}
          />
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {shouldShowFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
}

export default App;