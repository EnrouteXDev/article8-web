'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import type { ImageProps } from '@/lib/types'
import Modal from '@/components/gallery/Modal'
import { useLastViewedPhoto } from '@/lib/useLastViewedPhoto'

export default function MomentPage() {
  const { moment } = useParams()
  const searchParams = useSearchParams()
  const photoId = searchParams.get('photoId')
  const [images, setImages] = useState<ImageProps[]>([])
  const [loading, setLoading] = useState(true)
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`/api/moments/${moment}/images`)
        const data = await res.json()
        setImages(data)
      } catch (err) {
        console.error('Error fetching images:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [moment])

  useEffect(() => {
    // Scroll to last viewed photo when page loads
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [lastViewedPhoto, photoId, setLastViewedPhoto])

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen text-gray-500">
        Loading images...
      </main>
    )
  }

  return (
    <>
      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <Link
            href="/gallery"
            className="text-brand hover:opacity-80 transition-opacity inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Gallery
          </Link>
        </div>

        <h1 className="text-3xl font-semibold mb-8 capitalize">
          {typeof moment === 'string' ? moment : 'Moment'} Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Link
              key={image.id}
              href={`/gallery/${moment}?photoId=${index}`}
              ref={index === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              className="group relative block overflow-hidden rounded-xl border border-gray-200 hover:shadow-lg transition aspect-[4/3]"
              onClick={() => setLastViewedPhoto(String(index))}
              scroll={false}
            >
              <Image
                src={image.url}
                alt={`Image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder={image.blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={image.blurDataUrl || undefined}
              />
            </Link>
          ))}
        </div>
      </main>

      {photoId !== null && <Modal images={images} />}
    </>
  )
}
