export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500" />
        <p className="text-lg font-semibold text-zinc-300">로딩 중입니다...</p>
      </div>
    </div>
  );
}
