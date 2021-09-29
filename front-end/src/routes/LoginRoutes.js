import { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import GuestGuard from "@src/utils/route-guard/GuestGuard";
import MinimalLayout from "@src/layout/MinimalLayout";
import NavMotion from "@src/layout/NavMotion";
import Loadable from "@src/components/Loadable";

const UserRegister = Loadable(lazy(() => import("@src/pages/register")));
const Login = Loadable(lazy(() => import("@src/pages/auth/login")));

const LoginRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/register", "/login"]}>
      <MinimalLayout>
        <Switch location={location} key={location.pathname}>
          <NavMotion>
            <GuestGuard>
              <Route path="/register" component={UserRegister} />
              <Route path="/login" component={Login} />
            </GuestGuard>
          </NavMotion>
        </Switch>
      </MinimalLayout>
    </Route>
  );
};

export default LoginRoutes;
