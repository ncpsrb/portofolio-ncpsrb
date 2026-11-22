'use client'

import { BLOG_POSTS } from '../data'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function BlogPage() {
  return (
    <main className="space-y-0">
      <h1 className="mb-5 text-2xl font-bold">All Blogs</h1>

      <div className="grid gap-3">
        {BLOG_POSTS.map((blog) => {
          const isAvailable = Boolean(blog.link)
          const content = (
            <article
              className={[
                'group relative overflow-hidden rounded-xl border border-zinc-200/70 bg-white/75 transition-all duration-200 p-4',
                'dark:border-white/5 dark:bg-white/[0.025]',
                isAvailable
                  ? 'hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-md hover:shadow-zinc-200/60 dark:hover:border-white/10 dark:hover:bg-white/[0.045] dark:hover:shadow-black/20'
                  : 'opacity-75',
              ].join(' ')}
            >
              <div
                className={[
                  'absolute inset-y-0 left-0 w-1 transition-colors',
                  isAvailable
                    ? 'bg-zinc-200 group-hover:bg-zinc-400 dark:bg-white/10 dark:group-hover:bg-white/30'
                    : 'bg-zinc-200/60 dark:bg-white/5',
                ].join(' ')}
              />

              <div className="flex min-w-0 items-center justify-between gap-4 pl-1">
                <div className="min-w-0 space-y-1">
                  <h4 className="flex items-center gap-2 text-base leading-snug font-medium text-zinc-950 dark:text-zinc-100">
                    {blog.title}
                    {!isAvailable && (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
                        Coming Soon
                      </span>
                    )}
                  </h4>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {blog.description}
                  </p>
                </div>

                {isAvailable && (
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors group-hover:border-zinc-300 group-hover:text-zinc-700 dark:border-white/10 dark:text-zinc-500 dark:group-hover:border-white/15 dark:group-hover:text-zinc-200">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            </article>
          )

          return isAvailable ? (
            <Link
              key={blog.uid}
              href={blog.link}
              data-id={blog.uid}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500"
            >
              {content}
            </Link>
          ) : (
            <div key={blog.uid} className="cursor-not-allowed">
              {content}
            </div>
          )
        })}
      </div>
    </main>
  )
}
