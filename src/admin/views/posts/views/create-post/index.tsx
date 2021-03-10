import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import TinyEditor from '../../components/tiny-editor';

export default function CreatePost() {
  const [text, setText] = useState<string>();
  const [content, setContent] = useState<string>();
  const handleSubmit = () => console.log('data', text, content);
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2">
        <IonItem>
          <IonLabel position="floating">Post Title</IonLabel>
          <IonInput onIonChange={(e) => setText(e.detail.value!)}></IonInput>
        </IonItem>
      </div>
      <div className="p-2">
        <TinyEditor editorChange={(content: string) => setContent(content)} />
      </div>
      <div className="p-2">
        <IonButton onClick={handleSubmit}>Save</IonButton>
      </div>
    </form>
  );
}
