import Joi, { ref } from "joi";
export const signupSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Khong duoc bo trong ten dang nhap",
    "any.required": "Truong 'username' la bat buoc",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Khong duoc bo trong email",
    "any.required": "Truong 'email' la bat buoc",
    "string.email": "Email khong dung dinh dang",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Khong duoc bo trong mat khau",
    "any.required": "Truong 'password' la bat buoc",
    "string.min": "Mat khau phai nhap toi thieu {#limit} ky tu",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Khong duoc bo trong nhap lai mat khau",
    "any.required": "Truong 'nhap lai mat khau' la bat buoc",
    "any.only": "Nhap lai mat khau khong khop",
  }),
  role: Joi.string()
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Khong duoc bo trong email",
    "any.required": "Truong 'email' la bat buoc",
    "string.email": "Email khong dung dinh dang",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Khong duoc bo trong mat khau",
    "any.required": "Truong 'password' la bat buoc",
    "string.min": "Mat khau phai nhap toi thieu {#limit} ky tu",
  }),
});
