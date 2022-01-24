import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import routes from "./mainRoutes";
import Layout from "@/Layout";
import Sider from "@/page/Main/Sider";
import type { route } from "./index";

const MainRoute = () => {
  const match = useRouteMatch();
  const filteRoute = (route: route) => {
    if (route.children) {
      return route.children.map((c_route: route) => {
        return (
          <Route
            key={c_route.path}
            path={`${match.path}/${c_route.path}`}
            exact
            render={(props) => {
              document.title = c_route.title;
              return <c_route.component {...props} />;
            }}
          />
        );
      });
    }
    return (
      <Route
        key={route.path}
        path={`${match.path}/${route.path}`}
        exact
        render={(props) => {
          document.title = route.title;
          return <route.component {...props} />;
        }}
      />
    );
  };
  return (
    <Layout>
      <Sider />
      <div style={{ flex: 1 }}>
        <Switch>{routes.map((item: route): any => filteRoute(item))}</Switch>
      </div>
    </Layout>
  );
}

export default MainRoute;
