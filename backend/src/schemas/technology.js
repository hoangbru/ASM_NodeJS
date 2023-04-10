import Joi from "joi";

export const technologySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống tên",
    "any.required": "Trường 'tên' là bắt buộc",
  }),
  tag: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống tag",
    "any.required": "Trường 'tag' là bắt buộc",
  })
});