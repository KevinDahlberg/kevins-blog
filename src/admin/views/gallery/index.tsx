import React, { useEffect, useRef, useState } from 'react';
import { IonFab, IonFabButton, IonIcon, IonLoading } from '@ionic/react';
import { add } from 'ionicons/icons';
import { addGalleryImage, getGalleryImagesQuery } from '../../service/admin-gallery.service';
import { AppImage } from '../../../shared/models/classes/app-image';
import GalleryImage from '../components/gallery-image';
import { AppImageDocument } from '../../../shared/models/dto/app-image-document';
import firebase from 'firebase';

export function Gallery() {
  const [images = [], setImages]: [any, any] = useState();
  const [showLoading, setShowLoading]: [any, any] = useState(false);
  useEffect(() => {
    const gallerySnap = getGalleryImagesQuery().onSnapshot({
      next: (snap) => {
        const data = snap.docs.map(
          (doc) => new AppImage(doc.data() as AppImageDocument<firebase.firestore.Timestamp>),
        );
        setImages(data);
      },
    });
    return function cleanup() {
      gallerySnap();
    };
  }, []);

  const handleChange = async (files: any) => {
    try {
      setShowLoading(true);
      await addGalleryImage(files[0]);
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
    }
  };

  const fileRef: any = useRef(null);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {images.map((image: AppImage) => (
          <GalleryImage image={image} key={image.id} />
        ))}
      </div>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => fileRef.current.click()}>
          <IonIcon icon={add} />
        </IonFabButton>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileRef}
          onChange={(e) => handleChange(e.target.files)}
        />
      </IonFab>
      <IonLoading isOpen={showLoading} message={'Uploading Image...'} />
    </div>
  );
}
