import React from "react";
import { Route, Router, Switch, useRouteMatch } from "react-router-dom";
import Sidebar from "./components/sidebar";

export default function Admin() {
  let { path, url } = useRouteMatch();
  return (
    <div className="h-screen w-screen flex flex-row">
      <Sidebar />
      <div>
        <Switch>
          <Route exact path={path}>
            Home
          </Route>
          <Route path={`${path}/posts`}>Posts</Route>
        </Switch>
      </div>
    </div>
  );
}
