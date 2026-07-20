import type { Metadata } from 'next'
import {
  Cormorant,
  Plus_Jakarta_Sans,
  Syne,
  JetBrains_Mono,
} from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/SiteChrome'

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://penninocristianfrancesco.dev'),
  title: 'Cristian Francesco Pennino — Software Engineer & Web Developer',
  description:
    'Portfolio of Cristian Francesco Pennino — software engineer and web developer building across robotics, computer vision and embedded systems, and full-stack web with React, TypeScript and Next.js.',
  keywords: [
    'software engineer',
    'web developer',
    'full-stack',
    'frontend',
    'React',
    'Next.js',
    'TypeScript',
    'robotics',
    'computer vision',
    'embedded systems',
  ],
  icons: {
    icon: '/icon-gold-ring.svg',
    shortcut: '/icon-gold-ring.svg',
    apple: '/icon-gold-ring.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${syne.variable} ${jetbrains.variable}`}
    >
      <body className="bg-bg text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Cristian Francesco Pennino',
              url: 'https://penninocristianfrancesco.dev',
              jobTitle: 'Software Engineer & Web Developer',
              sameAs: [
                'https://github.com/HYP3R-08',
                'https://www.linkedin.com/in/cristian-francesco-pennino-7a913b2ab/',
              ],
            }),
          }}
        />
        <div className="grain-overlay" aria-hidden="true" />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
