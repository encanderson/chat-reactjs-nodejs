import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import MainLayout from "@src/layout/MainLayout";
import Loadable from "@src/components/Loadable";
import AuthGuard from "@src/utils/route-guard/AuthGuard";

// Chat room
const ChatRoom = Loadable(lazy(() => import("@src/pages/chat")));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/chat"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route exact path="/chat" component={ChatRoom} />
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default AppRoutes;
