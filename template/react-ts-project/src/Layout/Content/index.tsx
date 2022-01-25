import React from "react";
import styles from "./index.module.less";

interface ContentProps {
  children: any;
}

const Index = ({ children }: ContentProps) => {
  return <div className={styles.main}>{children}</div>;
}

export default Index;
