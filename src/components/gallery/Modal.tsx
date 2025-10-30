'use client'

import { Dialog, DialogBackdrop } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import type { ImageProps } from '@/lib/types'
import SharedModal from './SharedModal'
import useKeypress from '@/lib/useKeypress'

export default function Modal({
  images,
  onClose,
}: {
  images: ImageProps[]
  onClose?: () => void
}) {
  const overlayRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const { moment } = useParams()
  const searchParams = useSearchParams()
  const photoId = Number(searchParams.get('photoId'))

  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(photoId)

  function handleClose() {
    router.push(`/gallery/${moment}`, { scroll: false })
    if (onClose) onClose()
  }

  function changePhotoId(newVal: number) {
    setDirection(newVal > curIndex ? 1 : -1)
    setCurIndex(newVal)
    router.push(`/gallery/${moment}?photoId=${newVal}`, { scroll: false })
  }

  useKeypress('ArrowRight', () => {
    if (curIndex + 1 < images.length) changePhotoId(curIndex + 1)
  })

  useKeypress('ArrowLeft', () => {
    if (curIndex > 0) changePhotoId(curIndex - 1)
  })

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <DialogBackdrop
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog>
  )
}
