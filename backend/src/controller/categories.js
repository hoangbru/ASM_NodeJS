import Joi from 'joi';
import Project from "../models/project";
import Category from '../models/category';
import { categorySchema } from '../schemas/category';

export const getAll = async (req, res) => {
    try {
        const data = await Category.find().populate("projects");
        if (data.length == 0) {
            return res.status(203).json({
                message: "Không có danh mục nào",
            });
        }
        return res.status(200).json(data);

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}

export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Category.findById(id).populate("projects");
        if (!data) {
            return res.status(200).json({
                message: "Không có danh mục"
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = categorySchema.validate(body,{ abortEarly: false })
        if (error) {
            return res.json({
                message: error.details[0].message,
            })
        }
        const  data  = await Category.create(body)
        if (data.length === 0) {
            return res.status(200).json({
                message: "Thêm danh mục thất bại"
            });
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Xoá thành công",
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const  data  = await Category.findOneAndUpdate({_id: id}, body, {new: true})
        if (!data) {
            return res.status(200).json({
                message: "Cập nhật thất bại"
            })
        }
        return res.status(200).json({
            message: "Cập nhật thành công",
            data,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}