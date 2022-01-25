import React from "react";
import styles from "./index.module.less";

const Index = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};

export default Index;
