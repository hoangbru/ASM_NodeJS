import React from "react";
import "./home.css";
import { Tooltip } from "antd";
// import CV from '../../assets/vithoang-Cv.pdf';

const Home = () => {
  // tooltip
  const text = <span className="tooltip-resume">Download CV</span>;
  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <div className="home__social">
            <a
              href="https://www.facebook.com/akachihale/"
              className="home__social-icon"
              target="_blank"
            >
              <i className="uil uil-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/tatakemichi/"
              className="home__social-icon"
              target="_blank"
            >
              <i className="uil uil-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/viet-hoang-pham-211524270/"
              className="home__social-icon"
              target="_blank"
            >
              <i className="uil uil-linkedin"></i>
            </a>
          </div>

          <div className="home__img"></div>

          <div className="home__data">
            <h1 className="home__title">vithoang</h1>
            {/* <h3 className="home__subtitle">Frontend Developer</h3> */}
            <p className="home__description">
              I'm a Frontend Developer from Hanoi{" "}
            </p>
            <Tooltip placement="top" color="rgba(51,51,51,0.7)" overlayClassName="ant-tooltip-inner" title={text}>
            <a
              href=""
              download="CV-Pham-Viet-Hoang.pdf"
              className="button button--flex resume"
            >
              My Resume
            </a>
               </Tooltip>
          </div>
        </div>
      </div>
      <div className="home__scroll">
        <a href="#about" className="nav__link">
          <i className="uil uil-angle-double-down home__scroll-down"></i>
          To scroll down for more
        </a>
      </div>
    </section>
  );
};

export default Home;
