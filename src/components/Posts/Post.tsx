import moment from "moment";
import { TPost } from "../../types/TPost.ts";

export function Post({ post }: { post: TPost }) {
  const formattedDate = moment(post.createdAt).format(
    "MMMM Do YYYY, h:mm:ss a",
  );

  return (
    <div className="shadow-lg border-b-blue-300 border-b-4 p-4 rounded-lg ">
      <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-700">{post.message}</p>
      {post.selectedFile && (
        <img
          src={post.selectedFile}
          alt="Post"
          className="mt-2 rounded max-w-full h-auto"
        />
      )}

      <div className="text-sm text-gray-600 mt-2">
        <span>
          Created by {post.creator} on {formattedDate}
        </span>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-gray-800 font-medium mr-2">Tags:</span>
        {post.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="text-xs text-blue-500 bg-blue-100 rounded-full px-2 py-1 mr-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-gray-800 mt-2">
        <span>Likes: {post.likeCount}</span>
      </div>
    </div>
  );
}
