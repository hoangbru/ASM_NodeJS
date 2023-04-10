export interface ITechnology {
    _id: string | number;
    name: string;
    tag: string;
    projects?: [];
    createdAt?: string;
    updateAt?: string;
}