import { useMutation } from "react-query";
import { deletePostById } from "../../../api/postsApi.ts";

function useDeletePostById(invalidateCache: () => void) {
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => {
      invalidateCache();
    },
    onError: (error) => {
      console.error("Error creating hooks:", error);
    },
  });

  return {
    deletePost: mutateAsync,
    isDeleting: isLoading,
    isErrorDelete: isError,
    errorDelete: error,
  };
}

export default useDeletePostById;
