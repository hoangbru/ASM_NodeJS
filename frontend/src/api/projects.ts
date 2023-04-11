import { AxiosResponse } from "axios";
import { IProject } from "../interface/projects";
import instance from "./instance";

const user = localStorage.getItem("user");
const { accessToken = "" } = user ? JSON.parse(user) : {};

export const getProjectsTrash = () => {
    return instance.get('/admin/projects/trash');
}

export const getAllProjects = () => {
    return instance.get('/projects');
}

export const getProject = (id:number | string) => {
    return instance.get(`/admin/project/${id}`)
}

export const addProject = (project:IProject) => {
    return instance.post(`/projects/`,project,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const removeProject = (id:number | string) => {
    return instance.delete(`/project/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const forceDeleteProject = (id:number | string) => {
    return instance.delete(`/project/${id}/force`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const updateProject = (project:IProject) => {
    return instance.patch(`/project/${project._id}`,project,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const restoreProject = (id:number | string) => {
    return instance.patch(`/project/restore/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}