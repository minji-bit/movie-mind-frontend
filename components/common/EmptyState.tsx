export default function EmptyState({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-10 text-center">
        <h2 className="mb-3 text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
