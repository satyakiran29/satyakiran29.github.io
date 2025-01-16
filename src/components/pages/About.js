import React from "react";
import "./css/about.css";

const CetificateCard = ({ title, description, date, image, cetificatelink}) => (
  <div className="card">
    <img src={image} alt={title} className="card-image" />
    <h2>{title}</h2>
    <h5><b>Issued By</b>  {description}</h5>
    <h6> <b>Date:-</b>{date}</h6>
    <div className="links">
      <button
        className="link-button"
        onClick={() => window.open(cetificatelink, "_blank")}
      >
        View Certificate
      </button>
  
    </div>
  </div>
);



const App = () => {
  const cetificates = [
    {
      title: "Object Oriented Programming in Java",
      description:"University of California San",
      date:"December 28, 2024",
      image: "https://coursera-certificate-images.s3.amazonaws.com/RT6TTSYMXDNH",
      cetificatelink: "https://coursera.org/share/56d10d10593faebf7d2e5ce9a67bd576",
    },
    {
      title: "Introduction to Scripting in Python",
      description:"Rice University",
      date:"December 28, 2024",
      image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~QUVSNKETWTUH/CERTIFICATE_LANDING_PAGE~QUVSNKETWTUH.jpeg",
      cetificatelink: "https://coursera.org/share/f911787f8b2bf7c5b46f58706492ca3a",
    },
  ];

  return (
    <>
      <center>
        <h1>Certificates</h1>
        <p>My projects make use of a vast variety of the latest technology tools.</p>
      </center>
      <div className="c_container">
        {cetificates.map((project, index) => (
          <CetificateCard key={index} {...project} />
        ))}
      </div>

    
    </>
  );
};

export default App;
