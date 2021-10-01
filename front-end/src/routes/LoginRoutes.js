import { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import GuestGuard from "@src/utils/route-guard/GuestGuard";
import MinimalLayout from "@src/layout/MinimalLayout";
import NavMotion from "@src/layout/NavMotion";
import Loadable from "@src/components/Loadable";

const UserRegister = Loadable(lazy(() => import("@src/pages/register")));
const Login = Loadable(lazy(() => import("@src/pages/auth/login")));
const ForgotPassword = Loadable(
  lazy(() => import("@src/pages/auth/recover-password"))
);

const LoginRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/register", "/login", "/recuperar-senha"]}>
      <MinimalLayout>
        <Switch location={location} key={location.pathname}>
          <NavMotion>
            <GuestGuard>
              <Route path="/register" component={UserRegister} />
              <Route path="/login" component={Login} />
              <Route path="/recuperar-senha" component={ForgotPassword} />
            </GuestGuard>
          </NavMotion>
        </Switch>
      </MinimalLayout>
    </Route>
  );
};

export default LoginRoutes;
