'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Download, Mail, XIcon } from 'lucide-react'
import ProjectCardModal from '@/components/ui/projectcardModal'
import { useState } from 'react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  ABOUT_ME,
  EMAIL,
  PROFILE_LINKS,
} from './data'
import { TechStackSection } from '@/components/ui/techstack'
import { WorkExperienceCard } from '@/components/ui/work-experience-card'

// ------- Smooth motion presets -------
const EASE = [0.22, 1, 0.36, 1] as const // soft “expo out” feel

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ease: EASE,
      duration: 0.5,
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ease: EASE, duration: 0.4 },
  },
}

const VARIANTS_CONTAINER_REDUCED = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

const VARIANTS_SECTION_REDUCED = {
  hidden: { opacity: 1, y: 0, filter: 'none' },
  visible: { opacity: 1, y: 0, filter: 'none', transition: { duration: 0 } },
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget as HTMLFormElement)
  const password = formData.get('password') as string

  try {
    const response = await fetch('/api/download-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    const data = await response.json()

    if (data.success) {
      window.open(data.url, '_blank')
      // Close modal
      document.activeElement?.dispatchEvent(
        new Event('click', { bubbles: true }),
      )
    } else {
      alert('Incorrect password!')
    }
  } catch (error) {
    alert('Error occurred. Please try again.')
  }
}
const handleEmailClick = () => {
  window.location.href = `mailto:${EMAIL}?subject=From%20Portfolio%20Website&body=Hi,%20may%20we%20have%20quick%20discussion`
}

