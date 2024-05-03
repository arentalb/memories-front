import { Loader } from "../../ui/common/Loader.tsx";
import { Post } from "./Post.tsx";
import { Error } from "../../ui/common/Error.tsx";
import useFetchAllPosts from "./hooks/useFetchAllPosts.ts";

export function Posts() {
  const { allPosts, fetchingAllPosts, isErrorFetchingAllPost } =
    useFetchAllPosts();
  if (fetchingAllPosts) return <Loader />;
  if (isErrorFetchingAllPost)
    return <Error message={"Could not fetch posts"} />;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {allPosts && allPosts.length > 0 ? (
          allPosts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
