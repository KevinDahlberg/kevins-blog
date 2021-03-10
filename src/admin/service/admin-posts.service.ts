import firebase from 'firebase';
import { authUser } from '../../auth/services/auth.service';
import { FirestoreDocumentBuilder, Post, PostDocument } from '../../shared';

const db = firebase.firestore();

export async function createPost(postPartial: any): Promise<void> {
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
  return db.collection('posts').doc(fsDoc.id).set(post.build());
}

export async function getPosts() {
  const snaps = await db.collection('posts').get();
  return snaps.docs.map(
    (doc) => new Post(doc.data() as PostDocument<firebase.firestore.Timestamp>),
  );
}
