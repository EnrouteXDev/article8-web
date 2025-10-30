'use client'

import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { variants } from '@/lib/animationVariants'
import downloadPhoto from '@/lib/downloadPhoto'
import type { ImageProps } from '@/lib/types'

interface SharedModalProps {
  index: number
  images: ImageProps[]
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction: number
}

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  direction,
}: SharedModalProps) {
  const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const [loaded, setLoaded] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images.length - 1) changePhotoId(index + 1)
    },
    onSwipedRight: () => {
      if (index > 0) changePhotoId(index - 1)
    },
    trackMouse: true,
  })

  const currentImage = images[index]
  const isImage = validImageExtensions.includes(currentImage?.format)

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center justify-center"
        {...handlers}
      >
        {/* Media display */}
        <div className="relative flex w-full items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute"
            >
              {isImage ? (
                <Image
                  src={currentImage.url}
                  width={1280}
                  height={853}
                  alt="gallery media"
                  onLoad={() => setLoaded(true)}
                  priority
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full">
                  <video
                    src={currentImage.url}
                    controls
                    className="rounded-lg max-w-full"
                    onLoadedData={() => setLoaded(true)}
                  >
                    Your browser does not support HTML5 video tags.
                  </video>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons */}
        {loaded && (
          <div className="absolute inset-0 flex justify-between items-center px-3">
            {index > 0 && (
              <button
                onClick={() => changePhotoId(index - 1)}
                className="rounded-full bg-black/50 p-3 text-white hover:bg-black/75"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}
            {index + 1 < images.length && (
              <button
                onClick={() => changePhotoId(index + 1)}
                className="rounded-full bg-black/50 p-3 text-white hover:bg-black/75 ml-auto"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        )}

        {/* Top controls */}
        <div className="absolute top-0 right-0 flex gap-2 p-3 text-white">
          <a
            href={currentImage.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black/50 p-2 hover:bg-black/75"
            title="Open full size"
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </a>
          <button
            onClick={() => downloadPhoto(currentImage.url, `${index}.jpg`)}
            className="rounded-full bg-black/50 p-2 hover:bg-black/75"
            title="Download"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
          </button>
          <button
            onClick={closeModal}
            className="rounded-full bg-black/50 p-2 hover:bg-black/75"
            title="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </MotionConfig>
  )
}
