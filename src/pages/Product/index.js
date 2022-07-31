import { Button, Modal, Spin, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React from "react";
import FormProduct from "./components/FormProduct";

const Product = () => {
  const [form] = useForm();
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);
  const [deleteItem, setDeleteItem] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const [isDeleteModal, setIsDeleteModal] = React.useState(false);

  const handelCloseModal = () => {
    setEditItem(null);
    setDeleteItem(null);
    setIsModal(false);
  };

  const handleCreateProduct = async () => {
    setIsModalLoading(true);
    const fd = new FormData();
    fd.append("file", form.getFieldValue("image")[0].originFileObj);
    fd.append("upload_preset", "bspwbktq");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ducka9boe/image/upload",
      fd
    );

    const formData = form.getFieldsValue();
    formData.image = {
      public_id: res.data.public_id,
      secure_url: res.data.secure_url,
    };

    console.log(formData);

    setIsModal(false);
    setIsModalLoading(false);
  };

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    console.log(deleteItem);

    setIsDeleteModal(false);
    setIsLoading(false);
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
        <div className="text-center">
          <Button
            type="danger"
            className="text-red-500"
            onClick={() => {
              setDeleteItem(record);
              setIsDeleteModal(true);
            }}
          >
            Delete
          </Button>
          <Button
            type="primary"
            className="text-blue-500 ml-2"
            onClick={() => {
              setIsModal(true);
              setEditItem(record);
            }}
          >
            Edit
          </Button>
        </div>
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
    <Spin spinning={isLoading}>
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
          <Spin spinning={isModalLoading}>
            <FormProduct form={form} />
          </Spin>
        </Modal>
        <Modal
          title="Delete Product"
          visible={isDeleteModal}
          onOk={handleDeleteProduct}
          onCancel={() => setIsDeleteModal(false)}
          okText={<span className="text-red-500 hover:text-white">Delete</span>}
          okButtonProps={{ disabled: isLoading, type: "danger" }}
        >
          <p>Are you sure you want to delete this product?</p>
        </Modal>
      </div>
    </Spin>
  );
};

export default Product;
