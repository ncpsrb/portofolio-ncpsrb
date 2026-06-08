'use client'

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import { ExternalLink, XIcon } from 'lucide-react'

type Project = {
  name: string
  description: string
  video: string
  link: string
}

const isVideo = (url: string) => {
  try {
    const extension = new URL(url).pathname.split('.').pop()
    return /(mp4|webm|mov)$/i.test(extension ?? '')
  } catch {
    return false
  }
}

export default function ProjectCardModal({ project }: { project: Project }) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-200/70 transition-all duration-300 ring-inset hover:shadow-lg hover:shadow-zinc-200/70 dark:bg-white/[0.035] dark:ring-white/10 dark:hover:shadow-black/20 dark:hover:ring-white/15">
          {/* Video Preview */}
          <div className="transition-transform duration-500 ease-in-out group-hover:scale-105">
            {isVideo(project.video) ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                className="aspect-video w-full object-cover"
              />
            ) : (
              <img
                loading="lazy"
                src={project.video}
                alt={project.name}
                className="aspect-video w-full object-cover"
              />
            )}
          </div>

          {/* Overlay Text */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 transition-all duration-300">
            <p className="text-base font-semibold tracking-wide text-white">
              {project.name}
            </p>

            <p className="mt-1 text-sm text-zinc-200">{project.description}</p>
          </div>
        </div>
      </MorphingDialogTrigger>

      {/* Modal Content */}
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative w-[90vw] max-w-6xl rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200/50 transition-all duration-300 ease-in-out ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#171717]">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-4 py-3 dark:border-white/10">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-zinc-950 dark:text-zinc-100">
                  {project.name}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                  title="Open project"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="bg-zinc-100 p-3 dark:bg-black/20">
              {isVideo(project.video) ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  className="max-h-[68vh] w-full rounded-lg bg-white object-contain dark:bg-zinc-950"
                />
              ) : (
                <img
                  loading="eager"
                  src={project.video}
                  alt={project.name}
                  className="max-h-[68vh] w-full rounded-lg bg-white object-contain dark:bg-zinc-950"
                />
              )}
            </div>
          </div>
        </MorphingDialogContent>

        <div className="fixed top-5 right-5 z-50">
          <button
            onClick={() =>
              document.activeElement?.dispatchEvent(
                new Event('click', { bubbles: true }),
              )
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-600 shadow-sm backdrop-blur transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/10 dark:bg-zinc-950/80 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
            title="Close"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
