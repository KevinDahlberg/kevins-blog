export class FirestoreDocumentBuilder {
  id: string;
  createdBy: string;
  createdOn: Date;
  lastUpdatedBy: string;
  lastUpdatedOn: Date;
  archived: boolean;
  constructor() {
    this.createdOn = new Date();
    this.lastUpdatedOn = new Date();
    this.archived = false;
  }

  setId(id: string) {
    this.id = id;
  }

  setUserId(id: string) {
    this.createdBy = id;
    this.lastUpdatedBy = id;
  }

  build() {
    if (!this.id) {
      throw new Error('ID is required');
    }
    if (!this.createdBy || !this.lastUpdatedBy) {
      throw new Error('UserID not supplied');
    }
    return { ...this };
  }
}
