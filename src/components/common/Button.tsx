interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  className: string;
}

export function Button({ text, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-12 rounded-md font-semibold text-lg text-gray-900 transition-all duration-200 ease-in-out  ${className}`}
    >
      {text}
    </button>
  );
}
