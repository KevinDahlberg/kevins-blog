export interface FirestoreBaseDocument<T> {
  id: string;
  createdBy: string;
  createdOn: T;
  lastUpdatedBy: string;
  lastUpdatedOn: T;
  archived: boolean;
}
