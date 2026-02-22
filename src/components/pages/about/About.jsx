import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import "../about/about.css";

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

const TimelineItem = ({ date, title, subtitle, description, link }) => (
  <div className="timeline-item">
    <div className="timeline-marker"></div>
    <div className="timeline-content card">
      <span className="timeline-date">{date}</span>
      <h3 className="timeline-title">{title}</h3>
      <h4 className="timeline-subtitle">{subtitle}</h4>
      <p>{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="link-button" style={{ marginTop: '15px', display: 'inline-block', textDecoration: 'none' }}>
          Read Paper
        </a>
      )}
    </div>
  </div>
);

const App = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder static data for timelines - replace with API or actual details
  const internships = [
    {
      id: 1,
      title: "Django Developer Intern",
      subtitle: "Hippocloud, Visakhapatnam",
      date: "2025",
      description: "Developed and enhanced scalable web applications utilizing the Django framework. Designed, built, and successfully implemented robust RESTful APIs for data handling."
    },
    {
      id: 2,
      title: "Java & Python Trainee",
      subtitle: "Sdvvl, Kakinada",
      date: "2024",
      description: "Completed intensive training covering core programming concepts and advanced problem-solving techniques. Gained hands-on experience by executing practical exercises and foundational project work."
    }
  ];

  const education = [
    {
      id: 1,
      title: "B.Tech in Computer Science Engineering",
      subtitle: "",
      date: "2027",
      description: "Currently pursuing a Bachelor of Technology in Computer Science Engineering."
    },
    {
      id: 2,
      title: "Diploma in Computer Science Engineering",
      subtitle: "KIET Group of Institutions, Coringa",
      date: "2024",
      description: "Completed Diploma in Computer Science Engineering."
    }
  ];

  const publications = [
    {
      id: 1,
      title: "Title of Built Paper / Research Topic",
      subtitle: "Conference / Journal Name Placeholder",
      date: "Nov 2023",
      description: "Brief summary of the paper's contribution and findings. Highlight any novel techniques or technologies used.",
      link: "#" // Replace with actual URL to the paper
    }
  ];

  // Static Certificates List
  const staticCertificates = [
    {
      id: "stat-1",
      title: "The Joy of Computing Using Python",
      description: "NPTEL (IIT Madras)",
      date: "Online",
      image: "https://placehold.co/600x400?text=Joy+of+Computing+Python",
      certificatelink: "#"
    },
    {
      id: "stat-2",
      title: "Full-Stack Web Development Mastery",
      description: "L&T EduTech",
      date: "Online",
      image: "https://placehold.co/600x400?text=Full-Stack+Web+Dev",
      certificatelink: "#"
    },
    {
      id: "stat-3",
      title: "Next-Level Git with Expert Version Control",
      description: "L&T EduTech",
      date: "Online",
      image: "https://placehold.co/600x400?text=Next-Level+Git",
      certificatelink: "#"
    },
    {
      id: "stat-4",
      title: "Mastering the Linux",
      description: "L&T EduTech",
      date: "Online",
      image: "https://placehold.co/600x400?text=Linux+Mastery",
      certificatelink: "#"
    },
    {
      id: "stat-5",
      title: "Object Oriented Programming in Java",
      description: "Coursera",
      date: "Online",
      image: "https://placehold.co/600x400?text=Java+OOP",
      certificatelink: "#"
    }
  ];

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
    return (
      <div className="loader" style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <HashLoader
          color={"#38761d"}
          loading={true}
          size={80}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="about-page">
      <center>
        <h1>Experience & <span style={{ color: '#7f5af0' }}>Education</span></h1>
        <p className="subtitle">My academic and professional journey.</p>
      </center>

      <div className="timeline-container">
        <h2 className="section-heading">Internships</h2>
        {internships.map((item) => (
          <TimelineItem key={item.id} {...item} />
        ))}

        <h2 className="section-heading">Education</h2>
        {education.map((item) => (
          <TimelineItem key={item.id} {...item} />
        ))}

        <h2 className="section-heading">Paper Publications</h2>
        {publications.map((item) => (
          <TimelineItem key={item.id} {...item} />
        ))}
      </div>

      <center style={{ marginTop: '60px' }}>
        <h1>Licenses & <span style={{ color: '#7f5af0' }}>Certificates</span></h1>
      </center>
      <div className="c_container">
        {staticCertificates.map((certificate) => (
          <CetificateCard key={certificate.id} {...certificate} />
        ))}
        {certificates.map((certificate) => (
          <CetificateCard key={certificate.id} {...certificate} />
        ))}
      </div>
    </div>
  );
};

export default App;
