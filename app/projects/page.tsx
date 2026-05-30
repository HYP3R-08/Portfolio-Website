import type { Metadata } from 'next'
import ProjectsGallery from '@/components/ProjectsGallery'
import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import Cursor from '@/components/Cursor'
import ScrollProgress from '@/components/ScrollProgress'

export const metadata: Metadata = {
  title: 'Projects — Cristian Francesco Pennino',
  description: 'All projects by Cristian Francesco Pennino — embedded systems, web development, robotics, and security.',
}

export default function ProjectsPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main-content" className="pt-28 pb-24 px-6 md:px-12 lg:px-20 xl:px-28">
        <ProjectsGallery />
      </main>
      <Footer />
    </>
  )
}
