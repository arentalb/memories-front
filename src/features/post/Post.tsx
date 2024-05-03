import moment from "moment";
import { TPost } from "../../types/TPost.ts";
import { useFormPostMode } from "../../context/postContext.tsx";
import useDeletePostById from "./hooks/useDeletePostById.ts";
import { useQueryClient } from "react-query";

export function Post({ post }: { post: TPost }) {
  const formattedDate = moment(post.createdAt).format(
    "MMMM Do YYYY, h:mm:ss a",
  );
  const { setSelectedId } = useFormPostMode();

  const queryClient = useQueryClient();

  const { deletePost, isDeleting, isErrorDelete } =
    useDeletePostById(invalidateCache);

  function invalidateCache() {
    queryClient.invalidateQueries(["posts"]);
  }

  async function deleteHandling() {
    await deletePost(post._id);
    setSelectedId(null);
  }

  return (
    <div
      className="shadow-lg border-b-blue-300 border-b-4 p-4 rounded-lg "
      onClick={() => setSelectedId(post._id)}
    >
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
      <div className={"flex justify-between items-center"}>
        <div className="text-gray-800 mt-2">
          <span>👍 {post.likeCount}</span>
        </div>
        <div className="text-gray-800 mt-2 ">
          <button
            onClick={deleteHandling}
            className={"cursor-pointer hover:text-red-600 text-xl  "}
          >
            {isDeleting ? <span className={"text-sm"}>Deleting </span> : "🗑️"}
            {isErrorDelete && "Error deleting this post "}
          </button>
        </div>
      </div>
    </div>
  );
}
