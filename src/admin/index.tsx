import { IonContent, IonHeader, IonPage, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Sidebar from './components/sidebar';
import Home from './views/home';
import Posts from './views/posts';
import CreatePost from './views/posts/views/create-post';

export default function Admin() {
  let { path } = useRouteMatch();
  return (
    <IonPage>
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
              <Route path={`${path}/posts/create-post`}>
                <CreatePost />
              </Route>
              <Route path={`${path}/posts`}>
                <Posts />
              </Route>
            </Switch>
          </IonPage>
        </IonSplitPane>
      </IonContent>
    </IonPage>
  );
}
