import { IonAlert, IonButton, IonInput, IonItem, IonLabel, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../../../service/admin-posts.service';
import TinyEditor from '../../components/tiny-editor';

export default function CreatePost() {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showCreateError, setShowCreateError] = useState<boolean>(false);
  const { goBack } = useHistory();
  const handleSubmit = async () => {
    console.log('submitting?');
    try {
      setShowLoading(true);
      console.log('loading should show?', showLoading);
      await createPost({ title, content });
      setShowLoading(false);
      goBack();
    } catch (error) {
      setShowLoading(false);
      setShowCreateError(true);
    }
  };

  const disableSave = () => {
    if (!title || !content) {
      return true;
    }
    return false;
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <IonItem>
            <IonLabel position="floating">Post Title</IonLabel>
            <IonInput onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
          </IonItem>
        </div>
        <div className="p-2">
          <TinyEditor editorChange={(content: string) => setContent(content)} />
        </div>
      </form>
      <div className="p-2">
        <IonButton onClick={handleSubmit} disabled={disableSave()}>
          Save
        </IonButton>
      </div>
      <IonLoading isOpen={showLoading} message={'Creating Post...'} />
      <IonAlert
        isOpen={showCreateError}
        header={'Error'}
        message={'Unable to create post.'}
        onDidDismiss={() => setShowCreateError(false)}
        buttons={['OK']}
      />
    </React.Fragment>
  );
}
