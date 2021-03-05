import {
  IonContent,
  IonHeader,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Route, Router, Switch, useRouteMatch } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Home from "./views/home";

export default function Admin() {
  let { path, url } = useRouteMatch();
  return (
    <div className="h-screen w-full">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Admin Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSplitPane contentId="admin-main">
          <Sidebar />
          <IonPage id="admin-main">
            <Switch>
              <Route exact path={path}>
                <Home />
              </Route>
              <Route path={`${path}/posts`}>Posts</Route>
            </Switch>
          </IonPage>
        </IonSplitPane>
      </IonContent>
    </div>
  );
}
