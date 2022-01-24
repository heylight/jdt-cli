import React, { useEffect, useState } from "react";
import _axios from "@/utils/axios";
import { Search } from "@/components";
import { Input, Table, Button, message } from "antd";

import ModalEdit from "./ModalEdit";
const { Column } = Table;

interface catQuery {
  name?: string;
  pageNum: number;
  pageSize: number;
}

export interface CatSchema {
  id?: string | number;
  name: string;
  age: string | number;
}

const Cats = () => {
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = Search.useSearchForm();
  const [query, setQuery] = useState({
    pageNum: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [tabledata, setTabledata] = useState([]);
  const [rowData, setRowData] = useState({} as CatSchema);
  // 获取数据列表
  const getList = (param: catQuery) => {
    setLoading(true);
    _axios
      .get(`/cats${param.name ? "?name=" + param.name : ""}`)
      // _axios.post("/cms/service/page", { ...param })
      .then((res: any) => {
        if (res.code === 1) {
          setTabledata(res.data);
          setQuery({
            pageNum: res.data.pageNum,
            pageSize: res.data.pageSize,
          });
          setTotal(res.data.total);
        }
        setLoading(false);
      });
  };
  // 查询
  const handleSearch = () => {
    setQuery({ ...query, pageNum: 1 });
    getList({ ...query, pageNum: 1, ...form.getValue() });
  };
  // 清空
  const clear = () => {
    setQuery({
      ...query,
      pageNum: 1,
    });
    getList({ ...query, pageNum: 1 });
  };
  // 翻页
  const onChangePage = (pageNum: number, pageSize: number) => {
    setQuery({
      ...query,
      pageNum,
      pageSize,
    });
    getList({ ...query, pageNum, pageSize, ...form.getValue() });
  };
  // 打开新建窗口
  const openModal = () => {
    setModalShow(true);
    setRowData({} as CatSchema);
  };
  const editItem = (item: CatSchema) => {
    setModalShow(true);
    setRowData(item);
  };
  // 新建猫猫
  const handleSubmit = async (cat: CatSchema) => {
    const res: any = cat.id
      ? await _axios.post("/cats/update", cat)
      : await _axios.post("/cats", cat);
    // const res: any = await _axios.post("/cats", cat);
    if (res.code === 1) {
      message.success(cat.id ? "更新成功" : "创建成功");
      getList({ ...query });
    }
  };
  const deleteItem = async (item: CatSchema) => {
    const res: any = await _axios.post("/cats/delete", { id: item.id });
    if (res.code === 1) {
      message.success("删除成功");
      getList({ ...query });
    }
  };
  // 进入时调用
  useEffect(() => {
    getList({ ...query, ...form.getValue() });
  }, []);

  return (
    <>
      <Search
        onSearch={handleSearch}
        onClear={clear}
        createBtnTitle="新建猫猫"
        createBtnFunc={openModal}
        form={form}
      >
        <Search.Item name="name" label="猫猫">
          <Input placeholder="请输入猫猫名称" />
        </Search.Item>
      </Search>
      <Table
        dataSource={tabledata}
        rowKey={(record: CatSchema) => `${record.id}`}
        loading={loading}
        pagination={{
          current: query.pageNum,
          pageSize: query.pageSize,
          total: total,
          onChange: onChangePage,
        }}
      >
        <Column title="名字" dataIndex="name" />
        <Column title="年龄" dataIndex="age" />
        <Column
          title="操作"
          dataIndex="ctrl"
          render={(text, record: CatSchema) => (
            <>
              <Button
                type="link"
                onClick={() => {
                  editItem(record);
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                onClick={() => {
                  deleteItem(record);
                }}
              >
                删除
              </Button>
            </>
          )}
        />
      </Table>
      <ModalEdit
        show={modalShow}
        handleShow={setModalShow}
        onSubmit={handleSubmit}
        rowData={rowData}
      />
    </>
  );
};

export default Cats;
