import { ChangeEvent, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import convertToBase64 from "../../utils/convertToBase64.ts";
import { useFormPostMode } from "../../context/postContext.tsx";
import useCreatePost from "./hooks/useCreatePost.ts";
import useUpdatePost from "./hooks/useUpdatePost.ts";
import { FileInput } from "../../ui/common/FileInput.tsx";
import { Button } from "../../ui/common/Button.tsx";
import { Input } from "../../ui/common/Input.tsx";
import useFetchPostById from "./hooks/useFetchPostById.ts";

interface FormValues {
  creator: string;
  title: string;
  message: string;
  tags: string;
  imageFile?: File;
}

interface FormErrors {
  creator?: string;
  title?: string;
  message?: string;
  tags?: string;
}

export function Form() {
  const [formValue, setFormValue] = useState<FormValues>({
    creator: "",
    title: "",
    message: "",
    tags: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [fileError, setFileError] = useState<string>("");

  const validate = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.creator) {
      errors.creator = "Creator name is required";
    }
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.message) {
      errors.message = "Message is required";
    }
    if (!values.tags) {
      errors.tags = "At least one tag is required";
    }
    return errors;
  };
  const [imageFile, setImageFile] = useState<File | null>(null);

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // const newErrors = validate({ ...formValue, [name]: value });
    // setErrors(newErrors);
  }

  const { selectedId, setSelectedId } = useFormPostMode();

  const { selectedPost, isFetchingPost, isErrorPost } =
    useFetchPostById(selectedId);

  const { createPost, isCreating, isErrorCreat } = useCreatePost(reset);

  const { updatePost, isUpdating, isErrorUpdate } = useUpdatePost(reset);

  useEffect(() => {
    if (selectedPost && selectedId)
      setFormValue({
        creator: selectedPost.creator,
        title: selectedPost.title,
        message: selectedPost.message,
        tags: selectedPost.tags.toString(),
      });
  }, [selectedId, selectedPost]);

  const shouldBeDisable = isCreating || isFetchingPost || isUpdating;

  async function editPostHandler() {
    const tags = formValue.tags.split(",").map((tag) => tag.trim());
    const updatedPost = { ...formValue, tags };

    const newErrors = validate(formValue);
    if (Object.keys(newErrors).length === 0) {
      await updatePost({ postId: selectedId, updatedPostData: updatedPost });
    } else {
      setErrors(newErrors);
    }
  }

  //{
  //   "title": "Example Post Title",
  //   "message": "This is an example hooks message describing the content.",
  //   "creator": "User123",
  //   "tags": ["tag1", "tag2", "tag3"],
  //   "selectedFile": "url_to_image_or_file"
  // }
  async function createPostHandler() {
    try {
      if (!selectedId && !imageFile) {
        setFileError("please add an image ");
      }
      const base64 = await convertToBase64(imageFile);
      const tags = formValue.tags.split(",").map((tag) => tag.trim());
      const newPost = {
        ...formValue,
        selectedFile: base64,
        tags,
        createdAt: new Date(),
      };
      const newErrors = validate(formValue);

      if (Object.keys(newErrors).length === 0 && !fileError) {
        await createPost(newPost);
      } else {
        setErrors(newErrors);
      }
    } catch (err) {
      console.error("Failed to create hooks:", err);
    }
  }

  const queryClient = useQueryClient();

  function reset() {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setFormValue({
      creator: "",
      title: "",
      message: "",
      tags: "",
    });
    setImageFile(null);
    setSelectedId(null);
  }

  return (
    <div className={"flex flex-col gap-6 w-full"}>
      {selectedId ? (
        <h1 className={"text-center text-4xl font-semibold"}>
          Edit a memory 📸
        </h1>
      ) : (
        <h1 className={"text-center text-4xl font-semibold"}>
          Create a memory 📸
        </h1>
      )}
      <div>
        <Input
          onChange={changeHandler}
          name={"creator"}
          placeholder={"Creator"}
          value={formValue.creator}
        />
        {errors.creator && (
          <p className={"mt-1 text-sm text-red-600"}>{errors.creator}</p>
        )}
      </div>
      <div>
        <Input
          onChange={changeHandler}
          name={"title"}
          placeholder={"Title"}
          value={formValue.title}
        />
        {errors.title && (
          <p className={"mt-1 text-sm text-red-600"}>{errors.title}</p>
        )}
      </div>
      <div>
        <Input
          onChange={changeHandler}
          name={"message"}
          placeholder={"Message"}
          value={formValue.message}
        />
        {errors.message && (
          <p className={"mt-1 text-sm text-red-600"}>{errors.message}</p>
        )}
      </div>
      <div>
        <Input
          onChange={changeHandler}
          name={"tags"}
          placeholder={"Tags"}
          value={formValue.tags}
        />
        {errors.tags && (
          <p className={"mt-1 text-sm text-red-600"}>{errors.tags}</p>
        )}
      </div>
      <div>
        {!selectedId && !selectedPost && (
          <FileInput
            imageFile={imageFile}
            setImageFile={setImageFile}
            setFileError={setFileError}
          />
        )}
        {fileError && (
          <p className={"mt-1 text-sm text-red-600"}>{fileError}</p>
        )}
      </div>

      <div className={"grid w-full grid-cols-2 gap-3"}>
        {selectedId ? (
          <Button
            onClick={editPostHandler}
            text={"Edit"}
            className={"bg-blue-200 hover:bg-blue-300"}
            disabled={shouldBeDisable}
          />
        ) : (
          <Button
            onClick={createPostHandler}
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
    </div>
  );
}
