import React from "react";
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
        <Footer/>
        </div>
  );
};

export default App;
