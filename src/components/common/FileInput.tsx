import { ChangeEvent, useRef } from "react";

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
