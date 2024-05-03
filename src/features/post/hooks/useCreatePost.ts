import { useMutation, useQueryClient } from "react-query";
import { createPost } from "../../../api/postsApi.ts";

function useCreatePost(setFormValue, setImageFile) {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createAsync,
    isLoading: isCreating,
    isError: isErrorCreat,
    error: errorCreat,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setFormValue({
        creator: "",
        title: "",
        message: "",
        tags: "",
      });
      setImageFile(null);
    },
    onError: (error) => {
      console.error("Error creating hooks:", error);
    },
  });

  return { createAsync, isCreating, isErrorCreat, errorCreat };
}

export default useCreatePost;
