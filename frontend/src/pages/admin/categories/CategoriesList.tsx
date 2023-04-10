import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
  notification,
  Popover,
  Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ICategory } from "../../../interface/categories";
import { removeCategory } from "../../../api/categories";
import { IProject } from "../../../interface/projects";

type Props = {
  categories: ICategory[];
  onRemove: (id: number | string) => void;
};

interface DataType {
  // _id: string | number;
  key?: string | number;
  name: string;
}

const CategoriesList = ({ categories, onRemove }: Props) => {
  // tooltip
  const text = <span>Edit</span>;

  // notification
  const [api, contextHolder] = notification.useNotification();

  // popconfirm
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const showPopconfirm = (id: number | string) => {
    setOpenId(id);
  };

  const handleOk = (id: number | string) => {
    setConfirmLoading(true);
    onRemove(id);
    setOpenId(null);
    setTimeout(function () {
      setShowNotification(true);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpenId(null);
  };

  // Display notification
  useEffect(() => {
    if (showNotification) {
      api.success({
        message: "Delete category successfully",
      });
      setShowNotification(false);
    }
  }, [api, showNotification]);

  // colums
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number of projects",
      dataIndex: "projects",
      key: "projects",
      render: (record) => {
        return <p>{record.length}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        const isOpen = openId === record._id;
        return (
          <Space size="middle">
            <Link
              to={`/admin/categories/${record._id}/edit`}
              style={{ color: "rgba(13, 29, 49, 0.9)", fontSize: "18px" }}
            >
              <Tooltip placement="top" title={text}>
                <EditOutlined />
              </Tooltip>
            </Link>
            <Popconfirm
              title="Are you sure to delete?"
              // open={removingId !== null}
              onConfirm={() => handleOk(record._id)}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
              popupVisible={isOpen}
            >
              {contextHolder}
              <Button
                type="primary"
                danger
                onClick={() => showPopconfirm(record._id)}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  if (!categories) return <div>Loading....</div>;
  // parse data
  const data: DataType[] = categories?.map((category: ICategory) => {
    return {
      key: category._id,
      ...category,
    };
  });

  return (
    <>
      <p className="title">List categories</p>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};

export default CategoriesList;
