interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  className: string;
  disabled: boolean;
}

export function Button({ text, className, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-12 rounded-md font-semibold text-lg text-gray-900 transition-all duration-200 ease-in-out disabled:bg-gray-200 ${className}`}
    >
      {text}
    </button>
  );
}
