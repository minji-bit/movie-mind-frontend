export default function EmptyState({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl font-bold">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
