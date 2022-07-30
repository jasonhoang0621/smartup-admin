import { Button, Modal, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import FormAdmin from "./components/FormAdmin";

const Admin = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [form] = useForm();

  const handleCreateAdmin = () => {
    console.log(form.getFieldsValue());
    setIsModal(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const [data, setData] = React.useState([
    {
      key: "1",
      name: "John Brown",
      email: "john@abc.com",
    },
    {
      key: "2",
      name: "Jim Green",
      email: "jim@gmail.com",
    },
  ]);

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
        title={"Create Admin"}
        visible={isModal}
        onOk={handleCreateAdmin}
        onCancel={() => setIsModal(false)}
        okText={
          <span className="text-blue-500 hover:text-white">{"Create"}</span>
        }
      >
        <FormAdmin form={form} />
      </Modal>
    </div>
  );
};

export default Admin;
