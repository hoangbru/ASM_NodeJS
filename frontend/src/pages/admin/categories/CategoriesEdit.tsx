import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Divider,
  notification,
  Space,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { addCategory, updateCategory } from "../../../api/categories";
import { ICategory } from "../../../interface/categories";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  categories: ICategory[];
};

const CategoriesEdit = ( props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [category, setCategory] = useState<ICategory>();
  const [api, contextHolder] = notification.useNotification();

  const setFields = () => {
    form.setFieldsValue({
      _id: category?._id,
      name: category?.name,
    });
  };
  useEffect(() => {
    const currentCategory = props.categories.find((category: ICategory) => category._id == id);
    setCategory(currentCategory);
  }, [props]);

  useEffect(() => {
    setFields();
  }, [category]);

  const onFinish = async (category: ICategory) => {
    await updateCategory(category);
    api["success"]({
      message: "Update successfull",
    });
    setTimeout(() => {
      navigate("/admin/categories")
    }, 1000)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
 
  return (
    <>
      <p style={{ fontSize: "18px", fontWeight: "500", padding: "5px 0" }}>
        Update Category
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
        initialValues={category}
      >
        <Form.Item
          name="_id"
          style={{ display: "none" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category name"
          name="name"
          rules={[{ required: true, message: "Please insert category name!" }]}
        >
          <Input
            placeholder="Insert category name"
            // defaultValue={category?.name}
          />
        </Form.Item>
        <Form.Item>
          {contextHolder}
          <Button
            type="primary"
            htmlType="submit"
            // onClick={() => openNotificationWithIcon("success")}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoriesEdit;
