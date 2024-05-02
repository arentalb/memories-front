import { Post } from "./Post.tsx";
import { useQuery } from "react-query";
import { fetchPosts } from "../../api/postsApi.ts";

export function Posts() {
  const { data, isLoading, error } = useQuery({
    queryFn: fetchPosts,
    queryKey: "posts",
  });
  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <div>
      <Post />
      <Post />
      <Post />
    </div>
  );
}
