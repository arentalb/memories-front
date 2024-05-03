export function Error({ message }: { message: string }) {
  return (
    <div className={"flex justify-center"}>
      <span className={"text-2xl font-semibold"}>{message}</span>
    </div>
  );
}
