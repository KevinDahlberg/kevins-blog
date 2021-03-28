import { IonContent, IonItem, IonMenu } from '@ionic/react';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

export default function Sidebar() {
  let { url } = useRouteMatch();
  const { push } = useHistory();
  return (
    <IonMenu side="start" menuId="first" contentId="admin-main" className="max-w-xs shadow-md">
      <IonContent color="primary">
        <IonItem button onClick={() => push(`${url}`)} color="primary">
          Home
        </IonItem>
        <IonItem button onClick={() => push(`${url}/posts`)} color="primary">
          Posts
        </IonItem>
        <IonItem button onClick={() => push(`${url}/gallery`)} color="primary">
          Gallery
        </IonItem>
      </IonContent>
    </IonMenu>
  );
}
