import { Form, Input } from "antd";
import React from "react";

const FormAdmin = ({ form }) => {
  return (
    <div>
      <Form form={form}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!", min: 6 },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAdmin;
