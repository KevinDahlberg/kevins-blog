import { useEffect, useState } from "react";
import { Post } from "../../../shared";
import { getPostsQuery } from "../../services/posts.service";
import { PostDocument } from '../../../shared/models/dto/post-document';
import firebase from 'firebase';

export default function Posts() {
  const [posts, setPosts]: [any, any] = useState([]);
  useEffect(() => {
    const postsSub = getPostsQuery().onSnapshot({
      next: (snap) => {
        const data = snap.docs.map((doc) => new Post(doc.data() as PostDocument<firebase.firestore.Timestamp>))
        setPosts(data);
      }
    });
    return function cleanup() {
      postsSub();
    }
  }, []);

  return (
    
  )
}