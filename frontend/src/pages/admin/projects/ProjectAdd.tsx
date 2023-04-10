import React, { useState } from "react";
import { PlusOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  notification,
  Upload,
  message,
} from "antd";
import type { UploadProps } from "antd";
import { IProject } from "../../../interface/projects";
import { addProject } from "../../../api/projects";
import { ICategory } from "../../../interface/categories";
import { ITechnology } from "../../../interface/technologies";
// import type {RcFile} from "rc-select";
import type { RcFile } from "rc-upload/lib/interface";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import axios from "axios";

type Props = {
  categories: ICategory[];
  technologies: ITechnology[];
};

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ProjectAdd = ({ categories, technologies }: Props) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [image, setImage] = useState("");

  const SubmitImage = async () => {
    const data = new FormData();
    const cloud_name = "ddbdu6zip";
    const upload_preset = "vithoang";
    data.append("file", image);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);
    data.append("folder", "portfolio");
    const takeData = await axios
      .post(`https://api.cloudinary.com/v1_1/ddbdu6zip/image/upload`, data)
      .then((data: any) => data);
    return takeData.data.secure_url;
  };

  const onFinish = async (project: IProject) => {
    // console.log(project);
    project.thumbnail = await SubmitImage();
    await addProject(project);
    api["success"]({
      message: "Add successfull",
    });
  };

  // Preview image
  const inputFile: any = document.getElementById("file-input");
  const previewImage: any = document.getElementById("preview-image");

  inputFile?.addEventListener("change", function () {
    const file = inputFile.files[0];
    const reader = new FileReader();

    reader?.addEventListener("load", function () {
      previewImage.src = reader.result;
    });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      previewImage.src = "";
    }
  });
  return (
    <>
      <p className="title">Projects Add</p>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 800, alignItems: "center" }}
        onFinish={onFinish}
      >
        <Form.Item label="Name" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item
          label="Thumbnail"
          name="thumbnail"
          required
          valuePropName="file"
        >
          {/* <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload> */}
          <div>
            <div className="image-upload">
              <label htmlFor="file-input">
                <i className="bx bx-image-add"></i>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={(e: any) => setImage(e.target.files[0])}
              />
            </div>
            <img src="" alt="" id="preview-image"></img>
          </div>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Link website" name="link">
          <Input />
        </Form.Item>
        <Form.Item label="Link github" name="linkGithub">
          <Input />
        </Form.Item>
        {/* <Form.Item label="Completion time" name="completionTime">
          <Input />
        </Form.Item> */}
        <Form.Item label="Technology" required name="technologyId">
          <Select mode="multiple" optionLabelProp="label">
            {technologies.map((technology: ITechnology) => {
              return (
                <Select.Option
                  key={technology._id}
                  value={technology._id}
                  label={technology.name}
                >
                  {technology.name}
                </Select.Option>
              );
            })}
            {/* <Select.Option value="demo">NodeJS</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="Category" required name="categoryId">
          <Select>
            {categories.map((category: ICategory) => {
              return (
                <Select.Option
                  key={category._id}
                  value={category._id}
                  label={category.name}
                >
                  {category.name}
                </Select.Option>
              );
            })}
            {/* <Select.Option value="demo">Web dynamic</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="Submit">
          {contextHolder}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjectAdd;
