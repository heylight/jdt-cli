import React from "react";
import { Form, Input, Button } from "antd";

interface SearchProps {
  onSearch: () => void;
  onClear: () => void;
  children: any;
  createBtnTitle?: string;
  createBtnFunc?: () => any;
}

interface SearchItemProps {
  name: string;
  label: string;
  children: any;
  br?: boolean;
}

function Search({
  onSearch,
  onClear,
  children,
  createBtnTitle,
  createBtnFunc,
}: SearchProps) {
  const [searchForm] = Form.useForm();
  const clear = () => {
    onClear();
    searchForm.resetFields();
  };
  return (
    <div style={{ padding: 12, clear: "both" }}>
      <Form form={searchForm} name="searchForm" labelAlign="left">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 1200,
            float: "left",
          }}
        >
          {children}
        </div>
        <div style={{ float: "left" }}>
          <Button type="primary" onClick={onSearch}>
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
}

Search.Item = function ({ name, label, children, br }: SearchItemProps) {
  return (
    <div style={{ width: 400, marginRight: 10 }}>
      <Form.Item label={label} name={name}>
        {children}
      </Form.Item>
    </div>
  );
};

export default Search;
