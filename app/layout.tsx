import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Windows Software Performance Comparison Platform',
  description: 'Comprehensive software information and system performance estimation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-inter">{children}</body>
    </html>
  )
} 