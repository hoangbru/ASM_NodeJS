import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Space, Table, Tag, Button, Tooltip,Popconfirm,notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProject } from "../../../interface/projects";
import { ITechnology } from "../../../interface/technologies";
// import '../../../assets/css/admin.css';

interface DataType {
  key?: string | number;
  name: string;
  image?: string;
  thumbnail?: string;
  description?: string;
  link?: string;
  linkGithub?: string;
  technologyId?: [];
  categoryId: {};
  createdAt?: Date;
  updateAt?: Date;
  deleteAt?: Date;
  deleted?: boolean;
}

type Props = {
  projects: IProject[];
  onRemove: (id: number | string) => void;
};

const ProjectList = ({ projects, onRemove }: Props) => {
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
        message: "Remove successfully",
      });
      setShowNotification(false);
    }
  }, [api, showNotification]);

  // colums
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
    },
    {
      title: "Thumbnail",
      width: 110,
      dataIndex: "thumbnail",
      align: "center",
      key: "image",
      render: (thumbnail) => <img className="thumbnail" width={"80px"} src={thumbnail} alt="" />,
    },
    {
      title: "Công nghệ",
      dataIndex: "technologyId",
      key: "technologyId",
      align: "center",
      width: 150,
      render: (technologyId) =>
        technologyId.map((item:ITechnology) => (
          <Tag key={item._id} color="rgba(13, 29, 49, 0.9)">
            <i className={`bx bxl-${item?.tag} tag`}></i>
          </Tag>
        )),
    },
    {
      title: "Link website",
      dataIndex: "link",
      key: "link",
      align: "center",
      width: 200,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      align: "center",
      width: 150,
      render: (record) => {
        return <span>{record?.name}</span>
      }
    },
    {
      title: "Action",
      key: "operation",
      align: "center",
      fixed: "right",
      width: 100,
      render: (record) => {
        const isOpen = openId === record._id;
        return (
          <Space size="middle">
            <Link
              to={`/admin/project/${record._id}/edit`}
              style={{ color: "rgba(13, 29, 49, 0.9)", fontSize: "18px" }}
            >
              <Tooltip placement="top" title={text}>
                <EditOutlined />
              </Tooltip>
            </Link>
            <Popconfirm
              title="Are you sure to remove?"
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
                Remove
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const data: DataType[] = projects?.map((project: IProject) => {
    return {
      key: project._id,
      ...project,
    };
  });

  if (!projects) return <div>Loading....</div>;
  return (
    <>
    <p className="title">List projects</p>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1500, y: 500 }}
      />
    </>
  );
};

export default ProjectList;
