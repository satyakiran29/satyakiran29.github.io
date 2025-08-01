import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Project from "./components/pages/project/Project";
import Bio from "./components/pages/bio/Bio";
import Gallery from "./components/pages/gallery/Gallery";
import "./components/pages/gallery/gallery.css";
import Footer from "./components/src/footer/Footer";
import Nav from "./components/src/nav/nav";
import HashLoader from "react-spinners/HashLoader";
import GuestBook from "./components/pages/guestbook/guestbook";
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
       <Route path="/guestbook" element={<GuestBook />} />
      </Routes>
      {shouldShowFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
}

export default App;