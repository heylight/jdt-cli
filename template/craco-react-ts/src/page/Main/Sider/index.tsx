import React, { useEffect, useState } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import styles from "./index.module.less";
import { Menu } from "antd";
import routes from "@/Router/mainRoutes";
import { useSelector } from "react-redux";
import type { route } from "@/Router";
import type { RootState } from "@/store";

const Sider = () => {
  const auth = useSelector((state: RootState) => state.user.authority);
  const location = useLocation();
  const match = useRouteMatch();
  const [selected, setSelected] = useState(location.pathname);
  const [openKeys, setOpenKeys] = useState([location.pathname.split("/")[2]]);
  const handleOpenKeys = ({ key }: { key: string }) => {
    const _openKeys = [...openKeys];
    const index = _openKeys.findIndex((item) => {
      return item === key;
    });
    if (index > -1) {
      _openKeys.splice(index, 1);
    } else {
      _openKeys.push(key);
    }
    setOpenKeys(_openKeys);
  };
  const filteMenu = (menu: route) => {
    if (menu.children) {
      return (
        <Menu.SubMenu
          key={menu.path}
          title={menu.title}
          onTitleClick={handleOpenKeys}
        >
          {menu.children.map((c_item) => {
            return (
              <Menu.Item key={`${match.path}/${c_item.path}`}>
                <Link to={`${match.path}/${c_item.path}`}>{c_item.title}</Link>
              </Menu.Item>
            );
          })}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={`${match.path}/${menu.path}`}>
        <Link to={`${match.path}/${menu.path}`}>{menu.title}</Link>
      </Menu.Item>
    );
  };
  useEffect(() => {
    setSelected(location.pathname);
    if (!openKeys.includes(location.pathname.split("/")[2])) {
      handleOpenKeys({ key: location.pathname.split("/")[2] });
    }
  }, [location]);
  return (
    <div className={styles.main}>
      <Menu
        selectedKeys={[selected]}
        openKeys={openKeys}
        mode="inline"
        style={{ border: "none" }}
      >
        {routes.map((item) => {
          if (item.requireAuth === false) {
            return filteMenu(item);
          } else {
            if (auth.includes(item.name)) {
              return filteMenu(item);
            }
          }
        })}
      </Menu>
    </div>
  );
}

export default Sider;
