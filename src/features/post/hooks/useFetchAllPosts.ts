import { useQuery } from "react-query";
import { TPost } from "../../../types/TPost.ts";
import { fetchPosts } from "../../../api/postsApi.ts";

function useFetchAllPosts() {
  const { data, isLoading, isError } = useQuery<TPost[] | undefined>({
    queryFn: fetchPosts,
    queryKey: ["posts"],
  });

  return {
    allPosts: data,
    fetchingAllPosts: isLoading,
    isErrorFetchingAllPost: isError,
  };
}

export default useFetchAllPosts;
