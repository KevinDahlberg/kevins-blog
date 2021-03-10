import { PostDocument } from '../dto/post-document';
import firebase from 'firebase';
import { handleModelTimestamp } from '../../utils/firestore-utils';
import { ImageObject } from '../interfaces/image-object';

export class Post implements PostDocument<Date> {
  id: string;
  createdBy: string;
  createdOn: Date;
  lastUpdatedBy: string;
  lastUpdatedOn: Date;
  archived: boolean;
  publishedOn?: Date;
  title: string;
  content: string;
  coverImage?: ImageObject;
  constructor(value: Post | PostDocument<Date> | PostDocument<firebase.firestore.Timestamp>) {
    this.assignValues(value);
  }

  assignValues(
    value: Post | PostDocument<Date> | PostDocument<firebase.firestore.Timestamp>,
  ): void {
    this.id = value.id;
    this.createdBy = value.createdBy;
    this.createdOn = handleModelTimestamp(value.createdOn);
    this.lastUpdatedBy = value.lastUpdatedBy;
    this.lastUpdatedOn = handleModelTimestamp(value.lastUpdatedOn);
    this.archived = value.archived;
    this.title = value.title;
    this.content = value.content;
    if (value.coverImage) {
      this.coverImage = value.coverImage;
    }
    if (value.publishedOn) {
      this.publishedOn = handleModelTimestamp(value.publishedOn);
    }
  }

  build(userId?: string): PostDocument<Date> {
    return {
      ...this,
      lastUpdatedBy: userId ? userId : this.lastUpdatedBy,
      lastUpdatedOn: userId ? new Date() : this.lastUpdatedOn,
    };
  }
}
