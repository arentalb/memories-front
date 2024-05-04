// import { FieldErrors, UseFormRegister } from "react-hook-form";
// import { Inputs } from "../../features/post/Form.tsx";
// register: UseFormRegister<Inputs>;
// errors: FieldErrors<Inputs>;
interface InputProps {
  name: string;
  register: any;
  errors: any;
  required?: boolean;
  type: string;
  placeholder: string;
  validationSchema?: any;
}

export function Input({
  name,
  // label,
  register,
  errors,
  required,
  type,
  placeholder,
  validationSchema,
}: InputProps) {
  return (
    <div>
      {/*<label htmlFor={name}>*/}
      {/*  {label}*/}
      {/*  {required && "*"}*/}
      {/*</label>*/}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={
          "px-4 py-3 border-2 w-full rounded-md text-lg  placeholder-gray-600"
        }
        {...register(name, validationSchema)}
      />
      {errors && errors[name]?.type === "required" && (
        <span className={"mt-1 text-sm text-red-600"}>
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}
