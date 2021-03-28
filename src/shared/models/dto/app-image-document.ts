import { FirestoreBaseDocument } from './firestore-base-document';

export interface AppImageDocument<T> extends FirestoreBaseDocument<T> {
  id: string;
  createdBy: string;
  createdOn: T;
  lastUpdatedBy: string;
  lastUpdatedOn: T;
  archived: boolean;
  url: string;
  path: string;
  label: string;
  dimensions: {
    height: number;
    width: number;
  };
  type: string;
}
