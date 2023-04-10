import Joi, { required } from "joi";

export const projectSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống tên",
    "any.required": "Trường 'tên' là bắt buộc",
  }),
  thumbnail: Joi.string().messages({
    "string.empty": "Không được bỏ trống ảnh",
    // "any.required": "Trường 'ảnh' là bắt buộc",
  }),
  description: Joi.string(),
  link: Joi.string(),
  linkGithub: Joi.string(),
  technologyId: Joi.array(),
  categoryId: Joi.string().messages({
    "string.empty": "Không được bỏ trống danh mục",
    "any.required": "Trường 'danh mục' là bắt buộc",
  }),
});