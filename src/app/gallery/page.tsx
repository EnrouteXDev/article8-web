'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Moment {
  id: number
  title: string
  description: string
  cover: string
}

export default function GalleryPage() {
  const [moments, setMoments] = useState<Moment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMoments() {
      try {
        const res = await fetch('/api/moments')
        const data = await res.json()
        setMoments(data)
      } catch (err) {
        console.error('Error fetching moments:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMoments()
  }, [])

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen text-gray-500">
        Loading moments...
      </main>
    )
  }

  return (
    <main className="mx-auto mt-10 max-w-7xl min-h-[calc(100dvh-78px)]">
      <h1 className="section-heading text-brand mb-6 ">Gallery Moments</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {moments.map((moment) => (
          <Link
            key={moment.id}
            href={`/gallery/${moment.id}`}
            className="group block overflow-hidden rounded-xl border border-gray-200 hover:shadow-lg transition"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={moment.cover}
                alt={moment.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold group-hover:text-brand">
                {moment.title}
              </h2>
              <p className="text-sm text-gray-600">{moment.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
