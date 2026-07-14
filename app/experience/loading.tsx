export default function Loading() {
  return (
    <main
      className="mx-auto max-w-4xl animate-pulse space-y-8 px-4"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="space-y-3">
        <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-8 w-64 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full max-w-xl rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-zinc-200/70 bg-zinc-100 dark:border-white/5 dark:bg-white/[0.025]"
          />
        ))}
      </div>
    </main>
  )
}
