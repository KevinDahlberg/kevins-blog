import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { add } from 'ionicons/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getPosts } from '../../service/admin-posts.service';

export default function Posts() {
  const [posts, setPosts]: [any, any] = useState();
  let { url } = useRouteMatch();
  const { push } = useHistory();
  useEffect(() => {
    getPosts().then((posts) => setPosts(posts as any));
  });
  return (
    <div>
      <div>Posts</div>
      {posts.map((p: any) => (
        <div>{p.title}</div>
      ))}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => push(`${url}/create-post`)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </div>
  );
}
