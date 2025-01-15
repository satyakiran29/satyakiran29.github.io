import React from "react";
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Footer from "./components/Footer";


import { useEffect, useState } from "react";


import HashLoader from "react-spinners/HashLoader";


function App() {
  const[Loading,SetLoading]=useState(true);

  useEffect(()=>{
    SetLoading(true)

    setTimeout(()=>{
    SetLoading(false)}
    ,1900)
  },[])  
  
  return (
    <>
      {Loading ? (
      <div className="loader"> 
        <HashLoader
          color={'#38761d'}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      ):(
      <div>
      


<Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/About" element={<About/>}/>

      </Routes>
      </Router>
      <Footer/>
      </div>
      )}  
    </>
  );
}

export default App;