import { useQuery } from "react-query";
import { TPost } from "../../../types/TPost.ts";
import { fetchPostById } from "../../../api/postsApi.ts";

function useFetchPostById(selectedId: string | null) {
  const { data, isLoading, isError, error } = useQuery<TPost>({
    queryFn: () => fetchPostById(selectedId),
    queryKey: ["singlePost", selectedId],
    enabled: !!selectedId,
  });

  return {
    selectedPost: data,
    isFetchingPost: isLoading,
    isErrorPost: isError,
    errorPost: error,
  };
}

export default useFetchPostById;
