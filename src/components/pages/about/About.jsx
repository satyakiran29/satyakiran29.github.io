import React, { useEffect, useState } from "react";
import LoaderComponent from "../../loader/Loader";
import "../about/about.css";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure pdfjs worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Import local certificates
import cert1 from "../../../data/Certificate/Full-Stack Web Dev Bootcamp_ HTML, CSS, JS, PHP, & WordPress.pdf";
import cert2 from "../../../data/Certificate/Full-Stack Web Development Mastery_ From HTML to React (1).pdf";
import cert3 from "../../../data/Certificate/Mastering the Linux.pdf";
import cert4 from "../../../data/Certificate/Next-Level Git with Expert Version Control and GitHub Techniques.pdf";
import cert5 from "../../../data/Certificate/React & .NET API Bootcamp_ Next.js, Redux, and Advanced Hooks.pdf";
import { FaCertificate, FaEye, FaDownload, FaFileAlt } from "react-icons/fa";

const PdfPreview = ({ file }) => {
  const [error, setError] = useState(false);

  return (
    <div className="pdf-preview-container">
      {!error ? (
        <Document
          file={file}
          onLoadError={(err) => {
            console.error("PDF load error:", err);
            setError(true);
          }}
          loading={
            <div className="pdf-preview-loading">
              <LoaderComponent />
            </div>
          }
        >
          <Page
            pageNumber={1}
            width={280}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      ) : (
        <div className="pdf-preview-fallback">
          <div className="certificate-icon-container">
            <FaCertificate className="certificate-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

const CetificateCard = ({ title, description, date, certificatelink, image }) => {
  const isPdf =
    typeof certificatelink === "string" &&
    (certificatelink.toLowerCase().includes(".pdf") ||
      certificatelink.startsWith("data:application/pdf"));

  return (
    <div className="card certificate-card">
      <div
        className="certificate-preview-wrapper"
        onClick={() => window.open(certificatelink, "_blank")}
        title={`View ${title}`}
      >
        {image ? (
          <img src={image} alt={title} className="certificate-preview-img" />
        ) : isPdf ? (
          <PdfPreview file={certificatelink} />
        ) : (
          <div className="pdf-preview-fallback">
            <div className="certificate-icon-container">
              <FaCertificate className="certificate-icon" />
            </div>
          </div>
        )}
      </div>

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
};

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

  const achievements = [
    {
      id: 1,
      title: "Android App Creator & Publisher",
      subtitle: "Anify & Aniset (Google Play Store)",
      date: "2024 - Present",
      description: "Designed, engineered, and published production Android applications (\"Anify\" and \"Aniset\") on the Google Play Store. Implemented native Android UI, widget customization engines, Firebase cloud synchronization, and successfully monetized with in-app purchases and ads, generating over 16,000 in revenue with active user engagement."
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
      title: "Chronic Disease Prediction Using ML",
      subtitle: "International Journal of Research Publication and Reviews (IJRPR)",
      date: "Nov 2025",
      description: "Developed an integrated Machine Learning framework using supervised learning algorithms (Decision Trees, Random Forest, Naïve Bayes, SVM, and ensembles) for automated clinical health-risk assessment. Built a Django web platform to support real-time user interaction, secure data handling, and model deployment.",
      link: "/paper.pdf"
    }
  ];

  // Static Certificates List
  const staticCertificates = [
    {
      id: "stat-1",
      title: "Full-Stack Web Dev Bootcamp",
      description: "HTML, CSS, JS, PHP, & WordPress",
      date: "2024",
      certificatelink: cert1
    },
    {
      id: "stat-2",
      title: "Full-Stack Web Development Mastery",
      description: "From HTML to React",
      date: "2024",
      certificatelink: cert2
    },
    {
      id: "stat-3",
      title: "Mastering the Linux",
      description: "Certification",
      date: "2024",
      certificatelink: cert3
    },
    {
      id: "stat-4",
      title: "Next-Level Git",
      description: "Expert Version Control and GitHub Techniques",
      date: "2024",
      certificatelink: cert4
    },
    {
      id: "stat-5",
      title: "React & .NET API Bootcamp",
      description: "Next.js, Redux, and Advanced Hooks",
      date: "2024",
      certificatelink: cert5
    },
    {
      id: "stat-6",
      title: "Google Play Store Listing Certificate",
      description: "Google Play Academy",
      date: "November 29, 2025",
      certificatelink: "https://www.credential.net/f0eb93aa-61c3-4223-ad30-5d0a40b5a829",
      image: "/images/google_play_certificate.png"
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
        <LoaderComponent />
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

      <div className="resume-section" style={{ maxWidth: '800px', margin: '30px auto 10px', padding: '0 20px' }}>
        <div className="card resume-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="certificate-preview-wrapper" onClick={() => window.open('/resume.pdf', '_blank')} title="View Resume PDF">
            <PdfPreview file="/resume.pdf" />
          </div>
          <h2 style={{ marginTop: '16px' }}>Curriculum Vitae / Resume</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>View online or download my official up-to-date resume PDF.</p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="link-button" onClick={() => window.open('/resume.pdf', '_blank')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <FaEye /> View Resume
            </button>
            <a href="/resume.pdf" download="satyakiran_resume.pdf" className="link-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <FaDownload /> Download Resume
            </a>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        <h2 className="section-heading">Internships</h2>
        {internships.map((item) => (
          <TimelineItem key={item.id} {...item} />
        ))}

        <h2 className="section-heading">Achievements</h2>
        {achievements.map((item) => (
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
