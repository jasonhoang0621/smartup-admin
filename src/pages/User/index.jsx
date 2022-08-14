import { Button, Table } from "antd";
import React, { useEffect } from "react";
import userAPI from "src/api/user";

const User = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="danger" className="text-red-500">
          <span>Block</span>
        </Button>
      ),
    },
  ];

  const [data, setData] = React.useState([]);
  useEffect(() => {
    const getUserData = async () => {
      const res = await userAPI.getListUser();
      console.log(res);
      setData(res.data);
    };
    getUserData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default User;
