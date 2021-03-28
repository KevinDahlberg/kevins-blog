import { authUser } from '../../auth/services/auth.service';
import { FirestoreDocumentBuilder } from '../../shared';
import { deleteFile, uploadBase64File } from './admin-storage.service';
import firebase from 'firebase';
import { AppImage } from '../../shared/models/classes/app-image';
import { AppImageDocument } from '../../shared/models/dto/app-image-document';

export function addGalleryImage(file: any) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = async () => {
        const url = await uploadBase64File(reader.result as string, 'gallery', file.name);
        const dimensions = {
          width: image.naturalWidth || image.width,
          height: image.naturalHeight || image.height,
        };
        const db = firebase.firestore();
        const docRef = db.collection('images').doc();
        const fsDoc = new FirestoreDocumentBuilder();
        const user = authUser();
        fsDoc.setId(docRef.id);
        if (user) {
          fsDoc.setUserId(user.uid);
        }
        const appImage = new AppImage({
          ...fsDoc.build(),
          url,
          dimensions,
          path: `gallery/${file.name}`,
          label: file.name,
          type: file.type,
        });
        await db.collection('images').doc(appImage.id).set(appImage.build());
        resolve(appImage);
      };
    };
  });
}

export async function getGalleryImages() {
  const db = firebase.firestore();
  const snaps = await db.collection('images').get();
  if (snaps.empty) {
    return [];
  }
  return snaps.docs.map(
    (doc) => new AppImage(doc.data() as AppImageDocument<firebase.firestore.Timestamp>),
  );
}

export function getGalleryImagesQuery() {
  const db = firebase.firestore();
  return db.collection('images');
}

export async function deleteGalleryImage(image: AppImage): Promise<void> {
  try {
    await deleteFile(image.url);
    return deleteGalleryImageDoc(image);
  } catch (error) {
    if (error?.code === 'storage/object-not-found') {
      return deleteGalleryImageDoc(image);
    }
    throw error;
  }
}

function deleteGalleryImageDoc(image: AppImage): Promise<void> {
  return firebase.firestore().collection('images').doc(image.id).delete();
}
