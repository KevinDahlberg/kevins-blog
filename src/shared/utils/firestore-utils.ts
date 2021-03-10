import firebase from 'firebase';

/**
 * 1. takes in either a firestore timestammp or a Date
 * 2. if it's a timestamp, converts to date
 * 3. returns a date
 */
export const handleModelTimestamp = (date: firebase.firestore.Timestamp | Date): Date => {
  return date instanceof firebase.firestore.Timestamp ? date.toDate() : new Date(date);
};

export const handleDocumentTimestamps = (doc: any): any => {
  return Object.entries(doc).reduce((acc: any, el: [string, any]) => {
    el[1] instanceof firebase.firestore.Timestamp
      ? (acc[el[0]] = el[1].toDate())
      : (acc[el[0]] = el[1]);
    return acc;
  }, {});
};
