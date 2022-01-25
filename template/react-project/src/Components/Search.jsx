import React, { useRef } from "react";
import { Form, Button } from "antd";

const Search = ({
  onSearch,
  onClear,
  children,
  createBtnTitle,
  createBtnFunc,
  form,
  labelSpan,
  wrapperSpan,
}) => {
  const [searchForm] = Form.useForm();
  const clear = () => {
    searchForm.resetFields();
    form.clearForm();
    onClear();
  };
  const submit = () => {
    form.setForm(searchForm.getFieldsValue());
    onSearch();
  };
  const formLayout = {
    labelCol: labelSpan ? { span: labelSpan } : undefined,
    wrapperCol: wrapperSpan ? { span: wrapperSpan } : undefined,
  };
  return (
    <div style={{ padding: 12, clear: "both" }}>
      <Form
        form={searchForm}
        name="searchForm"
        labelAlign="right"
        {...formLayout}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 1200,
            float: "left",
          }}
        >
          {children}
          <Button type="primary" onClick={submit}>
            查询
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={clear}>
            重置
          </Button>
        </div>
        <div style={{ float: "right" }}>
          <Button type="primary" onClick={createBtnFunc}>
            {createBtnTitle}
          </Button>
        </div>
      </Form>
    </div>
  );
};

Search.Item = ({
  name,
  label,
  children,
  br,
  width,
  labelSpan,
  wrapperSpan,
}) => {
  const itemLayout = {
    labelCol: labelSpan ? { span: labelSpan } : undefined,
    wrapperCol: wrapperSpan ? { span: wrapperSpan } : undefined,
  };
  return (
    <>
      <div style={{ width: br ? "80%" : width || 400, marginRight: 10 }}>
        <Form.Item
          label={label}
          name={name}
          style={{ width: width || 400 }}
          labelAlign="right"
          {...itemLayout}
        >
          {children}
        </Form.Item>
      </div>
    </>
  );
};

Search.useSearchForm = () => {
  const formValue = useRef({});
  const getValue = () => formValue.current;
  const setForm = (value) => (formValue.current = value);
  const clearForm = () => (formValue.current = {});
  const searchForm = {
    getValue,
    setForm,
    clearForm,
  };
  return searchForm;
};

export default Search;
