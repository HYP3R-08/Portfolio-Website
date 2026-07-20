import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/lib/projects'
import ProjectDetail from '@/components/ProjectDetail'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return {}
  return {
    title: `${project.title} — Cristian Francesco Pennino`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.id === id)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main id="main-content">
      <ProjectDetail project={project} nextProject={nextProject} />
    </main>
  )
}
