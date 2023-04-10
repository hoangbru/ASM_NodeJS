import Joi from 'joi';
import Project from "../models/project";
import Technology from '../models/technology';
import { technologySchema } from '../schemas/technology';

export const getAll = async (req, res) => {
    try {
        const data = await Technology.find().populate("projects")
        if (!data) {
            return res.status(203).json({
                message: "Không có công nghệ nào",
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
        const data = await Technology.findById(id).populate("projects")

        await Project.findByIdAndUpdate(data.projects, {
            $addToSet: {
                projects: data._id
            }
        })
        if (!data) {
            return res.status(200).json({
                message: "Không có công nghệ"
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
        const { error } = technologySchema.validate(body,{ abortEarly: false })
        if (error) {
            return res.json({
                message: error.details[0].message,
            })
        }
        const  data  = await Technology.create(body)
        if (data.length === 0) {
            return res.status(200).json({
                message: "Thêm công nghệ thất bại"
            });
        }
        return res.status(200).json({
            message: "Thêm công nghệ thành công",
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
        await Technology.findByIdAndDelete(id);
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
        const  data  = await Technology.findOneAndUpdate({_id: id}, body, {new: true})
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