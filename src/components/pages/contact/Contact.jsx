import React from "react";
import "./contact.css";

const Contact = () => {
    return (
        <section className="contact-section">
            <h1 className="contact-title">Get in touch</h1>
            <p className="contact-desc">
                Have a project in mind, need a native Android or web application built, or want to discuss an engineering role? Send a message and I'll get back to you within one business day.
            </p>
            <a href="mailto:satyakiran296@gmail.com" className="contact-btn">
                Send an email
            </a>
        </section>
    );
};

export default Contact;
