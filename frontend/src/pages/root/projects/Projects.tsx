import React, { useEffect, useState } from "react";
import "./projects.css";
import { IProject } from "../../../interface/projects";
import { ICategory } from "../../../interface/categories";
import { getProject } from "../../../api/projects";
import { ITechnology } from "../../../interface/technologies";
import DataProject from "./DataProject";
import { getAllCategories, getCategory } from "../../../api/categories";

type Props = {
  projects: IProject[]
  categories: ICategory[];
};

const Projects = ({projects, categories }: Props) => {
  const [category, setCategory] = useState<ICategory>();
  const onClickHandler = async (id: number | string) => {
    const { data } = await getCategory(id);
    setCategory(data);
  };
  // Active categories button
  const [activeCategory, setActiveCategory] = useState(-1);
  return (
    <section className="projects section" id="projects">
      <h2 className="section__title">Projects</h2>
      <span className="section__subtitle">
        The projects that I have completed
      </span>

      <div className="projects__filter">
        {/* <div onClick={() => }>All</div> */}
        {categories.map((category: ICategory, index) => {
          const { projects } = category;
          return (
            <div
              key={category._id}
              className={
                activeCategory === index
                  ? "categories__item categories__hidden-active"
                  : "categories__item"
              }
              onClick={() => {
                setActiveCategory(index);
                onClickHandler(category._id);
              }}
            >
              {category.name}
            </div>
          );
        })}
      </div>
      <div className="projects__container container grid">
        <DataProject category={category} />
        {/* {projects?.map((item: IProject) => {
          return (
            <div className="projects__card" key={item._id}>
              <div className="projects_div-img">
                <img src={item.thumbnail} alt="" className="projects__img" />
              </div>
              <div className="projects__content">
                <h3 className="projects__title">{item.name}</h3>
                <p className="projects__description">{item.description}</p>
                <div className="projects__tag">
                  {item.technologyId?.map((tech:ITechnology) => {
                    return (
                      <i className={`bx bxl-${tech.tag} key={tech._id} projects__tag-icon`}></i>
                    )
                  })}
                </div>
                <div className="projects__button">
                  <a
                    href={item?.link}
                    target="_blank"
                    className="projects__button-demo"
                  >
                    <i className="bx bx-link-external"></i>
                    Demo
                  </a>
                  <a
                    href={item?.linkGithub}
                    target="_blank"
                    className="projects__button-github"
                  >
                    <i className="bx bxl-github"></i>
                    View on Github
                  </a>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </section>
  );
};

export default Projects;
