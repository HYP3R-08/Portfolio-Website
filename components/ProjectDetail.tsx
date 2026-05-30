import { type Project } from '@/lib/projects'
import CinematicLayout from '@/components/project-layouts/CinematicLayout'
import SplitLayout from '@/components/project-layouts/SplitLayout'
import GalleryLayout from '@/components/project-layouts/GalleryLayout'

interface Props {
  project: Project
  nextProject: Project
}

export default function ProjectDetail({ project, nextProject }: Props) {
  switch (project.layout) {
    case 'split':
      return <SplitLayout project={project} nextProject={nextProject} />
    case 'gallery':
      return <GalleryLayout project={project} nextProject={nextProject} />
    default:
      return <CinematicLayout project={project} nextProject={nextProject} />
  }
}
