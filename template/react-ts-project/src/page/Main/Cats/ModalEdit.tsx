import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, InputNumber, Radio, Select } from "antd";
import _axios from "@/utils/axios";
import { CatSchema } from "./index";

interface CatsModalProps {
  show: boolean;
  handleShow: (show: boolean) => void;
  onSubmit: (cat: CatSchema) => void;
  rowData: CatSchema;
}

function ModalEdit({ show, handleShow, onSubmit, rowData }: CatsModalProps) {
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
            <Input></Input>
          </Form.Item>
          <Form.Item label="猫猫年龄" name="age">
            <InputNumber controls={false}></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalEdit;