export default function Personal() {
  const [showAll, setShowAll] = useState(false)
  const prefersReduced = useReducedMotion()

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 6)
  const visibleBlog = showAll ? BLOG_POSTS : BLOG_POSTS.slice(0, 3)

  const containerVariants = prefersReduced
    ? VARIANTS_CONTAINER_REDUCED
    : VARIANTS_CONTAINER
  const sectionVariants = prefersReduced
    ? VARIANTS_SECTION_REDUCED
    : VARIANTS_SECTION

  return (
    <motion.main
      className="space-y-10"
      variants={containerVariants}
      initial={prefersReduced ? 'visible' : 'hidden'}
      animate="visible"
    >
      {/* Head */}
      <motion.section variants={sectionVariants}>
        <div className="text-gray flex flex-col gap-y-6">
          <div className="text-2xl text-zinc-600 dark:text-zinc-400">
            <p>{ABOUT_ME[0].description}</p>
          </div>

          {/* Availability Badge */}
          <div className="flex items-center gap-2 text-sm font-light text-gray-400">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-lime-500" />
            </span>
            Currently Available for New Opportunities
          </div>

          {/* Contact Section */}
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex gap-2">
              <button
                onClick={handleEmailClick}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500"
              >
                <Mail />
                Contact Me
              </button>
              <MorphingDialog
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.3,
                }}
              >
                <MorphingDialogTrigger>
                  <button className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500">
                    <Download />
                    Download Resume
                  </button>
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent className="relative w-[90vw] max-w-md rounded-2xl bg-zinc-50 p-6 ring-1 ring-zinc-200/50 dark:bg-zinc-950 dark:ring-zinc-800/50">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                          Download Resume
                        </h3>
                        <MorphingDialogClose className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <XIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                        </MorphingDialogClose>
                      </div>

                      <div className="space-y-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          Enter the password to download my CV.
                        </p>

                        <form
                          onSubmit={async (e) => {
                            e.preventDefault()
                            const formData = new FormData(
                              e.currentTarget as HTMLFormElement,
                            )
                            const password = formData.get('password') as string

                            try {
                              const response = await fetch('/api/download-cv', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ password }),
                              })

                              const data = await response.json()

                              if (data.success && data.redirect) {
                                // Open the Drive URL directly
                                window.open(data.url, '_blank')
                                // Close modal after successful download using proper method
                                const closeButton = document.querySelector(
                                  '[aria-label="Close dialog"]',
                                ) as HTMLButtonElement
                                closeButton?.click()
                              } else if (data.success) {
                                window.open(data.url, '_blank')
                                // Close modal after successful download using proper method
                                const closeButton = document.querySelector(
                                  '[aria-label="Close dialog"]',
                                ) as HTMLButtonElement
                                closeButton?.click()
                              } else {
                                alert(data.error || 'Incorrect password!')
                              }
                            } catch (error) {
                              alert('Error occurred. Please try again.')
                            }
                          }}
                          className="space-y-3"
                        >
                          <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/20 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
                          />

                          <button
                            type="submit"
                            className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-500"
                          >
                            Download CV
                          </button>
                        </form>
                      </div>
                    </div>
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {PROFILE_LINKS.map((profileLink) => (
                <Link
                  key={profileLink.label}
                  href={profileLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/15 dark:hover:bg-white/[0.045] dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-500"
                >
                  {profileLink.label}
                </Link>
              ))}
            </div>

            <p>
              Or reach out to me via{' '}
              <Link
                href="https://www.linkedin.com/in/natanaelps/"
                className="font-semibold underline transition-colors hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </Link>{' '}
              or{' '}
              <Link
                href="https://instagram.com/ncpsrb"
                className="font-semibold underline transition-colors hover:text-pink-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
            </p>
          </div>
        </div>
      </motion.section>

      {/* Work Experience */}
      <motion.section
        variants={sectionVariants}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-medium">Work Experience</h3>
          {WORK_EXPERIENCE.length > 3 && (
            <Link
              href="/experience"
              className="rounded-sm text-sm font-medium text-zinc-800 transition-colors hover:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-200 dark:hover:text-zinc-400 dark:focus-visible:ring-zinc-500"
            >
              Show All →
            </Link>
          )}
        </div>

        <div className="grid gap-3">
          {(showAll ? [...WORK_EXPERIENCE] : [...WORK_EXPERIENCE].slice(0, 4))
            .sort((a, b) => Number(b.start) - Number(a.start))
            .map((job) => (
              <WorkExperienceCard key={job.id} job={job} />
            ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section variants={sectionVariants}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-medium">My Projects</h3>
          {PROJECTS.length > 4 && (
            <Link
              href="/projects"
              className="rounded-sm text-sm font-medium text-zinc-800 transition-colors hover:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-200 dark:hover:text-zinc-400 dark:focus-visible:ring-zinc-500"
            >
              Show All Projects →
            </Link>
          )}
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-6">
          {(showAll ? [...PROJECTS] : [...PROJECTS].slice(0, 9))
            .sort((a, b) => Number(b.id) - Number(a.id))
            .map((project) => {
              return (
                <motion.div
                  key={project.name}
                  className="min-w-[300px] sm:min-w-0"
                  whileHover={
                    prefersReduced ? undefined : { scale: 0.985, y: -1 }
                  }
                  transition={
                    prefersReduced
                      ? undefined
                      : { type: 'spring', damping: 26, stiffness: 260 }
                  }
                  layout={!prefersReduced}
                >
                  <ProjectCardModal project={project} />
                </motion.div>
              )
            })}
        </div>
      </motion.section>

      {/* Tech Stacks */}
      <motion.section variants={sectionVariants}>
        <TechStackSection />
      </motion.section>

      {/* Blog */}
      <motion.section variants={sectionVariants}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-medium">Blog</h3>
          <Link
            href="/blog"
            className="rounded-sm text-sm font-medium text-zinc-800 transition-colors hover:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-200 dark:hover:text-zinc-400 dark:focus-visible:ring-zinc-500"
          >
            Show All →
          </Link>
        </div>

        <div className="grid gap-3">
          {visibleBlog.map((blog) => {
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
      </motion.section>
    </motion.main>
  )
}
