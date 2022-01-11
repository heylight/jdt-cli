import React, { useRef, useState, useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import styles from "./App.module.less";
import RouteBox from "./Router/RouteBox";

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <RouteBox></RouteBox>
      </Router>
    </div>
  );
}

export default App;
