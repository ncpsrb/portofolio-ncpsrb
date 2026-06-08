'use client'

import { WORK_EXPERIENCE } from '../data'
import { WorkExperienceCard } from '@/components/ui/work-experience-card'

export default function ExperiencePage() {
  // clone + sort so original array is not mutated
  const sortedExperience = [...WORK_EXPERIENCE].sort(
    (a, b) => Number(b.start) - Number(a.start),
  )

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4">
      <div className="space-y-2">
        <p className="text-sm font-medium tracking-[0.2em] text-zinc-400 uppercase">
          Career
        </p>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Work Experience
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Automation, security, QA, and software engineering roles across
          fintech, banking, education, and client projects.
        </p>
      </div>

      <div className="grid gap-4">
        {sortedExperience.map((job) => (
          <WorkExperienceCard key={job.id} job={job} variant="full" />
        ))}
      </div>
    </main>
  )
}
