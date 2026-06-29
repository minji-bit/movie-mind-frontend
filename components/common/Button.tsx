export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
