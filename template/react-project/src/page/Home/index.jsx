import React from "react";
import style from "./index.module.less";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const Index = () => {
  const history = useHistory();
  return (
    <div className={style.main}>
      <div>首页</div>
      <Button
        onClick={() => {
          history.push("main/overview");
        }}
      >
        去概览
      </Button>
    </div>
  );
};

export default Index;
