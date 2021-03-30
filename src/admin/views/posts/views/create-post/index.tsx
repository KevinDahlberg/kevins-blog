import { IonAlert, IonButton, IonInput, IonItem, IonLabel, IonLoading } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Post } from '../../../../../shared';
import {
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from '../../../../service/admin-posts.service';
import TinyEditor from '../../components/tiny-editor';

export default function CreatePost() {
  const { id } = useParams() as any;
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showCreateError, setShowCreateError] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { goBack } = useHistory();
  useEffect(() => {
    if (id) {
      getPostById(id)
        .then((post) => {
          setPost(post);
          setContent(post?.content);
          setTitle(post?.title);
          setEditing(true);
        })
        .catch((error) => {
          console.error('unable to get post', error);
        });
    }
  }, [id]);
  const handleSubmit = async (publishedOn: Date | null) => {
    try {
      setShowLoading(true);
      if (editing && post) {
        await updatePost(new Post({ ...post, content, title, publishedOn }));
      } else {
        await createPost({ title, content, publishedOn });
      }
      setShowLoading(false);
      goBack();
    } catch (error) {
      setShowLoading(false);
      setShowCreateError(true);
    }
  };

  const handleDelete = async () => {
    try {
      if (post) {
        await deletePost(post);
        goBack();
      }
    } catch (error) {
      console.error('unable to delete post', error);
    }
  };

  // const handlePublish = async () => {
  //   try {
  //     setShowLoading(true);
  //     if (editing && post) {
  //       await updatePost(new Post({ ...post, content, title, publishedOn: new Date()}));
  //     } else {
  //       await createPost({ title, content, publishedOn: new Date()})
  //     }
  //     setShowLoading(false);
  //     goBack();
  //   } catch (error) {
  //     setShowLoading(false);
  //     setShowCreateError(true);
  //   }
  // }

  const disableSave = () => {
    if (!title || !content) {
      return true;
    }
    return false;
  };
  return (
    <React.Fragment>
      <form onSubmit={() => handleSubmit(null)}>
        <div className="p-2">
          <IonItem>
            <IonLabel position="floating">Post Title</IonLabel>
            <IonInput onIonChange={(e) => setTitle(e.detail.value!)} value={title}></IonInput>
          </IonItem>
        </div>
        <div className="p-2">
          <TinyEditor editorChange={(content: string) => setContent(content)} value={content} />
        </div>
        <div className="p-2">
          {editing && (
            <IonButton onClick={() => setShowDeleteAlert(true)} color="danger">
              Delete
            </IonButton>
          )}
          <IonButton onClick={() => handleSubmit(null)} disabled={disableSave()}>
            Save Draft
          </IonButton>
          <IonButton onClick={() => handleSubmit(new Date())} disabled={disableSave()}>
            Publish
          </IonButton>
        </div>
      </form>

      <IonLoading isOpen={showLoading} message={'Creating Post...'} />
      <IonAlert
        isOpen={showCreateError}
        header={'Error'}
        message={'Unable to create post.'}
        onDidDismiss={() => setShowCreateError(false)}
        buttons={['OK']}
      />
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={'Delete'}
        message={'Are you sure you want to delete this post?'}
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Yes',
            handler: () => handleDelete(),
          },
        ]}
      />
    </React.Fragment>
  );
}
