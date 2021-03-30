import { IonFab, IonFabButton, IonGrid, IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { add } from 'ionicons/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getPostsQuery } from '../../service/admin-posts.service';
import { Post } from '../../../shared';
import { PostDocument } from '../../../shared/models/dto/post-document';
import firebase from 'firebase';
import { PostsTable } from './components/posts-table';

export default function Posts() {
  const [posts = [], setPosts]: [any, any] = useState();
  let { url } = useRouteMatch();
  const { push } = useHistory();
  useEffect(() => {
    const postsSub = getPostsQuery().onSnapshot({
      next: (snap) => {
        const data = snap.docs.map(
          (doc) => new Post(doc.data() as PostDocument<firebase.firestore.Timestamp>),
        );
        setPosts(data);
      },
    });
    return function cleanup() {
      postsSub();
    };
  }, []);

  const selectPost = (post: Post) => {
    push(`${url}/create-post/${post.id}`);
  };

  return (
    <div>
      <IonGrid fixed={true}>
        <div className="flex justify-center">
          <h1>Posts</h1>
        </div>
        <PostsTable posts={posts} selectPost={selectPost} />
      </IonGrid>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => push(`${url}/create-post`)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </div>
  );
}
