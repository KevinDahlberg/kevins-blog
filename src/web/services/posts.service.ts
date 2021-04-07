import firebase from 'firebase';
import { Post } from '../../shared';
import { PostDocument } from '../../shared/models/dto/post-document';

export async function getPosts() {
  const db = firebase.firestore();
  const snaps = await db.collection('posts').get();
  return snaps.docs.map(
    (doc) => new Post(doc.data() as PostDocument<firebase.firestore.Timestamp>),
  );
}

export function getPostsQuery() {
  const db = firebase.firestore();
  return db.collection('posts');
}

export async function getPostById(id: string) {
  try {
    const db = firebase.firestore();
    const snap = await db.collection('posts').doc(id).get();
    return new Post(snap.data() as PostDocument<firebase.firestore.Timestamp>);
  } catch (error) {
    throw error;
  }
}
