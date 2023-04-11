export interface IProject {
    _id: string | number;
  name: string;
  image?: string;
  thumbnail?: string;
  description?: string;
  link?: string;
  linkGithub?: string;
  technologyId?: [];
  categoryId: {};
  slug: string;
  createdAt?: Date;
  updateAt?: Date;
  deleteAt?: Date;
  deleted?: boolean;
}