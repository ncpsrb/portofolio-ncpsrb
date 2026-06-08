'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Download, Mail, XIcon } from 'lucide-react'
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
      delayChildren: 0.12,
      staggerChildren: 0.06,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ease: EASE, duration: 0.5 },
  },
}

const TRANSITION_SECTION = { ease: EASE, duration: 0.5 }

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

type ProjectVideoProps = { src: string }

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.8 }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-xl"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0, y: -2 },
            animate: {
              opacity: 1,
              y: 0,
              transition: { ease: EASE, duration: 0.25, delay: 0.2 },
            },
            exit: {
              opacity: 0,
              y: -2,
              transition: { ease: EASE, duration: 0.15 },
            },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default function Personal() {
  const [showAll, setShowAll] = useState(false)
  const prefersReduced = useReducedMotion()

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 6)
  const visibleBlog = showAll ? BLOG_POSTS : BLOG_POSTS.slice(0, 3)

  // If user prefers reduced motion, minimize entrance animations
  const sectionAnimProps = prefersReduced
    ? { initial: false, whileInView: undefined, transition: { duration: 0 } }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        transition: TRANSITION_SECTION,
      }

  return (
    <motion.main
      className="space-y-10"
      variants={VARIANTS_CONTAINER}
      initial={prefersReduced ? undefined : 'hidden'}
      animate={prefersReduced ? undefined : 'visible'}
    >
      {/* Head */}
      <motion.section
        variants={VARIANTS_SECTION}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        {...sectionAnimProps}
      >
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
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600"
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
                  <button className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600">
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
                            className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
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
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/15 dark:hover:bg-white/[0.045] dark:hover:text-zinc-100"
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
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-medium">Work Experience</h3>
          {WORK_EXPERIENCE.length > 3 && (
            <Link href="/experience" className="text-sm font-medium">
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
      <motion.section
        variants={VARIANTS_SECTION}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        {...sectionAnimProps}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-medium">My Projects</h3>
          {PROJECTS.length > 4 && (
            <Link href="/projects" className="text-sm font-medium">
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
      <motion.section
        variants={VARIANTS_SECTION}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        {...sectionAnimProps}
      >
        <TechStackSection />
      </motion.section>

      {/* BLOG */}
      {/* <motion.section
  variants={VARIANTS_SECTION}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
  transition={TRANSITION_SECTION}
>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-medium">Notes</h3>
          {BLOG_POSTS.length > 3 && (
            <Link href="/blog" className="text-sm font-medium">
              Show All →
            </Link>
          )}
        </div>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-300/10"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {visibleBlog.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section> */}
    </motion.main>
  )
}
