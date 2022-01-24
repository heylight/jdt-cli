import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { createHashHistory } from "history";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _axios from "@/utils/axios";
import styles from "./index.module.less";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/slice/userSlice";
import { withRouter } from "react-router";

const index = withRouter(() => {
  const [userNmae, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = createHashHistory();
  const dispatch = useDispatch();
  const login = () => {
    console.log(password, userNmae);
    new Promise((resolve) => {
      resolve({ code: 1, data: { userNmae: "jxd", userRole: 0, id: 1 } });
    })
      // _axios
      //   .post("/cms/system/login", {
      //     password: password,
      //     userName: userNmae,
      //   })
      .then((res: any) => {
        if (res.code === 1) {
          dispatch(setUserInfo(res.data));
          message.success("登录成功");
          history.push("/main/overview");
        }
      });
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        <div>
          <h1>京东科技</h1>
        </div>
        <div>
          <Form labelAlign="right">
            <Form.Item label="用户名">
              <Input
                style={{ width: 200 }}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item label="密码">
              <Input
                style={{ width: 200 }}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
          </Form>
          <div>
            <Button type="primary" style={{ width: "100%" }} onClick={login}>
              立即登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default index;
