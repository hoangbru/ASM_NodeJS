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
import { IUser } from "../../../interface/auth";

type Props = {
  users: IUser[];
  onRemove: (id: number | string) => void;
};

interface DataType {
  key?: string | number;
  username?: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: string;
  updateAt?: string;
}

const UsersList = ({ users, onRemove }: Props) => {
  console.log(users);

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
        message: "Delete user successfully",
      });
      setShowNotification(false);
    }
  }, [api, showNotification]);

  // colums
  const columns: ColumnsType<DataType> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        const isOpen = openId === record._id;
        return (
          <Space size="middle">
            <Link
              to={`/admin/users/${record._id}/edit`}
              style={{ color: "rgba(13, 29, 49, 0.9)", fontSize: "18px" }}
            >
              <Tooltip placement="top" title={text}>
                <EditOutlined />
              </Tooltip>
            </Link>
            <Popconfirm
              title="Are you sure to delete?"
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
  const data: DataType[] = users?.map((user: IUser) => {
    return {
      key: user._id,
      ...user,
    };
  });
  

  if (!users) return <div>Loading....</div>;
  return (
    <>
      <p className="title">List users</p>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};

export default UsersList;
