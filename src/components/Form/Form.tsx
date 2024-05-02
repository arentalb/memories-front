import { ChangeEvent, useEffect, useRef, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import convertToBase64 from "../../utils/convertToBase64.ts";
import { fetchPostById } from "../../api/postsApi.ts";
import { useFormPostMode } from "../../context/postContext.tsx";
import useCreatePost from "./useCreatePost.ts";
import useUpdatePost from "./useUpdatePost.ts";
import { TPost } from "../../types/TPost.ts";

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
  //   "message": "This is an example post message describing the content.",
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
      console.error("Failed to create post:", err);
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

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  className: string;
}

function Button({ text, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-12 rounded-md font-semibold text-lg text-gray-900 transition-all duration-200 ease-in-out  ${className}`}
    >
      {text}
    </button>
  );
}

interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  value: string;
}

function Input({ onChange, name, placeholder, value }: InputProps) {
  return (
    <div>
      <input
        type="text"
        value={value}
        name={name}
        placeholder={placeholder}
        className={
          "px-4 py-3 border-2 w-full rounded-md text-lg  placeholder-gray-600"
        }
        onChange={onChange}
      />
    </div>
  );
}

interface FileInputProps {
  accept?: string;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
}

export function FileInput({
  accept = "image/*",
  imageFile,
  setImageFile,
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
    }
  };

  return (
    <div className="px-4 py-3 border-2 rounded-md text-lg  placeholder-gray-600 ">
      <div
        className=" p-2  border-2 border-dashed border-gray-300 text-gray-400 text-lg rounded-md  cursor-pointer  "
        onClick={handleImageUploadClick}
      >
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
            className="  rounded-md object-cover self-start"
          />
        ) : (
          <span>Choose file or drag it here</span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className=" hidden"
          onChange={updateImage}
        />
      </div>
    </div>
  );
}
