import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _axios from "@/utils/axios";
import type { CatSchema } from "./index";

interface CatsModalProps {
  show: boolean;
  handleShow: (show: boolean) => void;
  onSubmit: (cat: CatSchema) => void;
  rowData: CatSchema;
}

const ModalEdit = ({ show, handleShow, onSubmit, rowData }: CatsModalProps) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    onSubmit({ ...form.getFieldsValue(), id: rowData.id });
    handleShow(false);
    form.resetFields();
  };
  const handleCancel = () => {
    handleShow(false);
    form.resetFields();
  };
  useEffect(() => {
    if (show) {
      form.setFieldsValue({ ...rowData });
    }
  }, [show]);
  return (
    <>
      <Modal
        title="新建猫猫"
        visible={show}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form}>
          <Form.Item label="猫猫名字" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="猫猫年龄" name="age">
            <InputNumber controls={false} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalEdit;
