import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Project from "./components/pages/project/Project";
import Bio from "./components/pages/bio/Bio";
import Contact from "./components/pages/contact/Contact";
import Footer from "./components/src/footer/Footer";
import Nav from "./components/src/nav/nav";
import LoaderComponent from "./components/loader/Loader";
import ExternalRedirect from './components/pages/ExternalRedirect';
import NotFound from "./components/pages/notfound/NotFound";

function App() {
  const [Loading, SetLoading] = useState(true);

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 3500); // Increased timeout to let the loader animation finish
  }, []);

  return (
    <>
      {Loading ? (
        <LoaderComponent />
      ) : (
        <Router>
          <AppContent />
        </Router>
      )}
    </>
  );
}

// Separate component to handle route-specific logic
function AppContent() {
  const location = useLocation();

  // routes where the Nav and Footer should NOT be displayed
  const hideNavRoutes = ["/bio", "/Bio"];
  const hideFooterRoutes = ["/bio", "/Bio"];
  // Check if the current route is in the hideNavRoutes array
  const shouldShowNav = !hideNavRoutes.includes(location.pathname);
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNav && <Nav />} {/* Conditionally render Nav */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="one-page-container">
              <section id="home"><Home /></section>
              <section id="about"><About /></section>
              <section id="projects"><Project /></section>
              <section id="contact"><Contact /></section>
            </div>
          }
        />
        <Route path="/Bio" element={<Bio />} />
        <Route path="/bio" element={<Bio />} />
        <Route
          path="/Blog"
          element={<ExternalRedirect to="https://satyakiran-blog.vercel.app/" />}
        />
        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
}

export default App;