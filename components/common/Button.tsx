export default function Button({
  children,
  onClick,
  type,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  className?: string;
}) {
  return (
    <button
      className={`rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 hover:scale-[1.02] ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
