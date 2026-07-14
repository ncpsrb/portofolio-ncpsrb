export default function Loading() {
  return (
    <main
      className="animate-pulse space-y-10"
      aria-busy="true"
      aria-live="polite"
    >
      <section className="space-y-4">
        <div className="h-6 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-6 w-1/2 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-9 w-40 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </section>

      <section className="space-y-3">
        <div className="h-5 w-32 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </section>

      <section className="space-y-3">
        <div className="h-5 w-32 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video rounded-xl bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      </section>
    </main>
  )
}
