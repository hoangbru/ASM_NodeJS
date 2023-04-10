import React, { useEffect, useState } from "react";
import Header from "../pages/root/header/Header";
import Footer from "../pages/root/footer/Footer";
import About from "../pages/root/about/About";
import Home from "../pages/root/home/Home";
import Skills from "../pages/root/skills/Skills";
import Projects from "../pages/root/projects/Projects";
import Contact from "../pages/root/contact/Contact";
import Scrollup from "../pages/root/scrollup/Scrollup";
import Feedback from "../pages/root/feedback/Feedback";
import { IProject } from "../interface/projects";
import { ICategory } from "../interface/categories";
import "../assets/css/root.css";

type Props = {};

type ProjectListProps = {
  categories: ICategory[];
  projects: IProject[];
};

const RootLayout = ({ projects, categories }: ProjectListProps) => {
  return (
    <>
      <div className="layout">
        <div className="main">
        <Header />
          <Home />
          <About />
          <Skills />
          <Projects projects={projects} categories={categories} />
          <Feedback />
          <Contact />
        <Footer />
        <Scrollup />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
