import React, { useState } from "react";
import { FaEnvelope, FaCopy, FaCheck } from "react-icons/fa";
import { useIstStatus } from "../../../utils/useIstStatus";
import "./contact.css";

const EMAIL = "satyakiran296@gmail.com";

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const ist = useIstStatus();

    const handleCopyEmail = async () => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(EMAIL);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = EMAIL;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch (err) {
            console.warn("Failed to copy email:", err);
        }
    };

    return (
        <section className="contact-section">
            <h1 className="contact-title">Get in touch</h1>
            <p className="contact-desc">
                Have a project in mind, need a native Android or web application built, or want to discuss an engineering role? Send a message and I'll get back to you within one business day.
            </p>
            <div className="ist-availability-pill ist-availability-pill--contact" title="India Standard Time (UTC+5:30)">
                <span className={`ist-dot${ist.isOnlineHours ? " ist-dot--online" : ""}`} aria-hidden="true"></span>
                <span>India (IST) • {ist.timeText}</span>
                <span className="ist-sep">•</span>
                <span>{ist.statusLabel}</span>
            </div>
            <div className="contact-actions">
                <a href={`mailto:${EMAIL}`} className="contact-btn">
                    <FaEnvelope /> Send an email
                </a>
                <button
                    type="button"
                    className={`contact-copy-btn${copied ? " copied" : ""}`}
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                >
                    {copied ? <FaCheck /> : <FaCopy />}
                    <span>{copied ? "Copied!" : EMAIL}</span>
                </button>
            </div>

            {copied && (
                <div className="copy-toast" role="status" aria-live="polite">
                    <FaCheck className="copy-toast-icon" />
                    <span>Copied {EMAIL} to clipboard</span>
                </div>
            )}
        </section>
    );
};

export default Contact;
