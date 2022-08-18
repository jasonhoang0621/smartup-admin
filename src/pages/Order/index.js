import { Modal, notification, Spin, Table, Tag } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import orderAPI from "src/api/order";

const Order = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

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
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (text, record) => {
        return (
          <Tag
            color={
              record.payment === "momo"
                ? "pink"
                : record.payment === "cash"
                ? "orange"
                : "volcano"
            }
            className="bg-red"
          >
            {record.payment === "momo"
              ? "Momo"
              : record.payment === "cash"
              ? "Cash"
              : "VNPay"}
          </Tag>
        );
      },
    },
    {
      title: "Order date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag color={record.status === "Pending" ? "blue" : "green"}>
          {record.status}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await orderAPI.getListOrder();
      console.log(res);
      if (res.errorCode) {
        notification.error({
          message: "Error",
          description: res.data || "Something went wrong",
          duration: 2,
        });
        setIsLoading(false);
        return;
      }
      setData(res.data);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <Spin spinning={isLoading}>
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
        rowKey="id"
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
    </Spin>
  );
};

export default Order;
