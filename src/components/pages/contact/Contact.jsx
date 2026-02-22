import React from "react";
import "./contact.css";

const Contact = () => {
    return (
        <section className="contact-section">
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-desc">
                My inbox is always open. Whether you have a question or just want to say hello, I'll try my best to get back to you! Feel free to mail me about any relevant job updates.
            </p>
            <a href="mailto:psatyakiran1@gmail.com" className="contact-btn">
                Mail Me
            </a>
        </section>
    );
};

export default Contact;
