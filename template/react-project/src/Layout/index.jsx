import React from "react";
import Header from "./Header";
// import Sider from "./Sider";
import Content from "./Content";
import styles from "./index.module.less";

const Index = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        {/* <Sider></Sider> */}
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default Index;
