import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useFormPostMode } from "../../context/postContext.tsx";
import useCreatePost from "./hooks/useCreatePost.ts";
import useUpdatePost from "./hooks/useUpdatePost.ts";
import { FileInput } from "../../ui/common/FileInput.tsx";
import { Button } from "../../ui/common/Button.tsx";
import { Input } from "../../ui/common/Input.tsx";
import useFetchPostById from "./hooks/useFetchPostById.ts";
import { useForm } from "react-hook-form";
import convertToBase64 from "../../utils/convertToBase64.ts";

export type Inputs = {
  creator: string;
  tags: string;
  message: string;
  title: string;
  image: File | null;
};

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset: resetForm,
  } = useForm<Inputs>();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const { selectedId, setSelectedId } = useFormPostMode();

  const { selectedPost, isFetchingPost, isErrorPost } =
    useFetchPostById(selectedId);

  const { createPost, isCreating, isErrorCreat } = useCreatePost(reset);

  const { updatePost, isUpdating, isErrorUpdate } = useUpdatePost(reset);

  useEffect(() => {
    if (selectedPost && selectedId) {
      setValue("creator", selectedPost.creator);
      setValue("title", selectedPost.title);
      setValue("message", selectedPost.message);
      setValue("tags", selectedPost.tags.toString());
    }
  }, [selectedId, selectedPost, setValue]);

  const shouldBeDisable = isCreating || isFetchingPost || isUpdating;

  async function editPostHandler(inputData: Inputs) {
    console.log("editPostHandler");
    console.log(inputData);
    if (selectedId && selectedPost) {
      const tags = inputData.tags.split(",").map((tag) => tag.trim());
      const updatedPost = { ...inputData, tags };
      await updatePost({ postId: selectedId, updatedPostData: updatedPost });
    }
  }

  async function createPostHandler(inputData: Inputs) {
    if (!selectedId && !selectedPost) {
      try {
        const base64 = await convertToBase64(imageFile);
        const tags = inputData.tags.split(",").map((tag) => tag.trim());
        const newPost = {
          ...inputData,
          selectedFile: base64,
          tags,
          createdAt: new Date(),
        };
        await createPost(newPost);
      } catch (err) {
        console.error("Failed to create hooks:", err);
      }
    }
  }

  const queryClient = useQueryClient();

  function reset() {
    queryClient.invalidateQueries({ queryKey: ["posts"] });

    resetForm();
    setImageFile(null);
    setSelectedId(null);
  }

  return (
    <form className={"flex flex-col gap-6 w-full"}>
      {selectedId ? (
        <h1 className={"text-center text-4xl font-semibold"}>
          Edit a memory 📸
        </h1>
      ) : (
        <h1 className={"text-center text-4xl font-semibold"}>
          Create a memory 📸
        </h1>
      )}
      <Input
        type="text"
        name="creator"
        placeholder={"Creator"}
        errors={errors}
        register={register}
        validationSchema={{
          required: "Please provide a creator name",
        }}
        required
      />

      <Input
        type="text"
        name="title"
        placeholder={"Title"}
        errors={errors}
        register={register}
        validationSchema={{
          required: "Please provide a title",
        }}
        required
      />

      <Input
        type="text"
        name="message"
        placeholder={"Message"}
        errors={errors}
        register={register}
        validationSchema={{
          required: "Please provide a message",
        }}
        required
      />
      <Input
        type="text"
        name="tags"
        placeholder={"Tags"}
        errors={errors}
        register={register}
        validationSchema={{
          required: "Please provide tags",
        }}
        required
      />

      <div>
        {!selectedId && !selectedPost && (
          <FileInput imageFile={imageFile} setImageFile={setImageFile} />
        )}
        {errors.image && (
          <p className={"mt-1 text-sm text-red-600"}>please select an image</p>
        )}
      </div>

      <div className={"grid w-full grid-cols-2 gap-3"}>
        {selectedId ? (
          <Button
            onClick={handleSubmit(editPostHandler)}
            text={"Edit"}
            className={"bg-blue-200 hover:bg-blue-300"}
            disabled={shouldBeDisable}
          />
        ) : (
          <Button
            onClick={handleSubmit(createPostHandler)}
            text={"Save"}
            className={"bg-blue-200 hover:bg-blue-300"}
            disabled={shouldBeDisable}
          />
        )}
        <Button
          onClick={reset}
          text={"Clear"}
          className={"bg-red-200 hover:bg-red-300"}
          disabled={shouldBeDisable}
          type="button"
        />
      </div>

      <p className={"text-center"}>
        {isFetchingPost && "Fetching ....."}
        {isCreating && "Creating ....."}
        {isUpdating && "Updating ....."}
      </p>
      <p className={"text-center"}>
        {isErrorPost && "Could not fetch product"}
        {isErrorCreat && "Could not create product"}
        {isErrorUpdate && "Could not update product"}
      </p>
    </form>
  );
}
