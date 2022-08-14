import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Space,
  Tag,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import supplierAPI from "src/api/supplier";
import { getBase64 } from "src/helpers/image";
import FormSupplier from "./FormSupplier";

const FormProduct = ({ form }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [isSupplierModal, setIsSupplierModal] = useState(false);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const [colorTag, setColorTag] = useState("");

  const [options, setOptions] = useState([
    { value: "white" },
    { value: "black" },
    { value: "gold" },
    { value: "lime" },
    { value: "green" },
    { value: "cyan" },
    { value: "blue" },
    { value: "purple" },
    { value: "magenta" },
    { value: "red" },
    { value: "volcano" },
    { value: "orange" },
  ]);

  const addItem = (e) => {
    e.preventDefault();
    setOptions([...options, { value: colorTag }]);
    setColorTag("");
  };

  useEffect(() => {
    const getSupplierData = async () => {
      const res = await supplierAPI.getListSupplier();
      console.log(res);
      if (res.errorCode) {
        notification.error({
          message: res.data.message || "Cannot get supplier data",
          duration: 1,
        });
        return;
      }
      setSupplierList(res.data);
    };
    getSupplierData();
  }, []);

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          color: label === "black" ? "#fff" : "#000",
          borderColor: "#cdcdcd",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <span>{label}</span>
      </Tag>
    );
  };

  return (
    <>
      <Form form={form}>
        <Form.Item
          label="image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input product description!" },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please input product color!" }]}
        >
          <Select
            mode="multiple"
            showArrow
            showSearch
            tagRender={tagRender}
            style={{ width: "100%" }}
            options={options}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    value={colorTag}
                    onChange={(e) => setColorTag(e.target.value)}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Dimension"
          name={"dimension"}
          rules={[
            { required: true, message: "Please input product dimension!" },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="flex items-center mb-5">
          <Form.Item
            label="Brand"
            name="supplier"
            rules={[
              { required: true, message: "Please choose product brand!" },
            ]}
            className="w-full mb-0"
          >
            <Select placeholder="Choose Brand">
              {supplierList.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.companyName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            type="primary"
            className="text-blue-500 ml-5"
            onClick={() => setIsSupplierModal(true)}
          >
            Add Brand
          </Button>
        </div>
        <Form.Item
          label="Warranty"
          name="warranty"
          rules={[
            { required: true, message: "Please input product warranty!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input prefix="$" />
        </Form.Item>
        <Form.Item label="Sale" name="sale">
          <Input suffix="%" type={"number"} />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Please input product quantity!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      <Modal
        visible={isSupplierModal}
        title="Add Brand"
        onOk={() => {}}
        onCancel={() => setIsSupplierModal(false)}
        footer={null}
      >
        <FormSupplier />
      </Modal>
    </>
  );
};

export default FormProduct;
