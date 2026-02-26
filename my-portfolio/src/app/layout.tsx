import type { Metadata } from 'next'
import './globals.css'
import { SceneProvider } from '@/context/SceneContext'
import ClientCanvas from '@/components/ClientCanvas'

export const metadata: Metadata = {
  title: 'Neural Archive | Full-Stack Developer',
  description: 'Portfolio of distributed systems and full-stack engineering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <SceneProvider>
          <ClientCanvas />
          {children}
        </SceneProvider>
      </body>
    </html>
  )
}
