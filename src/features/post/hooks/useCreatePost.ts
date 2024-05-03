import { useMutation } from "react-query";
import { createPost } from "../../../api/postsApi.ts";

function useCreatePost(reset: () => void) {
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.error("Error creating hooks:", error);
    },
  });

  return {
    createPost: mutateAsync,
    isCreating: isLoading,
    isErrorCreat: isError,
    errorCreat: error,
  };
}

export default useCreatePost;
