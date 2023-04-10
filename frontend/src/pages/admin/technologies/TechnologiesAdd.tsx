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
import { ITechnology } from "../../../interface/technologies";
import { addTechnology } from "../../../api/technologies";

type Props = {};

const TechnologiesAdd = (props: Props) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (technology: ITechnology) => {
    await addTechnology(technology);
      api["success"]({
        message: "Add successfull",
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    <p className="title">Add Technology</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Technology name"
          name="name"
          rules={[{ required: true, message: "Please insert technology name!" }]}
        >
          <Input placeholder="Insert technology name" />
        </Form.Item>
        <Form.Item
          label="Technology tag"
          name="tag"
          rules={[{ required: true, message: "Please insert technology tag!" }]}
        >
          <Input placeholder="Insert technology tag" />
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

export default TechnologiesAdd;
