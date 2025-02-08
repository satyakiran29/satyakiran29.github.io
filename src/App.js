import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Project from "./components/pages/Project";
import Bio from "./components/Bio_Page";
import Gallery from "./components/Gallery";
import "./components/pages/css/gallery.css";
import Footer from "./components/Footer";
import Nav from "./components/nav";
import HashLoader from "react-spinners/HashLoader";

function App() {
  const [Loading, SetLoading] = useState(true);

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 1900);
  }, []);

  return (
    <>
      {Loading ? (
        <div className="loader">
          <HashLoader
            color={"#38761d"}
            loading={true}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
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
  const hideNavRoutes = ["/bio"]; 
  const hideFooterRoutes = ["/bio"]; 
  // Check if the current route is in the hideNavRoutes array
  const shouldShowNav = !hideNavRoutes.includes(location.pathname);
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNav && <Nav />} {/* Conditionally render Nav */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Bio" element={<Bio />} />
      </Routes>
      {shouldShowFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
}

export default App;