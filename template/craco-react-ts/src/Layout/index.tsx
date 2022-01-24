import React from "react";
import Header from "./Header";
// import Sider from "./Sider";
import Content from "./Content";
import styles from "./index.module.less";

interface LayoutProps {
  children: any;
}

const Index = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Content>{children}</Content>
      </div>
    </div>
  );
}

export default Index;
