import * as admin from 'firebase-admin';

async function deleteCollections(db: admin.firestore.Firestore): Promise<void> {
  const collections = await db.listCollections();
  console.log('collections to delete', collections.length);
  await deleteDocuments(collections);
}

/**
 * 1. gets all subcollections
 * 2. calls delete documents for
 * @param docRef firebase doc reference
 */
async function deleteSubcollections(docRef: any) {
  const subCollections = await docRef.listCollections();
  if (subCollections?.length > 0) {
    await deleteDocuments(subCollections);
  }
}

async function deleteDocuments(collections: admin.firestore.CollectionReference[]) {
  let counter = 0;
  for (const collection of collections) {
    let docCounter = 0;
    const documents = await collection.listDocuments();
    for (const document of documents) {
      await collection.doc(document.id).delete();
      await deleteSubcollections(document);
      counter++;
    }
    console.log('documents delete from ');
  }
}

async function getUsers(nextPageToken: any) {
  try {
    const users = await admin.auth().listUsers();
  } catch (error) {}
}
