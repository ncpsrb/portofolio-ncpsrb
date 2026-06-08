import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness, CalendarDays } from 'lucide-react'

type WorkExperienceCardProps = {
  job: {
    id: string
    title: string
    company: string
    status?: string
    description?: string
    start: string
    end: string
    link?: string
  }
  variant?: 'compact' | 'full'
}

export function WorkExperienceCard({
  job,
  variant = 'compact',
}: WorkExperienceCardProps) {
  const isCurrent = job.end.toLowerCase() === 'present'
  const hasLink = Boolean(job.link)
  const isFull = variant === 'full'

  const content = (
    <article
      className={[
        'group relative overflow-hidden rounded-xl border border-zinc-200/70 bg-white/75 transition-all duration-200',
        'dark:border-white/5 dark:bg-white/[0.025]',
        hasLink
          ? 'hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-md hover:shadow-zinc-200/60 dark:hover:border-white/10 dark:hover:bg-white/[0.045] dark:hover:shadow-black/20'
          : 'opacity-75',
        isFull ? 'p-5 sm:p-6' : 'p-4',
      ].join(' ')}
    >
      <div
        className={[
          'absolute inset-y-0 left-0 w-1',
          isCurrent
            ? 'bg-lime-400 dark:bg-lime-500/80'
            : 'bg-zinc-200 dark:bg-white/10',
        ].join(' ')}
      />

      <div className="flex min-w-0 gap-3 pl-1">
        <div
          className={[
            'mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border sm:flex',
            isCurrent
              ? 'border-lime-300 bg-lime-50 text-lime-700 dark:border-lime-500/20 dark:bg-lime-400/10 dark:text-lime-300'
              : 'border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-500',
          ].join(' ')}
        >
          <BriefcaseBusiness className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <h4 className="text-base leading-snug font-medium text-zinc-950 dark:text-zinc-100">
                {job.title}
              </h4>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {job.company}
              </p>
            </div>

            {hasLink && (
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors group-hover:border-zinc-300 group-hover:text-zinc-700 dark:border-white/10 dark:text-zinc-500 dark:group-hover:border-white/15 dark:group-hover:text-zinc-200">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            )}
          </div>

          {job.description && (
            <p
              className={[
                'text-sm leading-relaxed text-zinc-600 dark:text-zinc-500',
                isFull ? '' : 'line-clamp-2',
              ].join(' ')}
            >
              {job.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[0.045] dark:text-zinc-400">
              <CalendarDays className="h-3.5 w-3.5" />
              {job.start} - {job.end}
            </span>

            {job.status && (
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[0.045] dark:text-zinc-400">
                {job.status}
              </span>
            )}

            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-500/15 px-2.5 py-1 text-xs font-medium text-lime-700 ring-1 ring-lime-500/25 ring-inset dark:bg-lime-400/10 dark:text-lime-300 dark:ring-lime-400/15">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
                Current
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )

  if (!hasLink) {
    return content
  }

  return (
    <Link
      href={job.link ?? '#'}
      data-id={job.id}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500"
    >
      {content}
    </Link>
  )
}
