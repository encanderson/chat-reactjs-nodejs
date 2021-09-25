import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import LoginRoutes from "./LoginRoutes";
import AppRoutes from "./AppRoutes";

import config from "@src/config";

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => {
          window.location.href = `${config.home}`;
          return null;
        }}
      />
      <Redirect exact path="/" to={`${config.defaultPath}`} />
      <React.Fragment>
        <LoginRoutes />
        <AppRoutes />
      </React.Fragment>
    </Switch>
  );
};

export default Routes;
