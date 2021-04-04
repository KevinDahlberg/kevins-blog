import * as admin from 'firebase-admin';

export async function getCollections(
  db: admin.firestore.Firestore,
): Promise<admin.firestore.CollectionReference[]> {
  return db.listCollections();
}

export async function getSubCollections(
  docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
): Promise<admin.firestore.CollectionReference[]> {
  return docRef.listCollections();
}

export function getDocuments(
  collection: admin.firestore.CollectionReference,
): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>[]> {
  return collection.listDocuments();
}

async function listAllUsers(nextPageToken?: any): Promise<{ users: any; pageToken: any }> {
  // List batch of users, 1000 at a time.
  const result = await admin.auth().listUsers(1000, nextPageToken);
  const users = result.users.map((r) => r.toJSON());
  const pageToken = result.pageToken;
  return {
    users,
    pageToken,
  };
}
// Start listing users from the beginning, 1000 at a time.

export async function getUsers() {
  try {
    let users: any[] = [];
    const result = await listAllUsers();
    users = [...users, ...result.users];
    let token = result.pageToken;
    while (token) {
      const moreUsers = await listAllUsers(token);
      users = [...users, ...result.users];
      token = moreUsers.pageToken;
    }
    return users;
  } catch (error) {}
}

export async function deleteUsers(users: any[]) {
  console.log('deleting users', users.length);
  for (const user of users) {
    await admin.auth().deleteUser(user.uid);
  }
  console.log('delete user success');
  return;
}
