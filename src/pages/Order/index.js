import { Modal, Table, Tag } from "antd";
import React from "react";

const Order = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);

  const handelCloseModal = () => {
    setEditItem(null);
    setIsModal(false);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Order date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag color={record.status === "pending" ? "blue" : "green"}>
          {record.status}
        </Tag>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      email: "abc@gmail.com",
      name: "abc",
      phone: "0123456789",
      address: "abc",
      orderDate: "2020-01-01",
      status: "Pending",
    },
    {
      key: "2",
      email: "adjcnd@gmai.com",
      name: "abc",
      phone: "0123456789",
      address: "abc",
      orderDate: "2020-01-01",
      status: "Pending",
    },
    {
      key: "3",
      email: "cadcnakdjc@yahooh.com",
      name: "abc",
      phone: "0123456789",
      address: "abc",
      orderDate: "2020-01-01",
      status: "Pending",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => {
          return {
            onClick: () => {
              setIsModal(true);
              setEditItem(record);
            },
          };
        }}
      />

      <Modal
        title="Order"
        visible={isModal}
        onOk={handelCloseModal}
        onCancel={handelCloseModal}
        okText={
          <span className="text-blue-500 hover:text-white">
            {editItem ? "Update" : "Create"}
          </span>
        }
      ></Modal>
    </div>
  );
};

export default Order;
