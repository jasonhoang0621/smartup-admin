import { Modal, Steps, Table } from "antd";
import React, { useState } from "react";

const { Step } = Steps;
const steps = [
  {
    title: "Cancel",
  },
  {
    title: "Pending",
  },
  {
    title: "Shipping",
  },
  {
    title: "Done",
  },
];

const DetailOrder = (props) => {
  const { data } = props;
  const [current, setCurrent] = useState(1);
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const onChange = (value) => {
    if (value === 0) {
      setIsConfirmModal(true);
      return;
    }
    setCurrent(value);
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.product?.image[0]}
            alt="image"
            width="100"
            height={100}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="text-center">{record?.product?.name}</div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <div className="text-center">{record?.product?.price}</div>
      ),
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
      render: (text, record) => (
        <div className="text-center">{record?.product?.sale}</div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div className="text-center">{record?.quantity}</div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => (
        <div className="text-center">{record?.price}</div>
      ),
    },
  ];

  return (
    <div>
      <Steps
        current={current}
        onChange={current === 0 ? null : onChange}
        className="mb-10"
        status={current === 3 ? "finish" : current === 0 ? "error" : "process"}
        progressDot={true}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Table columns={columns} dataSource={data} rowKey="code" />
      <Modal
        title="Confirm"
        visible={isConfirmModal}
        onOk={() => {
          setIsConfirmModal(false);
          setCurrent(0);
        }}
        onCancel={() => setIsConfirmModal(false)}
        okButtonProps={{ type: "danger" }}
        okText={<span className="text-red-500 hover:text-white">Cancel</span>}
      >
        <p>Are you sure to cancel this order?</p>
      </Modal>
    </div>
  );
};

export default DetailOrder;
