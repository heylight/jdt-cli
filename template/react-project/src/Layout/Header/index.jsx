import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import _axios from "@/utils/axios";
import { goLogin } from "@/utils";
// import { createHashHistory } from "history";
import { Dropdown, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "@/store/slice/userSlice";
import { useLocation, useHistory } from "react-router-dom";

function Header() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const logout = () => {
    new Promise((resolve, reject) => {
      resolve({ code: 1, message: "success" });
    })
      // _axios.post("/cms/system/logout")
      .then(() => {
        goLogin();
      });
  };
  const getUserInfo = () => {
    new Promise((resolve, reject) => {
      resolve({ code: 1, data: { userName: "jxd", userRole: 0, id: 1 } });
    })
      // _axios.post("/cms/user/login/info")
      .then((res) => {
        if (res.code === 1) {
          dispatch(setUserInfo(res.data));
        }
      });
  };
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={logout}>
        退出
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    getUserInfo();
  }, [location.pathname]);
  return (
    <div className={styles.main}>
      <span
        className={styles.title}
        onClick={() => {
          history.push("/");
        }}
      >
        AI管理平台
      </span>
      <Dropdown overlay={menu}>
        <span className={styles.user}>{userName}</span>
      </Dropdown>
    </div>
  );
}

export default Header;
