import firebase from 'firebase';
import { authUser } from '../../auth/services/auth.service';
import { FirestoreDocumentBuilder, Post } from '../../shared';
import { PostDocument } from '../../shared/models/dto/post-document';

export function createPost(postPartial: any): Promise<void> {
  const db = firebase.firestore();
  const docRef = db.collection('posts').doc();
  const user = authUser();
  const fsDoc = new FirestoreDocumentBuilder();
  fsDoc.setId(docRef.id);
  if (user) {
    fsDoc.setUserId(user.uid);
  }
  const post = new Post({
    ...fsDoc.build(),
    ...postPartial,
  });
  return db.collection('posts').doc(post.id).set(post.build());
}

export function updatePost(post: Post): Promise<void> {
  const db = firebase.firestore();
  const user = authUser();
  if (user) {
    return db.collection('posts').doc(post.id).set(post.build(user.uid));
  }
  return Promise.resolve();
}

export function deletePost(post: Post): Promise<void> {
  const db = firebase.firestore();
  return db.collection('posts').doc(post.id).delete();
}

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
