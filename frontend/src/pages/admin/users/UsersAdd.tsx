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
import { IUser } from "../../../interface/auth";
import { addUser } from "../../../api/users";

type Props = {};

const UsersAdd = (props: Props) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (user: IUser) => {
    await addUser(user);
      api["success"]({
        message: "Add successfull",
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    <p className="title">Add User</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please insert username!" }]}
        >
          <Input placeholder="Insert username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please insert email!" }]}
        >
          <Input placeholder="Insert email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please insert password!" }]}
        >
          <Input.Password placeholder="Insert password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please insert password!" }]}
        >
          <Input.Password placeholder="Insert password" />
        </Form.Item>
        <Form.Item>
          {contextHolder}
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UsersAdd;
