import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FaCertificate, FaFileAlt } from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
              <FaFileAlt className="pdf-loading-icon" />
              <span>Loading preview...</span>
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

export default PdfPreview;
