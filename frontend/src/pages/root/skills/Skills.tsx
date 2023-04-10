import React from "react";
import "./skills.css";

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">My skills</h2>
      <span className="section__subtitle">
        These are the tools, languages, and technologies that I use to make my
        product everyday
      </span>

      <div className="skills__container container">
        <div className="skills__content">
          <div className="skills__box">
            <div className="skills__data">
              <i className="bx bxl-html5 skills__icon skills__icon"></i>
              <h3 className="skills__name">HTML5</h3>
            </div>

            <div className="skills__data">
              <i className="bx bxl-css3 skills__icon"></i>
              <h3 className="skills__name">CSS3</h3>
            </div>

            <div className="skills__data">
              <i className="bx bxl-javascript skills__icon"></i>
              <h3 className="skills__name">Javascript</h3>
            </div>

            <div className="skills__data">
              <i className="bx bxl-tailwind-css skills__icon"></i>
              <h3 className="skills__name">TailwinCSS</h3>
            </div>

            <div className="skills__data">
              <i className="bx bxl-react skills__icon"></i>
              <h3 className="skills__name">ReactJS</h3>
            </div>

            <div className="skills__data">
              <i className="bx bxl-nodejs skills__icon"></i>
              <h3 className="skills__name">NodeJS</h3>
            </div>

            <div className="skills__data">
              <i className="bx bxl-typescript skills__icon"></i>
              <h3 className="skills__name">Typescript</h3>
            </div>

            <div className="skills__data">
              <i className="bx bxl-mongodb skills__icon"></i>
              <h3 className="skills__name">MongoDB</h3>
            </div>

            <div className="skills__data">
              <i className="bx bxl-php skills__icon"></i>
              <h3 className="skills__name">PHP</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
