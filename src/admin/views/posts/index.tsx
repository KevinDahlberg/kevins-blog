import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';
import { add } from 'ionicons/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';

export default function Posts() {
  let { url } = useRouteMatch();
  const { push } = useHistory();
  return (
    <div>
      <div>Posts</div>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => push(`${url}/create-post`)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </div>
  );
}
