import { useMutation, useQueryClient } from "react-query";
import { updatePost } from "../../../api/postsApi.ts";

function useUpdatePost(setFormValue, setImageFile, setSelectedId) {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateAsync,
    isLoading: isUpdating,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setFormValue({
        creator: "",
        title: "",
        message: "",
        tags: "",
      });
      setImageFile(null);
      setSelectedId(null);
    },
    onError: (error) => {
      console.error("Error creating hooks:", error);
    },
  });

  return { updateAsync, isUpdating, isErrorUpdate, errorUpdate };
}

export default useUpdatePost;
