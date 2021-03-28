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
  publishedOn: Date | null;
  title: string;
  content: string;
  coverImage: ImageObject | null;
  constructor(value: Post | PostDocument<Date> | PostDocument<firebase.firestore.Timestamp>) {
    this.assignValues(value);
  }

  assignValues(
    value: Post | PostDocument<Date> | PostDocument<firebase.firestore.Timestamp>,
  ): void {
    console.log('value', value);
    this.id = value.id;
    this.createdBy = value.createdBy;
    this.createdOn = handleModelTimestamp(value.createdOn);
    this.lastUpdatedBy = value.lastUpdatedBy;
    this.lastUpdatedOn = handleModelTimestamp(value.lastUpdatedOn);
    this.archived = value.archived;
    this.title = value.title;
    this.content = value.content;
    if (value.coverImage) {
      console.log('cover image exists?');
      this.coverImage = value.coverImage;
    } else {
      console.log('cover image does not exist');
      this.coverImage = null;
    }
    if (value.publishedOn) {
      console.log('published on exists?');
      this.publishedOn = handleModelTimestamp(value.publishedOn);
    } else {
      this.publishedOn = null;
      console.log('publised on does not exist');
    }
    console.log('this', this);
  }

  build(userId?: string): PostDocument<Date> {
    console.log('building', this);
    return {
      ...this,
      lastUpdatedBy: userId ? userId : this.lastUpdatedBy,
      lastUpdatedOn: userId ? new Date() : this.lastUpdatedOn,
    };
  }
}
