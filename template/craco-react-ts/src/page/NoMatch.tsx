import React from "react";
import { withRouter } from "react-router";

const NoMatch = withRouter(() => {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%",
      }}
    >
      <h1>页面404啦</h1>
    </div>
  );
});

export default NoMatch;
