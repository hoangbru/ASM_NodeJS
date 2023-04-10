import { ITechnology } from "../interface/technologies";
import instance from "./instance";

const user = localStorage.getItem("user");
const { accessToken = "" } = user ? JSON.parse(user) : {};
export const getAllTechnologies = () => {
    return instance.get('/technologies');
}

export const getTechnology = (id:number | string) => {
    return instance.get(`/technologies/${id}`)
}


export const addTechnology = (technology:ITechnology) => {
    return instance.post(`/technologies/`,technology,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const removeTechnology = (id:number | string) => {
    return instance.delete(`/technologies/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const updateTechnology = (technology:ITechnology) => {
    return instance.patch(`/technologies/${technology._id}`,technology,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}