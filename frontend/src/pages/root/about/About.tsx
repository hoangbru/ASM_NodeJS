import React from "react";
import "./about.css";
import imageAbout from "../../../assets/images/about.jpg";
import AboutInfo from "./AboutInfo";

const About = () => {
  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">Some infomation about me</span>

      <div className="about__container container grid">
        <img src={imageAbout} alt="" className="about__img" />

        <div className="about__data">
          <AboutInfo />
          <div className="about__description">
            Hello, I am a student at FPT Polytechnic. I am currently studying
            and developing myself in this professional learning environment. I
            love technology and always seek opportunities to learn more about
            new technologies and develop my skills. I am also an active person
            and enjoy participating in social activities at school such as
            clubs, volunteer teams, or cultural and artistic activities
          </div>
          <a href="#contact" className="button button--flex about__talk">Let's talk</a>
        </div>
      </div>
    </section>
  );
};

export default About;
