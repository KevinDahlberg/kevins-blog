import * as admin from 'firebase-admin';
import * as inquirer from 'inquirer';
import { getCollections, getDocuments } from './wipe-database.queries';

export async function wipeFirestore(fbApp: admin.app.App) {
  try {
    const db = fbApp.firestore();
    await deleteCollections(db);
    console.log('getting collections');
  } catch (error) {}
}

/**
 * 1. gets all collections
 * 2. iterates over collections and gets all documents from the collection
 * 3. iterates over all documents, deletes document, checks to see if there are any subcollections
 * 4. iterates over subcollections, recursively performs step 3 and 4 until all subcollection docs are gone
 * 
 * @param db firestore db
 */
async function deleteCollections(db: admin.firestore.Firestore) {
  try {
    const collections = await getCollections(db);
    if (collections.length > 0) {
      await handleCollections(collections);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * 1. Gets subcollections
 * 2. Deletes documents on that collection
 * Called recursively until there isn't a value for the subcollection
 * @param docRef document
 */
async function handleSubCollections(docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>) {
  try {
    const subCollections = await docRef.listCollections();
    if (subCollections.length > 0) {
      await handleCollections(subCollections);
    }
  } catch (error) {
    throw error;
  }
}

async function handleCollections(collections: admin.firestore.CollectionReference[]) {
  try {
    for (const collection of collections) {
      const documents = await getDocuments(collection);
      if (documents.length > 0) {
        for (const document of documents) {
          await handleDocument(document);
        }
      }
    }
  } catch (error) {
    throw error;
  }

}

async function handleDocument(docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>) {
  try {
    await docRef.delete();
    await handleSubCollections(docRef);
  } catch (error) {
    throw error;
  }
}
