import React from "react";
import styles from "./index.module.less";

interface ContentProps {
  children: any;
}

function index({ children }: ContentProps) {
  return <div className={styles.main}>{children}</div>;
}

export default index;
