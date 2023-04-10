import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Contact me</h2>
      <span className="section__subtitle">
        Please fill in the contact form with any opinions and feedback
      </span>
      <div className="contact__container container grid">
        <div className="contact__content">
          <form action="" className="contact__form">
            <div className="contact__form-group">
              <label htmlFor="name" className="contact__form-tag">
                Name
              </label>
              <input
                type="text"
                className="contact__form-input"
                id="name"
                name="name"
                placeholder="Insert your name"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="email" className="contact__form-tag">
                Email
              </label>
              <input
                type="email"
                className="contact__form-input"
                id="email"
                name="email"
                placeholder="Insert your email"
              />
            </div>
            <div className="contact__form-group contact__form-area">
              <label htmlFor="name" className="contact__form-tag">
                Message
              </label>
              <textarea
                className="contact__form-input"
                name="message"
                id="message"
                cols={30}
                rows={10}
                placeholder="Insert your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="button button--flex contact__form-send"
            >
              Send<i className="bx bx-send"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
