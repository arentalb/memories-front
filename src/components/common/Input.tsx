import { ChangeEvent } from "react";

interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  value: string;
}

export function Input({ onChange, name, placeholder, value }: InputProps) {
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
