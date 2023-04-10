import User from '../models/auth';
import jwt from 'jsonwebtoken';

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(403).json({ message: "Bạn chưa đăng nhập"})
        const token = req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        const user = await User.findById(id);

        if (user.role !== "admin") return res.status(403).json({message: "Bạn không có đủ quyền hạn để thực hiện hành động này !"})
        next();
    } catch (error) {
        return res.status(400).json({message: error})
    }
}