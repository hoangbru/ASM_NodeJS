import Project from "../models/project";
import { projectSchema } from "../schemas/project";
import Category from "../models/category";
import Technology from "../models/technology";
// import cloudinary from "../middlewares/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";

export const getAll = async (req, res) => {
  try {
    const data = await Project.find().populate(
      "technologyId categoryId",
      "-__v"
    );
    if (!data) {
      return res.status(200).json({
        message: "Không có dự án nào",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Project.findOne({ _id: id }).populate(
      "technologyId categoryId",
      "-__v"
    );
    if (!data) {
      return res.status(200).json({
        message: "Không có dự án",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    // console.log(req);
    const fileData = req.body.thumbnail;
    // console.log(fileData)
    const body = req.body;
    const { error } = projectSchema.validate(
      {
        ...body,
        thumbnail: fileData,
      },
      { abortEarly: false }
    );
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    
    // const slug = slugify(body.name, {lower:true, strict:true});
    
    const data = await Project.create({
      ...body,
      thumbnail: fileData,
      // slug,
    });
    
    // console.log(fileData)
    await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        projects: data._id,
      },
    });

    await Technology.findByIdAndUpdate(data.technologyId, {
      $addToSet: {
        projects: data._id,
      },
    });

    if (!data) {
      return res.status(200).json({
        message: "Thêm dự án thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm dự án thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await Project.delete({_id: req.params.id});
    return res.status(200).json({
      message: "Xoá dự án thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const forceDelete = async (req, res) => {
  try {
    await Project.deleteOne({_id: req.params.id});
    return res.status(200).json({
      message: "Xoá dự án thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    // console.log(req)
    const id = req.params.id;
    const body = req.body;
    const fileData = req.body.thumbnail;
    const { error } = projectSchema.validate({
      ...body,
      thumbnail: fileData,
    });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData);
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const slug = slugify(body.name, {lower:true, strict:true});
    const data = await Project.findOneAndUpdate(
      { _id: id },
      { ...body, thumbnail: fileData , slug},
      {
        new: true,
      }
    );
    await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        projects: data._id,
      },
    });

    await Technology.findByIdAndUpdate(data.technologyId, {
      $addToSet: {
        projects: data._id,
      },
    });
    if (!data) {
      if (fileData) cloudinary.uploader.destroy(fileData);
      return res.status(200).json({
        message: "Cập nhật dự án thất bại",
      });
    }
    return res.status(200).json({
      message: "Cập nhật dự án thành công",
      data,
    });
  } catch (error) {
    if (fileData) cloudinary.uploader.destroy(fileData);
    return res.status(400).json({
      message: error,
    });
  }
};

export const restore = async (req, res) => {
  try {
    await Project.restore({_id: req.params.id});
    return res.status(200).json({
      message: "Khôi phục dự án thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getTrash = async (req, res) => {
  try {
    const data = await Project.findDeleted().populate(
      "technologyId categoryId",
      "-__v"
    );
    if (!data) {
      return res.status(200).json({
        message: "Không có dự án nào bị xoá",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getSlug = async(req, res) => {
  console.log("fdfff")
  try {
    const slug = req.params.slug;
    const data = await Project.findOne({ slug }).populate('technologyId');
    if (!data) {
      return res.status(200).json({
        message: "Không có dự án",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};