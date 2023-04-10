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
import { ITechnology } from "../../../interface/technologies";

type TechnologyListProps = {
  technologies: ITechnology[];
  onRemove: (id: number | string) => void;
};

interface DataType {
  key?: string | number;
  name: string;
  tag: string;
  projects?: [];
  createdAt?: string;
  updateAt?: string;
}

const TechnologiesList = ({ technologies, onRemove }: TechnologyListProps) => {
  // notification
  const [api, contextHolder] = notification.useNotification();

  // tooltip
  const text = <span>Edit</span>;

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
        message: "Delete technology successfully",
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
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (record) => {
        if (record) return(<Tag color="rgba(13, 29, 49, 0.9)"><i className={`bx bxl-${record} tag`}></i></Tag>)
        return "";
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
              to={`/admin/technologies/${record._id}/edit`}
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

  // parse data
  const data: DataType[] = technologies?.map((technology: ITechnology) => {
    return {
      key: technology._id,
      ...technology,
    };
  });

  if (!technologies) return <div>Loading....</div>;
  return (
    <>
      <p className="title">List technologies</p>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};

export default TechnologiesList;
