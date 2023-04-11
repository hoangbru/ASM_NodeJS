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
      </div>
    </section>
  );
};

export default Projects;
