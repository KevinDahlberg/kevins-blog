import * as admin from 'firebase-admin';

/**
 * Gets all migration docs from migrations collection
 * @param db firestore database
 */
export async function getMigrationDocs(db: admin.firestore.Firestore) {
  try {
    const snaps = await db.collection('migrations').get();
    if (snaps.empty) {
      return [];
    }
    return snaps.docs.map((s) => s.data());
  } catch (error) {
    console.error('unable to get migration docs', error);
    throw error;
  }
}

export async function addMigration(db: admin.firestore.Firestore, label: string) {
  try {
    return db.collection('migrations').add({ label, createdOn: new Date() });
  } catch (error) {
    console.error('unable to update migrations', error);
    throw error;
  }
}
