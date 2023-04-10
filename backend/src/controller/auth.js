import User from "../models/auth";
import bcrypt from "bcryptjs";
import { signinSchema, signupSchema } from "../schemas/auth";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const err = error.details.map((err) => err.message);
      return res.status(400).json({
        message: err,
      });
    }

    // check email da ton tai hay chua
    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({
          message: "Email đã được đăng ký, vui lòng chọn 1 email khác !",
        });

    // ma hoa mat khau
    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hasedPassword,
    });

    // khong tra ve client mat khau
    user.password = undefined;

    return res.status(200).json({
      message: "Đăng ký thành công !",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Tài khoản không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ message: "Mật khẩu không khớp" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "1 day",
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await User.find();
    if (!data) {
      return res.status(200).json({
        message: "Không có user nào",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await User.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!data) {
      return res.status(200).json({
        message: "Cập nhật thất bại",
      });
    }
    return res.status(200).json({
      message: "Cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      message: "Xóa thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
