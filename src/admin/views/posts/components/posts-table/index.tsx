import { Post } from '../../../../../shared';
import { format } from 'date-fns';

export function PostsTable({ posts, selectPost }: { posts: Post[]; selectPost: Function }) {
  return (
    <div className="w-full">
      <table className="table-fixed w-full">
        <thead className="bg-blue-900">
          <tr>
            <th className="w-3/5 text-white">Title</th>
            <th className="w-2/5 text-white">Published</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr
              key={post.id}
              className={index % 2 ? 'bg-gray-200 hover:bg-gray-400' : 'hover:bg-gray-400'}
              onClick={() => selectPost(post)}
            >
              <td className="py-2 px-4">{post.title}</td>
              <td className="flex justify-center px-4 py-2">
                {post.publishedOn ? format(new Date(post.publishedOn), 'MM/dd/yyyy') : 'Draft'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
