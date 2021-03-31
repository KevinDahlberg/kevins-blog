import * as admin from 'firebase-admin';

export interface Migration {
  label: string;
  createdOn: admin.firestore.Timestamp;
}
