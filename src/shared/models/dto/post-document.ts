import { ImageObject } from '../interfaces/image-object';
import { FirestoreBaseDocument } from './firestore-base-document';

export interface PostDocument<T> extends FirestoreBaseDocument<T> {
  id: string;
  createdBy: string;
  createdOn: T;
  lastUpdatedBy: string;
  lastUpdatedOn: T;
  archived: boolean;
  publishedOn: T | null;
  title: string;
  content: string;
  coverImage: ImageObject | null;
}
