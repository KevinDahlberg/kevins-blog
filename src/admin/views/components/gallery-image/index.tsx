import { IonAlert, IonFabButton, IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import React, { useState } from 'react';
import { AppImage } from '../../../../shared/models/classes/app-image';
import { deleteGalleryImage } from '../../../service/admin-gallery.service';

export default function GalleryImage({ image }: { image: AppImage }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteGalleryImage(image);
    } catch (error) {
      console.error('unable to delete image', error);
    }
  };
  return (
    <div className="w-100 h-100 flex justify-center items-center relative">
      <img src={image.url} className="max-h-full max-w-full" alt={image.label} />
      <div className="absolute -top-6 -right-6">
        <IonFabButton onClick={() => setShowDeleteAlert(true)} size="small">
          <IonIcon icon={trash} />
        </IonFabButton>
      </div>
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={'Delete'}
        message={'Are you sure you want to delete this image?'}
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
    </div>
  );
}
