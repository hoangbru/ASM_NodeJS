export interface IUser {
    _id?: string | number;
    username?: string;
    email: string;
    password?: string;
    role?: string;
    createdAt?: string;
    updateAt?: string;
}