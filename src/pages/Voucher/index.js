import { Button, Modal, notification, Spin, Table } from "antd";
import React, { useEffect } from "react";
import voucherAPI from "src/api/voucher";
import moment from "moment";
import { useForm } from "antd/es/form/Form";
import FormVoucher from "./components/FormVoucher";

const Voucher = () => {
  const [form] = useForm();
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handelCloseModal = () => {
    setEditItem(null);
    setIsModal(false);
  };

  const handleSetEditVoucher = (record) => {
    setIsModal(true);
    setEditItem(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      price: record.price,
      stock: record.stock,
      endDate: record?.endDate ? moment(record.endDate) : "",
    });
  };

  const handleAddVoucher = async () => {
    setIsLoading(true);
    if (
      form.isFieldsTouched() &&
      form.getFieldsError().filter((item) => item.errors.length > 0).length > 0
    ) {
      setIsLoading(false);
      return;
    }
    let isFail = false;
    Object.keys(form.getFieldsValue()).forEach((item) => {
      if (!form.getFieldsValue()[item]) {
        console.log(form.getFieldsValue()[item]);
        setIsLoading(false);
        isFail = true;
        return;
      }
    });
    if (!isFail) {
      const res = await voucherAPI.create(form.getFieldsValue());
      if (res.errorCode) {
        notification.error({
          message: "Error",
          description: res.data.message || "Cannot create voucher",
          duration: 1,
        });
        setIsLoading(false);
      } else {
        notification.success({
          message: "Success",
          description: "Voucher created successfully",
          duration: 1,
        });
        setIsLoading(false);
        setIsModal(false);
        setData([res.data, ...data]);
        form.resetFields();
      }
    }
  };

  const handleEditVoucher = async () => {
    setIsLoading(true);
    if (
      form.isFieldsTouched() &&
      form.getFieldsError().filter((item) => item.errors.length > 0).length > 0
    ) {
      setIsLoading(false);
      return;
    }
    let isFail = false;
    Object.keys(form.getFieldsValue()).forEach((item) => {
      if (!form.getFieldsValue()[item]) {
        setIsLoading(false);
        isFail = true;
      }
    });
    if (!isFail) {
      const res = await voucherAPI.update(editItem.id, form.getFieldsValue());
      if (res.errorCode) {
        notification.error({
          message: "Error",
          description: res.data.message || "Cannot update voucher",
          duration: 1,
        });
        setIsLoading(false);
        return;
      } else {
        notification.success({
          message: "Success",
          description: "Voucher updated successfully",
          duration: 1,
        });
        setData(
          data.map((item) => (item.id === res.data.id ? res.data : item))
        );
      }

      setEditItem(null);
      setIsLoading(false);
      setIsModal(false);
      form.resetFields();
    }
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
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Due",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          className="text-blue-500"
          onClick={() => handleSetEditVoucher(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await voucherAPI.getListVoucher();
        if (res.errorCode) {
          notification.error({
            message: "Error",
            description: res.data || "Something went wrong",
          });
          setIsLoading(false);
          return;
        }
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          message: "Error",
          description: "Something went wrong",
        });
      }
    };

    getData();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Button
        type="primary"
        className="text-blue-500 mb-5"
        onClick={() => setIsModal(true)}
      >
        Create
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        isLoading={isLoading}
        rowKey="id"
      />

      <Modal
        title={editItem ? "Edit Voucher" : "Create Voucher"}
        visible={isModal}
        onOk={editItem ? handleEditVoucher : handleAddVoucher}
        onCancel={handelCloseModal}
        okText={
          <span className="text-blue-500 hover:text-white">
            {editItem ? "Update" : "Create"}
          </span>
        }
      >
        <FormVoucher form={form} isLoading={isLoading} />
      </Modal>
    </Spin>
  );
};

export default Voucher;
