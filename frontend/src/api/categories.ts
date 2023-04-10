import { ICategory } from "../interface/categories";
import instance from "./instance";

const user = localStorage.getItem("user");
const { accessToken = "" } = user ? JSON.parse(user) : {};
export const getAllCategories = () => {
    return instance.get('/categories');
}

export const getCategory = (id:number | string) => {
    return instance.get(`/categories/${id}`)
}


export const addCategory = (category:ICategory) => {
    return instance.post(`/categories/`,category,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const removeCategory = (id:number | string) => {
    return instance.delete(`/categories/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const updateCategory = (category:ICategory) => {
    return instance.patch(`/categories/${category._id}`,category,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}