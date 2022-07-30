import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useDispatch } from "react-redux";
import userAPI from "src/api/user";
import { login } from "src/redux/auth";
import logo from "src/assets/images/logo.png";

const Login = () => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await userAPI.login(form.getFieldsValue());
    if (!res) {
    } else {
      localStorage.setItem("token", res.data.token);
      dispatch(login(res.data));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="flex justify-center mb-5">
          <img src={logo} alt="logo" width="200" />
        </div>
        <Form form={form} onFinish={handleLogin} className="w-[500px]">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="text-blue-500 hover:text-white"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
