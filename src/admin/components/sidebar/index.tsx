import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

export default function Sidebar() {
  let { path, url } = useRouteMatch();
  const { push } = useHistory();
  return (
    <IonMenu
      side="start"
      menuId="first"
      contentId="admin-main"
      className="max-w-xs shadow-md"
    >
      <IonContent color="primary">
        <IonItem button onClick={() => push(`${url}`)} color="primary">
          Home
        </IonItem>
        <IonItem button onClick={() => push(`${url}/posts`)} color="primary">
          Posts
        </IonItem>
      </IonContent>
    </IonMenu>
  );
}
