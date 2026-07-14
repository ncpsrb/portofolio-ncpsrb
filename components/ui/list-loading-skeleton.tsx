export default function ListLoadingSkeleton() {
  return (
    <main
      className="animate-pulse space-y-0"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="mb-5 h-7 w-40 rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex flex-col space-y-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl px-4 py-4">
            <div className="space-y-2">
              <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
