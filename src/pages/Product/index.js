import { Button, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import FormProduct from "./components/FormProduct";

const Product = () => {
  const [form] = useForm();
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);

  const handelCloseModal = () => {
    setEditItem(null);
    setIsModal(false);
  };

  const handleCreateProduct = () => {
    console.log(form.getFieldsValue());
    setIsModal(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record) => (
        <img src={record.thumbnail} alt="thumbnail" width="100" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
      thumbnail: "https://via.placeholder.com/150",
      name: "John Brown",
      stock: "John Brown",
      price: "John Brown",
      sale: "John Brown",
    },
    {
      key: "2",
      thumbnail: "https://via.placeholder.com/150",
      name: "John Brown",
      stock: "John Brown",
      price: "John Brown",
      sale: "John Brown",
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
        title={editItem ? "Edit Product" : "Create Product"}
        visible={isModal}
        onOk={handleCreateProduct}
        onCancel={handelCloseModal}
        okText={
          <span className="text-blue-500 hover:text-white">
            {editItem ? "Update" : "Create"}
          </span>
        }
      >
        <FormProduct form={form} />
      </Modal>
    </div>
  );
};

export default Product;
