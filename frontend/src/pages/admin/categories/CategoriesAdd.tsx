import React, { useState } from "react";
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
import { addCategory } from "../../../api/categories";
import { ICategory } from "../../../interface/categories";
// import '../../../assets/css/admin.css'
type Props = {};



const CategoriesAdd = (props: Props) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (category: ICategory) => {
    await addCategory(category);
      api["success"]({
        message: "Add successfull",
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    <p className="title">Add Category</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Category name"
          name="name"
          rules={[{ required: true, message: "Please insert category name!" }]}
        >
          <Input placeholder="Insert category name" />
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

export default CategoriesAdd;
