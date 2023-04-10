import React, { useEffect, useState } from "react";
import { IProject } from "../../../interface/projects";
import { ITechnology } from "../../../interface/technologies";
import { ICategory } from "../../../interface/categories";
import Technology from "./Technology";

type Props = {
  category?: ICategory;
};

const DataProject = ({ category }: Props) => {
  if (category) {
    const { projects } = category;
    return (
      <>
        {projects?.map((item: IProject) => {
          return (
            <div className="projects__card" key={item._id}>
                <img src={item.thumbnail} alt="" className="projects__img" />
              <div className="projects__content">
                <h3 className="projects__title">{item.name}</h3>
                <p className="projects__description">{item.description}</p>
                <div className="projects__tag">
                  {item.technologyId?.map((techId:number|string) => {
                    return (<Technology techId={techId} key={techId}/>)
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
        })}
      </>
    );
  } else return <></>;
};

export default DataProject;
