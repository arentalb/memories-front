import { useMutation } from "react-query";
import { updatePost } from "../../../api/postsApi.ts";

function useUpdatePost(reset: () => void) {
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.error("Error creating hooks:", error);
    },
  });

  return {
    updatePost: mutateAsync,
    isUpdating: isLoading,
    isErrorUpdate: isError,
    errorUpdate: error,
  };
}

export default useUpdatePost;
