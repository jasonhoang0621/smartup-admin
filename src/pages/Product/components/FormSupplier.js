import React from "react";
import { useForm } from "antd/es/form/Form";
import { Form, Input } from "antd";

const FormSupplier = () => {
  const [form] = useForm();
  return (
    <Form form={form}>
      <Form.Item
        label="Company Name"
        name="name"
        rules={[{ required: true, message: "Please input company name!" }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please input country!" }]}
      >
        <Input placeholder="Country" />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[{ required: false }]}>
        <Input placeholder="Address" />
      </Form.Item>
    </Form>
  );
};

export default FormSupplier;
