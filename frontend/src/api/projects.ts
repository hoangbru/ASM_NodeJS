import { AxiosResponse } from "axios";
import { IProject } from "../interface/projects";
import instance from "./instance";

const user = localStorage.getItem("user");
const { accessToken = "" } = user ? JSON.parse(user) : {};

export const getProjectsTrash = () => {
    return instance.get('/projects/trash');
}

export const getAllProjects = () => {
    return instance.get('/projects');
}

export const getProject = (id:number | string) => {
    return instance.get(`/projects/${id}`)
}

export const addProject = (project:IProject) => {
    return instance.post(`/projects/`,project,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const removeProject = (id:number | string) => {
    return instance.delete(`/projects/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const updateProject = (project:IProject) => {
    return instance.patch(`/projects/${project._id}`,project,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}