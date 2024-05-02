import { useQuery } from "react-query";
import { fetchPosts } from "../../api/postsApi.ts";
import { Loader } from "../Loader.tsx";
import { Post } from "./Post.tsx";
import { TPost } from "../../types/TPost.ts";

export function Posts() {
  const { data, isLoading, error } = useQuery<TPost[] | undefined>({
    queryFn: fetchPosts,
    queryKey: ["posts"],
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching posts.</p>;
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {data && data.length > 0 ? (
          data.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
