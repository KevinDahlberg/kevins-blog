import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from '../login';
import Register from '../register';

export default function Session() {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}/login`}>
          <Login />
        </Route>
        <Route path={`${path}/register`}>
          <Register />
        </Route>
      </Switch>
    </div>
  );
}
