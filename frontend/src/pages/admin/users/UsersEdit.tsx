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
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../interface/auth";
import { updateUser } from "../../../api/users";

type Props = {
  users: IUser[];
};

const UsersEdit = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState<IUser>();
  const [api, contextHolder] = notification.useNotification();

  const setFields = () => {
    form.setFieldsValue({
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  };
  useEffect(() => {
    const currentUser = props.users.find((user: IUser) => user._id == id);
    setUser(currentUser);
  }, [props]);

  useEffect(() => {
    setFields();
  }, [user]);

  const onFinish = async (user: IUser) => {
    await updateUser(user);
    api["success"]({
      message: "Update successfull",
    });
    setTimeout(() => {
      navigate("/admin/users");
    }, 1000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <p style={{ fontSize: "18px", fontWeight: "500", padding: "5px 0" }}>
        Update Technology
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
        initialValues={user}
      >
        <Form.Item name="_id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

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
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please insert role!" }]}
        >
          <Select
            showSearch
            style={{ width: 160 }}
            placeholder="Insert role"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "admin",
                label: "admin",
              },
              {
                value: "member",
                label: "member",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          {contextHolder}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UsersEdit;
