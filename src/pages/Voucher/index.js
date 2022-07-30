import { Button, Modal, Table } from "antd";
import React from "react";

const Voucher = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);

  const handelCloseModal = () => {
    setEditItem(null);
    setIsModal(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          className="text-blue-500"
          onClick={() => {
            setIsModal(true);
            setEditItem(record);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      description: "New York No. 1",
      price: "100",
      quantity: "1",
      due: "10/10/2020",
      action: "Edit",
    },
    {
      key: "2",
      name: "Jim Green",
      description: "London No. 1",
      price: "200",
      quantity: "2",
      due: "10/10/2020",
      action: "Edit",
    },
    {
      key: "3",
      name: "Joe Black",
      description: "Sidney No. 1",
      price: "300",
      quantity: "3",
      due: "10/10/2020",
      action: "Edit",
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        className="text-blue-500 mb-5"
        onClick={() => setIsModal(true)}
      >
        Create
      </Button>
      <Table columns={columns} dataSource={data} />

      <Modal
        title={editItem ? "Edit Voucher" : "Create Voucher"}
        visible={isModal}
        onOk={handelCloseModal}
        onCancel={handelCloseModal}
        okText={
          <span className="text-blue-500 hover:text-white">
            {editItem ? "Update" : "Create"}
          </span>
        }
      >
        ok
      </Modal>
    </div>
  );
};

export default Voucher;
