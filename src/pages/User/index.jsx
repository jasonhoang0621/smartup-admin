import { Button, Table } from "antd";
import React from "react";

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

  const [data, setData] = React.useState([
    {
      key: "1",
      name: "John Brown",
      email: "abc@gmail.com",
      phone: "0123456789",
      address:
        "No.1, ABC Road, ABC Building, ABC Ward, ABC District, ABC City, ABC Country",
    },
    {
      key: "2",
      name: "Jim Green",
      email: "jim@gmail.com",
      phone: "0123456789",
      address:
        "No.1, ABC Road, ABC Building, ABC Ward, ABC District, ABC City, ABC Country",
    },
  ]);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default User;
