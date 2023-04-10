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
import { ITechnology } from "../../../interface/technologies";
import { updateTechnology } from "../../../api/technologies";

type Props = {
  technologies: ITechnology[];
};

const TechnologiesEdit = ( props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [technology, setTechnology] = useState<ITechnology>();
  const [api, contextHolder] = notification.useNotification();

  const setFields = () => {
    form.setFieldsValue({
      _id: technology?._id,
      name: technology?.name,
      tag: technology?.tag,
    });
  };
  useEffect(() => {
    const currentTechnology = props.technologies.find((technology: ITechnology) => technology._id == id);
    setTechnology(currentTechnology);
  }, [props]);

  useEffect(() => {
    setFields();
  }, [technology]);

  const onFinish = async (technology: ITechnology) => {
    await updateTechnology(technology);
    api["success"]({
      message: "Update successfull",
    });
    setTimeout(() => {
      navigate("/admin/technologies")
    }, 1000)
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
        initialValues={technology}
      >
        <Form.Item
          name="_id"
          style={{ display: "none" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Technology name"
          name="name"
          rules={[{ required: true, message: "Please insert technology name!" }]}
        >
          <Input
            placeholder="Insert category name"
          />
        </Form.Item>
        <Form.Item
          label="Technology tag"
          name="tag"
          rules={[{ required: true, message: "Please insert technology tag!" }]}
        >
          <Input
            placeholder="Insert technology tag"
          />
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

export default TechnologiesEdit;
