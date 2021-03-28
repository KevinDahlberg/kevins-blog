import firebase from 'firebase';

export async function uploadBase64File(file: string, path: string, fileName: string): Promise<any> {
  let blob: string | Blob = file;
  if (typeof file === 'string') {
    // uses fetchAPI to convert base64 string to blob
    const res = await fetch(file);
    blob = await res.blob();
  }
  const ref = firebase.storage().ref();
  const fileRef = ref.child(`${path}/${fileName}`);
  const uploadTask = fileRef.put(blob as Blob);
  return new Promise((resolve, reject) => {
    return uploadTask.on(
      'state_changed',
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error: any) => {
        reject(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL);
        });
      },
    );
  });
}

export function deleteFile(url: string): Promise<any> {
  const ref = firebase.storage().refFromURL(url);
  return ref.delete();
}
