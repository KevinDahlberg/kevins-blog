import * as admin from 'firebase-admin';

export async function getCollections(db: admin.firestore.Firestore): Promise<admin.firestore.CollectionReference[]> {
  return db.listCollections();
}

export async function getSubCollections(docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>): Promise<admin.firestore.CollectionReference[]> {
  return docRef.listCollections();
}

export function getDocuments(collection: admin.firestore.CollectionReference): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>[]> {
  return collection.listDocuments();
}

function listAllUsers(nextPageToken: any) {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
// Start listing users from the beginning, 1000 at a time.

async function getUsers() {
  try {
    const users = await admin.auth().listUsers();
  } catch (error) {}
}
