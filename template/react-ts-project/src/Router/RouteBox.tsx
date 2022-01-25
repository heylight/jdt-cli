import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "@/page/Login";
import Home from "@/page/Home";
import NoMatch from "@/page/NoMatch";
const MainRoute = lazy(() => import('./MainRoute'))

const RouteBox = () => {
  return (
    <Switch>
      <Route
        path="/login"
        exact
        render={(props) => {
          document.title = "登录";
          return <Login {...props} />;
        }}
      />
      <Route path="/main">
        <Suspense fallback={<div>Loading...</div>}>
          <MainRoute />
        </Suspense>
      </Route>
      <Route
        path="/"
        exact
        render={(props) => {
          document.title = "首页";
          return <Home {...props} />;
        }}
      />
      <Route
        path="*"
        render={(props) => {
          document.title = "404";
          return <NoMatch {...props} />;
        }}
      />
    </Switch>
  );
}

export default RouteBox;
