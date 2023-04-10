import { IUser } from "../interface/auth";
import instance from "./instance";

const user = localStorage.getItem("user");
const { accessToken = "" } = user ? JSON.parse(user) : {};
export const getAllUsers = () => {
    return instance.get('/users');
}

export const getUser = (id:number | string) => {
    return instance.get(`/users/${id}`)
}


export const addUser = (user:IUser) => {
    return instance.post(`/signup/`,user,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const removeUser = (id:number | string) => {
    return instance.delete(`/users/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const updateUser = (user:IUser) => {
    return instance.patch(`/users/${user._id}`,user,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}