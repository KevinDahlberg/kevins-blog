import { AppImageDocument } from '../dto/app-image-document';
import firebase from 'firebase';
import { handleModelTimestamp } from '../../utils';

export class AppImage implements AppImageDocument<Date> {
  id: string;
  createdBy: string;
  createdOn: Date;
  lastUpdatedBy: string;
  lastUpdatedOn: Date;
  archived: boolean;
  url: string;
  path: string;
  label: string;
  dimensions: {
    height: number;
    width: number;
  };
  type: string;

  constructor(
    value: AppImage | AppImageDocument<Date> | AppImageDocument<firebase.firestore.Timestamp>,
  ) {
    this.assignValues(value);
  }

  assignValues(
    value: AppImage | AppImageDocument<Date> | AppImageDocument<firebase.firestore.Timestamp>,
  ) {
    this.id = value.id;
    this.createdBy = value.createdBy;
    this.createdOn = handleModelTimestamp(value.createdOn);
    this.lastUpdatedBy = value.lastUpdatedBy;
    this.lastUpdatedOn = handleModelTimestamp(value.lastUpdatedOn);
    this.archived = value.archived;
    this.url = value.url;
    this.path = value.path;
    this.label = value.label;
    this.dimensions = value.dimensions;
    this.type = value.type;
  }

  build(userId?: string): AppImageDocument<Date> {
    return {
      ...this,
      lastUpdatedBy: userId ? userId : this.lastUpdatedBy,
      lastUpdatedOn: userId ? new Date() : this.lastUpdatedOn,
    };
  }
}
