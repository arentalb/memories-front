import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import convertToBase64 from "../../utils/convertToBase64.ts";
import { fetchPostById } from "../../api/postsApi.ts";
import { useFormPostMode } from "../../context/postContext.tsx";
import useCreatePost from "./hooks/useCreatePost.ts";
import useUpdatePost from "./hooks/useUpdatePost.ts";
import { TPost } from "../../types/TPost.ts";
import { FileInput } from "../../ui/common/FileInput.tsx";
import { Button } from "../../ui/common/Button.tsx";
import { Input } from "../../ui/common/Input.tsx";

export function Form() {
  const [formValue, setFormValue] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const { selectedId, setSelectedId } = useFormPostMode();

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const {
    data: selectedPost,
    isLoading,
    error,
  } = useQuery<TPost>({
    queryFn: () => fetchPostById(selectedId),
    queryKey: ["singlePost", selectedId],
  });
  useEffect(() => {
    if (selectedPost && selectedId)
      setFormValue({
        creator: selectedPost.creator,
        title: selectedPost.title,
        message: selectedPost.message,
        tags: selectedPost.tags.toString(),
      });
  }, [selectedId, selectedPost]);

  const { createAsync, isCreating, isErrorCreat, errorCreat } = useCreatePost(
    setFormValue,
    setImageFile,
  );
  const { updateAsync, isUpdating, isErrorUpdate, errorUpdate } = useUpdatePost(
    setFormValue,
    setImageFile,
    setSelectedId,
  );

  async function editPostHandler() {
    await updateAsync({ selectedId, newPost: formValue });
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
      if (!imageFile) {
        throw new Error("No image file provided");
      }

      const base64 = await convertToBase64(imageFile);
      const tags = formValue.tags.split(",").map((tag) => tag.trim());
      const newPost = { ...formValue, selectedFile: base64, tags };

      await createAsync(newPost);
    } catch (err) {
      console.error("Failed to create hooks:", err);
    }
  }

  return (
    <div className={"flex flex-col gap-6 w-full"}>
      {isCreating && <p>creating .....</p>}
      {isErrorCreat && <p>error {JSON.stringify(errorCreat)} </p>}
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
        onChange={changeHandler}
        name={"creator"}
        placeholder={"Creator"}
        value={formValue.creator}
      />
      <Input
        onChange={changeHandler}
        name={"title"}
        placeholder={"Title"}
        value={formValue.title}
      />
      <Input
        onChange={changeHandler}
        name={"message"}
        placeholder={"Message"}
        value={formValue.message}
      />

      <Input
        onChange={changeHandler}
        name={"tags"}
        placeholder={"Tags"}
        value={formValue.tags}
      />
      <FileInput imageFile={imageFile} setImageFile={setImageFile} />
      <div className={"grid w-full grid-cols-2 gap-3"}>
        {selectedId ? (
          <Button
            onClick={editPostHandler}
            text={"Edit"}
            className={"bg-blue-200 hover:bg-blue-300"}
          />
        ) : (
          <Button
            onClick={createPostHandler}
            text={"Save"}
            className={"bg-blue-200 hover:bg-blue-300"}
          />
        )}
        <Button
          onClick={() => {}}
          text={"Clear"}
          className={"bg-red-200 hover:bg-red-300"}
        />
      </div>
    </div>
  );
}
