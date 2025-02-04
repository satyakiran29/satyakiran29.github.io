import React, { useEffect, useState } from "react";
import "./css/about.css";

const CetificateCard = ({ title, description, date, image, certificatelink }) => (
  <div className="card">
    <img src={image} alt={title} className="card-image" onError={(e) => (e.target.src = "path/to/fallback-image.png")} />
    <h2>{title}</h2>
    <h5>
      <b>Issued By</b> {description}
    </h5>
    <h6>
      <b>Date:-</b> {date}
    </h6>
    <div className="links">
      <button
        className="link-button"
        onClick={() => window.open(certificatelink, "_blank")}
        aria-label={`View certificate for ${title}`}
      >
        View Certificate
      </button>
    </div>
  </div>
);

const App = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://satyakiranapi.vercel.app/api/certificates/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <center>
        <h1>Certificates</h1>
        <p>My projects make use of a vast variety of the latest technology tools.</p>
      </center>
      <div className="c_container">
        {certificates.map((certificate) => (
          <CetificateCard key={certificate.id} {...certificate} />
        ))}
      </div>
      
    </>
    
  );
};

export default App;