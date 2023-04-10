import React, { useEffect, useState } from "react";
import "./header.css";
// import * as Unicons from "@iconscout/react-unicons";

const Header = () => {
  const [Toggle, showMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  useEffect(() => {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("header nav a");

    window.onscroll = () => {
      if (sections) {
        sections.forEach((sec) => {
          let top = window.scrollY;
          let offset = sec.offsetTop - 250;
          let height = sec.offsetHeight;
          let id = sec.getAttribute("id");

          if (top >= offset && top <= offset + height) {
            if (navLinks) {
              navLinks.forEach((links) => {
                links.classList.remove("active-link");
                let active = document.querySelector("header nav a[href*=" + id + "]")
                active?.classList.add("active-link");
              });
            }
          }
        });
      }
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <div className={Toggle ? "nav__menu show-menu" : "nav__menu"}>
          <ul className="nav__list">
            <li className="nav__item">
              <a
                href="#home"
                onClick={() => setActiveNav("#home")}
                className={
                  activeNav === "#home" ? "nav__link active-link" : "nav__link"
                }
              >
                Home
                <i className="uil uil-estate nav__icon"></i>
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#about"
                onClick={() => setActiveNav("#about")}
                className={
                  activeNav === "#about" ? "nav__link active-link" : "nav__link"
                }
              >
                About
                <i className="uil uil-user nav__icon"></i>
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#skills"
                onClick={() => setActiveNav("#skills")}
                className={
                  activeNav === "#skills"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Skills
                <i className="uil uil-setting nav__icon"></i>
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#projects"
                onClick={() => setActiveNav("#projects")}
                className={
                  activeNav === "#projects"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Projects
                <i className="uil uil-folder nav__icon"></i>
              </a>
            </li>

            {/* <li className="nav__item">
              <a
                href="#services"
                onClick={() => setActiveNav("#services")}
                className={
                  activeNav === "#services"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Services
                <Unicons.UilBag className="nav__icon" />
              </a>
            </li> */}

            <li className="nav__item">
              <a
                href="#contact"
                onClick={() => setActiveNav("#contact")}
                className={
                  activeNav === "#contact"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Contact
                <i className="uil uil-comment nav__icon"></i>
              </a>
            </li>
          </ul>
          <i
            className="uil uil-times nav__close"
            onClick={() => {
              showMenu(!Toggle);
            }}
          ></i>
        </div>
        <div
          className="nav__toggle"
          onClick={() => {
            showMenu(!Toggle);
          }}
        >
           <i className="uil uil-bars"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
