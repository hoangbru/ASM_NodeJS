import { IUser } from "../interface/auth";
import instance from "./instance";

export const login = (user:IUser) => {
    return instance.post('/signin', user);
}

