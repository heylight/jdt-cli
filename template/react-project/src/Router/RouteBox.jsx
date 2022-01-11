import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "@/page/Login";
import Home from "@/page/Home";
import NoMatch from "@/page/NoMatch";
import MainRoute from "./MainRoute";

function RouteBox() {
  return (
    <Switch>
      <Route
        path="/login"
        exact
        render={(props) => {
          document.title = "登录";
          return <Login {...props} />;
        }}
      ></Route>
      <Route path="/main">
        <MainRoute />
      </Route>
      <Route
        path="/"
        exact
        render={(props) => {
          document.title = "首页";
          return <Home {...props} />;
        }}
      ></Route>
      <Route
        path="*"
        render={(props) => {
          document.title = "404";
          return <NoMatch {...props} />;
        }}
      ></Route>
    </Switch>
  );
}

export default RouteBox;
