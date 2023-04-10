import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        {/* <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="footer__link">
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="footer__link">
              Projects
            </a>
          </li>
        </ul> */}

        <div className="footer__external">
          <a
            href="https://github.com/hoangbru"
            className="footer__external-link"
            target="_blank"
          >
            <i className="bx bxl-github"></i>
          </a>
          <a
            href="https://www.figma.com/@hoangbru"
            className="footer__external-link"
            target="_blank"
          >
            <i className="bx bxl-figma"></i>
          </a>
          <a
            href="https://stackoverflow.com/users/21541792/pham-viet-hoang"
            className="footer__external-link"
            target="_blank"
          >
            <i className='bx bxl-stack-overflow'></i>
          </a>
        </div>
        <p className="footer__copy">Made & design by <span>vithoang</span></p>
      </div>
    </footer>
  );
};

export default Footer;
